package com.cc.business.domain.entity;// BusinessEntity.java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class BusinessEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String publisher;
    private int status;
    private int price;
    private String imageUrl;
    private int minPrice;
    private int maxPrice;
    private int avgPrice;
    private int originalPrice;
}
