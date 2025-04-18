package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByStorageId(Long storageId);
}
