package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/storage")
public class StorageController {
    private final StorageService storageService;

    @Autowired
    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/add")
    public boolean add(@RequestBody NewStorageDTO newStorageDTO) {
        return storageService.addNewStorage(newStorageDTO);
    }
}
