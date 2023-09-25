document.getElementById("login-form").addEventListener("submit", (event) => {
    // Impede o comportamento default ao enviar o formulário //
    event.preventDefault();

    // Obtém os dados dos campos do formulário //
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Cria um objeto com os dados do login //
    const login = {
        email: email,
        senha: password
    }

    // Realizando a requisição HTTP com o método POST para a api do goTransit que validará os dados do login // 
    postMethod("usuario/login", login)
    .then((response) => {
        // Se for necessário, adicionar a lógica aqui //

         // Redireciona o usuário para a página inicial //
        window.location.pathname = "../index.html";
    })
    .catch((error) => {
        alert(error);
    });
});