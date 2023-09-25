const PORT = 8080;
const URL = `http://localhost:${PORT}/api/gotransit/`;

async function getMethod(endpoint) {
    const response = await fetch(URL + endpoint);
    return await response.json();
}

async function postMethod(endpoint, body) {
    const response = await fetch(URL + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        return await response.json();
    }
    
    throw new Error(await response.text())
}

async function putMethod(endpoint, body) {
    const response = await fetch(URL + endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        return await response.json();
    }
    
    throw new Error(await response.text())
}

async function deleteMethod(endpoint, id) {
    const response = await fetch(URL + endpoint + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.headers.get("content-type").startsWith('application/json;')) {
        return await response.json();
    }
    return await response.text();
}


// >> Exemplos << //

/*
// Exibe todos os usuário salvos //
getMethod('usuario/').then(data => console.log(data));

const novoUsuario = {
    nome: 'teste',
    email: 'teste@gmail.com',
    senha: 'teste'
}

// Salva o novo usuário //
postMethod('usuario/salvar', novoUsuario).then((usuarioSalvo) => {

    // Exibe o novo usuário salvo //
    console.log(`O usuário salvo foi: ${JSON.stringify(usuarioSalvo)}`);

    // Atualiza o nome do usuário salvo //
    usuarioSalvo.nome = 'teste atualizado';

    // Atualiza o usuário //
    putMethod('usuario/atualizar', usuarioSalvo).then((usuarioAtualizado) => {
        console.log(`O usuário atualizado foi: ${JSON.stringify(usuarioAtualizado)}`);
    });

    setTimeout(() => {
        // Deleta o usuário //
        deleteMethod('usuario/', usuarioSalvo.id).then((responde) => console.log(responde));   
    }, 2000);
});
*/

// >> Fim dos exemplos << //
