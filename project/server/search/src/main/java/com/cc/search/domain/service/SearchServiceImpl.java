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
                                    .queryParam("Cover", "Big")
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
    public BookDto searchCertainBookInfo(HashMap<String, Object> request) {
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
                                .queryParam("Query", request.get("title"))
                                .queryParam("QueryType", "Title")
                                .queryParam("Output", "JS")
                                .queryParam("Version", "20131101")
                                .queryParam("MaxResults", 50) // 최대 50개 까지만 검색가능
                                .queryParam("SearchTarget", "Book")
                                .queryParam("Cover", "Big")
                                .build())
                .retrieve()
                .bodyToMono(SearchResponse.class)
                .block();

        /* 검색결과 리스트 반환 */
        BookDto result = null;
        if(data.getItem() != null) {
            log.info("책 목록: {}", data.getItem());
            if(!request.get("author").equals("") && request.get("publisher").equals("")) { // 작가 value만 존재할 경우
                log.info("작가만 존재");
                for(BookDto elem : data.getItem()) {
                    if(elem.getAuthor().contains((CharSequence) request.get("author"))) {
                        result = elem;
                        break;
                    }
                }
            } else if(request.get("author").equals("") && !request.get("publisher").equals("")) { // 출판사 value만 있을 경우
                log.info("출판사만 존재");
                for(BookDto elem : data.getItem()) {
                    if(elem.getPublisher().contains((CharSequence) request.get("publisher"))) {
                        result = elem;
                        break;
                    }
                }
            } else if(!request.get("author").equals("") && !request.get("publisher").equals("")) { // 작가, 출판사 value가 있을 경우
                log.info("작가, 출판사 둘 다 존재함");
                for(BookDto elem : data.getItem()) {
                    if(elem.getAuthor().contains((CharSequence) request.get("author")) && elem.getPublisher().contains((CharSequence) request.get("publisher"))) {
                        result = elem;
                        break;
                    }
                }
            } else { // 작가, 출판사 value 둘 다 없을 경우
                log.info("작가, 출판사 둘 다 존재하지 않음");
                result = data.getItem().get(0);
            }

        }
        log.info("검색결과: {}", result);
        return result;
    }
}
