package com.gtbackend.gtbackend.user;

import com.gtbackend.gtbackend.word.WordModel;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@ConfigurationProperties(prefix = "spring.user.datasource")
public class Config {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return new SecurityConfig(http).configure();
    }
}

class SecurityConfig {
    private final HttpSecurity http;

    public SecurityConfig(HttpSecurity http) {
        this.http = http;
    }

    public SecurityFilterChain configure() throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers(Constants.PUBLIC_ENDPOINTS).permitAll()
                .antMatchers(Constants.USER_ENDPOINTS).hasAnyRole(Role.USER.name(), Role.ADMIN.name())
                .anyRequest().authenticated()
                .and().rememberMe();
        return http.build();
    }
}

class Constants {
    public static final String[] PUBLIC_ENDPOINTS = {
            "/api/v1/register",
            "/api/v1/login",
            "/api/v1/logout",
            "/api/v1/getUserEmail",
            "/api/v1/updateBestScore",
            "/api/v1/getBestScore",
            "/api/v1/getWords",
            "/api/v1/getWordAndDef",
            "/api/v1/getRandomStart",
            "/api/v1/isWordExist",
            "/api/v1/getLetterFromPreviousWord",
            "/api/v1/getWordAndDefTest",
            "/api/v1/getDefTest",
            "/api/v1/isWordExistTest"
    };

    public static final String[] USER_ENDPOINTS = {
            "/api/v1/**"
    };
}

enum Role {
    USER,
    ADMIN
}
