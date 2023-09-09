/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.controllers;

import br.com.ifba.gotransit.rota.model.Rota;
import br.com.ifba.gotransit.rota.service.IRotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author bia-eduao
 */

@RestController
@RequestMapping("api/gotransit/rota")
public class RotaController {
    
    @Autowired
    private IRotaService rotaService;
    
    @PostMapping("/salvar")
    public ResponseEntity<Object> saveRota(@RequestBody Rota rota){
        return rotaService.saveRota(rota);
    }
    
    @PutMapping("/atualizar")
    public ResponseEntity<Object> updateRota(@RequestBody Rota rota){
        return rotaService.updateRota(rota);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRota(@PathVariable Long id){
        return rotaService.deleteRota(id);
    }
    
    @GetMapping("/")
    public ResponseEntity<Object> getAllRotas(){
        return rotaService.findAllRotas();
    }
    
}
