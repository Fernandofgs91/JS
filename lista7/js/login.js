document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const user = usuarios.find(u => u.usuario.toLowerCase() === usuario.toLowerCase());

    if (!user) {
        document.getElementById('loginError').textContent = 'Usuário inexistente. Tente outro.';
    } else if (user.senha !== senha) {
        document.getElementById('loginError').textContent = 'Senha inválida. Tente novamente.';
    } else {
        alert('Login realizado com sucesso!');
        window.location.href = 'jogo.html';
    }
});
