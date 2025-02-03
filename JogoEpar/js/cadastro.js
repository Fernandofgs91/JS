// Função para reproduzir áudio com tratamento de erros e compatibilidade
function playSound(soundFile, delay = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const audio = new Audio(soundFile);
                
                // Garante que o áudio pode ser reproduzido
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => resolve())
                        .catch(error => {
                            console.warn(`Falha ao reproduzir áudio (${soundFile}):`, error);
                            reject(error);
                        });
                } else {
                    resolve();
                }
            } catch (error) {
                console.error("Erro ao tentar reproduzir áudio:", error);
                reject(error);
            }
        }, delay);
    });
}

// Adiciona som ao focar nos inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', async () => {
        try {
            await playSound('Audio/click.mp3');
        } catch (error) {
            console.error("Erro ao reproduzir som de clique:", error);
        }
    });

    // Adiciona som ao pressionar teclas
    input.addEventListener('keydown', async () => {
        try {
            await playSound('Audio/tecla.mp3');
        } catch (error) {
            console.error("Erro ao reproduzir áudio de tecla:", error);
        }
    });
});

// Adiciona som ao clicar nos botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', async () => {
        try {
            await playSound('Audio/click.mp3');
        } catch (error) {
            console.error("Erro ao reproduzir áudio:", error);
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
            await playSound('Audio/click.mp3');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // Redireciona após 1 segundo
        } catch (error) {
            console.error("Erro ao reproduzir áudio do link:", error);
            loginLink.style.pointerEvents = 'auto'; // Reativa o clique caso dê erro
        }
    });
}

// Validação do formulário de cadastro
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome')?.value.trim();
        const senha = document.getElementById('senha')?.value.trim();
        const confirmarSenha = document.getElementById('confirmarSenha')?.value.trim();
        const cadastroError = document.getElementById('cadastroError');
        const loginValido = document.getElementById('loginValido');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Limpa mensagens anteriores
        if (cadastroError) cadastroError.textContent = '';
        if (loginValido) loginValido.textContent = '';

        // Função auxiliar para exibir erro e tocar som
        async function showErrorMessage(message) {
            if (cadastroError) cadastroError.textContent = message;
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

        if (loginValido) loginValido.textContent = 'Cadastro realizado com sucesso! Faça login para continuar.';

        await playSound('Audio/loginvalido.mp3');

        // Redireciona para a página de login após 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}
