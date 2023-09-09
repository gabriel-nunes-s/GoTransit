/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.controllers;

import br.com.ifba.gotransit.ponto.model.Ponto;
import br.com.ifba.gotransit.ponto.service.IPontoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author bia-eduao
 */

@RestController
@RequestMapping("api/gotransit/ponto")
public class PontoController {
    
    @Autowired
    private IPontoService pontoService;
    
    @PostMapping("/salvar")
    public ResponseEntity<Object> savePonto(@RequestBody Ponto ponto){
        return pontoService.savePonto(ponto);
    }
    
    @PutMapping("/atualizar")
    public ResponseEntity<Object> updatePonto(@RequestBody Ponto ponto){
        return pontoService.updatePonto(ponto);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePonto(@PathVariable Long id){
        return pontoService.deletePonto(id);
    }
    
    @GetMapping("/")
    public ResponseEntity<Object> getAllPontos(){
        return pontoService.findAllPontos();
    }
    
}
