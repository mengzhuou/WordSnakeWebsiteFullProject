package com.gtbackend.gtbackend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private com.gtbackend.gtbackend.user.UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public void removeUser(String email){
        userRepository.deleteById(email);
    }
}
