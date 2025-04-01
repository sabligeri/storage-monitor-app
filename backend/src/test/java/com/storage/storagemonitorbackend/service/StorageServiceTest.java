package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.storage.NewStorageDTO;
import com.storage.storagemonitorbackend.entity.Item;
import com.storage.storagemonitorbackend.entity.Storage;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.ItemRepository;
import com.storage.storagemonitorbackend.repository.StorageRepository;
import com.storage.storagemonitorbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class StorageServiceTest {

    @Mock
    private StorageRepository storageRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private StorageService storageService;

    private UserEntity user;
    private Storage storage;

    @BeforeEach
    void setup() {
        user = new UserEntity();
        user.setUsername("testuser");
        user.setId(1L);

        storage = new Storage();
        storage.setId(10L);
        storage.setName("TestStorage");
        storage.setUserEntity(user);
    }


    @Test
    void testAddNewStorage_successful() {
        NewStorageDTO dto = new NewStorageDTO("Fridge", 1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        boolean result = storageService.addNewStorage(dto);

        assertTrue(result);
        ArgumentCaptor<Storage> captor = ArgumentCaptor.forClass(Storage.class);
        verify(storageRepository).save(captor.capture());

        Storage saved = captor.getValue();
        assertEquals("Fridge", saved.getName());
        assertEquals(user, saved.getUserEntity());
    }

    @Test
    void testAddNewStorage_userNotFound() {
        NewStorageDTO dto = new NewStorageDTO("Garage", 99L);

        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> storageService.addNewStorage(dto));

        assertEquals("There is no user with id 99", ex.getMessage());
        verify(storageRepository, never()).save(any());
    }


    @Test
    void testGetAllStoragesByUser_returnsList() {
        List<Storage> mockStorages = List.of(storage);
        when(storageRepository.findAllByUserEntityId(1L)).thenReturn(mockStorages);

        List<Storage> result = storageService.getAllStoragesByUser(1L);

        assertEquals(1, result.size());
        assertEquals("TestStorage", result.get(0).getName());
    }

    @Test
    void testGetAllStoragesByUser_returnsEmpty() {
        when(storageRepository.findAllByUserEntityId(2L)).thenReturn(Collections.emptyList());

        List<Storage> result = storageService.getAllStoragesByUser(2L);

        assertTrue(result.isEmpty());
    }


    @Test
    void testGetAllItemsByStorage_returnsList() {
        Item item = new Item();
        item.setName("Flour");
        item.setQuantity(2.0);
        item.setStorage(storage);

        when(itemRepository.findByStorageId(10L)).thenReturn(List.of(item));

        List<Item> result = storageService.getAllItemsByStorage(10L);

        assertEquals(1, result.size());
        assertEquals("Flour", result.get(0).getName());
    }

    @Test
    void testGetAllItemsByStorage_returnsEmpty() {
        when(itemRepository.findByStorageId(15L)).thenReturn(Collections.emptyList());

        List<Item> result = storageService.getAllItemsByStorage(15L);

        assertTrue(result.isEmpty());
    }


    @Test
    void testDeleteStorage_successful() {
        when(storageRepository.findByUserEntityIdAndId(1L, 10L)).thenReturn(Optional.of(storage));

        storageService.deleteStorage(1L, 10L);

        verify(storageRepository).delete(storage);
    }

    @Test
    void testDeleteStorage_notFound() {
        when(storageRepository.findByUserEntityIdAndId(1L, 999L)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> storageService.deleteStorage(1L, 999L));

        assertEquals("There is no item with id 999", ex.getMessage());
        verify(storageRepository, never()).delete(any());
    }
}
