var votos = [0, 0, 0, 0]; // Contagem inicial de votos para cada candidato

function votar(candidato) {
    // Incrementa o número de votos do candidato correspondente
    votos[candidato - 1]++;
    
    // Atualiza o texto do elemento de contagem de votos
    document.getElementById('votos' + candidato).innerText = votos[candidato - 1];
    
    // Chama a função que verifica qual candidato tem mais votos
    destacarMaisVotado();
}

function destacarMaisVotado() {
    // Encontra o número máximo de votos
    var maxVotos = Math.max(...votos);

    // Conta quantos candidatos têm o número máximo de votos
    var empate = votos.filter(voto => voto === maxVotos).length > 1;

    // Remove o destaque de todos os candidatos e restaura a cor padrão
    for (var i = 1; i <= 4; i++) {
        var candidatoElement = document.getElementById('candidato' + i);
        candidatoElement.classList.remove('mais-votado'); // Remove o destaque
        candidatoElement.style.backgroundColor = 'lightgreen'; // Volta para a cor padrão
    }

    // Destaca o(s) candidato(s) com o maior número de votos
    for (var i = 0; i < votos.length; i++) {
        if (votos[i] === maxVotos) {
            // Se houver empate, destaque em amarelo, senão, azul-escuro
            var corDestaque = empate ? 'yellow' : '#3734eb'; // Amarelo para empate, azul-escuro para maior número de votos
            document.getElementById('candidato' + (i + 1)).style.backgroundColor = corDestaque;
        }
    }
}

// Inicializa a tela destacando o candidato com mais votos
destacarMaisVotado();
