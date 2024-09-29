package com.example.rsa.controller;

import com.example.rsa.service.FileEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;


@RestController
@RequestMapping("/upload")
public class FileUploadController {

    @Autowired
    private FileEncryptionService encryptionService;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            byte[] encryptedFile = encryptionService.encryptFile(file.getBytes());
            Files.write(Paths.get("encrypted_files/" + file.getOriginalFilename()), encryptedFile);
            return ResponseEntity.ok("File uploaded and encrypted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error during file encryption: " + e.getMessage());
        }
    }
}
