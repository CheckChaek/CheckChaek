package com.cc.search.domain.service;

import com.cc.search.domain.dto.BookDto;

import java.util.List;

public interface SearchService {

    BookDto getBookInfo(List<String> textList);

    BookDto searchCertainBookInfo(String keyword);
}
