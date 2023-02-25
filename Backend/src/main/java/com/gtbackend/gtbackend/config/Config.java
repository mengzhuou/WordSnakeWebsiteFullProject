package com.gtbackend.gtbackend.config;

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
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable().authorizeRequests().antMatchers("/api/v1/register","/api/v1/login",
                        "/api/v1/logout", "/api/v1/updateBestScore", "/api/v1/getBestScore",
                        "/api/v1/getWords", "/api/v1/getWordAndDef", "/api/v1/getRandomStart", "/api/v1/isWordExist",
                        "/api/v1/getLetterFromPreviousWord", "/api/v1/getHintWordAndDef",
                        "/api/v1/getWordAndDefTest", "/api/v1/getDefTest", "/api/v1/isWordExistTest").permitAll()
                .antMatchers("/api/v1/**").hasAnyRole("USER","ADMIN").anyRequest().authenticated().and()
                .rememberMe(); // todo: enable csrf protection after testing
        return http.build();
    }
}
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        http.cors().and().csrf().disable().authorizeRequests().antMatchers("/api/v1/register","/api/v1/login",
//                        "/api/v1/logout", "/api/v1/updateBestScore", "/api/v1/getBestScore",
//                        "/api/v1/getWords", "/api/v1/getWordAndDef", "/api/v1/getRandomStart", "/api/v1/isWordExist",
//                        "/api/v1/getLetterFromPreviousWord", "/api/v1/getHintWordAndDef",
//                        "/api/v1/getWordAndDefTest", "/api/v1/getDefTest", "/api/v1/isWordExistTest").permitAll()
//                .antMatchers("/api/v1/**").hasAnyRole("USER","ADMIN").anyRequest().authenticated().and()
//                .rememberMe(); // todo: enable csrf protection after testing
//        return http.build();
//    }
//}
