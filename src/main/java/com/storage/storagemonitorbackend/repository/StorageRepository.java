package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {
    List<Storage> findAllByUserEntityId(Long user_id);
    Optional<Storage> findByUserEntityIdAndId(Long user_id, Long storage_id);
}
