function gerarLetraMinusculaAleatoria() {
    const letrasMinusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const indiceAleatorio = Math.floor(Math.random() * letrasMinusculas.length);
    return letrasMinusculas[indiceAleatorio];
}

// Exibe uma letra minúscula aleatória
console.log(gerarLetraMinusculaAleatoria());
