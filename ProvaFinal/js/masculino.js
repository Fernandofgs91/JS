let contadorMario = 0;
let contadorLuigi = 0;
let personagemAtual = 'img/mario.gif';

function trocarImagem(novaImagem) {
    const personagemImg = document.getElementById('personagem');
    if (personagemImg) {
        personagemImg.src = novaImagem;
        personagemAtual = novaImagem;
    }
}

function incrementarContador() {
    if (personagemAtual === 'img/mario.gif') {
        atualizarContador('contadorMario', ++contadorMario, 'Contador do Mario: ');
    } else if (personagemAtual === 'img/luigi.gif') {
        atualizarContador('contadorLuigi', ++contadorLuigi, 'Contador do Luigi: ');
    }
}

function atualizarContador(id, valor, texto) {
    const contador = document.getElementById(id);
    if (contador) {
        contador.textContent = `${texto} ${valor}`;
    }
}
