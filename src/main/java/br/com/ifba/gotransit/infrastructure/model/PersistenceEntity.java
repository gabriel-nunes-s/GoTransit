package br.com.ifba.gotransit.infrastructure.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class PersistenceEntity {
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
