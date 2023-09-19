package com.cc.business.domain.controller;// BusinessController.java
import com.cc.business.domain.dto.BookDto;
import com.cc.business.domain.dto.ImageInfoResponse;
import com.cc.business.domain.service.BusinessService;
import com.cc.business.global.common.response.EnvelopeResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Tag(name = "예제 API", description = "Swagger 테스트용 API")
@RestController
public class BusinessController {

    private BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping("/imageinfo")
    public ResponseEntity<EnvelopeResponse<HashMap<String, Object>>> getImageInfo(@RequestBody List<String> imageList) {
        BookDto bookinfo = businessService.processImages(imageList);
        ImageInfoResponse imgResponse = new ImageInfoResponse();
        imgResponse.setTitle(bookinfo.getTitle());
        imgResponse.setAuthor(bookinfo.getAuthor());
        imgResponse.setPublisher(bookinfo.getPublisher());
        imgResponse.setImage(bookinfo.getLink());

        HashMap<String, Object> data = new HashMap<>();
        data.put("bookInfo", imgResponse);

        EnvelopeResponse<HashMap<String, Object>> result = new EnvelopeResponse(200, "이미지 검색 성공", data);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/bookstatus")
    public ResponseEntity<EnvelopeResponse<BookDto>> getImageStatus(@RequestBody List<String> imageList) throws JsonProcessingException{
        String status = businessService.getImageStatus(imageList);
        return null;
    }
}
