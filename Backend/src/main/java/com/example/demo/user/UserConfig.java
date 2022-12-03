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
                    LocalDate.of(2000, Month.MARCH, 1)
             );
            User Jalen = new User(
                    2L,
                    "Jalen",
                    "101120@gam.com",
                    LocalDate.of(2018, Month.MARCH, 1)
            );

            repository.saveAll(
                    List.of(nina, Jalen)
            );
        };
    }
}
