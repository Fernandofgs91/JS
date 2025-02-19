const elementos = {
    inputUsuario: document.getElementById("usuario"),
    output: document.getElementById("output"),
    imagem: document.getElementById("imagem"),
    botoes: {
        clique: document.getElementById("btnCliqueMe"),
        mouseOver: document.getElementById("btnApenasColoqueMouse"),
        mouseLeave: document.getElementById("btnColoqueETireMouse"),
        aleatoria: document.getElementById("btnImagemAleatoria")
    }
};

const imagens = ["./img/emoji1.jpg", "./img/emoji2.jpg", "./img/emoji3.jpg", "./img/emoji4.jpg"];

const exibirNomeUsuario = () => {
    const nome = elementos.inputUsuario.value.trim();
    if (nome) elementos.output.textContent = `Olá, ${nome}!`;
};

const alterarImagem = (src) => {
    elementos.imagem.src = src;
    elementos.imagem.style.display = "block";
};

const eventos = [
    { elem: elementos.botoes.clique, evento: "click", img: imagens[0] },
    { elem: elementos.botoes.mouseOver, evento: "mouseover", img: imagens[1] },
    { elem: elementos.botoes.mouseLeave, evento: "mouseleave", img: imagens[2] }
];

eventos.forEach(({ elem, evento, img }) => {
    elem.addEventListener(evento, () => {
        exibirNomeUsuario();
        alterarImagem(img);
    });
});

elementos.botoes.aleatoria.addEventListener("click", () => {
    alterarImagem(imagens[Math.floor(Math.random() * imagens.length)]);
});
