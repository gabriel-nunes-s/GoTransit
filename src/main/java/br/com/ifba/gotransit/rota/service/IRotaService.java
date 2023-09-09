/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.ifba.gotransit.rota.service;

import br.com.ifba.gotransit.rota.model.Rota;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author bia-eduao
 */
public interface IRotaService {
    
    ResponseEntity<Object> saveRota(Rota rota);
    ResponseEntity<Object> deleteRota(Long id);
    ResponseEntity<Object> updateRota(Rota rota);
    ResponseEntity<Object> findAllRotas();
    
}
