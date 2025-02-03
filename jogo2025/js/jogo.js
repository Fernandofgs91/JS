document.addEventListener("DOMContentLoaded", function () {
    // Ajusta o tamanho do número sorteado conforme o tamanho da tela
    function ajustarNumeroSorteado() {
        let nroSorteado = document.getElementById("nroSorteado");
        if (window.innerWidth < 480) {
            nroSorteado.style.fontSize = "15vw";
        } else if (window.innerWidth < 768) {
            nroSorteado.style.fontSize = "12vw";
        } else {
            nroSorteado.style.fontSize = "10vw";
        }
    }

    window.addEventListener("resize", ajustarNumeroSorteado);
    ajustarNumeroSorteado();
});

class Jogo {
    constructor() {
        this.iniciouJogo = false;
        this.idCronTempo = null;
        this.idCronNros = null;
        this.nivelDificuldade = null;
        this.minutos = 0;
        this.segundos = 0;
        this.niveis = {
            default: { min: 0, seg: 0, tempo: 0 },
            facil: { min: 1, seg: 30, tempo: 1200 },
            medio: { min: 1, seg: 15, tempo: 700 },
            dificil: { min: 0, seg: 30, tempo: 500 }
        };
        this.pontuacao = { acertos: 0, erros: 0, qtidadePares: 0, percentualAcertos: 0 };
        this.somFundo = new Audio("audio/somfundo.mp3"); // Áudio de fundo
        this.somFundoLigado = true; // Estado inicial do som de fundo

        this.init();
    }

    init() {
        this.configurarEventListeners();
        this.habilitarBotoes(true, false, false);
        this.configurarSomDeFundo();
    }

    configurarEventListeners() {
        document.getElementById("nivel").addEventListener("change", () => this.mudarTempo());
        document.getElementById("btPlay").addEventListener("click", () => this.iniciarJogo());
        document.getElementById("btPause").addEventListener("click", () => this.pausarJogo());
        document.getElementById("btRestart").addEventListener("click", () => this.pararJogo());
        document.getElementById("btExit").addEventListener("click", () => this.sairJogo());
        document.getElementById("nroSorteado").addEventListener("click", () => this.conferir());

        const btSom = document.getElementById("btSom");
        btSom.addEventListener("click", () => this.toggleSomFundo());
    }

    configurarSomDeFundo() {
        this.somFundo.loop = true;
        this.somFundo.volume = 0.1;
        this.somFundo.play().catch(error => console.error("Erro ao reproduzir som de fundo:", error));
    }

    toggleSomFundo() {
        const btSom = document.getElementById("btSom");
        if (this.somFundoLigado) {
            this.somFundo.pause();
            btSom.textContent = "🔇 Som Desligado.";
            btSom.classList.add("desligado");
        } else {
            this.somFundo.play();
            btSom.textContent = "🔊 Som Ligado.";
            btSom.classList.remove("desligado");
        }
        this.somFundoLigado = !this.somFundoLigado;
    }

    atualizarInterface() {
        document.getElementById("acertos").textContent = this.pontuacao.acertos;
        document.getElementById("erros").textContent = this.pontuacao.erros;
        document.getElementById("qtidadePares").textContent = this.pontuacao.qtidadePares;
        document.getElementById("percentualAcertos").textContent = `${this.pontuacao.percentualAcertos}%`;
    }

    mudarTempo() {
        if (this.iniciouJogo) this.pararJogo();
        this.tocarAudio("audio/selecao.mp3");
        const nivel = this.niveis[document.getElementById("nivel").value] || this.niveis.default;
        this.minutos = nivel.min;
        this.segundos = nivel.seg;
        this.nivelDificuldade = nivel.tempo;
        this.atualizarPainelTempo();
    }

    atualizarPainelTempo() {
        document.getElementById("min").textContent = this.minutos.toString().padStart(2, '0');
        document.getElementById("seg").textContent = this.segundos.toString().padStart(2, '0');
    }

