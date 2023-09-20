package com.cc.business.domain.repository;

import com.cc.business.domain.entity.BookImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookImageRepository extends JpaRepository<BookImageEntity, Long> {
}
