package com.storage.storagemonitorbackend.dto.productitem;

import com.storage.storagemonitorbackend.entity.QuantityType;

public record NewProductItemDTO(Long itemId, double quantity, String itemName, QuantityType quantityType) {
}
