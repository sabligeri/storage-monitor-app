package com.storage.storagemonitorbackend.service;

import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import com.storage.storagemonitorbackend.entity.Role;
import com.storage.storagemonitorbackend.entity.UserEntity;
import com.storage.storagemonitorbackend.repository.UserRepository;
import com.storage.storagemonitorbackend.security.jwt.JwtResponse;
import com.storage.storagemonitorbackend.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository userRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.encoder = encoder;
    }

    public boolean register(NewUserDTO newUserDTO) {
        Optional<UserEntity> user = userRepository.findByUsername(newUserDTO.username());
        if (user.isPresent()) {
            throw new IllegalArgumentException("Username:" + newUserDTO.username() + " already exists");
        }
        UserEntity newUser = new UserEntity();
        newUser.setUsername(newUserDTO.username());
        newUser.setPassword(encoder.encode(newUserDTO.password()));
        newUser.setRoles(Set.of(Role.ROLE_USER));
        userRepository.save(newUser);
        return true;
    }

    public ResponseEntity<JwtResponse> login(LoginUserDTO loginUserDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                                loginUserDTO.username(), loginUserDTO.password()
                        )
                );

        String jwtToken = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();

        Optional<UserEntity> userEntity = userRepository.findByUsername(loginUserDTO.username());
        System.out.println(userEntity);
        long userId = userEntity.get().getId();
        return ResponseEntity
                .ok(new JwtResponse(jwtToken, userId, userDetails.getUsername(), roles));
    }

}
