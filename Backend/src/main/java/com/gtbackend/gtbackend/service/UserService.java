package com.gtbackend.gtbackend.service;

import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    public void setJwtSecret(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    public Optional<User> getUser(String email){
        return userRepository.findById(email);
    }
    @Autowired
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public void addUser(User user) {
        if(userRepository.findById(user.getUsername()).isEmpty()){
            userRepository.save(user);
        }else{
            throw new DuplicateKeyException("User account (email) already exist");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> usr = userRepository.findById(username);
        if(usr.isEmpty()){
            throw new UsernameNotFoundException("User not present");
        }
        return usr.get();
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = Date.from(ZonedDateTime.now().plusHours(8).toInstant());
//        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }
}
