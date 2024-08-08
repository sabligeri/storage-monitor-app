package com.storage.storagemonitorbackend.entity;

import jakarta.persistence.*;

@Entity
public class ProductItem {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itemType_id", nullable = false)
    private ItemType itemType;

    @Column(nullable = false)
    private double quantity;

}
