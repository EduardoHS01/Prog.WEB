
//listagem produtos
function Produto(nome, preco, qtd, data, prazo) {
    this.nome = nome;
    this.preco = preco;
    this.qtd = qtd;
    this.data = data;
    this.prazo = prazo;
}
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
const listaVendas = document.getElementById('listaVendas');
const totalVendas = document.getElementById('totalVendas');
const prazoEntrega = document.getElementById('prazoEntrega');
let produtos = []
var totalGeral = 0;
var vendas = [];
var prazos = [];
let n = 0

readTextFile("json/produtos.json", function (text) {
    var data = JSON.parse(text);
    while (n < data.length) {
        let produto1 = new Produto(data[n].nome, data[n].preco, data[n].qtd, data[n].data)
        produtos[n] = produto1;
        vendas[n] = parseInt((data[n].preco * data[n].qtd))
        totalGeral += vendas[n]
        n++;
    }
    let i = 0;
    produtos.forEach(() => {
        prazos[i] = parseInt((data[i].prazo * data[i].qtd))
        let novoItem = document.createElement('li');
        novoItem.setAttribute('prazo', prazos[i])
        novoItem.addEventListener('click', () => {
            prazoEntrega.innerHTML = `O prazo de entraga deste item é: ${novoItem.getAttribute('prazo')} dias, a partir da data de compra.`
        })
        novoItem.textContent = `Foram vendidas ${produtos[i].qtd} unidades do produto ${produtos[i].nome} no dia ${produtos[i].data}.`
        listaVendas.appendChild(novoItem);
        i++
    })
    totalVendas.textContent = `O TOTAL DE VENDAS FOI: R$ ${totalGeral}`
}
);
//listagem funcionarios
function Funcionario(nomeF, funcao, setor,email) {
    this.nomeF = nomeF
    this.funcao = funcao
    this.setor = setor
    this.email = email
    this.chefe = '';
}

const listaFunc = document.getElementById('listaFunc');
let listaFuncionarios = [];
let j = 0;
let nEnc = 0;
let encarregados = []
readTextFile("json/funcionario.json", function (text) {
    var func = JSON.parse(text);
    while (j < func.length) {
        let funcionario = new Funcionario(func[j].nome, func[j].funcao, func[j].setor, email= (func[j].nome.split(' '))+"@carap.com.br")
        listaFuncionarios[j] = funcionario

        if (funcionario.funcao === 'Encarregado') {
            encarregados[nEnc] = funcionario
            nEnc++
        }

        j++;

    }
    for (let i = 0; i < encarregados.length; i++) {
        for (let k = 0; k < listaFuncionarios.length; k++) {

            if (encarregados[i].setor === listaFuncionarios[k].setor && listaFuncionarios[k].funcao != 'Encarregado') {
                listaFuncionarios[k].chefe = `${encarregados[i].nomeF}`

            }
        }
    }
    let y = 0
    listaFuncionarios.forEach(() => {
        let novoFunc = document.createElement('li');
        if (listaFuncionarios[y].chefe != "") {
            novoFunc.textContent = `Nome: ${listaFuncionarios[y].nomeF}; Email: ${listaFuncionarios[y].email}; Função: ${listaFuncionarios[y].funcao}; Setor: ${listaFuncionarios[y].setor}; Encarregado: ${listaFuncionarios[y].chefe}.`
        } else {
            novoFunc.textContent = `Nome: ${listaFuncionarios[y].nomeF}; Email: ${listaFuncionarios[y].email}; Função: ${listaFuncionarios[y].funcao}; Setor: ${listaFuncionarios[y].setor}.`
        }
        listaFunc.appendChild(novoFunc);        
        y++
    })
})
//listar fornecedores
function Fornecedor(nome, tipo) {
    this.nome = nome
    this.tipo = tipo
}
const listaForn = document.getElementById('listaForn');
let listaFornecedor = [];
let c = 0;
readTextFile("json/fornecedores.json", function (text) {
    var forn = JSON.parse(text);
    while (c < forn.length) {
        let fornecedor = new Fornecedor(forn[c].nome, forn[c].tipo)
        listaFornecedor[c] = fornecedor
        c++;
    }
    let x = 0
    listaFornecedor.forEach(() => {
        let novoForn = document.createElement('li');
        novoForn.textContent = `Nome: ${listaFornecedor[x].nome}; Produto: ${listaFornecedor[x].tipo};.`
        listaForn.appendChild(novoForn);
        x++
    })
})