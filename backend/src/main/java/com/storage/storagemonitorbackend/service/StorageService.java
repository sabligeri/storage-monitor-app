package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.entity.Item;
import com.storage.storagemonitorbackend.entity.Storage;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.ItemRepository;
import com.storage.storagemonitorbackend.repository.StorageRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StorageService {

    private final StorageRepository storageRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public StorageService(StorageRepository storageRepository, UserRepository userRepository, ItemRepository itemRepository) {
        this.storageRepository = storageRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
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


    public List<Storage> getAllStoragesByUser(Long userId) {
        List<Storage> storages = storageRepository.findAllByUserEntityId(userId);
        return storages.isEmpty() ? Collections.emptyList() : storages;
    }

    public List<Item> getAllItemsByStorage(Long storageId) {
        List<Item> items = itemRepository.findByStorageId(storageId);
        return items.isEmpty() ? Collections.emptyList() : items;
    }

    public void deleteStorage(Long userId, Long storageId) {
        Optional<Storage> optionalStorage = storageRepository.findByUserEntityIdAndId(userId, storageId);
        if (optionalStorage.isPresent()) {
            Storage storage = optionalStorage.get();
            storageRepository.delete(storage);
        } else {
            throw new IllegalArgumentException("There is no item with id " + storageId);
        }
    }

}
