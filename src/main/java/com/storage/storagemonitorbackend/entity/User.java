package com.storage.storagemonitorbackend.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id")) // Ez létrehoz egy külön táblát a role-oknak
    @Enumerated(EnumType.STRING) // Ez tárolja az enum értékeket mint String
    private Set<Role> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Storage> storages;

    public Set<Role> getRoles() {
        return roles;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
