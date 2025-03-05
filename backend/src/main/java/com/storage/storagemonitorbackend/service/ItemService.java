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

    private final ItemRepository itemRepository;
    private final StorageRepository storageRepository;
    private final ItemTypeRepository itemTypeRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository, StorageRepository storageRepository, ItemTypeRepository itemTypeRepository) {
        this.itemRepository = itemRepository;
        this.storageRepository = storageRepository;
        this.itemTypeRepository = itemTypeRepository;
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

    public boolean deleteItem(Long itemId) {
        if (!itemRepository.existsById(itemId)) {
            throw new IllegalArgumentException("Item with ID " + itemId + " not found.");
        }
        itemRepository.deleteById(itemId);
        return true;
    }

    public boolean refillItem(Long itemId, double quantity) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item with ID " + itemId + " not found."));

        if (quantity <= 0) {
            throw new IllegalArgumentException("Refill quantity must be positive.");
        }

        item.setQuantity(item.getQuantity() + quantity);
        itemRepository.save(item);
        return true;
    }
}
