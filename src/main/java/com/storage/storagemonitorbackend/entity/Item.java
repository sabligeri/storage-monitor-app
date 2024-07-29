package com.storage.storagemonitorbackend.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Item {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "storage_id", nullable = false)
    private Storage storage;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuantityType quantityType;
}
