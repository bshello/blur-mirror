package com.blur.user.api.entity;

public enum ProviderType {

    LOCAL(Social.LOCAL),
    KAKAO(Social.KAKAO),
    NAVER(Social.NAVER),
    GOOGLE(Social.GOOGLE)

    ;
    private final String social;
    ProviderType(String social){this.social=social;}
    public static class Social{
        public static final String LOCAL="SOCIAL_STANDARD";
        public static final String KAKAO = "SOCIAL_KAKAO";
        public static final String NAVER = "SOCIAL_NAVER";
        public static final String GOOGLE = "SOCIAL_GOOGLE";
    }
}
