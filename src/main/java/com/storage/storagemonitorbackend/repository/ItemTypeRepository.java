package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemTypeRepository extends JpaRepository<ItemType, Long> {
}
