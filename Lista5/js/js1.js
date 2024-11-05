// Solicita o primeiro nome do usuário
var primeiroNome = prompt("Por favor, insira seu primeiro nome:");

// Solicita o sobrenome do usuário
var sobrenome = prompt("Por favor, insira seu sobrenome:");

// Solicita a quantidade de vezes que o nome completo deve ser exibido
var quantidade = parseInt(prompt("Por favor, insira a quantidade de vezes que deseja ver seu nome completo:"));

// Solicita a cor desejada para o nome
var corDesejada = prompt("Por favor, insira a cor que deseja ver no seu nome:");

// Função para criar o nome completo com as cores alternadas
function criarNomeColorido(primeiroNome, sobrenome, corDesejada, quantidade) {
    var resultado = "";
    for (var i = 0; i < quantidade; i++) {
        if (i % 2 === 0) {
            resultado += "<p style='color:black;'>" + primeiroNome + " " + sobrenome + "</p>";
        } else {
            resultado += "<p style='color:" + corDesejada + ";'>" + primeiroNome + " " + sobrenome + "</p>";
        }
    }
    return resultado;
}

// Exibe o resultado no corpo do documento
document.write(criarNomeColorido(primeiroNome, sobrenome, corDesejada, quantidade));