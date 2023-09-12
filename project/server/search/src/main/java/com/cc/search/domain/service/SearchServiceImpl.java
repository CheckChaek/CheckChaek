package com.cc.search.domain.service;

import com.cc.search.domain.dto.SearchResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;


@Service
@Slf4j
public class SearchServiceImpl implements SearchService {

    @Value("${aladin.ttbkey}")
    String TTBKEY;

    @Override
    public SearchResponse getBookInfo(List<String> textList) {
        String aladin_api_url = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(aladin_api_url)
                .build();

        // api 요청
        SearchResponse response = webClient
                .get()
                .uri(uriBuilder ->
                        uriBuilder
                                .queryParam("ttbkey", TTBKEY)
                                .queryParam("Query", textList.get(0))
                                .queryParam("QueryType", "Title")
                                .queryParam("Output", "JS")
                                .queryParam("Version", "20131101")
                                .build())
                .retrieve()
                .bodyToMono(SearchResponse.class)
                .block();

        return response;
    }
}
