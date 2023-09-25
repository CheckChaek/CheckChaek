package com.cc.business.global.advice;

import com.cc.business.domain.controller.BusinessController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(annotations = RestController.class)
public class ExceptionControllerAdvice {

    /* 테스트용 */
    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<String> testErrorHandler(Exception e) {
        log.info("예외컨트롤러 호출 {}", e.getMessage());
        return new ResponseEntity<>("에러 발생 테스트", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
