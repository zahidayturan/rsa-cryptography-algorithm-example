package com.example.rsa.service;

import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@Service
public class FileEncryptionService {

    private RSAEncryption rsa;

    public FileEncryptionService() {
        this.rsa = new RSAEncryption();
    }

    public byte[] encryptFile(byte[] fileData) {
        String fileContent = new String(fileData, StandardCharsets.UTF_8);
        BigInteger message = new BigInteger(fileContent.getBytes());
        BigInteger encrypted = rsa.encrypt(message);
        return encrypted.toByteArray();
    }

    public byte[] decryptFile(byte[] encryptedData) {
        BigInteger encryptedMessage = new BigInteger(encryptedData);
        BigInteger decrypted = rsa.decrypt(encryptedMessage);
        return decrypted.toByteArray();
    }
}
