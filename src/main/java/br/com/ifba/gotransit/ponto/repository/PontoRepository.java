/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.ifba.gotransit.ponto.repository;

import br.com.ifba.gotransit.ponto.model.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author bia-eduao
 */
public interface PontoRepository extends JpaRepository<Ponto, Long> {
    
}
