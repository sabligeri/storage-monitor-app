package com.storage.storagemonitorbackend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storage.storagemonitorbackend.dto.itemtype.NewItemTypeDTO;
import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import com.storage.storagemonitorbackend.repository.ItemTypeRepository;
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
public class ItemTypeControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ItemTypeRepository itemTypeRepository;

    @Autowired
    private UserRepository userRepository;

    private String jwtToken;
    private Long userId;

    private final String REGISTER_URL = "/api/user/register";
    private final String LOGIN_URL = "/api/user/login";
    private final String ITEM_TYPE_URL = "/api/itemType";

    @BeforeEach
    void setUp() throws Exception {
        itemTypeRepository.deleteAll();
        userRepository.deleteAll();

        NewUserDTO newUser = new NewUserDTO("itemTypeUser", "secure123");

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk());

        LoginUserDTO loginDTO = new LoginUserDTO("itemTypeUser", "secure123");

        var loginResult = mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        jwtToken = objectMapper.readTree(response).get("jwt").asText();
        userId = userRepository.findByUsername("itemTypeUser").get().getId();
    }

    @Test
    void testAddAndGetItemTypes() throws Exception {
        NewItemTypeDTO newItemTypeDTO = new NewItemTypeDTO("Flour", userId);

        mockMvc.perform(post(ITEM_TYPE_URL + "/")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newItemTypeDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        mockMvc.perform(get(ITEM_TYPE_URL + "/user/" + userId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("Flour"));
    }
}
