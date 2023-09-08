package com.cc.search.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {
    String title;
    String author;
    String publisher;
    int price;
}
