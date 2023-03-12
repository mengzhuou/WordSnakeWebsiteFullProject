package com.gtbackend.gtbackend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gtbackend.gtbackend.api.UserAPI;
import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.User;
import com.gtbackend.gtbackend.security.JwtService;
import com.gtbackend.gtbackend.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class UserAPITest {
    String token = "token";
    String generatedToken = "";

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;
    @Mock
    private Authentication authentication;
    @Mock
    private JwtService jwtService;
    private MockMvc mockMvc;
    private PasswordEncoder passwordEncoder;
    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        passwordEncoder = new BCryptPasswordEncoder();
        UserAPI userAPI = new UserAPI(userService, passwordEncoder, jwtService);
        mockMvc = MockMvcBuilders.standaloneSetup(userAPI).build();

        user = new User(
                "test@test.com",
                passwordEncoder.encode("test123"),
                "Test User",
                LocalDate.parse("1990-01-01"),
                false);
    }

    @AfterEach
    public void clearAuthentication() {
        SecurityContextHolder.clearContext();
    }

    @Test
    public void testLogin() throws Exception {
        String email = user.getEmail();
        String password = "test123";
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", email);
        requestBody.put("password", password);

        when(userService.getUser(email)).thenReturn(Optional.of(user));
        //we need to generate this token for the requestBody
        when(jwtService.generateToken(user)).thenReturn(token);
        // Perform the login request and verify the response
//        mockMvc.perform(post("/api/v1/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new ObjectMapper().writeValueAsString(requestBody)))
//                .andExpect(status().isOk())
//                .andExpect(content().string(token));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestBody)))
                .andExpect(status().isOk())
                .andReturn();
        generatedToken = result.getResponse().getContentAsString();
    }
//    @Test
//    public void testUserInfo() throws Exception {
//        SecurityContextHolder.getContext().setAuthentication(
//                new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>()));
//        String userEmail = jwtService.extractUsername(token);
//        assertEquals(user.getEmail(), userEmail);
//    }
    private static String asJsonString(final Object obj) {
        try {
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
