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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductItem> productItems;

    @ManyToOne
    @JoinColumn(name = "userEntity_id",nullable = false)
    private UserEntity userEntity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ProductItem> getProductItems() {
        return productItems;
    }

    public void setProductItems(Set<ProductItem> productItems) {
        this.productItems = productItems;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }
}
