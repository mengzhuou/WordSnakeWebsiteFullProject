package com.gtbackend.gtbackend.config;

import com.gtbackend.gtbackend.security.JwtFilter;
import com.gtbackend.gtbackend.security.JwtService;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@ConfigurationProperties(prefix = "spring.user.datasource")
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtService jwtService1() {
        return new JwtService();
    }

    @Bean
    public String currentUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            return currentUserName;
        }
        return null;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception{
        http.cors().and().csrf().disable().addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).authorizeRequests().antMatchers("/api/v1/register","/api/v1/login",
                        "/api/v1/logout", "/api/v1/userInfo", "/api/v1/getUserEmail",
                        "/api/v1/updateBestScore", "/api/v1/getBestScore",
                        "/api/v1/getWords", "/api/v1/getWordAndDef", "/api/v1/getRandomStart", "/api/v1/isWordExist",
                        "/api/v1/getLetterFromPreviousWord", "/api/v1/getHintWordAndDef",
                        "/api/v1/getWordAndDefTest", "/api/v1/getDefTest", "/api/v1/isWordExistTest").permitAll()
                .antMatchers("/api/v1/**").hasAnyRole("USER","ADMIN").anyRequest().authenticated().and()
                .rememberMe(); // todo: enable csrf protection after testing
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        //will ignore without authentication for any pattern url starts with below
        return (web) -> web.ignoring().antMatchers("/images/**");
    }
}
