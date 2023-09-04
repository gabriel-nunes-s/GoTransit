package br.com.ifba.gotransit.usuario.repository;

import br.com.ifba.gotransit.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}