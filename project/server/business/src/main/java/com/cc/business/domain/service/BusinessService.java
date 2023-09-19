package com.cc.business.domain.service;// BusinessService.java
import com.cc.business.domain.dto.AladinResponseDto;
import com.cc.business.domain.dto.BusinessInfoDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface BusinessService {
    // 이미지 프로세스 전체를 담당
    AladinResponseDto processImages(List<String> imageUrlList);

    // TA 서버에 이미지 정보를 전송하고
    List<String> getImageText(List<String> imageList);

    // search 서버에 텍스트를 입력하면 검색 결과를 반환
    AladinResponseDto getBookInfo(List<String> imageList);

    // sc 서버에 이미지 정보를 전송하면 상태 반환
    String getImageStatus(List<String> imageUrlList) throws JsonProcessingException;

    // ans 서버에 상태와 가격을 전송하면 가격 결과 반환;
    BusinessInfoDto getBookPrice(String imageStatus);
}
