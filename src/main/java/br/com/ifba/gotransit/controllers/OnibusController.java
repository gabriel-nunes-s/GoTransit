/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.controllers;

import br.com.ifba.gotransit.onibus.model.Onibus;
import br.com.ifba.gotransit.onibus.service.IOnibusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author bia-eduao
 */

@RestController
@RequestMapping("api/gotransit/onibus")
public class OnibusController {
    
    @Autowired
    private IOnibusService onibusService;
    
    @PostMapping("/salvar")
    public ResponseEntity<Object> saveOnibus(@RequestBody Onibus onibus) {
        return onibusService.saveOnibus(onibus);
    }
    
    @PutMapping("/atualizar")
    public ResponseEntity<Object> updateOnibus(@RequestBody Onibus onibus) {
        return onibusService.updateOnibus(onibus);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOnibus(@PathVariable String id) {
        return onibusService.deleteOnibus(id);
    }
    
    @GetMapping("/")
    public ResponseEntity<Object> getAllOnibus() {
        return onibusService.findAllOnibus();
    }
}
