function gerarLetrasMinusculasAleatorias(numero) {
    const letrasMinusculas = '0123456789';
    let letrasAleatorias = '';

    for (let i = 0; i < numero; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letrasMinusculas.length);
        letrasAleatorias += letrasMinusculas[indiceAleatorio];
    }

    return letrasAleatorias;
}

// Exibe 4 letras minúsculas aleatórias
console.log(gerarLetrasMinusculasAleatorias(4));
