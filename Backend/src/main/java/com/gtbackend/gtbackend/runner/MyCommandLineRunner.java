package com.gtbackend.gtbackend.runner;

import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin account already exists in database
        Optional<User> admin = userRepository.findById("admin@example.com");
        if (!admin.isPresent()) {
            String encodedPassword = passwordEncoder.encode("password");
            // Create and save admin account
            User adminUser = new User("admin@example.com", encodedPassword, "Admin", LocalDate.parse("2000-03-01"), true);
            userRepository.save(adminUser);
        }
    }
}

