package com.storage.storagemonitorbackend.security.service;



import com.storage.storagemonitorbackend.entity.Role;
import com.storage.storagemonitorbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository userRepository;

  @Autowired
  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username)
          throws UsernameNotFoundException {
    com.storage.storagemonitorbackend.entity.User userEntity= userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));

    List<SimpleGrantedAuthority> roles = new ArrayList<>();
    for (Role role : userEntity.getRoles()) {
      roles.add(new SimpleGrantedAuthority(role.name()));
    }

    return new User(userEntity.getUsername(), userEntity.getPassword(), roles);
  }
}

