package com.gtbackend.gtbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gtbackend.gtbackend.model.OpenAIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class WordService {

    @Autowired
    private RestTemplate restTemplate; // Used for making HTTP requests

    private final String apiKey = System.getenv("OPENAI_API_KEY");
    private final String apiUrl = "https://api.openai.com/v1/completions";


    public boolean isWordLegitimate(String word) throws JsonProcessingException {
        String prompt = "is '" + word + "' a legitimate word? " +
                "If answer is yes, answer with \"true\" only and do not say anything " +
                "more than \"true\", vice versa.";
        int maxTokens = 100;
        double temperature = 0.5;
        int n = 1;
        String model = "text-davinci-003";

        // Build the request URL
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl);

        // Set the headers for the API request
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        // Build the request body as a map
        Map<String, Object> requestBodyMap = new HashMap<>();
        requestBodyMap.put("model", model);
        requestBodyMap.put("prompt", prompt);
        requestBodyMap.put("max_tokens", maxTokens);
        requestBodyMap.put("temperature", temperature);
        requestBodyMap.put("n", n);

        // Convert the map to JSON
        String requestBody = new ObjectMapper().writeValueAsString(requestBodyMap);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<OpenAIResponse> responseEntity = restTemplate.exchange(builder.toUriString(), HttpMethod.POST, entity, OpenAIResponse.class);
        OpenAIResponse response = responseEntity.getBody();

        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
            String definition = response.getChoices().get(0).getText().trim();
            boolean isLegitimate = Boolean.parseBoolean(definition);
            return isLegitimate;
        } else {
            return false; // Return false if no definition is found
        }
    }


    public List<String> getChatGPTSearchingDefinition(String word) {
        String wordTypesPrompt = "Define the word types for '" + word + "'.";
        String definitionsPrompt = "Define the word '" + word + "' using minimum of 1 bullet points, " +
                "and maximum of 8 bullet points if the word has many different meanings. " +
                "Include the definition for different word types, " +
                "such as verbs, adjectives, and any other relevant types.";
        int maxTokens = 100;
        double temperature = 0.5;
        int n = 1;
        String model = "text-davinci-003";

        // Build the request URL
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl);

        // Set the headers for the API request
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        List<String> promptString = new ArrayList<>();
        promptString.add(wordTypesPrompt);
        promptString.add(definitionsPrompt);

        String prompt = "[" + String.join(",", promptString) + "]";

        String requestBody = "{\"model\": \"" + model + "\", \"prompt\": \"" + prompt + "\", \"max_tokens\": " + maxTokens + ", \"temperature\": " + temperature + ", \"n\": " + n + "}";
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<OpenAIResponse> responseEntity = restTemplate.exchange(builder.toUriString(), HttpMethod.POST, entity, OpenAIResponse.class);
        OpenAIResponse response = responseEntity.getBody();

        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
            String definition = response.getChoices().get(0).getText().trim();
            List<String> definitions = new ArrayList<>();
            definitions.add(definition);
            return definitions;
        } else {
            return new ArrayList<>(); // Return an empty list if no definition is found
        }
    }
}
