package com.gtbackend.gtbackend.model;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="users")
public class User implements UserDetails {
    @NotBlank
    private String name;
    @Id
    private String email;
    @NotBlank
    private String password;
    @NotNull
    private LocalDate dob;
    @Transient
    private Integer age; //transient means it will not be a column in database, so we calculate it
    private Role role;
    @Column(name = "bestScore", columnDefinition = "INT DEFAULT 0", nullable = false)
    private Integer bestScore = 0;
    public User() {
    }

    public User(String email, String password, String name, LocalDate dob, Role role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.dob = dob;
        this.role = role;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();

        if(role.equals(Role.ADMIN)){
            list.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }else{
            list.add(new SimpleGrantedAuthority("ROLE_USER"));
        }

        return list;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public void setBestScore(Integer bestScore) {
        this.bestScore = bestScore;
    }

    @Override
    public String toString() {
        return "User{" +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", dob=" + dob +
                ", age=" + age +
                ", bestScore=" + bestScore +
                '}';
    }

    public Role getRole() {
        return role;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
