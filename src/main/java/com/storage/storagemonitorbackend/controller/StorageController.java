package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.entity.Item;
import com.storage.storagemonitorbackend.entity.Storage;
import com.storage.storagemonitorbackend.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/storage")
public class StorageController {
    private final StorageService storageService;

    @Autowired
    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/")
    public boolean add(@RequestBody NewStorageDTO newStorageDTO) {
        return storageService.addNewStorage(newStorageDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Storage>> getStoragesByUser(@PathVariable Long userId) {
        List<Storage> storages = storageService.getAllStoragesByUser(userId);
        return ResponseEntity.ok(storages);
    }

    @GetMapping("/{storageId}/items")
    public ResponseEntity<List<Item>> getItemsByStorage(@PathVariable Long storageId) {
        List<Item> itemsOfStorage = storageService.getAllItemsByStorage(storageId);
        return ResponseEntity.ok(itemsOfStorage);
    }

    @DeleteMapping("/{userId}/{storageId}")
    public void deleteStorage(@PathVariable Long userId, @PathVariable Long storageId) {
        storageService.deleteStorage(userId, storageId);
    }

}
