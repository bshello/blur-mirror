package com.blur.auth.oauth.info.impl;

import java.util.Map;

import com.blur.auth.oauth.info.OAuth2UserInfo;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("account_email");
    }

}
