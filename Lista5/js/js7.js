// Solicita o texto do usuário
var texto = prompt("Por favor, insira um texto:");

// Solicita a letra do usuário
var letra = prompt("Por favor, insira uma letra:");

// Remove espaços em branco no início e no final e divide o texto em palavras
var palavras = texto.trim().split(/\s+/);

// Filtra as palavras que começam com a letra informada
var palavrasFiltradas = palavras.filter(function(palavra) {
    return palavra.toLowerCase().startsWith(letra.toLowerCase());
});

// Exibe o resultado no corpo do documento usando document.write
if (palavrasFiltradas.length > 0) {
    document.write("<p>Palavras que começam com a letra '" + letra + "': " + palavrasFiltradas.join(" ") + "</p>");
} else {
    document.write("<p>Nenhuma palavra encontrada que comece com a letra '" + letra + "'.</p>");
}
