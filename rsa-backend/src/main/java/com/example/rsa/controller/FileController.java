package com.example.rsa.controller;

import com.example.rsa.model.RsaFile;
import com.example.rsa.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/file")
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

    @Operation(summary = "Get public key")
    @GetMapping("/all")
    public List<RsaFile> allFiles() {
        return fileService.getAllFiles();
    }
}
