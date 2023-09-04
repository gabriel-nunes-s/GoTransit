package br.com.ifba.gotransit.usuario.service;

import br.com.ifba.gotransit.usuario.model.Usuario;
import org.springframework.http.ResponseEntity;


public interface IUsuarioService {

    ResponseEntity<Object> saveUsuario(Usuario usuario);
    ResponseEntity<Object> deleteUsuario(Long id);
    ResponseEntity<Object> updateUsuario(Usuario usuario);
    ResponseEntity<Object> findAllUsuarios();

}
