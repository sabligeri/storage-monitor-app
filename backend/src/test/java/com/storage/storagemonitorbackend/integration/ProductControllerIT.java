package com.storage.storagemonitorbackend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.storage.storagemonitorbackend.dto.itemtype.NewItemTypeDTO;
import com.storage.storagemonitorbackend.dto.product.NewProductDTO;
import com.storage.storagemonitorbackend.dto.productitem.NewProductItemDTO;
import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import com.storage.storagemonitorbackend.entity.QuantityType;
import com.storage.storagemonitorbackend.repository.*;
import com.storage.storagemonitorbackend.dto.item.NewItemDTO;
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

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
public class ProductControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemTypeRepository itemTypeRepository;

    @Autowired
    private StorageRepository storageRepository;

    private String jwtToken;
    private Long userId;
    private Long itemId;

    private final String REGISTER_URL = "/api/user/register";
    private final String LOGIN_URL = "/api/user/login";
    private final String ITEM_TYPE_URL = "/api/itemType/";
    private final String STORAGE_URL = "/api/storage/";
    private final String ITEM_URL = "/api/item/";
    private final String PRODUCT_URL = "/api/product/";

    @BeforeEach
    void setUp() throws Exception {
        productRepository.deleteAll();
        itemRepository.deleteAll();
        storageRepository.deleteAll();
        userRepository.deleteAll();

        NewUserDTO user = new NewUserDTO("productUser", "pw123");
        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());

        LoginUserDTO login = new LoginUserDTO("productUser", "pw123");
        var loginResult = mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        jwtToken = objectMapper.readTree(response).get("jwt").asText();
        userId = userRepository.findByUsername("productUser").get().getId();

        NewItemTypeDTO itemType = new NewItemTypeDTO("Flour", userId);
        mockMvc.perform(post(ITEM_TYPE_URL)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(itemType)))
                .andExpect(status().isOk());

        NewStorageDTO storage = new NewStorageDTO("Main Storage", userId);
        mockMvc.perform(post(STORAGE_URL)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(storage)))
                .andExpect(status().isOk());

        Long storageId = storageRepository.findAll().get(0).getId();
        Long itemTypeId = itemTypeRepository.findAllByUserEntityId(userId).get(0).getId();


        NewItemDTO item = new NewItemDTO("Flour Bag", storageId, itemTypeId, QuantityType.KG, 10.0);
        mockMvc.perform(post(ITEM_URL)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(item)))
                .andExpect(status().isOk());

        itemId = itemRepository.findAll().get(0).getId();
    }

    @Test
    void testAddGetAndDeleteProduct() throws Exception {
        NewProductItemDTO productItem = new NewProductItemDTO(itemId, 2.5, "Flour Bag", QuantityType.KG);
        NewProductDTO product = new NewProductDTO("Cake Mix", List.of(productItem), userId);

        mockMvc.perform(post(PRODUCT_URL)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        mockMvc.perform(get(PRODUCT_URL + "user/" + userId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("Cake Mix"));

        Long productId = productRepository.findAll().get(0).getId();

        mockMvc.perform(delete(PRODUCT_URL + productId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }
}
