package com.cc.auth.domain.auth.controller;

import com.cc.auth.domain.auth.dto.PrincipalDetails;
import com.cc.auth.domain.auth.service.AuthService;
import com.cc.auth.domain.auth.service.jwt.JwtProvider.JwtProvider;
import com.cc.auth.domain.member.domain.Member;
import com.cc.auth.global.common.response.EnvelopeResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;
    @PostMapping("/logout")
    public ResponseEntity<EnvelopeResponse<String>> logout(@AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletRequest request){

        Optional<String> accessToken = jwtProvider.extractAccessToken(request);
        Member member = principalDetails.getMember();

        return new ResponseEntity<>(new EnvelopeResponse<>(HttpStatus.OK.value(), authService.logout(member, accessToken)), HttpStatus.OK);
    }

    @DeleteMapping("/member")
    public ResponseEntity<EnvelopeResponse<String>> delete(@AuthenticationPrincipal PrincipalDetails principalDetails){
        System.out.println("delete 호출");
//        Member member = principalDetails.getMember();
        return new  ResponseEntity<>(new EnvelopeResponse<>(HttpStatus.CREATED.value(), "test성공"), HttpStatus.CREATED);

    }
}