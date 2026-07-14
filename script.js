// Array para armazenar todos os candidatos avaliados
const candidatos = [];

// Elementos da interface mapeados
const form = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const alturaInput = document.getElementById('altura');
const resultadoDiv = document.getElementById('resultado');
const listaCandidatos = document.getElementById('listaCandidatos');

// Escuta o envio do formulário
form.addEventListener('submit', function(event) {
    // Evita o comportamento padrão de recarregar a página
    event.preventDefault(); 

    // Captura e formata as entradas
    const nome = nomeInput.value.trim();
    const idade = parseInt(idadeInput.value, 10);
    const altura = parseFloat(alturaInput.value);

    // Validação lógica do concurso de biomedicina
    const apto = (altura >= 1.70 && idade >= 18);
    
    let mensagem = "";
    let classeCss = "";

    if (apto) {
        mensagem = "Parabéns! Você pode prosseguir no processo para a vaga!";
        classeCss = "sucesso";
    } else {
        mensagem = "Infelizmente você não é apto à vaga";
        classeCss = "erro";
    }

    // Exibe o resultado da simulação atual
    resultadoDiv.textContent = mensagem;
    resultadoDiv.className = `result-box ${classeCss}`; // Atualiza o visual (verde/vermelho)

    // Cria o objeto do candidato e guarda no array
    const novoCandidato = {
        nome: nome,
        idade: idade,
        altura: altura,
        status: apto ? "Apto" : "Inapto"
    };
    candidatos.push(novoCandidato);

    // Atualiza a tabela na tela
    atualizarTabela();

    // Limpa o formulário para o próximo preenchimento
    form.reset();
});

// Função responsável por desenhar a lista de candidatos atualizada na tela
function atualizarTabela() {
    // Limpa o corpo da tabela para não duplicar dados
    listaCandidatos.innerHTML = "";

    // Reconstrói as linhas com base na lista de candidatos
    candidatos.forEach(candidato => {
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.textContent = candidato.nome;

        const tdIdade = document.createElement('td');
        tdIdade.textContent = `${candidato.idade} anos`;

        const tdAltura = document.createElement('td');
        tdAltura.textContent = `${candidato.altura.toFixed(2)} m`;

        const tdStatus = document.createElement('td');
        tdStatus.textContent = candidato.status;
        tdStatus.className = candidato.status === "Apto" ? "status-apto" : "status-inapto";

        tr.appendChild(tdNome);
        tr.appendChild(tdIdade);
        tr.appendChild(tdAltura);
        tr.appendChild(tdStatus);

        listaCandidatos.appendChild(tr);
    });
}