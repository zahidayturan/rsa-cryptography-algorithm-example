package com.example.rsa.model;

import lombok.Data;

import java.math.BigInteger;

@Data
public class User {

    private Integer id;
    private String name;
    private Boolean publicKey;
    private Boolean privateKey;
    private Boolean fileUpload;
    private Boolean fileRead;
    private Boolean fileSend;
    private Boolean fileReceive;
    private BigInteger eKey;
    private BigInteger dKey;
}