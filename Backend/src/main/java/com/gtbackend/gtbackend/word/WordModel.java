package com.gtbackend.gtbackend.word;

import org.springframework.stereotype.Component;

import javax.persistence.*;

@Component
@Entity(name = "words")
public class WordModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
        Integer id;

    @Column(name = "word")
    String word;

    @Column(name = "wordtype")
    String wordtype;

    @Column(name = "definition")
    String definition;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getWordtype() {
        return wordtype;
    }

    public void setWordtype(String wordtype) {
        this.wordtype = wordtype;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    @Override
    public String toString() {
        return "WordModel{" +
                "id=" + id +
                ", word='" + word + '\'' +
                ", wordtype='" + wordtype + '\'' +
                ", definition='" + definition + '\'' +
                '}';
    }
}
