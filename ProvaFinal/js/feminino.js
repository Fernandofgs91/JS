document.addEventListener("DOMContentLoaded", function () {
    let nomeCompleto = localStorage.getItem("nomeCompleto");

    // Se não houver nome salvo, pedir ao usuário para inserir
    while (!nomeCompleto || nomeCompleto.trim() === "") {
        nomeCompleto = prompt("Digite seu nome completo:");
        
        if (nomeCompleto && nomeCompleto.trim() !== "") {
            localStorage.setItem("nomeCompleto", nomeCompleto.trim());
        } else {
            alert("Nome inválido! Tente novamente.");
        }
    }

    // Processar o nome inserido
    const nomeSemEspacos = nomeCompleto.trim();
    const palavras = nomeSemEspacos.split(/\s+/);

    document.getElementById("nome").value = nomeSemEspacos;
    document.getElementById("nomeExibido").textContent = nomeSemEspacos;
    document.getElementById("contagemCaracteres").textContent = nomeSemEspacos.length;
    document.getElementById("primeiraPalavra").textContent = palavras[0] || "N/A";
    document.getElementById("ultimaPalavra").textContent = palavras.length > 0 ? palavras[palavras.length - 1] : "N/A";
    document.getElementById("contagemPalavras").textContent = palavras.length;
});