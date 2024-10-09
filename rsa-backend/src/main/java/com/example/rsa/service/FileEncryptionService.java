package com.example.rsa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@Service
public class FileEncryptionService {

    @Autowired
    private RsaEncryptionService rsaEncryptionService;


    public byte[] encryptFile(byte[] fileData) {
        System.out.println(Arrays.toString(fileData));
        String fileContent = new String(fileData, StandardCharsets.UTF_8);
        BigInteger message = new BigInteger(fileContent.getBytes());
        System.out.println(message);
        BigInteger encrypted = rsaEncryptionService.encrypt(message);
        System.out.println(encrypted);
        return encrypted.toByteArray();
    }

    public byte[] decryptFile(byte[] encryptedData) {
        BigInteger encryptedMessage = new BigInteger(encryptedData);
        BigInteger decrypted = rsaEncryptionService.decrypt(encryptedMessage);
        return decrypted.toByteArray();
    }

    public byte[] decryptFileByName(String filename) throws IOException {
        String directory = "encrypted_files/";
        Path filePath = Paths.get(directory + filename);
        if (Files.notExists(filePath)) {
            throw new FileNotFoundException("Dosya bulunamadı: " + filename);
        }
        byte[] encryptedData = Files.readAllBytes(filePath);
        return decryptFile(encryptedData);
    }

    public byte[] fileByName(String filename) throws IOException {
        String directory = "encrypted_files/";
        Path filePath = Paths.get(directory + filename);
        if (Files.notExists(filePath)) {
            throw new FileNotFoundException("Dosya bulunamadı: " + filename);
        }
        return Files.readAllBytes(filePath);
    }
}