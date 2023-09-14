package com.cc.business.domain.controller;// BusinessController.java
import com.cc.business.domain.dto.BusinessInfoDto;
import com.cc.business.domain.service.BusinessService;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
