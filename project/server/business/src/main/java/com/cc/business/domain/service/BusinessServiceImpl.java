package com.cc.business.domain.service;// BusinessServiceImpl.java
import com.cc.business.domain.dto.*;
import com.cc.business.domain.entity.BookEntity;
import com.cc.business.domain.entity.BookImageEntity;
import com.cc.business.domain.repository.BookImageRepository;
import com.cc.business.domain.repository.BookRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
public class BusinessServiceImpl implements BusinessService {

    @Value("${server.url}")
    String SERVER_URL;

    @Value("${ta.port}")
    String TA_PORT;

    @Value("${search.port}")
    String SEARCH_PORT;

    @Value("${sc.port}")
    String SC_PORT;

    @Value("${ans.port}")
    String ANS_PORT;

    private BookRepository bookRepository;
    private BookImageRepository bookImageRepository;

    public BusinessServiceImpl(BookRepository bookRepository, BookImageRepository bookImageRepository) {
        this.bookRepository = bookRepository;
        this.bookImageRepository = bookImageRepository;
    }

    @Override
    public AladinResponseDto processImages(List<String> imageUrlList) {
        log.info("이미지 처리 실행");
        /* 이미지에서 text 추출 */
        List<String> textList = getImageText(imageUrlList);

        /* 추출된 글자를 이용하여 책 정보 검색 */
        AladinResponseDto result = getBookInfo(textList);

        return result;
    }

    @Override
    public List<String> getImageText(List<String> imageUrlList) {
        log.info("이미지에서 글자 추출 실행 {}", imageUrlList);

        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(SERVER_URL + ":" + TA_PORT)
                .build();

        HashMap<String, String> request = new HashMap<>();
        request.put("img_url", imageUrlList.get(0));

        // api 요청
        List<String> response = webClient
                .post()
                .uri("/ta/abstraction")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(List.class)
                .block();
        log.info("TA 결과: {}", response);
        return response;
    }

    // search
    @Override
    public AladinResponseDto getBookInfo(List<String> textList) {
        log.info("추출된 글자로 책 정보 검색");
        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(SERVER_URL + ":" + SEARCH_PORT)
                .build();

        HashMap<String, List<String>> request = new HashMap<>();
        request.put("textList", textList);

        // api 요청
        AladinResponseDto response = webClient
                .post()
                .uri("/search/bookinfo")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AladinResponseDto.class)
                .block();
        log.info("Search 결과: {}", response);
        return response;
    }

    // sc
    @Override
    public String getImageStatus(List<String> imageUrlList) throws JsonProcessingException {
        String url = "http://j9a606.p.ssafy.io:8085/sc/bookstatus";

        // restTemplete 생성
        RestTemplate restTemplate = new RestTemplate();
        
        // 헤더 생성
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // 바디 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.addAll("image_list", imageUrlList);

        // reqeust 메세지 생성
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        // 
        HttpEntity<String> response = restTemplate.postForEntity(url, requestMessage, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        String status = objectMapper.readValue(response.getBody(), String.class);

        return status;
    }

    // ans
    @Override
    public int getBookPrice(BookEntity certainBookInfo) {
        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(SERVER_URL + ":" + ANS_PORT)
                .build();

        HashMap<String, Object> request = new HashMap<>();
        request.put("image_status", certainBookInfo.getStatus());
        request.put("image_title", certainBookInfo.getTitle());
        request.put("image_publisher", certainBookInfo.getPublisher());
        request.put("image_author", certainBookInfo.getAuthor());
        request.put("image_price", certainBookInfo.getOriginalPrice());

        // api 요청
        int response = webClient
                .post()
                .uri("/analysis/bookprice")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Integer.class)
                .block();
//        log.info("Ans 결과: {}", response);
        return response;
    }

    @Override
    public int saveBookInfo(BookDto bookInfo, int memberId) {
        BookEntity bookEntity = new BookEntity().builder()
                .title(bookInfo.getTitle())
                .publisher(bookInfo.getPublisher())
                .author(bookInfo.getAuthor())
                .coverImage(bookInfo.getImage())
                .memberId(memberId)
                .build();
        return  bookRepository.save(bookEntity).getBookId();
    }

    @Override
    public void saveS3URL(List<String> imageUrlList, int bookId) {
        for(int i=0; i<imageUrlList.size(); i++) {
            BookImageEntity bookImageEntity = new BookImageEntity().builder()
                    .imagePath("checkchaeck")
                    .imageUrl(imageUrlList.get(i))
                    .bookId(bookId)
                    .build();
            bookImageRepository.save(bookImageEntity);
        }
    }

    @Override
    public List<String> getImageUrlList(int bookId) {
        List<BookImageEntity> response = bookImageRepository.findAllByBookId(bookId);
        List<String>  imageUrlList = new ArrayList<>();
        for(int i=0; i<response.size(); i++) {
            imageUrlList.add(response.get(i).getImageUrl());
        }
        return imageUrlList;
    }

    @Override
    public BookEntity searchCertainBookInfo(BookDto bookInfo) {
        // webClient 기본 설정
        WebClient webClient = WebClient
                .builder()
                .baseUrl(SERVER_URL + ":" + SEARCH_PORT)
                .build();

        String keyword = bookInfo.getTitle() + " " + bookInfo.getAuthor() + " " + bookInfo.getPublisher();
        HashMap<String, String> request = new HashMap<>();
        request.put("keyword", keyword);

        // api 요청
        List<AladinResponseDto> response = webClient
                .post()
                .uri("/search/certainbookinfo")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(List.class)
                .block();
//        log.info("Search 결과: {}", response);
        ObjectMapper mapper = new ObjectMapper();
        AladinResponseDto arDto = mapper.convertValue(response.get(0), AladinResponseDto.class);

        BookEntity result = new BookEntity();
        result.setTitle(arDto.getTitle());
        result.setAuthor(arDto.getAuthor());
        result.setPublisher(arDto.getPublisher());
        result.setCoverImage(arDto.getCover());
        result.setOriginalPrice(arDto.getPriceStandard());

        return result;
    }

    @Override
    public FindHistroyResponseDto findHistory(int memberId) {
        List<BookEntity> books = bookRepository.findAllByMemberId(memberId);
        return FindHistroyResponseDto.of(books);
    }

    @Override
    public FindHistroyResponseDto searchHistory(int memberId, String keyword) {
        List<BookEntity> books = bookRepository.searchAllByMemberId(memberId, keyword);
        return FindHistroyResponseDto.of(books);
    }

    public void saveCertainBookInfo(BookEntity certainBookInfo) {
        log.info("저장할 값: {}", certainBookInfo);
        bookRepository.save(certainBookInfo);
    }
}
