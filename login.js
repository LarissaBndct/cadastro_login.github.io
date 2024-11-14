function login(event) {
    event.preventDefault(); // Evita o envio do formulário

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Credenciais fixas para demonstração
    const validUsername = "user@user";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
        window.location.href = "menu.html";
    } else {
        errorMessage.textContent = "Usuário ou senha incorretos!";
        errorMessage.style.display = "block";
    }
}
