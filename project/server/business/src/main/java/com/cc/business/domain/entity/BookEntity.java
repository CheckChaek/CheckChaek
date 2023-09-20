package com.cc.business.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "book")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int bookId;
    @Column(name = "member_id", nullable = false)
    int memberId;
    @Column(nullable = false)
    String title;
    @Column
    String publisher;
    @Column
    String author;
    @Column
    String status;
    @Column(name = "cover_image")
    String coverImage;
    @Column(name = "original_price")
    int originalPrice;
    @Column(name = "estimated_price")
    int estimatedPrice;
}
