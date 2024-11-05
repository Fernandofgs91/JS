// Solicita um texto do usuário
var texto = prompt("Por favor, insira um texto:");

// Remove espaços em branco no início e no final e divide o texto em palavras
var palavras = texto.trim().split(/\s+/);

// Obtém a primeira e a última palavra
var primeiraPalavra = palavras[0];
var ultimaPalavra = palavras[palavras.length - 1];

// Concatena a primeira e a última palavra com um espaço entre elas
var resultado = primeiraPalavra + " " + ultimaPalavra;

// Exibe o resultado no corpo do documento
document.write("<p>Resultado: " + resultado + "</p>");
