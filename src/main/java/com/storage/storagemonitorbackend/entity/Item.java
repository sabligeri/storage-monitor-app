package com.storage.storagemonitorbackend.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Item {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "storage_id", nullable = false)
    private Storage storage;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuantityType quantityType;

    @ManyToOne
    @JoinColumn(name = "itemType_id", nullable = false)
    private ItemType itemType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public QuantityType getQuantityType() {
        return quantityType;
    }

    public void setQuantityType(QuantityType quantityType) {
        this.quantityType = quantityType;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
    }


}
