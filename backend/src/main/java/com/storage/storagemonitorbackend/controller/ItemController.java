package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.item.NewItemDTO;
import com.storage.storagemonitorbackend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/")
    public boolean addItem(@RequestBody NewItemDTO NewItemDTO) {
        return itemService.addItem(NewItemDTO);
    }

    @DeleteMapping("/{itemId}")
    public boolean deleteItem(@PathVariable Long itemId) {
        return itemService.deleteItem(itemId);
    }

    @PatchMapping("/{itemId}/refill")
    public boolean refillItem(@PathVariable Long itemId, @RequestBody Map<String, Object> updates) {
        if (!updates.containsKey("quantity")) {
            throw new IllegalArgumentException("Quantity is required for refill.");
        }

        double quantity = ((Number) updates.get("quantity")).doubleValue();  
        return itemService.refillItem(itemId, quantity);
    }


}
