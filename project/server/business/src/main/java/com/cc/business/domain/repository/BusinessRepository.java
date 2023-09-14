package com.cc.business.domain.repository;// BusinessRepository.java
import com.cc.business.domain.entity.BusinessEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<BusinessEntity, Long> {
}
