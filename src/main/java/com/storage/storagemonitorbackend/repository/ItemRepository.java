package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByStorageId(Long storageId);
}
