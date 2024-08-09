package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
