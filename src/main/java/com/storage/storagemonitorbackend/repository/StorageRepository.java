package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {
    Optional<Storage> findByUserEntityId(Long user_id);
}
