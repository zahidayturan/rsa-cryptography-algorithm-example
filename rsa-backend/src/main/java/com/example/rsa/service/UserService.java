package com.example.rsa.service;

import com.example.rsa.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    List<User> users = new ArrayList<>();

    public void saveUser(User user) {
        users.add(user);
        System.out.println(getAllUsers());
    }

    public void deleteUser(Integer id) {
        users.removeIf(user -> user.getId().equals(id));
        System.out.println(getAllUsers());
    }

    public List<User> getAllUsers() {
        return users;
    }

    public void cleanAllUsers() {
        users.clear();
        System.out.println(getAllUsers());
    }

    public User getUserById(Integer id) {
        return users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst()
                .orElse(null);
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

}

