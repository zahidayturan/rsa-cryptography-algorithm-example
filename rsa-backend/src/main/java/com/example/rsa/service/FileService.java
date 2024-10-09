package com.example.rsa.service;

import com.example.rsa.model.RsaFile;
import com.example.rsa.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FileService {

    List<RsaFile> files = new ArrayList<>();

    @Autowired
    private FileEncryptionService fileEncryptionService;

    @Autowired
    private UserService userService;

    public void saveFile(MultipartFile file,Integer userId,Integer recipientId) throws IOException {
        byte[] encryptedFile = fileEncryptionService.encryptFile(file.getBytes());
        long fileSize = file.getSize();
        String directory = "encrypted_files/";
        String filename = (files.size()+1)+file.getOriginalFilename();
        System.out.println(filename);
        Path filePath = Paths.get(directory + filename);
        Files.createDirectories(filePath.getParent());

        Files.write(filePath, encryptedFile);
        System.out.println("Encrypted file saved: " + file.getOriginalFilename());

        RsaFile newFile = new RsaFile();
        newFile.setId(files.size()+1);
        newFile.setName(filename);
        newFile.setOriginalName(file.getOriginalFilename());
        newFile.setOwnerId(userId);
        newFile.setSize(fileSize);
        newFile.setRecipientId(recipientId);
        files.add(newFile);
        System.out.println(getAllFiles());
    }

    public List<RsaFile> getAllFiles() {
        return files;
    }

    public void cleanAllFiles() {
        Path directory = Paths.get("encrypted_files/");
        try (Stream<Path> files = Files.walk(directory)) {
            files.sorted(Comparator.reverseOrder())
                    .forEach(path -> {
                        try {
                            Files.delete(path);
                            System.out.println("Deleted: " + path);
                        } catch (IOException e) {
                            System.err.println("Failed to delete: " + path + " - " + e.getMessage());
                        }
                    });
        } catch (IOException e) {
            System.err.println("Error while cleaning directory: " + e.getMessage());
        }
        System.out.println("All files deleted successfully.");
        files.clear();
        System.out.println(getAllFiles());
    }


    public List<RsaFile> fileByUserId(Integer userId) {
        return files.stream()
                .filter(rsaFile -> rsaFile.getOwnerId().equals(userId))
                .collect(Collectors.toList());
    }

    public List<RsaFile> fileByRecipientId(Integer recipientId) {
        return files.stream()
                .filter(rsaFile -> rsaFile.getRecipientId().equals(recipientId))
                .collect(Collectors.toList());
    }

    public byte[] getFile(String fileName, Integer userId) throws IOException {
        if (userId == 99) { // Admin access 99 - encrypted file
            return fileEncryptionService.fileByName(fileName);
        } else if (userId == 98) { // Admin access 98 - decrypted file
            return fileEncryptionService.decryptFileByName(fileName);
        } else {
            RsaFile file = findFileByName(fileName);
            if (file == null) {
                throw new FileNotFoundException("File not found");
            }
            User user = userService.getUserById(userId);
            if (user != null) {
                if (user.getPublicKey()) {
                    if (file.getOwnerId().equals(userId) || file.getRecipientId().equals(userId)) {
                        return fileEncryptionService.decryptFileByName(fileName); // User authorized - return decrypted
                    } else {
                        return fileEncryptionService.fileByName(fileName); // User not authorized - return encrypted
                    }
                } else {
                    return fileEncryptionService.fileByName(fileName); // User not authorized - return encrypted
                }
            } else {
                throw new IllegalArgumentException("Invalid user ID");
            }
        }
    }


    private RsaFile findFileByName(String fileName) {
        for (RsaFile file : files) {
            if (file.getName().equals(fileName)) {
                return file;
            }
        }
        return null;
    }

}
