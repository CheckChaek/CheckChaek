package com.cc.business.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "book")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int book_id;
    @Column(nullable = false)
    int member_id;
    @Column(nullable = false)
    String title;
    @Column
    String publisher;
    @Column
    String author;
    @Column
    int state;
    @Column
    String cover_image;
}
