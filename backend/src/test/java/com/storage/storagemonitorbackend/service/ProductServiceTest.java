package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.product.NewProductDTO;
import com.storage.storagemonitorbackend.dto.product.ProductDTO;
import com.storage.storagemonitorbackend.dto.productitem.NewProductItemDTO;
import com.storage.storagemonitorbackend.dto.production.ProductionRequestDTO;
import com.storage.storagemonitorbackend.entity.*;
import com.storage.storagemonitorbackend.repository.ItemRepository;
import com.storage.storagemonitorbackend.repository.ProductRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.http.ResponseEntity;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ProductService productService;

    private UserEntity user;
    private Item flourItem;

    @BeforeEach
    void setup() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("testuser");

        flourItem = new Item();
        flourItem.setId(10L);
        flourItem.setName("Flour");
        flourItem.setQuantity(20.0);
        flourItem.setQuantityType(QuantityType.KG);
    }


    @Test
    void testAddProduct_successful() {
        NewProductItemDTO itemDTO = new NewProductItemDTO(10L, 2.0, "Flour", QuantityType.KG);
        NewProductDTO productDTO = new NewProductDTO("Bread", List.of(itemDTO), 1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(itemRepository.findById(10L)).thenReturn(Optional.of(flourItem));

        boolean result = productService.addProduct(productDTO);

        assertTrue(result);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void testAddProduct_itemNotFound() {
        NewProductItemDTO itemDTO = new NewProductItemDTO(99L, 2.0, "Unknown", QuantityType.KG);
        NewProductDTO productDTO = new NewProductDTO("Mystery", List.of(itemDTO), 1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(itemRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> productService.addProduct(productDTO));

        assertEquals("Item not found with id: 99", exception.getMessage());
    }


    @Test
    void testGetProductsByUser_successful() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Bread");
        product.setUserEntity(user);

        ProductItem productItem = new ProductItem();
        productItem.setQuantity(1.5);
        productItem.setItem(flourItem);
        productItem.setProduct(product);

        product.setProductItems(Set.of(productItem));

        when(productRepository.findAllByUserEntityId(1L)).thenReturn(List.of(product));

        List<ProductDTO> result = productService.getProductsByUser(1L);

        assertEquals(1, result.size());
        ProductDTO dto = result.get(0);
        assertEquals("Bread", dto.name());
        assertEquals(1L, dto.id());
        assertEquals(1L, dto.userId());
        assertEquals(1, dto.items().size());
        assertEquals("Flour", dto.items().get(0).itemName());
    }


    @Test
    void testSimulateProduction_successful() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Cake");

        ProductItem productItem = new ProductItem();
        productItem.setItem(flourItem);
        productItem.setQuantity(5.0); // 5 * 2 = 10 KG needed
        product.setProductItems(Set.of(productItem));

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductionRequestDTO request = new ProductionRequestDTO(1L, 2.0); // produce 2 units

        ResponseEntity<Map<String, String>> response = productService.simulateProduction(request);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().get("message").contains("Production successful"));
        verify(itemRepository).save(any());
    }

    @Test
    void testSimulateProduction_insufficientQuantity() {
        flourItem.setQuantity(5.0); // Not enough to make 10.0

        Product product = new Product();
        product.setId(1L);
        product.setName("Cake");

        ProductItem productItem = new ProductItem();
        productItem.setItem(flourItem);
        productItem.setQuantity(5.0); // 5 * 2 = 10.0 needed
        product.setProductItems(Set.of(productItem));

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductionRequestDTO request = new ProductionRequestDTO(1L, 2.0); // produce 2 units

        ResponseEntity<Map<String, String>> response = productService.simulateProduction(request);

        assertEquals(400, response.getStatusCodeValue());
        assertTrue(response.getBody().get("error").contains("Not enough Flour available"));
        verify(itemRepository, never()).save(any());
    }


    @Test
    void testDeleteProduct_successful() {
        when(productRepository.existsById(1L)).thenReturn(true);

        boolean result = productService.deleteProduct(1L);

        assertTrue(result);
        verify(productRepository).deleteById(1L);
    }

    @Test
    void testDeleteProduct_notFound() {
        when(productRepository.existsById(999L)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> productService.deleteProduct(999L));

        assertEquals("Product not found with id: 999", exception.getMessage());
        verify(productRepository, never()).deleteById(any());
    }
}
