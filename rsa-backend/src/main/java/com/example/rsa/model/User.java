package com.example.rsa.model;

import lombok.Data;

@Data
public class User {

    private Integer id;
    private String name;
    private String publicKey;
    private Boolean fileUpload;
    private Boolean fileRead;
    private Boolean fileSend;
    private Boolean fileReceive;
}