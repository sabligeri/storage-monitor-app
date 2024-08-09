package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.itemtype.NewItemTypeDTO;
import com.storage.storagemonitorbackend.entity.ItemType;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.ItemTypeRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemTypeService {

    @Autowired
    private final ItemTypeRepository itemTypeRepository;

    @Autowired
    private final UserRepository userRepository;

    public ItemTypeService(ItemTypeRepository itemTypeRepository, UserRepository userRepository) {
        this.itemTypeRepository = itemTypeRepository;
        this.userRepository = userRepository;
    }

    public boolean addItemType(NewItemTypeDTO newItemTypeDTO) {
        Optional<UserEntity> userEntityOptional = userRepository.findById(newItemTypeDTO.userId());
        if (userEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("There is no user with id " + newItemTypeDTO.userId());
        }

        UserEntity userEntity = userEntityOptional.get();

        ItemType itemType = new ItemType();
        itemType.setName(newItemTypeDTO.name());
        itemType.setUserEntity(userEntity);

        itemTypeRepository.save(itemType);
        return true;
    }
}
