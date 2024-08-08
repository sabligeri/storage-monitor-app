package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
}
