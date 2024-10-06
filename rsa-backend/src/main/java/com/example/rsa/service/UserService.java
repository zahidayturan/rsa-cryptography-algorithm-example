package com.example.rsa.service;

import com.example.rsa.model.User;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    List<User> users;
    public UserService() {
        users = new ArrayList<>();
        addInitialUsers();
    }

    private void addInitialUsers() {
        User alice = new User(1, "Alice", false, false, false, false, false, false, new BigInteger("0"), new BigInteger("0"));
        User bob = new User(2, "Bob", false, false, false, false, false, false, new BigInteger("0"), new BigInteger("0"));
        User charlie = new User(3, "Charlie", false, false, false, false, false, false, new BigInteger("0"), new BigInteger("0"));

        users.add(alice);
        users.add(bob);
        users.add(charlie);
    }

    public List<User> getAllUsers() {
        return users;
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
                    case "publicKey" -> user.setPublicKey(newValue);
                    case "privateKey" -> user.setPrivateKey(newValue);
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

    public void updateUserKey(Integer id, String type , BigInteger key) {
        System.out.println(id);
        System.out.println(type);
        System.out.println(key);
        for (User user : users) {
            if (user.getId().equals(id)) {
                switch (type) {
                    case "eKey" -> user.setEKey(key);
                    case "dKey" -> user.setDKey(key);
                }
                break;
            }
        }
        System.out.println(getAllUsers());
    }

}

