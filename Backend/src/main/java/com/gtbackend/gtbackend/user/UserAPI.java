package com.gtbackend.gtbackend.user;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping( path = "api/v1/user")
public class UserAPI {

    private final com.gtbackend.gtbackend.user.UserService userService;


    @Autowired
    public UserAPI(com.gtbackend.gtbackend.user.UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUserInfo")
    @ResponseBody
    public Map<String, String> getUser(Principal principal){
        User user = userService.getUser(principal.getName()).get();
        Map<String, String> ret = new HashMap<>();
        ret.put("username", user.getUsername());
        return ret;
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) throws ServletException {
        request.logout();
    }

    @PostMapping("/login")
    public void login(@RequestBody Map<String, String> body) throws AuthenticationException, NoSuchElementException {
        String email = body.get("email");
        String password = body.get("password");
        Optional<User> tmp = userService.getUser(email);
        User usr = tmp.get();
        if(!tmp.isEmpty()){
//            if()
        }
    }
}
