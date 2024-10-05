package com.example.rsa.controller;

import com.example.rsa.model.User;
import com.example.rsa.service.FileService;
import com.example.rsa.service.RsaEncryptionService;
import com.example.rsa.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;


    @Autowired
    private RsaEncryptionService rsaEncryptionService;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            userService.saveUser(user);
            return ResponseEntity.ok("Kullanıcı başarıyla eklendi.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Kullanıcı eklenirken hata: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("Kullanıcı başarıyla silindi.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Kullanıcı silinirken hata: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/{field}/{newValue}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @PathVariable String field, @PathVariable boolean newValue) {
        try {
            userService.updateUser(id, field,newValue);
            return ResponseEntity.ok("Kullanıcı başarıyla güncellendi.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Kullanıcı güncellenirken hata oluştu: " + e.getMessage());
        }
    }

    @Operation(summary = "Delete all users and files")
    @GetMapping("/clean")
    public void cleanUsersAndFiles() {
        userService.cleanAllUsers();
        fileService.cleanAllFiles();
    }

    @Operation(summary = "Get user key")
    @GetMapping("/key/{type}/{userId}")
    public ResponseEntity<String> getUserKey(@PathVariable String type, @PathVariable Integer userId) {
        BigInteger keyValue;
        if (type.equals("eKey")) {
            keyValue = rsaEncryptionService.getE();
            userService.updateUserKey(userId, type, keyValue);
        } else if (type.equals("dKey")) {
            keyValue = rsaEncryptionService.getD();
            userService.updateUserKey(userId, type, keyValue);
        } else {
            return ResponseEntity.badRequest().body("Invalid key type");
        }
        return ResponseEntity.ok("Hazır");
    }


}

