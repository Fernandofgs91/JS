function gerarTabela() {
    let numero = prompt("Informe um valor inteiro positivo maior ou igual a 2:");
    numero = parseInt(numero);

    if (isNaN(numero) || numero < 2) {
        alert("Por favor, informe um número válido maior ou igual a 2.");
        return;
    }

    document.write("<table border='1'>");
    document.write("<tr><th>Decimal</th><th>Binário</th><th>Hexadecimal</th></tr>");

    for (let i = 0; i <= numero; i++) {
        document.write("<tr>");
        document.write("<td>" + i + "</td>");
        document.write("<td>" + i.toString(2) + "</td>");
        document.write("<td>" + i.toString(16).toUpperCase() + "</td>");
        document.write("</tr>");
    }

    document.write("</table>");
}