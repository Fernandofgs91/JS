window.addEventListener("DOMContentLoaded",function(){
    function alteraMensagem(mensagem,cor){
        document.getElementById("msg").innerHTML = mensagem;
        document.getElementById("msg").style.color = cor;
    }

    function alteraImg(img){
        document.getElementById("img").src = `img/${img}`;
    }

    function redirectProcess(){
        window.location.href = "processa.html";
        
    }
    //Variaveis correspondentes aos elementos HTML
    var txtNome = this.document.getElementById("txtNome");
    var txtSobrenome = this.document.getElementById("txtSobrenome");
    var img = this.document.getElementById("img");
    var btnCadastrar = this.document.getElementById("btnCadastrar");
    var selIdade = this.document.getElementById("selIdade");
    var nome = "";
    var sobrenome = "";
    var objUser = {};
    img.src = "img/b3.png";

    //validaçoes
    btnCadastrar.addEventListener("click",function(){

        if(txtNome.value == '' || txtSobrenome.value == ''){
            alteraMensagem("Nome e sobrenome devem ser informados","red");
            alteraImg("erro.png");
        }else if(selIdade.value == ''){
            alteraMensagem("Selecione a sua faixa etária","red");
            alteraImg("erro.png");
        }else{
            nome = txtNome.value;
            sobrenome = txtSobrenome.value;
            //alert(toUpperCase(txtNome.value));
            if(selIdade.value <= 2 ){
                alteraMensagem(`${nome.toUpperCase()} ${sobrenome.toUpperCase()} você não tem idade suficiente`,"red");
                alteraImg("erro.png");
            }else{
                alteraMensagem("“Processando.Aguarde (5 segundos)","blue");
                alteraImg("processando.gif");
                objUser.nomeCompleto = nome.concat(" ",sobrenome);
                objUser.idade = parseInt(selIdade.value);
                localStorage.setItem("usuarioB3",JSON.stringify(objUser));
                
                setTimeout(redirectProcess,5000);
                
            }
        }
            
    });

    txtNome.addEventListener("click",function(){
        alteraMensagem("* Favor preencher todos os campos acima","red");
        alteraImg("erro.png");
    });

    txtSobrenome.addEventListener("click",function(){
        alteraMensagem("* Favor preencher todos os campos acima","red");
        alteraImg("erro.png");
    });

    selIdade.addEventListener("click",function(){
        alteraMensagem("* Favor preencher todos os campos acima","red");
        alteraImg("erro.png");
    });

});