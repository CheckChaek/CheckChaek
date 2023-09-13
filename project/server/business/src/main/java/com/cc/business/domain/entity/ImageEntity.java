package com.cc.business.domain.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jdk.jshell.Snippet;
import lombok.*;
import org.hibernate.annotations.Table;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
@Entity(name = "image")
public class ImageEntity
{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String filePath;

//    @Builder
//    public ImageEntity(Long id, String title, String filePath) {
//        this.id = id;
//        this.title = title;
//        this.filePath = filePath;
//    }
}