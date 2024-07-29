package com.storage.storagemonitorbackend.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<ProductItem> productItems;
}
