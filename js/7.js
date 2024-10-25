function gerarLetrasENumerosAleatorios() {
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    let resultado = '';

    // Adiciona 4 letras minúsculas aleatórias
    for (let i = 0; i < 4; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letrasMinusculas.length);
        resultado += letrasMinusculas[indiceAleatorio];
    }

    // Adiciona 4 números aleatórios
    for (let i = 0; i < 4; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Números de 0 a 9
        resultado += numeroAleatorio;
    }

    return resultado;
}

// Exibe 4 letras minúsculas seguidas de 4 números aleatórios
console.log(gerarLetrasENumerosAleatorios());
