package com.storage.storagemonitorbackend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import com.storage.storagemonitorbackend.repository.StorageRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
public class StorageControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private UserRepository userRepository;

    private String jwtToken;
    private Long userId;

    private final String REGISTER_URL = "/api/user/register";
    private final String LOGIN_URL = "/api/user/login";
    private final String STORAGE_URL = "/api/storage";

    @BeforeEach
    void setUp() throws Exception {
        storageRepository.deleteAll();
        userRepository.deleteAll();

        NewUserDTO newUser = new NewUserDTO("storageUser", "pass123");

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk());

        LoginUserDTO loginDTO = new LoginUserDTO("storageUser", "pass123");

        var loginResult = mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        jwtToken = objectMapper.readTree(response).get("jwt").asText();

        userId = userRepository.findByUsername("storageUser").get().getId();
    }

    @Test
    void testAddGetAndDeleteStorage() throws Exception {
        NewStorageDTO storageDTO = new NewStorageDTO("Pantry", userId);


        mockMvc.perform(post(STORAGE_URL + "/")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(storageDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        mockMvc.perform(get(STORAGE_URL + "/user/" + userId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("Pantry"));

        Long storageId = storageRepository.findAll().get(0).getId();

        mockMvc.perform(delete(STORAGE_URL + "/" + userId + "/" + storageId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk());

    }
}
