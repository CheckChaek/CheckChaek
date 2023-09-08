package com.cc.search.domain.service;

import org.json.JSONObject;

import java.awt.print.Book;
import java.util.HashMap;
import java.util.List;

public interface SearchService {

    HashMap<String, Object> getBookInfo(List<String> textList);

}
