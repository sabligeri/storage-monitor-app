package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StorageRepository extends JpaRepository<Storage, Long> {
    List<Storage> findAllByUserEntityId(Long user_id);
}
