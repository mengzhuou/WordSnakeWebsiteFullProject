package com.gtbackend.gtbackend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gtbackend.gtbackend.api.UserAPI;
import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.User;
import com.gtbackend.gtbackend.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class UserAPITest {

    private MockMvc mockMvc;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;

    private PasswordEncoder passwordEncoder;

    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        passwordEncoder = new BCryptPasswordEncoder();
        UserAPI userAPI = new UserAPI(userService, passwordEncoder);
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
        String token = "test-token";
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", email);
        requestBody.put("password", password);
        when(userService.getUser(email)).thenReturn(Optional.of(user));

        // Stub the userService to return a token when generateToken method is called with the user
        when(userService.generateToken(user)).thenReturn(token);

        // Perform the login request and verify the response
        mockMvc.perform(post("/api/v1/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestBody)))
                .andExpect(status().isOk())
                .andExpect(content().string(token));
    }

//    @Test
//    public void testUserInfo() throws Exception {
//        // Set up the authentication context to simulate a logged-in user
//        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        when(userRepository.findById(Mockito.anyString())).thenReturn(Optional.of(user));
//        when(userRepository.findById("test@test.com")).thenReturn(Optional.of(user));
//
//
//
//        // Send a GET request to the /api/v1/userInfo endpoint
//        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/userInfo"))
//                .andReturn();
//
//        // Verify that the response status code is 200
//        assertEquals(200, result.getResponse().getStatus());
//
//        // Parse the response body as a User object
//        User actualUser = new ObjectMapper().readValue(result.getResponse().getContentAsString(), User.class);
//
//        // Verify that the user information in the response matches the expected user information
//        assertEquals(user.getEmail(), actualUser.getEmail());
//    //    assertEquals(user.getName(), actualUser.getName());
//    //    assertEquals(user.getDateOfBirth(), actualUser.getDateOfBirth());
//    }

    private static String asJsonString(final Object obj) {
        try {
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //    @Test
//    public void testLoginWithWrongPassword() throws Exception {
//        Map<String, String> loginRequest = new HashMap<>();
//        loginRequest.put("email", "test@test.com");
//        loginRequest.put("password", "wrongPassword");
////        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/login")
////                        .content(asJsonString(loginRequest))
////                        .contentType(MediaType.APPLICATION_JSON))
////                .andReturn();
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/login")
//                        .content(asJsonString(loginRequest))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isUnauthorized())
//                .andExpect(result -> assertTrue(result.getResolvedException() instanceof NestedServletException))
//                .andExpect(result -> {
//                    Exception resolvedException = result.getResolvedException();
//                    Throwable cause = resolvedException.getCause();
//                    assertNotNull(cause);
//                    assertTrue(cause instanceof BadCredentialsException);
//                    assertEquals("Email or Password does not match our records.", cause.getMessage());
//                });
//
//    }
//
}
