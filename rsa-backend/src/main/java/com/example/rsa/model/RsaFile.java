package com.example.rsa.model;

import lombok.Data;

@Data
public class RsaFile {

    private Integer id;
    private String name;
    private String originalName;
    private Integer ownerId;
    private Integer recipientId;
    private Long size;

}