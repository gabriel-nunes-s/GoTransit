/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.ifba.gotransit.rota.repository;

import br.com.ifba.gotransit.rota.model.Rota;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author bia-eduao
 */
public interface RotaRepository extends JpaRepository<Rota, Long>{
    
}
