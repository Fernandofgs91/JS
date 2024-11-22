document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (!nome || !usuario || !senha) {
        document.getElementById('cadastroError').textContent = 'Todos os campos são obrigatórios!';
        return;
    }

    if (senha.length < 5) {
        document.getElementById('cadastroError').textContent = 'A senha deve ter pelo menos 5 caracteres.';
        return;
    }

    if (usuarios.some(u => u.usuario.toLowerCase() === usuario.toLowerCase())) {
        document.getElementById('cadastroError').textContent = 'Usuário já existente. Tente outro.';
        return;
    }

    usuarios.push({ nome, usuario, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    window.location.href = 'login.html';
});
