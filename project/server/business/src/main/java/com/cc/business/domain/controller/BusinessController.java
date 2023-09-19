package com.cc.business.domain.controller;// BusinessController.java
import com.cc.business.domain.dto.AladinResponseDto;
import com.cc.business.domain.dto.BookDto;
import com.cc.business.domain.service.BusinessService;
import com.cc.business.domain.service.ImageService;
import com.cc.business.domain.service.S3Service;
import com.cc.business.global.common.response.EnvelopeResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

@Slf4j
@Tag(name = "예제 API", description = "Swagger 테스트용 API")
@RestController
public class BusinessController {

    private BusinessService businessService;
    private S3Service s3Service;
    private ImageService imageService;

    public BusinessController(BusinessService businessService, S3Service s3Service, ImageService imageService) {
        this.businessService = businessService;
        this.s3Service = s3Service;
        this.imageService = imageService;
    }

    @PostMapping("/imageinfo")
    public ResponseEntity<EnvelopeResponse<HashMap<String, Object>>> getImageInfo(@RequestBody List<MultipartFile> imageList) throws Exception {
        log.info("이미지 정보 요청값: {}", imageList.size());
        /* S3에 이미지 저장 */
        List<String> imageUrlList = s3Service.upload(imageList);
        /* DB에 이미지 저장(추후 추가) */

        /* 글자 추출 후 책 검색 */
        AladinResponseDto aladinResponse = businessService.processImages(imageUrlList);
        BookDto bookInfo = new BookDto();
        bookInfo.setTitle(aladinResponse.getTitle());
        bookInfo.setAuthor(aladinResponse.getAuthor());
        bookInfo.setPublisher(aladinResponse.getPublisher());
        bookInfo.setImage(aladinResponse.getCover());

        HashMap<String, Object> data = new HashMap<>();
        data.put("bookInfo", bookInfo);

        EnvelopeResponse<HashMap<String, Object>> result = new EnvelopeResponse(200, "이미지 검색 성공", data);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/bookstatus")
    public ResponseEntity<EnvelopeResponse<BookDto>> getImageStatus(@RequestBody BookDto bookInfo) throws Exception {
//        String status = businessService.getImageStatus(bookInfo);
        return null;
    }
}
