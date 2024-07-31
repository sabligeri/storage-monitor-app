package com.storage.storagemonitorbackend.repository;

import com.storage.storagemonitorbackend.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageRepository extends JpaRepository<Storage, Long> {
}
