package com.gtbackend.gtbackend.user;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name="users")
public class User {
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

    public User() {
    }

    public User(String email, String password, String name, LocalDate dob) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.dob = dob;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
//    @Override
    public String getUsername() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }
//    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", dob=" + dob +
                ", age=" + age +
                '}';
    }
}
