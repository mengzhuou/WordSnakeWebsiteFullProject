package com.gtbackend.gtbackend.word;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
public class WordAPI {
    @Autowired
    private WordRepository wordRepository;

    @RequestMapping("/getWords")
    public List<WordModel> getWords(){
        return wordRepository.findAll();
    }

    @RequestMapping("/getWordAndDef")
    public List<WordModel> getWordAndDef(){
        return wordRepository.getWordAndDef();
    }


}
