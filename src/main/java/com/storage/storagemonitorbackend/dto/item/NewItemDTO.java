package com.storage.storagemonitorbackend.dto.item;

import com.storage.storagemonitorbackend.entity.QuantityType;
import com.storage.storagemonitorbackend.service.ItemTypeService;

public record NewItemDTO(
        String name,
        long storageId,
        long itemTypeId,
        QuantityType quantityType,
        double quantity) {
}
