package com.cc.business.domain.controller;// BusinessController.java
import com.cc.business.domain.dto.BookDto;
import com.cc.business.domain.dto.FindHistoriesResponseDto;
import com.cc.business.domain.dto.FindHistoryResponseDto;
import com.cc.business.domain.entity.BookEntity;
import com.cc.business.domain.service.BusinessService;
import com.cc.business.global.common.response.EnvelopeResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.servlet.http.HttpServletRequest;;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Tag(name = "예제 API", description = "Swagger 테스트용 API")
@RestController
public class BusinessController {

    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping("/test")
    public int test() throws Exception {
        log.info("에러발생");
        throw new Exception();
//        return isAuthorized(request);
    }

    @PostMapping("/imageinfo")
    public ResponseEntity<EnvelopeResponse<HashMap<String, Object>>> getImageInfo(HttpServletRequest request, @RequestBody List<MultipartFile> imageList) throws IOException {
        log.info("이미지 검색 컨트롤러 호출");
        BookDto bookInfo = businessService.processImages(request, imageList);
        String msg = "";
        HttpStatus status = null;
        if(bookInfo == null) {
            status = HttpStatus.NOT_FOUND;
            msg = "검색 결과가 없습니다.";
        } else {
            status = HttpStatus.OK;
            msg = "이미지 검색 성공";
        }

        HashMap<String, Object> data = new HashMap<>();
        data.put("bookInfo", bookInfo);
        log.info("최종 데이터: {}", data);

        EnvelopeResponse<HashMap<String, Object>> result = new EnvelopeResponse(status.value(), msg, data);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/bookpredict")
    public ResponseEntity<EnvelopeResponse<HashMap<String, BookEntity>>> predictBookInfo(HttpServletRequest request, @RequestBody HashMap<String, BookDto> params) throws Exception {

        BookEntity certainBookInfo = businessService.processPredictBookInfo(request, params);
        log.info("정확한 책 정보: {}", certainBookInfo);

        String msg = "";
        HttpStatus status = null;
        if(certainBookInfo == null) {
            status = HttpStatus.NOT_FOUND;
            msg = "검색 결과가 없습니다.";
        } else {
            status = HttpStatus.OK;
            msg = "책 예상 가격 분석 성공";
        }

        HashMap<String, BookEntity> data = new HashMap<>();
        data.put("predictBookInfo", certainBookInfo);

        EnvelopeResponse result = new EnvelopeResponse(status.value(), msg, data);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/history/all")
    public ResponseEntity<EnvelopeResponse<FindHistoriesResponseDto>> findHistrories(HttpServletRequest request){

        int memberId = businessService.isAuthorized(request);
        return new ResponseEntity<EnvelopeResponse<FindHistoriesResponseDto>>(new EnvelopeResponse<>(HttpStatus.OK.value(), "회원검색이력목록", businessService.findHistories(memberId)), HttpStatus.OK);
    }

    @GetMapping("/history/search")
    public ResponseEntity<EnvelopeResponse<FindHistoriesResponseDto>> SearchHistory(HttpServletRequest request, @RequestParam String keyword){

        int memberId = businessService.isAuthorized(request);
        return new ResponseEntity<EnvelopeResponse<FindHistoriesResponseDto>>(new EnvelopeResponse<>(HttpStatus.OK.value(), "회원검색이력목록", businessService.searchHistory(memberId, keyword)), HttpStatus.OK);
    };

    @GetMapping("/history/{bookId}")
    public ResponseEntity<EnvelopeResponse<FindHistoryResponseDto>> findHistory(HttpServletRequest request, @PathVariable Long bookId){
        int memberId = businessService.isAuthorized(request);
        return new ResponseEntity<EnvelopeResponse<FindHistoryResponseDto>>(new EnvelopeResponse<>(HttpStatus.OK.value(), "책 정보 검색 완료", businessService.findHistory(memberId, bookId)), HttpStatus.OK);
    }

    @DeleteMapping("/history/{bookId}")
    public ResponseEntity<EnvelopeResponse<Long>> DeleteHistory(HttpServletRequest request, @PathVariable Long bookId){

        int memberId = businessService.isAuthorized(request);
        return new ResponseEntity<EnvelopeResponse<Long>>(new EnvelopeResponse<>(HttpStatus.OK.value(), "삭제완료", businessService.deleteHistory(memberId, bookId)), HttpStatus.OK);
    }
}