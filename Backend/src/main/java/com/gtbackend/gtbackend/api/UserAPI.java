package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.Role;
import com.gtbackend.gtbackend.model.User;
import com.gtbackend.gtbackend.security.JwtService;
import com.gtbackend.gtbackend.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping( path = "api/v1")
public class UserAPI {

    @Autowired
    private UserService userService;
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserAPI(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @GetMapping("/getBestScore")
    @ResponseBody
    public int getBestScore(Principal principal) {
        if (principal != null){
            String userEmail = principal.getName();
            Optional<User> user = userService.getUser(userEmail);
            if (!user.isPresent()) {
                throw new IllegalArgumentException("User not found!");
            }
            Integer bestScore = userRepository.getBestScore(user.get().getUsername());
            return bestScore;
        }
        else
        {
            System.out.print("nuts");
            return -1;
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) throws ServletException {
        request.logout();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) throws AuthenticationException, BadCredentialsException {
        String email = body.get("email");
        String password = body.get("password");
        Optional<User> tmp = userService.getUser(email);
        User usr = tmp.get();
        if (tmp.isEmpty()) {
            throw new BadCredentialsException("Please enter your email or password.");
        }
        if (passwordEncoder.matches(password, usr.getPassword())) {
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(usr.getUsername(),
            usr.getPassword()));
            String token = jwtService.generateToken(usr);
            return ResponseEntity.ok(token);
        } else {
            throw new BadCredentialsException("Email or Password does not match our records.");
        }
    }

    @PostMapping("/register")
    public void addUser(@RequestBody Map<String, String> body) throws IllegalArgumentException, DateTimeParseException {
        Role role = Role.USER;
        User user = new User(
                body.get("email"),
                passwordEncoder.encode(body.get("password")),
                body.get("name"),
                LocalDate.parse(body.get("dob")),
                false);
        userService.addUser(user);
    }

    @RequestMapping("/userInfo")
    public ResponseEntity<User> userInfo(Authentication authentication, @RequestParam("token") String token){
        Claims claims = jwtService.decodeToken(token);
        String userEmail = claims.getSubject();

        Optional<User> user = userService.getUser(userEmail);
        if (user.isPresent()){
            return ResponseEntity.ok(user.get());
        } else{
            return ResponseEntity.notFound().build();
        }
    }

//    @PostMapping("/updateBestScore")
//    public void updateBestScore(Principal principal, @RequestParam int score){
//        if (principal != null){
//            String email = principal.getName();
//            Optional<User> user = userService.getUser(email);
//            if (!user.isPresent()) {
//                throw new IllegalArgumentException("User not found!");
//            }
//            userService.updateBestScore(email, score);
//        }
//    }

    //    @GetMapping("/getBestScore")
//    public int getBestScore(Principal principal){
//        String email = "";
//        if (principal != null){
//            email = principal.getName();
//            Optional<User> user = userService.getUser(email);
//            if (!user.isPresent()) {
//                throw new IllegalArgumentException("User not found!");
//            }
//        }
//        Integer bestScore = userRepository.getBestScore(email);
//        if (bestScore == null){
//            return 0;
//        }
//        return bestScore;
//    }
}
