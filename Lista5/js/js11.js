let texto = prompt("Digite um texto qualquer:");
            let palavra1 = prompt("Digite a primeira palavra (a ser substituída):");
            let palavra2 = prompt("Digite a segunda palavra (substituta):");

            if (texto && palavra1 && palavra2) {
                let textoAlterado = texto.replace(new RegExp(palavra1, 'g'), palavra2);
                alert("Texto alterado: " + textoAlterado);
            } else {
                alert("Por favor, preencha todos os campos.");
            }