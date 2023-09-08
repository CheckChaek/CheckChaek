package com.cc.auth.domain.auth.service.oauth2.provider;

import com.cc.auth.domain.member.domain.OauthType;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{

    private Map<String, Object> attributes;

    public KakaoUserInfo(Map<String, Object> attributes){
        this.attributes=attributes;
    }
    @Override
    public String getProviderId() {
        return (String) attributes.get("id").toString();
    }

    @Override
    public OauthType getProvider() {
        return OauthType.KAKAO;
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return null;
    }
}