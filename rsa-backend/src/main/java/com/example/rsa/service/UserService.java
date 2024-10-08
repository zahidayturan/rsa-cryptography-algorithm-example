package com.example.rsa.service;

import com.example.rsa.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private RsaEncryptionService rsaEncryptionService;

    List<User> users;
    public UserService() {
        users = new ArrayList<>();
        addInitialUsers();
    }

    private void addInitialUsers() {
        User alice = new User(1, "Alice", false, false, false, false, false, false, null, null);
        User bob = new User(2, "Bob", false, false, false, false, false, false, null, null);
        User charlie = new User(3, "Charlie", false, false, false, false, false, false, null, null);

        users.add(alice);
        users.add(bob);
        users.add(charlie);
    }

    public List<User> getAllUsers() {
        return users;
    }

    public User getUserById(Integer id) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                System.out.println(user);
                return user;
            }
        }
        return null;
    }


    public void resetAllUsers() {
        users.clear();
        addInitialUsers();
        System.out.println(getAllUsers());
    }

    public void updateUser(Integer id, String field ,boolean newValue) {
        System.out.println(id);
        System.out.println(field);
        System.out.println(newValue);
        for (User user : users) {
            if (user.getId().equals(id)) {
                switch (field) {
                    case "publicKey" -> {
                        user.setPublicKey(newValue);
                        user.setEKey(newValue ? rsaEncryptionService.getE() : null);
                    }
                    case "privateKey" -> {
                        user.setPrivateKey(newValue);
                        user.setDKey(newValue ? rsaEncryptionService.getD() : null);
                    }
                    case "fileUpload" -> user.setFileUpload(newValue);
                    case "fileRead" -> user.setFileRead(newValue);
                    case "fileSend" -> user.setFileSend(newValue);
                    case "fileReceive" -> user.setFileReceive(newValue);
                }
                break;
            }
        }
        System.out.println(getAllUsers());
    }
}

