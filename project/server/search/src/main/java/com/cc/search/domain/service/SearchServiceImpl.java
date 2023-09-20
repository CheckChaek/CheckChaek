package com.cc.search.domain.service;

import com.cc.search.domain.dto.BookDto;
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

    @Value("${aladin.api.url}")
    String ALADIN_API_URL;

    @Override
    public BookDto getBookInfo(List<String> textList) {
        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(ALADIN_API_URL)
                .build();

        // api 요청
        BookDto response = new BookDto();
        for(String keyword : textList) {
            SearchResponse data  = webClient
                    .get()
                    .uri(uriBuilder ->
                            uriBuilder
                                    .queryParam("ttbkey", TTBKEY)
                                    .queryParam("Query", keyword)
                                    .queryParam("QueryType", "Title")
                                    .queryParam("Output", "JS")
                                    .queryParam("Version", "20131101")
                                    .queryParam("MaxResults", 10) // 최대 50개 까지만 검색가능
                                    .queryParam("SearchTarget", "Book") // 최대 50개 까지만 검색가능
                                    .build())
                    .retrieve()
                    .bodyToMono(SearchResponse.class)
                    .block();

            /* 검색결과 리스트 반환 */
            List<BookDto> bookList = data.getItem();
            if(!bookList.isEmpty()) {
                response = bookList.get(0);
                break;
            }
        }
        log.info("검색결과: {}", response);
        return response;
    }

    @Override
    public List<BookDto> searchCertainBookInfo(String keyword) {
        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(ALADIN_API_URL)
                .build();

        // api 요청
        SearchResponse data  = webClient
                .get()
                .uri(uriBuilder ->
                        uriBuilder
                                .queryParam("ttbkey", TTBKEY)
                                .queryParam("Query", keyword)
                                .queryParam("QueryType", "Title")
                                .queryParam("QueryType", "Author")
                                .queryParam("QueryType", "Publisher")
                                .queryParam("Output", "JS")
                                .queryParam("Version", "20131101")
                                .queryParam("MaxResults", 50) // 최대 50개 까지만 검색가능
                                .queryParam("SearchTarget", "Book") // 최대 50개 까지만 검색가능
                                .build())
                .retrieve()
                .bodyToMono(SearchResponse.class)
                .block();

        /* 검색결과 리스트 반환 */
        List<BookDto> bookList = data.getItem();

        log.info("검색결과: {}", bookList);
        return bookList;
    }
}
