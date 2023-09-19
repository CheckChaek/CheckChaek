package com.cc.search.domain.controller;

import com.cc.search.domain.dto.BookDto;
import com.cc.search.domain.dto.SearchResponse;
import com.cc.search.domain.service.SearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class SearchController {

    private SearchService ss;

    public SearchController(SearchService ss) {
        this.ss = ss;
    }

    @PostMapping("/bookinfo")
    public ResponseEntity<BookDto> getBookInfo(@RequestBody HashMap<String, Object> request) {
        BookDto result = ss.getBookInfo((List<String>) request.get("textList"));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
