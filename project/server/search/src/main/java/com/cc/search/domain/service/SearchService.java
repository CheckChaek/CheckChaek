package com.cc.search.domain.service;

import com.cc.search.domain.dto.SearchResponse;

import java.util.List;

public interface SearchService {

    SearchResponse getBookInfo(List<String> textList);

}
