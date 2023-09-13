package com.cc.business.domain.service;// BusinessServiceImpl.java
import com.cc.business.domain.dto.BusinessInfoDto;
import com.cc.business.domain.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessServiceImpl implements BusinessService {
    private final BusinessRepository businessRepository;

    @Autowired
    public BusinessServiceImpl(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @Override
    public List<BusinessInfoDto> processImages(List<String> imageList) {
        // 이미지 처리 및 정보 추출 로직을 구현
        List<BusinessInfoDto> result = new ArrayList<>();

        // 각 이미지에 대한 처리와 정보 추출을 수행하고 결과를 result 리스트에 추가

        return result;
    }
}
