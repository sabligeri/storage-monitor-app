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
}
