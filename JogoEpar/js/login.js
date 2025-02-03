// Função para reproduzir áudio com tratamento de erros e delay
function playSound(soundFile, delay = 0) {
    return new Promise((resolve, reject) => {
        if (!window.Audio) {
            console.warn("API Audio não suportada neste navegador.");
            return resolve();
        }

        setTimeout(() => {
            try {
                const audio = new Audio(soundFile);
                audio.currentTime = 0;

                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => resolve())
                        .catch(error => {
                            console.warn(`Erro ao reproduzir áudio (${soundFile}):`, error);
                            resolve(); // Continua a execução mesmo se houver erro
                        });
                } else {
                    resolve();
                }
            } catch (error) {
                console.error("Erro inesperado ao tentar tocar o áudio:", error);
                reject(error);
            }
        }, delay);
    });
}

// Seleciona elementos do DOM
const loginForm = document.getElementById("loginForm");
const usuarioInput = document.getElementById("usuario");
const senhaInput = document.getElementById("senha");
const loginError = document.getElementById("loginError");
const loginValido = document.getElementById("loginValido");

// Adiciona som ao focar nos inputs
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("focus", () => {
        playSound("Audio/click.mp3").catch(() => {});
    }, { passive: true });

    // Som ao digitar (impede sobrecarga de som)
    let isPlaying = false;
    input.addEventListener("keydown", (event) => {
        if (!isPlaying && event.key.length === 1) { // Apenas para teclas imprimíveis
            isPlaying = true;
            playSound("Audio/tecla.mp3")
                .finally(() => isPlaying = false);
        }
    }, { passive: true });
});

// Adiciona som ao clicar nos botões
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", async () => {
        await playSound("Audio/click.mp3");
    }, { passive: true });
});

// Validação do formulário de login
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();

    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    } catch (error) {
        console.error("Erro ao acessar localStorage:", error);
    }

    // Limpa mensagens anteriores
    loginError.textContent = "";
    loginValido.textContent = "";

    // Função auxiliar para exibir erro e tocar som
    async function showErrorMessage(message) {
        loginError.textContent = message;
        await playSound("Audio/logininvalido.mp3", 500);
    }

    // Validações
    if (!usuario) return await showErrorMessage("Informe um usuário!");
    if (!senha) return await showErrorMessage("Informe sua senha!");

    // Verifica se o usuário existe no localStorage
    const usuarioEncontrado = usuarios.find(u => u.nome.toLowerCase() === usuario.toLowerCase() && u.senha === senha);

    if (!usuarioEncontrado) {
        return await showErrorMessage("Usuário ou senha incorretos!");
    }

    // Login bem-sucedido
    loginValido.textContent = "Login realizado com sucesso!";
    await playSound("Audio/loginvalido.mp3");

    // Redireciona para a página do jogo após 1,5 segundos
    setTimeout(() => {
        window.location.href = "jogo.html";
    }, 1500);
});

// Adiciona som ao clicar no link "Cadastre-se"
const cadastroLink = document.querySelector('p a[href="cadastro.html"]');
if (cadastroLink) {
    cadastroLink.addEventListener("click", async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link
        cadastroLink.style.pointerEvents = "none"; // Evita múltiplos cliques

        try {
            await playSound("Audio/click.mp3");
            setTimeout(() => {
                window.location.href = "cadastro.html";
            }, 1000);
        } catch (error) {
            console.error("Erro ao reproduzir áudio do link:", error);
            cadastroLink.style.pointerEvents = "auto"; // Reativa o clique caso dê erro
        }
    }, { passive: true });
}
