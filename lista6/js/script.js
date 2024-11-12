var boy = document.getElementById("boy");
var textBoy = document.getElementById("textBoy");

// Objeto de personagens e suas mensagens/imagens
var personagem = {
    alegre: {img:"img/alegre.png", msg:", seja bem-vindo!"},
    assustado: {img:"img/assustado.png", msg:"O que você quer?"},
    nervoso: {img:"img/nervoso.png", msg:"Não me faça perder o meu tempo!!!"},
    pensativo: {img:"img/pensativo.png", msg:"zzzzzzz!"}
};

// Mapeamento das animações associadas a cada estado
var animationMap = {
    alegre: ["move-right"],      // Animação de movimento lateral
    nervoso: ["img-tremer"],     // Animação de tremor
    assustado: [],               // Sem animações
    pensativo: []                // Sem animações
};

// Função para atualizar a imagem, mensagem e animações do personagem
function changeBoy(personagemKey) {
    // Atualiza a imagem e a mensagem com base no personagem
    var personagemAtual = personagem[personagemKey];
    boy.src = personagemAtual.img;
    textBoy.innerHTML = personagemAtual.msg;
    
    // Remove todas as animações aplicadas anteriormente
    boy.classList.remove("move-right", "img-tremer");
    
    // Obtém as animações a serem aplicadas ao personagem atual
    var animations = animationMap[personagemKey] || [];
    
    // Adiciona as animações relevantes ao elemento
    animations.forEach(function(animationClass) {
        boy.classList.add(animationClass);
    });
}

// Evento quando o mouse entra na área da imagem (estado "assustado")
boy.addEventListener("mouseenter", function () {
    changeBoy("assustado");  // Passa a chave "assustado" em vez do objeto
});

// Evento quando o mouse sai da área da imagem (estado "pensativo")
boy.addEventListener("mouseout", function () {
    changeBoy("pensativo");  // Passa a chave "pensativo" em vez do objeto
});

// Evento de clique (verifica o nome e altera o estado para "alegre" ou "nervoso")
boy.addEventListener("click", function () {
    var nome = prompt("Qual é o seu nome?");
    if (!nome) {
        changeBoy("nervoso");  // Passa a chave "nervoso" se não tiver nome
    } else {
        personagem.alegre.msg = nome + personagem.alegre.msg;  // Adiciona o nome na mensagem "alegre"
        changeBoy("alegre");   // Passa a chave "alegre" se o nome for informado
    }
});
