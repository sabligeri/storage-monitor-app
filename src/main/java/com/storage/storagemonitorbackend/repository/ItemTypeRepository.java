package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemTypeRepository extends JpaRepository<ItemType, Long> {
    List<ItemType> findAllByUserEntityId(Long user_id);
}
