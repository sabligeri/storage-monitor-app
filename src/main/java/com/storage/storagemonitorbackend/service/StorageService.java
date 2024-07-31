package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.entity.Storage;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.StorageRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StorageService {
    private final StorageRepository storageRepository;
    private final UserRepository userRepository;

    public StorageService(StorageRepository storageRepository, UserRepository userRepository) {
        this.storageRepository = storageRepository;
        this.userRepository = userRepository;
    }

    public boolean addNewStorage(NewStorageDTO newStorageDTO) {
        Optional<UserEntity> userEntityOptional = userRepository.findById(newStorageDTO.userId());
        if (userEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("There is no user with id " + newStorageDTO.userId());
        }

        UserEntity userEntity = userEntityOptional.get();

        Storage storage = new Storage();
        storage.setName(newStorageDTO.name());
        storage.setUserEntity(userEntity);

        storageRepository.save(storage);
        return true;
    }

}
