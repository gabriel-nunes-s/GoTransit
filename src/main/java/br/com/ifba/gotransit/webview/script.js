// Função para criar um novo usuário
function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const busPreferences = document.getElementById('busPreferences').value;
    const routePreferences = document.getElementById('routePreferences').value;

    const userData = {
        nome: name,
        email: email,
        senha: password,
        onibusPreferidos: busPreferences,
        rotasPreferidas: routePreferences
    };

    fetch('http://localhost:8080/api/gotransit/usuario/salvar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário criado:', data);
            getUsers();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Função para buscar e exibir todos os usuários
function getUsers() {
    fetch('http://localhost:8080/api/gotransit/usuario/')
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('userTableBody');
            userTableBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.onibusPreferidos}</td>
                <td>${user.rotasPreferidas}</td>
                <td>
                    <button onclick="editUser()">Editar</button>
                    <button onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            `;

                userTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Função para editar um usuário
function editUser() {
    const userId = document.getElementById('editUserId').value;
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const password = document.getElementById('editPassword').value;
    const busPreferences = document.getElementById('editBusPreferences').value;
    const routePreferences = document.getElementById('editRoutePreferences').value;

    const userData = {
        id: userId,
        nome: name,
        email: email,
        senha: password,
        onibusPreferidos: busPreferences,
        rotasPreferidas: routePreferences
    };

    console.log(userData.id);

    fetch(`http://localhost:8080/api/gotransit/usuario/atualizar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário editado:', data);
            getUsers();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Função para excluir um usuário
function deleteUser(userId) {
    fetch(`http://localhost:8080/api/gotransit/usuario/${userId}`, {
        method: 'DELETE'
    })
        .then(data => {
            console.log('Usuário excluído:');
            getUsers();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Ao carregar a página, exibe a lista de usuários
getUsers();