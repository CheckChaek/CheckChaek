package com.cc.business.domain.controller;// BusinessController.java
import com.cc.business.domain.dto.BusinessInfoDto;
import com.cc.business.domain.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/business")
public class BusinessController {
    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping("/imageInfo")
    public List<BusinessInfoDto> getImageInfo(@RequestBody List<String> imageList) {
        return businessService.processImages(imageList);
    }
}
