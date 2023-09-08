package com.cc.search.domain.service;

import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;


@Service
@Slf4j
public class SearchServiceImpl implements SearchService {

    @Value("${aladin.ttbkey}")
    String TTBKEY;

    @Override
    public HashMap<String, Object> getBookInfo(List<String> textList) {
        String aladin_api_url = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(aladin_api_url)
                .build();

        // api 요청
        String response = webClient
                .get()
                .uri(uriBuilder ->
                        uriBuilder
                                .queryParam("ttbkey", TTBKEY)
                                .queryParam("Query", textList.get(0))
                                .queryParam("QueryType", "Title")
                                .queryParam("Output", "JS")
                                .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        JSONParser parser = new JSONParser();
        HashMap<String, Object> result = new HashMap<>();
        try {
            Object obj = parser.parse(response);
            JSONObject json = (JSONObject) obj;
            //        JSONArray item = (JSONArray) json.get("item");
//            Iterator iter = json.keySet().iterator();
//            while(iter.hasNext()) {
//                String key = iter.next().toString();
//                result.put(key, json.get(key));
//            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
