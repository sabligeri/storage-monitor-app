package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.entity.Item;
import com.storage.storagemonitorbackend.entity.Storage;
import com.storage.storagemonitorbackend.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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

    @GetMapping("/{storageId}/items")
    public ResponseEntity<List<Item>> getItemsByStorage(@PathVariable Long storageId) {
        List<Item> itemsOfStorage = storageService.getAllItemsByStorage(storageId);

        if (itemsOfStorage.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(itemsOfStorage);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Storage>> getStoragesByUser(@PathVariable Long userId) {
        List<Storage> storages = storageService.getAllStoragesByUser(userId);

        if (storages.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(storages);
    }

}
