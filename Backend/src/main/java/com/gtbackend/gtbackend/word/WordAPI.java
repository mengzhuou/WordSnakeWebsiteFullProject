package com.gtbackend.gtbackend.word;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class WordAPI {
    @Autowired
    WordRepository wordRepository;

//    @GetMapping(path = "/getwords")
//    List<WordModel> getWords(){
//        return wordRepository.findAll();
//    }

    @RequestMapping("/getWords")
    public String getWords(){
        return "Testing";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }
}
