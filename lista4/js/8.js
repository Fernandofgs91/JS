function gerarSenhaForte(tamanho) {
    const caracteres = [
        'abcdefghijklmnopqrstuvwxyz', // Letras minúsculas
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // Letras maiúsculas
        '0123456789'                     // Números
    ];

    let senha = '';

    for (let i = 0; i < tamanho; i++) {
        // Seleciona um conjunto de caracteres aleatoriamente (minúsculas, maiúsculas ou números)
        const conjuntoAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
        // Seleciona um caractere aleatório do conjunto escolhido
        const indiceAleatorio = Math.floor(Math.random() * conjuntoAleatorio.length);
        senha += conjuntoAleatorio[indiceAleatorio];
    }

    return senha;
}

// Exibe uma senha forte no console
console.log(gerarSenhaForte(8));
