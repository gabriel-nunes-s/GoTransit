package br.com.ifba.gotransit.onibus.repository;

import br.com.ifba.gotransit.onibus.model.Onibus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author bia-eduao
 */
public interface OnibusRepository extends JpaRepository<Onibus, String>{
    
}
