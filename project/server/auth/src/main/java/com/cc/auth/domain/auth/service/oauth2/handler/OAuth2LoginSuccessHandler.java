package com.cc.auth.domain.auth.service.oauth2.handler;

import com.cc.auth.domain.auth.dto.PrincipalDetails;
import com.cc.auth.domain.auth.dto.TokenMapping;
import com.cc.auth.domain.auth.service.jwt.JwtProvider.JwtProvider;
import com.cc.auth.domain.member.domain.Member;
import com.cc.auth.domain.member.repository.MemberRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private static final String TOKEN = "token";
    private static final String REFRESH_TOKEN = "refreshToken";
    private static final String REDIRECT_URL = "http://localhost:8080/login/redirect";

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

//        PrincipalDetails principalDetails =(PrincipalDetails)authentication.getPrincipal();
//        loginSuccess(response, principalDetails);

        TokenMapping tokenMapping = saveUser(authentication);
        response.sendRedirect(getRedirectUrl(tokenMapping));
    }

    private TokenMapping saveUser(Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String username = principal.getUsername();
        TokenMapping token = jwtProvider.createToken(username);
        Member member  = memberRepository.findByOauthIdentifier(username).get();
        member.setRefreshToken(token.getRefreshToken());
        memberRepository.save(member);
        return token;
    }

    private String getRedirectUrl(TokenMapping token){
        return UriComponentsBuilder.fromUriString(REDIRECT_URL)
                .queryParam(TOKEN, token.getAccessToken())
                .queryParam(REFRESH_TOKEN, token.getRefreshToken())
                .build().toUriString();
    }

    private void loginSuccess(HttpServletResponse response, PrincipalDetails principalDetails) throws IOException {

        String accessToken = jwtProvider.createAccessToken(principalDetails.getUsername());
        String refreshToken = jwtProvider.createRefreshToken();
        response.addHeader(jwtProvider.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtProvider.getRefreshHeader(), "Bearer " + refreshToken);

        jwtProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtProvider.updateRefreshToken(principalDetails.getUsername(), refreshToken);
    }
}
