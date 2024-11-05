var nomeCompleto = prompt("Por favor, informe o seu nome completo:");
            
            // Calcula a quantidade de caracteres do nome (inclui espaços)
            var quantidadeCaracteres = nomeCompleto.length;

            // Cria o texto de saída usando template literals
            var mensagem = `Nome: ${nomeCompleto}<br>Quantidade de caracteres: ${quantidadeCaracteres}`;

            // Escreve a mensagem no corpo do documento
            document.write(mensagem);