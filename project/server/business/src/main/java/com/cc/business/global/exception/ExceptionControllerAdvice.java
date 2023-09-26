package com.cc.business.global.exception;

import com.cc.business.global.common.response.EnvelopeResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestControllerAdvice
public class ExceptionControllerAdvice {

    /* 사용자 인증 에러 */
    @ExceptionHandler(value = {AuthException.class})
    public ResponseEntity<EnvelopeResponse<HashMap<String, Object>>> testErrorHandler(AuthException e) {
        log.error("사용자 인증 에러 발생");
        EnvelopeResponse result = new EnvelopeResponse(HttpStatus.UNAUTHORIZED.value(), e.getMessage());

        return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /* TA 에러 */

    /* SEARCH 에러 */

    /* SC 에러 */

    /* ANS 에러 */
}
