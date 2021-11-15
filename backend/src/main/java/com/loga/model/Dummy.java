package com.loga.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dummies")
public class Dummy implements Serializable {

    @Id
    @GeneratedValue
    protected Long id;

    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    protected Date lastModifiedDate;

    protected String lastModifiedBy;

    protected String createdBy;

    @Column(name = "wording", nullable = false)
    private String wording;

    @Column(name = "description")
    private String description;


    public String toLabel() {
        return wording;
    }

}
