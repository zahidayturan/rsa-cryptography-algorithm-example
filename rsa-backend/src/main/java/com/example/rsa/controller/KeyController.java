package com.example.rsa.controller;

import com.example.rsa.service.RSAEncryptionService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
@RequestMapping("/key")
public class KeyController {

    @Autowired
    private RSAEncryptionService rsaEncryptionService;

    @Operation(summary = "Get public key")
    @GetMapping("/{public")
    public BigInteger publicKey() {
        return rsaEncryptionService.getE();
    }
}
