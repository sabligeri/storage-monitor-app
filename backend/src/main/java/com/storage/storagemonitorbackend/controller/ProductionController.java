package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.production.ProductionRequestDTO;
import com.storage.storagemonitorbackend.service.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/production")
public class ProductionController {
    private final ProductService productService;

    public ProductionController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/simulate")
    public String simulateProduction(@RequestBody ProductionRequestDTO request) {
        return productService.simulateProduction(request);
    }
}
