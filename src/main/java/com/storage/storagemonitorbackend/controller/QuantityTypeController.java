package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.entity.QuantityType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/quantity-types")
public class QuantityTypeController {

    @GetMapping("/")
    public List<QuantityType> getQuantityTypes() {
        return Arrays.asList(QuantityType.values());
    }
}
