package com.cc.business.domain.controller.openfeign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name="AuthOpenFeign", url = "http://j9a606.p.ssafy.io:8081")
public interface AuthOpenFeign {

    @GetMapping("/authorization")
    int connectToAuthServer(
            @RequestHeader String Authorization,
            @RequestHeader String AuthorizationRefresh
    );
}