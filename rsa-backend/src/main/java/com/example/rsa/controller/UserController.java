package com.example.rsa.controller;

import com.example.rsa.model.User;
import com.example.rsa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

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
}

