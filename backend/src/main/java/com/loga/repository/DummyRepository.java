package com.loga.repository;

import com.loga.model.Dummy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DummyRepository extends JpaRepository<Dummy, Long> {

    Dummy findByWording(String name);

    @Query("Select dummy from Dummy as dummy where dummy.wording like %:wording% or "
            + "dummy.description like %:wording%")
    Page<Dummy> customSearch(@Param("wording") String wording, Pageable pageable);

    @Query("select dummy From Dummy as dummy order by dummy.createdDate desc ")
    List<Dummy> findAllOrderByCreatedDate();

}

