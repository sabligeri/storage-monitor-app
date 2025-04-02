package com.storage.storagemonitorbackend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storage.storagemonitorbackend.dto.item.NewItemDTO;
import com.storage.storagemonitorbackend.dto.itemtype.NewItemTypeDTO;
import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import com.storage.storagemonitorbackend.entity.Item;
import com.storage.storagemonitorbackend.entity.QuantityType;
import com.storage.storagemonitorbackend.repository.ItemRepository;
import com.storage.storagemonitorbackend.repository.StorageRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import com.storage.storagemonitorbackend.repository.ItemTypeRepository;
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

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
public class ItemControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private ItemTypeRepository itemTypeRepository;

    @Autowired
    private ItemRepository itemRepository;

    private String jwtToken;
    private Long userId;

    private Long storageId;
    private Long itemTypeId;

    private final String REGISTER_URL = "/api/user/register";
    private final String LOGIN_URL = "/api/user/login";
    private final String STORAGE_URL = "/api/storage";
    private final String ITEM_TYPE_URL = "/api/itemType";
    private final String ITEM_URL = "/api/item";

    @BeforeEach
    void setUp() throws Exception {
        itemRepository.deleteAll();
        itemTypeRepository.deleteAll();
        storageRepository.deleteAll();
        userRepository.deleteAll();

        NewUserDTO newUser = new NewUserDTO("itemUser", "pass123");
        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isOk());

        LoginUserDTO loginDTO = new LoginUserDTO("itemUser", "pass123");
        var loginResult = mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        jwtToken = objectMapper.readTree(response).get("jwt").asText();
        userId = userRepository.findByUsername("itemUser").get().getId();

        NewStorageDTO storageDTO = new NewStorageDTO("Pantry", userId);
        mockMvc.perform(post(STORAGE_URL + "/")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(storageDTO)))
                .andExpect(status().isOk());

        storageId = storageRepository.findAll().get(0).getId();

        NewItemTypeDTO itemTypeDTO = new NewItemTypeDTO("Rice", userId);
        mockMvc.perform(post(ITEM_TYPE_URL + "/")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(itemTypeDTO)))
                .andExpect(status().isOk());

        itemTypeId = itemTypeRepository.findAll().get(0).getId();
    }

    @Test
    void testAddRefillAndDeleteItem() throws Exception {
        NewItemDTO newItemDTO = new NewItemDTO("Basmati Rice", storageId, itemTypeId, QuantityType.KG, 2.5);
        mockMvc.perform(post(ITEM_URL + "/")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newItemDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        Item item = itemRepository.findAll().get(0);
        assertThat(item.getName()).isEqualTo("Basmati Rice");
        assertThat(item.getQuantity()).isEqualTo(2.5);

        mockMvc.perform(patch(ITEM_URL + "/" + item.getId() + "/refill")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("quantity", 1.5))))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        Item updated = itemRepository.findById(item.getId()).get();
        assertThat(updated.getQuantity()).isEqualTo(4.0);

        mockMvc.perform(delete(ITEM_URL + "/" + item.getId())
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        assertThat(itemRepository.findAll()).isEmpty();
    }
}
