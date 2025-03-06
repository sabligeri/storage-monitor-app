package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByUserEntityId(Long user_id);
}
