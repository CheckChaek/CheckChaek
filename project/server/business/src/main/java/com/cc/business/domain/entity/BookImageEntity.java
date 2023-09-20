package com.cc.business.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity(name = "book_image")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int image_id;
    @Column
    String image_path;
    @Column
    String image_url;
    @Column
    int book_id;
}
