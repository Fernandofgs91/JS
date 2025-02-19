if (!localStorage.getItem("usuarioB3")) {
    window.location.href = "usuarioNaoCadastrado.html";
    //alert("entrou");
} 

window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("usuarioB3") == '') {
        window.location.href = "usuarioNaoCadastrado.html";

    } else {
        var txtNomeCompleto = this.document.getElementById("txtNomeCompleto");
        var usuario = this.document.getElementById("usuario");
        var senha = this.document.getElementById("senha");
        var aplicacao = this.document.getElementById("aplicacao");

        var objUser = JSON.parse(localStorage.getItem("usuarioB3"));

        var nmSobrenome = objUser.nomeCompleto;
        var nome = nmSobrenome.split(" ")[0];
        var sobrenome = nmSobrenome.split(" ")[1];

        var aplicSug = "";

        txtNomeCompleto.innerHTML = nmSobrenome;
        usuario.innerHTML = `Usuário: ${nmSobrenome.split(" ")[0].toUpperCase()}`;
        senha.innerHTML = `Senha: ${nome.charAt(0).toUpperCase() + sobrenome.charAt(0).toUpperCase()}`;

        if (objUser.idade == 3) aplicacao.innerHTML = "Tipo de aplicação sugerida: Renda Fixa";
        else if(objUser.idade == 4) aplicacao.innerHTML = "Tipo de aplicação sugerida: Ações";
        else aplicacao.innerHTML = "Tipo de aplicação sugerida: Fundo de Investimento Imobiliário";
    }


});