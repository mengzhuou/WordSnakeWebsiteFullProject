package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.FeedbackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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
    @ResponseBody
    public void addFeedback(@RequestParam String message) {
        ResponseEntity<String> userEmailResponse = userAPI.getUserEmail();
        if (userEmailResponse.getStatusCode().is2xxSuccessful()) {
            String email = userEmailResponse.getBody();
            LocalDateTime timestamp = LocalDateTime.now();
            String status = "New";

            feedbackRepository.addFeedback(email, timestamp, message, status);
        }
    }
}
