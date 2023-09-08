package com.cc.search.domain.controller;

import com.cc.search.domain.service.SearchService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Book;
import java.util.HashMap;
import java.util.List;

@RestController
public class SearchController {

    private SearchService ss;

    public SearchController(SearchService ss) {
        this.ss = ss;
    }

    @PostMapping("/bookinfo")
    public ResponseEntity<HashMap<String, Object>> getBookInfo(@RequestBody List<String> textList) {
        HashMap<String, Object> result = ss.getBookInfo(textList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
