package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import com.storage.storagemonitorbackend.entity.Role;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.UserRepository;
import com.storage.storagemonitorbackend.security.jwt.JwtResponse;
import com.storage.storagemonitorbackend.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private PasswordEncoder encoder;

    @InjectMocks
    private UserService userService;

    private NewUserDTO newUserDTO;

    @BeforeEach
    void setUp() {
        newUserDTO = new NewUserDTO("testuser", "password123");
    }


    @Test
    void testRegister_successful() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        when(encoder.encode("password123")).thenReturn("encodedPass");

        boolean result = userService.register(newUserDTO);

        assertTrue(result);
        ArgumentCaptor<UserEntity> captor = ArgumentCaptor.forClass(UserEntity.class);
        verify(userRepository).save(captor.capture());

        UserEntity savedUser = captor.getValue();
        assertEquals("testuser", savedUser.getUsername());
        assertEquals("encodedPass", savedUser.getPassword());
        assertTrue(savedUser.getRoles().contains(Role.ROLE_USER));
    }

    @Test
    void testRegister_userAlreadyExists() {
        UserEntity existingUser = new UserEntity();
        existingUser.setUsername("testuser");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(existingUser));

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> userService.register(newUserDTO));

        assertEquals("Username:testuser already exists", ex.getMessage());
        verify(userRepository, never()).save(any());
    }


    @Test
    void testLogin_successful() {
        LoginUserDTO loginDTO = new LoginUserDTO("testuser", "password123");

        Authentication mockAuth = mock(Authentication.class);
        when(authenticationManager.authenticate(any())).thenReturn(mockAuth);

        User springUser = new User("testuser", "encodedPass", List.of(() -> "ROLE_USER"));
        when(mockAuth.getPrincipal()).thenReturn(springUser);

        when(jwtUtils.generateJwtToken(mockAuth)).thenReturn("mock-jwt-token");

        UserEntity userEntity = new UserEntity();
        userEntity.setId(99L);
        userEntity.setUsername("testuser");
        userEntity.setRoles(Set.of(Role.ROLE_USER));
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(userEntity));

        ResponseEntity<JwtResponse> response = userService.login(loginDTO);

        assertEquals(200, response.getStatusCodeValue());
        JwtResponse body = response.getBody();
        assertNotNull(body);
        assertEquals("mock-jwt-token", body.jwt());
        assertEquals("testuser", body.username());
        assertEquals(99L, body.id());
        assertTrue(body.roles().contains("ROLE_USER"));
    }
}
