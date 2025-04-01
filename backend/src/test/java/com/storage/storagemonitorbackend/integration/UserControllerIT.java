package com.storage.storagemonitorbackend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
class UserControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final String REGISTER_URL = "/api/user/register";
    private final String LOGIN_URL = "/api/user/login";

    @Test
    void testRegisterUser_successful() throws Exception {
        NewUserDTO newUser = new NewUserDTO("integrationUser", "pass123");

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    void testRegisterUser_duplicateUsername() throws Exception {
        NewUserDTO newUser = new NewUserDTO("dupeUser", "abc123");

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk());

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testLoginUser_successful() throws Exception {
        NewUserDTO newUser = new NewUserDTO("loginUser", "mypassword");

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk());

        LoginUserDTO login = new LoginUserDTO("loginUser", "mypassword");

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt", not(emptyOrNullString())))
                .andExpect(jsonPath("$.id", greaterThan(0)))
                .andExpect(jsonPath("$.username", is("loginUser")))
                .andExpect(jsonPath("$.roles", hasItem("ROLE_USER")));
    }
}
