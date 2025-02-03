 // Função para reproduzir áudio com tratamento de erros e delay
 function playSound(soundFile, delay = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const audio = new Audio(soundFile);
            audio.currentTime = 0; // Reinicia o áudio sempre que chamado
            audio.play()
                .then(() => {
                    console.log(`Som reproduzido: ${soundFile}`);
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao reproduzir áudio:', error);
                    reject(error);
                });
        }, delay);
    });
}

// Adiciona som ao focar nos inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        playSound('Audio/click.mp3').catch(error => console.error('Erro ao reproduzir som de clique:', error));
    });

    // Adiciona som ao pressionar teclas
    input.addEventListener('keydown', () => {
        const teclaAudio = new Audio('Audio/tecla.mp3');
        teclaAudio.currentTime = 0; // Reinicia o som para evitar delay
        teclaAudio.play().catch(error => console.error('Erro ao reproduzir áudio de tecla:', error));
    });
});

// Adiciona som ao clicar nos botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', async () => {
        try {
            await playSound('Audio/click.mp3');
        } catch (error) {
            console.error('Erro ao reproduzir áudio:', error);
        }
    });
});

// Adiciona som ao clicar no link "Já tem uma conta? Faça login"
const loginLink = document.querySelector('p a[href="index.html"]');
if (loginLink) {
    loginLink.addEventListener('click', async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link
        loginLink.style.pointerEvents = 'none'; // Evita múltiplos cliques

        try {
            console.log("Reproduzindo som de clique no link...");
            await playSound('Audio/click.mp3'); // Reproduz o som de clique
            await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo
            window.location.href = 'index.html'; // Redireciona após o delay
        } catch (error) {
            console.error('Erro ao reproduzir áudio do link:', error);
            loginLink.style.pointerEvents = 'auto'; // Reativa o clique caso dê erro
        }
    });
}

// Validação do formulário de cadastro
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
        const cadastroError = document.getElementById('cadastroError');
        const loginValido = document.getElementById('loginValido');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Limpa mensagens anteriores
        cadastroError.textContent = '';
        loginValido.textContent = '';

        // Função auxiliar para exibir erro e tocar som
        async function showErrorMessage(message) {
            cadastroError.textContent = message;
            await playSound('Audio/logininvalido.mp3', 500);
        }

        // Validações
        if (!nome) return await showErrorMessage('Informe um nome!');
        if (!senha) return await showErrorMessage('Informe uma senha!');
        if (!confirmarSenha) return await showErrorMessage('Confirme a senha digitada acima!');
        if (senha.length < 5) return await showErrorMessage('A senha deve ter pelo menos 5 caracteres.');
        if (senha !== confirmarSenha) return await showErrorMessage('As senhas não coincidem.');

        if (usuarios.some(u => u.nome.toLowerCase() === nome.toLowerCase())) {
            return await showErrorMessage('Usuário já existente. Tente outro.');
        }

        // Adiciona novo usuário
        usuarios.push({ nome, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        loginValido.textContent = 'Cadastro realizado com sucesso! Faça login para continuar.';

        await playSound('Audio/loginvalido.mp3');

        // Redireciona para a página de login após 1 segundo
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}
