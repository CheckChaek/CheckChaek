package com.cc.business.domain.service;// BusinessServiceImpl.java
import com.cc.business.domain.dto.*;
import com.cc.business.domain.repository.BusinessRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessServiceImpl implements BusinessService {
    private final BusinessRepository businessRepository;

    public BusinessServiceImpl(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    // 담당 : 이정석
    @Override
    public List<BusinessInfoDto> processImages(List<String> imageList) {
        // 이미지 처리 및 정보 추출 로직을 구현
        List<BusinessInfoDto> result = new ArrayList<>();

        // 각 이미지에 대한 처리와 정보 추출을 수행하고 결과를 result 리스트에 추가

        return result;
    }

    // 담당 : 이승환
    // TA
    @Override
    public List<String> getImageText(List<String> imageUrlList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getImageText'");
    }

    // search
    @Override
    public BusinessInfoDto getBookInfo(String bookTest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBookInfo'");
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
    public BusinessInfoDto getBookPrice(String imageStatus) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBookPrice'");
    }
}
