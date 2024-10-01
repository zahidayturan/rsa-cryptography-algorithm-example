package com.example.rsa.model;

import lombok.Data;

@Data
public class File {

    private Integer id;
    private String name;
    private String ownerName;
    private String recipientName;
}