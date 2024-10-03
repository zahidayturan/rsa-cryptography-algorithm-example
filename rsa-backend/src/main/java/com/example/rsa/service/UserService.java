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
        System.out.println(users);
    }

    public void deleteUser(Integer id) {
        users.removeIf(user -> user.getId().equals(id));
        System.out.println(users);
    }
    public User getUserById(Integer id) {
        return users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}

