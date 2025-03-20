package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.production.ProductionRequestDTO;
import com.storage.storagemonitorbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/production")
public class ProductionController {
    private final ProductService productService;

    @Autowired
    public ProductionController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/simulate")
    public ResponseEntity<Map<String, String>> simulateProduction(@RequestBody ProductionRequestDTO request) {
        return productService.simulateProduction(request);
    }
}

