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

    public User(int id, String name, boolean publicKey, boolean privateKey, boolean fileUpload, boolean fileRead, boolean fileSend, boolean fileReceive, BigInteger eKey, BigInteger dKey) {
    this.id = id;
    this.name = name;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.fileUpload = fileUpload;
    this.fileRead = fileRead;
    this.fileSend = fileSend;
    this.fileReceive = fileReceive;
    this.eKey = eKey;
    this.dKey = dKey;

    }
}