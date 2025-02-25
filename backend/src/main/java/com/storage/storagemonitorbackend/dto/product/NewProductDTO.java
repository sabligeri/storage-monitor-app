package com.storage.storagemonitorbackend.dto.product;

import com.storage.storagemonitorbackend.dto.productitem.NewProductItemDTO;
import java.util.List;

public record NewProductDTO(String name, List<NewProductItemDTO> items, long userId) {
}
