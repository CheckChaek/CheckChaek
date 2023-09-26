package com.cc.business.global.exception;

public class AuthException extends RuntimeException {
    public AuthException() {
        super("사용자 인증 에러가 발생했습니다.");
    }
}
