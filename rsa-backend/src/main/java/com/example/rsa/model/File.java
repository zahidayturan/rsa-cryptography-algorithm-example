package com.example.rsa.model;

import lombok.Data;

@Data
public class File {

    private Integer id;
    private String name;
    private Integer ownerId;
    private Integer recipientId;
}