package com.cc.business.domain.controller;// BusinessController.java
import com.cc.business.domain.controller.openfeign.AuthOpenFeign;
import com.cc.business.domain.dto.AladinResponseDto;
import com.cc.business.domain.dto.BookDto;
import com.cc.business.domain.dto.FindHistroyResponseDto;
import com.cc.business.domain.entity.BookEntity;
import com.cc.business.domain.service.BusinessService;
import com.cc.business.domain.service.ImageService;
import com.cc.business.domain.service.S3Service;
import com.cc.business.global.common.response.EnvelopeResponse;

import com.cc.business.global.exception.AuthException;
import feign.FeignException;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Tag(name = "예제 API", description = "Swagger 테스트용 API")
@RestController
@RequiredArgsConstructor
public class BusinessController {

    private final BusinessService businessService;

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
        if(bookInfo == null) {
            msg = "검색 결과가 없습니다.";
        } else {
            msg = "이미지 검색 성공";
        }

        HashMap<String, Object> data = new HashMap<>();
        data.put("bookInfo", bookInfo);
        log.info("최종 데이터: {}", data);

        EnvelopeResponse<HashMap<String, Object>> result = new EnvelopeResponse(200, msg, data);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

//    @PostMapping("/bookpredict")
//    public ResponseEntity<EnvelopeResponse<HashMap<String, BookEntity>>> predictBookInfo(HttpServletRequest request, HttpServletResponse response, @RequestBody HashMap<String, BookDto> params) throws Exception {
//
//        int memberId = isAuthorized(request, response);
//        log.info("사용자 아이디: {}", memberId);
//        log.info("수정된 책 정보 요청값: {}", params.get("bookInfo"));
//        BookDto editedBookInfo = params.get("bookInfo");
//
//        /* 수정된 책 정보를 이용하여 다시 알라딘 API 검색 */
//        BookEntity certainBookInfo = businessService.searchCertainBookInfo(editedBookInfo);
//        log.info("정확한 책 정보: {}", certainBookInfo);
//        String msg;
//
//        /* 책ID를 이용하여 S3에 저장된 이미지 리스트 호출  */
//        List<String> imageUrlList = businessService.getImageUrlList(editedBookInfo.getBookId());
//        log.info("S3에 저장된 이미지 목록: {}", imageUrlList);
//
//        if(certainBookInfo == null) {
//            msg = "검색한 책 정보가 없습니다.";
//            /* 책 정보 못찾으면 기존에 저장했던 이미지들 삭제 해야할듯? */
//
//        } else {
//            /* imageUrlList를 이용하여 책의 상태 반환 */
//            String imageStatus = businessService.getImageStatus(imageUrlList);
//            log.info("책의 상태: {}", imageStatus);
//            certainBookInfo.setStatus(imageStatus);
//
//            /* 책의 상태를 이용하여 재평가된 책의 가격 반환 */
//            int bookPrice = businessService.getBookPrice(certainBookInfo);
//            log.info("재평가된 책의 가격: {}", bookPrice);
//            certainBookInfo.setEstimatedPrice(bookPrice);
//
//            /* 재검색된 책의 정보 DB에 저장 */
//            certainBookInfo.setBookId(editedBookInfo.getBookId());
//            certainBookInfo.setMemberId(memberId);
//            businessService.saveCertainBookInfo(certainBookInfo);
//
//            log.info("최종 데이터: {}", certainBookInfo);
//            msg = "책 검색에 성공했습니다.";
//        }
//
//        HashMap<String, BookEntity> data = new HashMap<>();
//        data.put("predictBookInfo", certainBookInfo);
//
//        EnvelopeResponse result = new EnvelopeResponse(200, msg, data);
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }

//    @GetMapping("/history/all")
//    public ResponseEntity<EnvelopeResponse<FindHistroyResponseDto>> findHistrory(HttpServletRequest request){
//
//        int memberId = isAuthorized(request);
//        return new ResponseEntity<EnvelopeResponse<FindHistroyResponseDto>>(new EnvelopeResponse<>(HttpStatus.OK.value(), "회원검색이력목록", businessService.findHistory(memberId)), HttpStatus.OK);
//    }
//
//    @GetMapping("/history/search")
//    public ResponseEntity<EnvelopeResponse<FindHistroyResponseDto>> SearchHistory(HttpServletRequest request, @RequestParam String keyword){
//
//        int memberId = isAuthorized(request);
//        return new ResponseEntity<EnvelopeResponse<FindHistroyResponseDto>>(new EnvelopeResponse<>(HttpStatus.OK.value(), "회원검색이력목록", businessService.searchHistory(memberId, keyword)), HttpStatus.OK);
//    };
//
//    @DeleteMapping("/history/{bookId}")
//    public ResponseEntity<EnvelopeResponse<Long>> DeleteHistory(HttpServletRequest request, @PathVariable Long bookId){
//
//        int memberId = isAuthorized(request);
//        return new ResponseEntity<EnvelopeResponse<Long>>(new EnvelopeResponse<>(HttpStatus.OK.value(), "삭제완료", businessService.deleteHistory(memberId, bookId)), HttpStatus.OK);
//    }
}