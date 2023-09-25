document.getElementById("register-form").addEventListener("submit", (event) => {
    // Impede o comportamento default ao enviar o formulário //
    event.preventDefault();

    // Obtém os dados dos campos do formulário //
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Verifica se as senhas são idênticas // 
    if (password !== confirmPassword) {
        return alert("As senhas não coincidem, tente novamente!")
    }

    // Cria um objeto com os dados do usuário //
    const newUser = {
        nome: username,
        email: email,
        senha: password
    }

    // Realizando a requisição HTTP com o método POST para a api do goTransit que salvará os dados do novo usuário // 
    postMethod("usuario/salvar", newUser)
    .then(response => {
        // Se for necessário, adicionar a lógica aqui //

        // Redireciona o usuário para a página de login //
        window.location.pathname = "../login/login.html";
    })
    .catch(error => {
        // Se for necessário, adicionar a lógica aqui //
        alert(error);
    });

});