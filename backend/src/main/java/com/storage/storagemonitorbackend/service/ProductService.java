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
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, UserRepository userRepository, ItemRepository itemRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    public boolean addProduct(NewProductDTO newProductDTO) {
        UserEntity userEntity = userRepository.findById(newProductDTO.userId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + newProductDTO.userId()));

        Product product = new Product();
        product.setName(newProductDTO.name());
        product.setUserEntity(userEntity);
        product.setProductItems(new HashSet<>());

        for (NewProductItemDTO itemDTO : newProductDTO.items()) {
            Item item = itemRepository.findById(itemDTO.itemId())
                    .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemDTO.itemId()));
            ProductItem productItem = new ProductItem();
            productItem.setProduct(product);
            productItem.setItem(item);
            productItem.setQuantity(itemDTO.quantity());
            product.getProductItems().add(productItem);
        }

        productRepository.save(product);
        return true;
    }

    public List<NewProductDTO> getProductsByUser(Long userId) {
        return productRepository.findAllByUserEntityId(userId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    private NewProductDTO convertToDTO(Product product) {
        Set<NewProductItemDTO> items = product.getProductItems().stream()
                .map(item -> new NewProductItemDTO(
                        item.getItem().getId(),
                        item.getQuantity()))
                .collect(Collectors.toSet());

        return new NewProductDTO(product.getName(), items.stream().toList(), product.getUserEntity().getId());
    }


}
