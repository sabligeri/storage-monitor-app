package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.product.NewProductDTO;
import com.storage.storagemonitorbackend.dto.product.ProductDTO;
import com.storage.storagemonitorbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/")
    public boolean addProduct(@RequestBody NewProductDTO newProductDTO) {
        return productService.addProduct(newProductDTO);
    }

    @GetMapping("/user/{userId}")
    public List<ProductDTO> getProductsByUser(@PathVariable Long userId) {
        return productService.getProductsByUser(userId);
    }
}
