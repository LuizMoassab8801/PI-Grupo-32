var linhaSelecionada = null  //Cria variavel linhaSelecionada para registrar novos registros com a função "onFormSubmit"

// Função que checa se o formulário vai alterar um registro ou adicionar um novo
function onFormSubmit() {
    if (validate()) {
        var dadosFormulario = lerDadosFormulario();
        if (linhaSelecionada == null)  //Se a linha selecionada for null ele adiciona um novo registro
            inserirNovoRegistro(dadosFormulario);
        else
            updateRecord(dadosFormulario);
        resetForm();
    }
}

// função feita para ler os dados inseridos no formulário e retorna-lo como uma variável
function lerDadosFormulario() {
    var dadosFormulario = {};
    dadosFormulario["nomeCompleto"] = document.getElementById("nomeCompleto").value;
    dadosFormulario["telefone"] = document.getElementById("telefone").value;
    dadosFormulario["email"] = document.getElementById("email").value;
    return dadosFormulario;
}

// Função registra novo conjunto de dados, recebendo seus proprio dados como parâmetro
function inserirNovoRegistro(dados) {
    var table = document.getElementById("listaClientes").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = dados.nomeCompleto;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = dados.telefone;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = dados.email;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                       <a onClick="onDelete(this)">Deletar</a>`;
}

//Reseta o formulario e volta a linha selecionada para Null
function resetForm() {
    document.getElementById("nomeCompleto").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    linhaSelecionada = null;
}

//
function onEdit(td) {
    linhaSelecionada = td.parentElement.parentElement;
    document.getElementById("nomeCompleto").value = linhaSelecionada.cells[0].innerHTML;
    document.getElementById("telefone").value = linhaSelecionada.cells[1].innerHTML;
    document.getElementById("email").value = linhaSelecionada.cells[2].innerHTML;
}

//
function updateRecord(dadosFormulario) {
    linhaSelecionada.cells[0].innerHTML = dadosFormulario.nomeCompleto;
    linhaSelecionada.cells[1].innerHTML = dadosFormulario.telefone;
    linhaSelecionada.cells[2].innerHTML = dadosFormulario.email;
}

//Pede confirmação para deletar e deleta o registro chamando a função "resetForm"
function onDelete(td) {
    if (confirm('Gostaria de deletar esse registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("listaClientes").deleteRow(row.rowIndex);
        resetForm();
    }
}
//Função valida se o nome completo está preenchido, se não bloqueia o registro
function validate() {
    isValid = true;
    if (document.getElementById("nomeCompleto").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}