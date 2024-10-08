package com.example.rsa.controller;

import com.example.rsa.model.User;
import com.example.rsa.service.FileService;
import com.example.rsa.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @PutMapping("/{id}/{field}/{newValue}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @PathVariable String field, @PathVariable boolean newValue) {
        try {
            userService.updateUser(id, field,newValue);
            return ResponseEntity.ok("Kullanıcı başarıyla güncellendi.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Kullanıcı güncellenirken hata oluştu: " + e.getMessage());
        }
    }

    @Operation(summary = "Delete/reset all users and files")
    @GetMapping("/clean")
    public void cleanUsersAndFiles() {
        userService.resetAllUsers();
        fileService.cleanAllFiles();
    }

    @Operation(summary = "Get all users")
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @Operation(summary = "Get user by ID")
    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        System.out.println(id);
        return userService.getUserById(id);
    }

}

