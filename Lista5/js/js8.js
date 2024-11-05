 // Solicita o texto do usuário
 var texto = prompt("Por favor, insira um texto:");

 // Remove espaços no início e no fim e divide o texto em palavras
 var palavras = texto.trim().split(/\s+/);

 // Inicializa um objeto para agrupar as palavras por letras
 var palavrasPorLetra = {};

 // Preenche o objeto com as letras do alfabeto (a-z)
 for (var i = 97; i <= 122; i++) {
     var letra = String.fromCharCode(i); // Converte o código ASCII para letra
     palavrasPorLetra[letra] = []; // Cria uma lista vazia para cada letra
 }

 // Percorre todas as palavras
 for (var i = 0; i < palavras.length; i++) {
     var palavra = palavras[i].toLowerCase(); // Converte para minúsculas para comparar
     var primeiraLetra = palavra.charAt(0); // Pega a primeira letra da palavra

     // Se a palavra começar com uma letra do alfabeto (a-z), adiciona ao grupo correspondente
     if (palavrasPorLetra[primeiraLetra]) {
         palavrasPorLetra[primeiraLetra].push(palavra);
     }
 }

 // Exibe o resultado no corpo do documento, agrupando por letra
 document.write("<h1>Palavras agrupadas por letra</h1>");
 document.write("<p>Palavras iniciadas com a letra</p>");
 document.write("<ul>"); // Inicia uma lista não ordenada

 for (var i = 97; i <= 122; i++) {
     var letra = String.fromCharCode(i);
     var listaPalavras = palavrasPorLetra[letra].join(' '); // Junta as palavras separadas por espaço

     if (listaPalavras) {
         // Exibe cada grupo de palavras dentro de um item de lista
         document.write("<li><strong>" + letra.toUpperCase() + ":</strong> " + listaPalavras + "</li>");
     }
 }

 document.write("</ul>"); // Fecha a lista não ordenada