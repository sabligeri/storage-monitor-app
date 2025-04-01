package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.item.NewItemDTO;
import com.storage.storagemonitorbackend.entity.*;
import com.storage.storagemonitorbackend.repository.ItemRepository;
import com.storage.storagemonitorbackend.repository.ItemTypeRepository;
import com.storage.storagemonitorbackend.repository.StorageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private StorageRepository storageRepository;

    @Mock
    private ItemTypeRepository itemTypeRepository;

    @InjectMocks
    private ItemService itemService;

    private Storage mockStorage;
    private ItemType mockItemType;

    @BeforeEach
    public void setup() {
        mockStorage = new Storage();
        mockStorage.setId(1L);
        mockStorage.setName("Pantry");

        mockItemType = new ItemType();
        mockItemType.setId(1L);
        mockItemType.setName("Food");
    }


    @Test
    public void testAddItem_successful() {
        NewItemDTO rice = new NewItemDTO("Rice", 1L, 1L, QuantityType.KG, 5.0);

        when(storageRepository.findById(1L)).thenReturn(Optional.of(mockStorage));
        when(itemTypeRepository.findById(1L)).thenReturn(Optional.of(mockItemType));

        boolean result = itemService.addItem(rice);

        assertTrue(result, "Item should be added successfully");
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    public void testAddItem_storageNotFound() {
        NewItemDTO salt = new NewItemDTO("Salt", 2L, 1L, QuantityType.KG, 1.0);

        when(storageRepository.findById(2L)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> itemService.addItem(salt));

        assertEquals("There is no storage with id 2", exception.getMessage());
        verify(itemRepository, never()).save(any());
    }

    @Test
    public void testAddItem_itemTypeNotFound() {
        NewItemDTO salt = new NewItemDTO("Salt", 1L, 2L, QuantityType.KG, 1.0);

        when(storageRepository.findById(1L)).thenReturn(Optional.of(mockStorage));
        when(itemTypeRepository.findById(2L)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> itemService.addItem(salt));

        assertEquals("There is no such item type with id 2", exception.getMessage());
        verify(itemRepository, never()).save(any());
    }


    @Test
    public void testDeleteItem_successful() {
        when(itemRepository.existsById(5L)).thenReturn(true);

        boolean result = itemService.deleteItem(5L);

        assertTrue(result, "Item should be deleted successfully");
        verify(itemRepository).deleteById(5L);
    }

    @Test
    public void testDeleteItem_notFound() {
        when(itemRepository.existsById(99L)).thenReturn(false);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> itemService.deleteItem(99L));

        assertEquals("Item with ID 99 not found.", exception.getMessage());
        verify(itemRepository, never()).deleteById(any());
    }


    @Test
    public void testRefillItem_successful() {
        Item item = new Item();
        item.setId(1L);
        item.setName("Flour");
        item.setQuantity(10.0);
        item.setQuantityType(QuantityType.KG);
        item.setItemType(mockItemType);
        item.setStorage(mockStorage);

        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        boolean result = itemService.refillItem(1L, 5.0);

        assertTrue(result);
        assertEquals(15.0, item.getQuantity());
        verify(itemRepository).save(item);
    }

    @Test
    public void testRefillItem_itemNotFound() {
        when(itemRepository.findById(999L)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> itemService.refillItem(999L, 1.0));

        assertEquals("Item with ID 999 not found.", exception.getMessage());
    }

    @Test
    public void testRefillItem_invalidQuantity() {
        Item item = new Item();
        item.setId(1L);
        item.setQuantity(3.0);

        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> itemService.refillItem(1L, 0.0));

        assertEquals("Refill quantity must be positive.", exception.getMessage());
        verify(itemRepository, never()).save(any());
    }
}
