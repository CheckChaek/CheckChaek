package com.cc.business.domain.controller;// BusinessController.java
import com.cc.business.domain.dto.BusinessInfoDto;
import com.cc.business.domain.service.BusinessService;
import com.fasterxml.jackson.core.JsonProcessingException;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "예제 API", description = "Swagger 테스트용 API")
@RestController
@RequestMapping("/business")
public class BusinessController {
    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping("/imageInfo")
    public List<BusinessInfoDto> getImageInfo(@RequestBody List<String> imageList) {
        return businessService.processImages(imageList);
    }

    @PostMapping("/SC/bookstatus")
    public String getImageStatus(@RequestBody List<String> imageList) throws JsonProcessingException{
        return businessService.getImageStatus(imageList);
    }
}
