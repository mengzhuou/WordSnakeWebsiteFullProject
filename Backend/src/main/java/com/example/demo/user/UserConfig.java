package com.example.demo.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
             User nina = new User(
                    1L,
                    "Nina",
                    "100@gam.com",
                    22
            );
            User Jalen = new User(
                    2L,
                    "Jalen",
                    "101120@gam.com",
                    62
            );

            repository.saveAll(
                    List.of(nina, Jalen)
            );
        };
    }
}
