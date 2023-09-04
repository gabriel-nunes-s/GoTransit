package br.com.ifba.gotransit.controllers;

import br.com.ifba.gotransit.usuario.model.Usuario;
import br.com.ifba.gotransit.usuario.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/gotransit/usuario")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @PostMapping("/salvar")
    public ResponseEntity<Object> saveUsuario(@RequestBody Usuario usuario) {
        return usuarioService.saveUsuario(usuario);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Object> updateUsuario(@RequestBody Usuario usuario) {
        return usuarioService.updateUsuario(usuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable Long id) {
        return usuarioService.deleteUsuario(id);
    }

    @GetMapping("/")
    public ResponseEntity<Object> getAllUsuarios() {
        return usuarioService.findAllUsuarios();
    }

}
