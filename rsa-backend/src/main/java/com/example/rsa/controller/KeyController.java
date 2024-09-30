package com.example.rsa.controller;

import com.example.rsa.service.RsaEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
@RequestMapping("/key")
public class KeyController {

    @Autowired
    private RsaEncryptionService rsaEncryptionService;

    //@Operation(summary = "Get public key")
    @GetMapping("/public")
    public BigInteger publicKey() {
        return rsaEncryptionService.getE();
    }
}
