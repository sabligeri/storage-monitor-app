package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
