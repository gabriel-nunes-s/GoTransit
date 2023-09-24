package br.com.ifba.gotransit.usuario.service;

import br.com.ifba.gotransit.usuario.model.Usuario;
import br.com.ifba.gotransit.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public ResponseEntity<Object> saveUsuario(Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O e-mail informado já existe.");
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(usuarioRepository.save(usuario));
    }

    @Override
    public ResponseEntity<Object> login(Usuario usuario) {
        Optional<Usuario> usuarioDb = usuarioRepository.findByEmail(usuario.getEmail());

        if (!usuarioDb.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("O e-mail informado está incorreto.");
        }

        if (!(usuarioDb.get().getSenha().equals(usuario.getSenha()))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A senha informada está incorreta.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(usuarioDb.get());
    }

    @Override
    public ResponseEntity<Object> deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Usuário deletado com sucesso.");
    }

    @Override
    public ResponseEntity<Object> updateUsuario(Usuario usuario) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(usuarioRepository.save(usuario));
    }

    @Override
    public ResponseEntity<Object> findAllUsuarios() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(usuarioRepository.findAll());
    }

}
