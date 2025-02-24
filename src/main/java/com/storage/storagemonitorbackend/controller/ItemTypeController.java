package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.itemtype.NewItemTypeDTO;
import com.storage.storagemonitorbackend.entity.ItemType;
import com.storage.storagemonitorbackend.service.ItemTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itemType")
public class ItemTypeController {
    private final ItemTypeService itemTypeService;

    @Autowired
    public ItemTypeController(ItemTypeService itemTypeService) {
        this.itemTypeService = itemTypeService;
    }

    @PostMapping("/")
    public boolean addItemType(@RequestBody NewItemTypeDTO newItemTypeDTO) {
        return itemTypeService.addItemType(newItemTypeDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ItemType>> getAllItemTypesByUserId(@PathVariable Long userId) {
        List<ItemType> itemTypes = itemTypeService.getAllItemTypesByUserId(userId);
        return ResponseEntity.ok(itemTypes);
    }

}
