package com.storage.storagemonitorbackend.controller;

import com.storage.storagemonitorbackend.dto.user.LoginUserDTO;
import com.storage.storagemonitorbackend.dto.user.NewUserDTO;
import com.storage.storagemonitorbackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public boolean register(@RequestBody NewUserDTO newUserDTO) {
        return userService.register(newUserDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserDTO loginUserDTO) {
        return userService.login(loginUserDTO);
    }

}
