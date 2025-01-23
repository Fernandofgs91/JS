window.addEventListener("DOMContentLoaded", function () {
    function adicionarValidacao(campoId, botaoId, padrao) {
        var campo = document.getElementById(campoId);
        var botao = document.getElementById(botaoId);

        botao.addEventListener("click", function () {
            if (padrao.test(campo.value)) {
                alert("Válido");
            } else {
                alert("Inválido");
            }
        });
    }

    adicionarValidacao("txtBinario", "btnValidarBinario", /^[01]+$/); // Números binários
    adicionarValidacao("txtHexadecimal", "btnValidarHexadecimal", /^[0-9A-Fa-f]+$/); // Números hexadecimais
    adicionarValidacao("txtDecimal", "btnValidarDecimal", /^\d+$/); // Números decimais
    adicionarValidacao("txtReais", "btnValidarReais", /^\d+([.,]\d+)?$/); // Números reais
    adicionarValidacao("txtHorario", "btnValidarHorario", /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/); // Horário
    adicionarValidacao("txtDataNascimento", "btnValidarDataNascimento", /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/); // Data de nascimento
    adicionarValidacao("txtCEP", "btnValidarCEP", /^\d{5}-\d{3}$/); // CEP
    adicionarValidacao("txtCPF", "btnValidarCPF", /^\d{3}\.\d{3}\.\d{3}-\d{2}$/); // CPF
    adicionarValidacao("txtCNPJ", "btnValidarCNPJ", /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/); // CNPJ
    adicionarValidacao("txtEntreParenteses", "btnValidarEntreParenteses", /^\(\d+\)$/); // Números entre parênteses
    adicionarValidacao("txtEmail", "btnValidarEmail", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/); // Email
    adicionarValidacao("txtEndereco", "btnValidarEndereco", /^(?:\d{1,3}\.){3}\d{1,3}$/); // Endereço (IPv4)
    adicionarValidacao("txtAltura", "btnValidarAltura", /^\d([.,]\d{1,2})?$/); // Altura
    adicionarValidacao("txtNomeProprio", "btnValidarNomeProprio", /^[A-Z][a-z]+$/); // Nome próprio
    adicionarValidacao("txtTelefone", "btnValidarTelefone", /^\+\d{2}\(\d{2}\)\d{4,5}-\d{4}$/); // Telefone internacional
    adicionarValidacao("txtTexto", "btnValidarTexto", /^(IFTM campus Uberlândia|IFTM campus Uberlândia Centro)$/); // Texto específico
    adicionarValidacao("txt1a100", "btnValidar1a100", /^(100|[1-9]?\d)$/); // Números de 1 a 100
    adicionarValidacao("txtPlaca", "btnValidarPlaca", /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/); // Placa de carro (Mercosul)
    adicionarValidacao("txtVogais", "btnValidarVogais", /^[bcdaeiou]+$/i); // Palavras com vogais e letras específicas
    adicionarValidacao("txtFaturamento", "btnValidarFaturamento", /^R\$\d{1,3}(\.\d{3})*(,\d{1,2})?$/); // Faturamento da empresa
    adicionarValidacao("txtMatriculaU", "btnValidarMatriculaU", /^IFTM-\d{3}\/\d{3}-[a-zA-Z0-9]{2}$/i);
    adicionarValidacao("txtMatriculaV", "btnValidarMatriculaV", /^MT-\d{2}\.\d{3}-IFTM$/i);
    adicionarValidacao(
        "txtMatriculaW",
        "btnValidarMatriculaW",
        /^MT-\d{2}\.\d{3}-IFTM\s?(UBERLÂNDIA CENTRO|UBERLÂNDIA)$/i
    );
});
