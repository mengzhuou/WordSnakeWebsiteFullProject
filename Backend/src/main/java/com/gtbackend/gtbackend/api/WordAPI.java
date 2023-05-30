package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.WordRepository;
import com.gtbackend.gtbackend.model.Word;
import com.gtbackend.gtbackend.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping(path = "/api/v1")
public class WordAPI {
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private WordService wordService;

    @PostMapping("getChatGPTSearchingDefinition")
    public List<String> getChatGPTSearchingDefinition(@RequestParam String word){
        return wordService.getChatGPTSearchingDefinition(word);
    }

    @RequestMapping("/getWords")
    public List<Word> getWords(){
        return wordRepository.findAll();
    }

    @RequestMapping("/getHintWordAndDef")
    public List<String> getHintWordAndDef(@RequestParam String inputWordLetter) throws IllegalArgumentException{
        List<String> hintWordsAndDefs = wordRepository.getHintWordAndDef(inputWordLetter, PageRequest.of(0,5));
        List<String> numberedHintWordsAndDefs = new ArrayList<>();
        Random random = new Random();
        int counter = 1;
        for (String hintWordAndDef : hintWordsAndDefs){
            int randomIndex = random.nextInt(hintWordsAndDefs.size());
            String randomHintWordAndDef  = hintWordsAndDefs.get(randomIndex);
            numberedHintWordsAndDefs.add(counter + ". " + randomHintWordAndDef + "\n");
            counter++;
        }
        return numberedHintWordsAndDefs;
    }


    @RequestMapping("/getWordAndDef")
    public List<String> getWordAndDef(@RequestParam String inputWord) throws IllegalArgumentException{
        if (isWordExist(inputWord)) {
            return wordRepository.getWordAndDef(inputWord);
        }
        throw new IllegalArgumentException("The word does not exist. Please enter a valid word.");
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
        throw new IllegalArgumentException("The word does not exist. Please enter a valid word.");
    }
}
