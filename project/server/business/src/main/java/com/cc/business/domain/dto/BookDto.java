package com.cc.business.domain.dto;

import com.cc.business.domain.entity.ImageEntity;
import lombok.*;

@Getter
@Setter
public class BookDto {
    String title;
    String author;
    String publisher;
    String image;
}
