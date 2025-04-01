package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.itemtype.NewItemTypeDTO;
import com.storage.storagemonitorbackend.entity.ItemType;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.ItemTypeRepository;
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
class ItemTypeServiceTest {

    @Mock
    private ItemTypeRepository itemTypeRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ItemTypeService itemTypeService;

    private NewItemTypeDTO newItemTypeDTO;

    private UserEntity mockUser;

    @BeforeEach
    void setup() {
        newItemTypeDTO = new NewItemTypeDTO("Test Item Type", 1L);

        mockUser = new UserEntity();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");
    }


    @Test
    void testAddItemType_successful() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        boolean result = itemTypeService.addItemType(newItemTypeDTO);

        assertTrue(result);
        ArgumentCaptor<ItemType> captor = ArgumentCaptor.forClass(ItemType.class);
        verify(itemTypeRepository).save(captor.capture());

        ItemType savedItemType = captor.getValue();
        assertEquals("Test Item Type", savedItemType.getName());
        assertEquals(mockUser, savedItemType.getUserEntity());
    }

    @Test
    void testAddItemType_userNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> itemTypeService.addItemType(newItemTypeDTO));

        assertEquals("There is no user with id 1", ex.getMessage());
        verify(itemTypeRepository, never()).save(any());
    }


    @Test
    void testGetAllItemTypesByUserId_successful() {
        ItemType itemType = new ItemType();
        itemType.setName("Test Item Type");
        itemType.setUserEntity(mockUser);
        List<ItemType> mockItemTypes = List.of(itemType);

        when(itemTypeRepository.findAllByUserEntityId(1L)).thenReturn(mockItemTypes);

        List<ItemType> result = itemTypeService.getAllItemTypesByUserId(1L);

        assertEquals(1, result.size());
        assertEquals("Test Item Type", result.get(0).getName());
    }

    @Test
    void testGetAllItemTypesByUserId_noItemTypes() {
        when(itemTypeRepository.findAllByUserEntityId(1L)).thenReturn(Collections.emptyList());

        List<ItemType> result = itemTypeService.getAllItemTypesByUserId(1L);

        assertTrue(result.isEmpty());
    }
}
