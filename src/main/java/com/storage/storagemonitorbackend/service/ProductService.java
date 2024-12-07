package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.product.NewProductDTO;
import com.storage.storagemonitorbackend.dto.productitem.NewProductItemDTO;
import com.storage.storagemonitorbackend.entity.Item;
import com.storage.storagemonitorbackend.entity.Product;
import com.storage.storagemonitorbackend.entity.ProductItem;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.ItemRepository;
import com.storage.storagemonitorbackend.repository.ProductRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemRepository itemRepository;

    public boolean addProduct(NewProductDTO newProductDTO) {
        // Ellenőrizzük, hogy létezik-e a felhasználó
        UserEntity userEntity = userRepository.findById(newProductDTO.userId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + newProductDTO.userId()));

        // Létrehozunk egy új terméket
        Product product = new Product();
        product.setName(newProductDTO.name());
        product.setUserEntity(userEntity);
        product.setProductItems(new HashSet<>());

        // Iterálunk a termék elemeken
        for (NewProductItemDTO itemDTO : newProductDTO.items()) {
            Item item = itemRepository.findById(itemDTO.itemId())
                    .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemDTO.itemId()));
            ProductItem productItem = new ProductItem();
            productItem.setProduct(product);
            productItem.setItem(item);
            productItem.setQuantity(itemDTO.quantity());
            product.getProductItems().add(productItem); // Termékhez adjuk a termék elemeket
        }

        productRepository.save(product); // Mentjük a terméket az adatbázisba
        return true;
    }
}
