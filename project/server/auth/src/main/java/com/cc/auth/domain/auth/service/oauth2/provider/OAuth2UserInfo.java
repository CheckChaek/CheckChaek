package com.cc.auth.domain.auth.service.oauth2.provider;

import com.cc.auth.domain.member.domain.OauthType;

public interface OAuth2UserInfo {
    String getProviderId();
    OauthType getProvider();
    String getEmail();
    String getName();

}
