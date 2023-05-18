package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.FeedbackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1")
public class FeedbackAPI {
    private FeedbackRepository feedbackRepository;
    private UserAPI userAPI;

    public FeedbackAPI(FeedbackRepository feedbackRepository, UserAPI userAPI) {
        this.feedbackRepository = feedbackRepository;
        this.userAPI = userAPI;
    }

    @PostMapping("/addFeedback")
    public void addFeedback(@RequestBody Map<String, Object> body) {
        ResponseEntity<String> userEmailResponse = userAPI.getUserEmail();
        System.out.println("Email body stored is : " + userEmailResponse);
        if (userEmailResponse.getStatusCode().is2xxSuccessful()) {
            String email = userEmailResponse.getBody();
            System.out.println("Email address is : " + email);

            String message = (String) body.get("message");
            LocalDateTime timestamp = LocalDateTime.now();
            String status = (String) body.get("status");

            feedbackRepository.addFeedback(email, timestamp, message, status);
        }
    }
}
