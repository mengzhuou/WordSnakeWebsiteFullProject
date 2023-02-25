package com.gtbackend.gtbackend.runner;

import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin account already exists in database
        if (userRepository.findByEmail("admin@example.com") == null) {
            // Create and save admin account
            User admin = new User("admin@example.com", "password", "Admin", LocalDate.of(2000, 1, 1), true);
            userRepository.save(admin);
        }
    }
}

