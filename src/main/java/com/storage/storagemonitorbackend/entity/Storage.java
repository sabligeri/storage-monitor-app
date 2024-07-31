package com.storage.storagemonitorbackend.entity;

import jakarta.persistence.*;

import java.util.Set;


@Entity
public class Storage {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_entity_id", nullable = false)
    private UserEntity userEntity;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "storage", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Item> items;

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }
}
