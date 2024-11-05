// Solicita um texto qualquer do usuário
var texto = prompt("Por favor, insira um texto qualquer:");

// Remove espaços em branco no início e no final e divide o texto por espaços
var palavras = texto.trim().split(/\s+/);

// Conta a quantidade de palavras
var quantidadePalavras = palavras.length;

// Exibe uma mensagem de alerta com a quantidade de palavras
alert("Quantidade de palavras no texto: " + quantidadePalavras);