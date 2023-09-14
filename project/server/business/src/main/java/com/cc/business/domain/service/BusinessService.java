package com.cc.business.domain.service;// BusinessService.java
import com.cc.business.domain.dto.BusinessInfoDto;

import java.util.List;

public interface BusinessService {
    List<BusinessInfoDto> processImages(List<String> imageList);
}