    iniciarJogo() {
        if (document.getElementById("nivel").value === "selecione") {
            this.tocarAudio("audio/msgErro.mp3");
            document.getElementById("mensagemErro").style.display = "block";
            return;
        }
        this.iniciouJogo = true;
        this.habilitarBotoes(false, true, true);
        this.tocarAudio("audio/start.mp3");
        this.idCronNros = setInterval(() => this.trocarNumero(), this.nivelDificuldade);
        this.idCronTempo = setInterval(() => this.atualizarTempo(), 1000);
        document.getElementById("nivel").disabled = true;
        document.getElementById("mensagemErro").style.display = "none";
    }

    trocarNumero() {
        const numero = Math.floor(Math.random() * 100) + 1;
        document.getElementById("nroSorteado").textContent = numero;
        document.getElementById("nroSorteado").style.color = "black";
        if (numero % 2 === 0) this.pontuacao.qtidadePares++;
        this.pontuacao.percentualAcertos = ((this.pontuacao.acertos / this.pontuacao.qtidadePares) * 100).toFixed(1) || 0;
        this.atualizarInterface();
    }

    conferir() {
        if (!this.iniciouJogo) return;
        const valor = parseInt(document.getElementById("nroSorteado").textContent);
        if (valor % 2 === 0) {
            this.tocarAudio("audio/acerto.mp3");
            this.pontuacao.acertos++;
            document.getElementById("nroSorteado").style.color = "#00ff00";
        } else {
            this.tocarAudio("audio/erro.mp3");
            this.pontuacao.erros++;
            document.getElementById("nroSorteado").style.color = "red";
            document.getElementById("nroSorteado").classList.add("shakeNumber");
            setTimeout(() => document.getElementById("nroSorteado").classList.remove("shakeNumber"), 300);
        }
        this.atualizarInterface();
    }

    pausarJogo() {
        this.habilitarBotoes(true, false, true);
        clearInterval(this.idCronNros);
        clearInterval(this.idCronTempo);
        this.tocarAudio("audio/pause.mp3");
    }

    pararJogo() {
        this.tocarAudio("audio/restart.mp3");
        this.minutos = this.segundos = 0;
        this.iniciouJogo = false;
        document.getElementById("nivel").selectedIndex = 0;
        document.getElementById("nroSorteado").innerHTML = '<img src="img/mario.png" alt="">';
        this.pontuacao = { acertos: 0, erros: 0, qtidadePares: 0, percentualAcertos: 0 };
        this.atualizarInterface();
        this.pausarJogo();
        this.habilitarBotoes(false, false, true);
        this.somFundo.pause();
        document.getElementById("nivel").disabled = false;

        // Reinicia a página após 1 segundo
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    sairJogo() {
        this.tocarAudio("audio/exit.mp3");
        this.somFundo.pause();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }

    atualizarTempo() {
        if (this.minutos === 0 && this.segundos === 0) {
            clearInterval(this.idCronNros);
            clearInterval(this.idCronTempo);
            this.iniciouJogo = false;
            this.tocarAudio("audio/gameover.mp3");
            const fimDeJogoMensagem = document.getElementById('fimDeJogoMensagem');
            if (fimDeJogoMensagem) {
                fimDeJogoMensagem.style.display = 'block';
            }
            this.habilitarBotoes(false, false, true);
            this.somFundo.pause();
            return;
        }

        if (this.minutos === 0 && this.segundos === 10) {
            document.getElementById("min").style.color = "red";
            document.getElementById("seg").style.color = "red";
            this.tocarAudio("audio/fimtempo.mp3");
        }

        if (this.segundos === 0) {
            this.minutos--;
            this.segundos = 59;
        } else {
            this.segundos--;
        }
        this.atualizarPainelTempo();
    }

    habilitarBotoes(play, pause, stop) {
        document.getElementById("btPlay").disabled = !play;
        document.getElementById("btPause").disabled = !pause;
        document.getElementById("btRestart").disabled = !stop;
        document.getElementById("btExit").disabled = !stop;
    }

    tocarAudio(src) {
        const audio = new Audio(src);
        audio.play().catch(error => console.error("Erro ao reproduzir áudio:", error));
    }
}

// Inicializa o jogo quando a página é carregada
window.addEventListener("load", () => new Jogo());