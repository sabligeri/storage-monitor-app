package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.item.NewItemDTO;
import com.storage.storagemonitorbackend.entity.Item;
import com.storage.storagemonitorbackend.entity.ItemType;
import com.storage.storagemonitorbackend.entity.Storage;
import com.storage.storagemonitorbackend.repository.ItemRepository;
import com.storage.storagemonitorbackend.repository.ItemTypeRepository;
import com.storage.storagemonitorbackend.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private final ItemRepository itemRepository;
    @Autowired
    private final StorageRepository storageRepository;
    @Autowired
    private ItemTypeRepository itemTypeRepository;

    public ItemService(ItemRepository itemRepository, StorageRepository storageRepository) {
        this.itemRepository = itemRepository;
        this.storageRepository = storageRepository;
    }

    public boolean addItem(NewItemDTO newItemDTO){
        Optional<Storage> optionalStorage = storageRepository.findById(newItemDTO.storageId());
        if(optionalStorage.isEmpty()){
            throw new IllegalArgumentException("There is no storage with id " + newItemDTO.storageId());
        }

        Optional<ItemType> optionalItemType = itemTypeRepository.findById(newItemDTO.itemTypeId());
        if(optionalItemType.isEmpty()){
            throw new IllegalArgumentException("There is no such item type with id " + newItemDTO.itemTypeId());
        }

        Storage storage = optionalStorage.get();
        ItemType itemType = optionalItemType.get();

        Item item = new Item();
        item.setName(newItemDTO.name());
        item.setStorage(storage);
        item.setItemType(itemType);
        item.setQuantityType(newItemDTO.quantityType());
        item.setQuantity(newItemDTO.quantity());

        itemRepository.save(item);

        return true;
    }
}
