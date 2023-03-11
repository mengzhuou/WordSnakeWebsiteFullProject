package com.gtbackend.gtbackend;

import com.gtbackend.gtbackend.api.UserAPI;
import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.User;
import com.gtbackend.gtbackend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserAPITest {

    private MockMvc mockMvc;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        userService = new UserService(userRepository);
        UserAPI userAPI = new UserAPI(userService, passwordEncoder);
        mockMvc = MockMvcBuilders.standaloneSetup(userAPI).build();
    }

    @Test
    public void testLogin() throws Exception {
        User user = new User(
                "test@test.com",
                passwordEncoder.encode("test123"),
                "Test User",
                LocalDate.parse("1990-01-01"),
                false);
        userService.addUser(user);

        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("email", "test@test.com");
        loginRequest.put("password", "test123");

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/login")
                        .content(asJsonString(loginRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertEquals(200, result.getResponse().getStatus());
    }



    private static String asJsonString(final Object obj) {
        try {
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

