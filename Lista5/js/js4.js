var nomeCompleto = prompt("Por favor, informe o seu nome completo:");
            
// Divide o nome completo em partes (usando espaço como separador)
var partesNome = nomeCompleto.split(" ");

// Extrai o primeiro nome e transforma-o em letras maiúsculas
var primeiroNome = partesNome[0].toUpperCase();

// Extrai o restante do nome (do segundo em diante) e transforma em minúsculas
var restanteNome = partesNome.slice(1).join(" ").toLowerCase();

// Cria o nome formatado: primeiro nome em maiúsculas + restante do nome em minúsculas
var nomeFormatado = primeiroNome + " " + restanteNome;

// Exibe uma mensagem de alerta com o nome formatado
alert("Nome formatado: " + nomeFormatado);