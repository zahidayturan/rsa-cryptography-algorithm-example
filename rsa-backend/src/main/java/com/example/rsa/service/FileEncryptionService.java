package com.example.rsa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@Service
public class FileEncryptionService {

    @Autowired
    private RsaEncryptionService rsaEncryptionService;


    public byte[] encryptFile(byte[] fileData) {
        String fileContent = new String(fileData, StandardCharsets.UTF_8);
        BigInteger message = new BigInteger(fileContent.getBytes());
        BigInteger encrypted = rsaEncryptionService.encrypt(message);
        return encrypted.toByteArray();
    }

    public byte[] decryptFile(byte[] encryptedData) {
        BigInteger encryptedMessage = new BigInteger(encryptedData);
        BigInteger decrypted = rsaEncryptionService.decrypt(encryptedMessage);
        return decrypted.toByteArray();
    }
}