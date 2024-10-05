package com.example.rsa.service;

import com.example.rsa.model.RsaFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FileService {

    List<RsaFile> files = new ArrayList<>();

    @Autowired
    private FileEncryptionService encryptionService;

    public void saveFile(MultipartFile file,Integer userId,Integer recipientId) throws IOException {


        //byte[] encryptedFile = encryptionService.encryptFile(file.getBytes());
        long fileSize = file.getSize();
        String directory = "encrypted_files/";
        String filename = file.getOriginalFilename();
        Path filePath = Paths.get(directory + filename);
        Files.createDirectories(filePath.getParent());

        Files.write(filePath, file.getBytes());
        System.out.println("Encrypted file saved: " + file.getOriginalFilename());

        RsaFile newFile = new RsaFile();
        newFile.setId(files.size()+1);
        newFile.setName(file.getOriginalFilename());
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

}
