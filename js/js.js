function gerarLetraMinusculaAleatoria() {
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const indiceAleatorio = Math.floor(Math.random() * letrasMinusculas.length);
    return letrasMinusculas[indiceAleatorio];
}

// Exibe uma letra minúscula aleatória
console.log(gerarLetraMinusculaAleatoria());
