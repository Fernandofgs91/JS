const elementos = {
    btnEntrar: document.getElementById("entrar"),
    btnLimpar: document.getElementById("limpar"),
    usuario: document.getElementById("usuario"),
    senha: document.getElementById("senha")
};

const eventos = {
    click: {
        entrar: () => validarCampos() && redirecionarUsuario(elementos.usuario.value.trim()),
        limpar: () => Object.values(elementos).slice(2).forEach(input => input.value = "")
    }
};

const validarCampos = () => {
    if (![elementos.usuario.value, elementos.senha.value].every(v => v.trim())) {
        alert("Por favor, preencha os campos de usuário e senha!");
        return false;
    }
    return true;
};

const redirecionarUsuario = usuario => {
    window.location.href = usuario.toUpperCase() === "VISITANTE" ? "./visitante.html" : "./construcao.html";
};

Object.entries(eventos.click).forEach(([key, fn]) => elementos[`btn${key.charAt(0).toUpperCase() + key.slice(1)}`].addEventListener("click", fn));
