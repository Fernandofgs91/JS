function gerarLetraMinusculaAleatoria() {
    const letrasMinusculas = '0123456789';
    const indiceAleatorio = Math.floor(Math.random() * letrasMinusculas.length);
    return letrasMinusculas[indiceAleatorio];
}

// Exibe uma letra minúscula aleatória
console.log(gerarLetraMinusculaAleatoria());
