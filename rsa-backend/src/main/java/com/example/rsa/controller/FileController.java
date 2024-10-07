package com.example.rsa.controller;

import com.example.rsa.model.RsaFile;
import com.example.rsa.service.FileEncryptionService;
import com.example.rsa.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {


    @Autowired
    private FileService fileService;

    @Autowired
    private FileEncryptionService fileEncryptionService;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("userId") Integer userId,@RequestParam("recipientId") Integer recipientId) {
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

    @Operation(summary = "Get decrypt file")
    @GetMapping("/get/{fileName}")
    public byte[] getFile(@PathVariable String fileName) throws IOException {
        return fileEncryptionService.decryptFileByName(fileName);
    }

    @Operation(summary = "Get file on storage")
    @GetMapping("/get/normal/{fileName}")
    public byte[] getNormalFile(@PathVariable String fileName) throws IOException {
        return fileEncryptionService.fileByName(fileName);
    }

    @Operation(summary = "Get file info by userId")
    @GetMapping("/info/{userId}")
    public List<RsaFile> getFileInfo(@PathVariable Integer userId){
        return fileService.fileByUserId(userId);
    }
}
