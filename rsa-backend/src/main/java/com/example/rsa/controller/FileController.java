package com.example.rsa.controller;

import com.example.rsa.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class FileController {


    @Autowired
    private FileService fileService;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("userId") Integer userId,@RequestParam("recipientId") Integer recipientId) {
        System.out.println("dosya geldi");
        try {
            fileService.saveFile(file,userId,recipientId);
            return ResponseEntity.ok("File uploaded and encrypted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error during file encryption: " + e.getMessage());
        }
    }
}
