package com.cc.search.domain.service;

import com.cc.search.domain.dto.BookDto;

import java.util.HashMap;
import java.util.List;

public interface SearchService {

    BookDto getBookInfo(List<String> textList);

    BookDto searchCertainBookInfo(HashMap<String, Object> request);
}
