package com.example.rsa.controller;

import com.example.rsa.model.RsaFile;
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
    @GetMapping("/get/{fileName}/{userId}")
    public byte[] getFile(@PathVariable String fileName,@PathVariable Integer userId) throws IOException {
        return fileService.getFile(fileName,userId);
    }

    @Operation(summary = "Get file info by userId")
    @GetMapping("/owner/{userId}")
    public List<RsaFile> getFileInfo(@PathVariable Integer userId){
        return fileService.fileByUserId(userId);
    }

    @Operation(summary = "Get file info by recipientId")
    @GetMapping("/recipient/{userId}")
    public List<RsaFile> getFileInfoByRecipientId(@PathVariable Integer userId){
        return fileService.fileByRecipientId(userId);
    }
}
