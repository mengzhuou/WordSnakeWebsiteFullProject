package com.gtbackend.gtbackend.word;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
    public List<String> getWordAndDef(@RequestParam String inputWord) throws IllegalArgumentException{
        return wordRepository.getWordAndDef(inputWord);
    }

    @RequestMapping("/getWordAndDefTest")
    public List<String> getWordAndDefTest(){
        return wordRepository.getWordAndDefTest();
    }

    @RequestMapping("/getDefTest")
    public List<String> getDefTest(){
        return wordRepository.getDefTest();
    }

    @RequestMapping("/isWordExist")
    public boolean isWordExist(@RequestParam String inputWord) throws IllegalArgumentException{
        return wordRepository.isWordExist(inputWord);
    }

    @RequestMapping("/isWordExistTest")
    public boolean isWordExistTest(){
        return wordRepository.isWordExistTest();
    }

    @RequestMapping("/getRandomStart")
    public String getRandomStart(){
        Random randomStart = new Random();
        return String.valueOf((char) (randomStart.nextInt(26) + 'a'));
    }

    @RequestMapping("/getLetterFromPreviousWord")
    public String getLetterFromPreviousWord(@RequestParam String inputWord) throws IllegalArgumentException{
        if (isWordExist(inputWord)){
            return String.valueOf(inputWord.charAt(inputWord.length() - 1));
        }
        return "The word does not exist";
    }

}
