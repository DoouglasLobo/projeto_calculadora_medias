// Seleciona o formulário pelo ID
const form = document.getElementById('formAtividade');

// Define imagens de aprovação e reprovação para serem usadas na tabela
const imgAprovado = '<img src="./images/images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/images/reprovado.png" alt="Emoji decepcionado" />';

// Arrays para armazenar nomes das atividades e notas inseridas
const atividades = [];
const notas = [];

// Define spans para resultados de aprovação e reprovação
const spanAprovado = '<span class="resultadoAprovado">Aprovado</span>';
const spanReprovado = '<span class="resultadoReprovado">Reprovado</span>';

// Pede ao usuário que insira a nota mínima para aprovação e converte para número decimal
const notaMinima = parseFloat(prompt("Digite a Nota Mínima:"));

// Variável para armazenar as linhas da tabela
let linhas = '';

// Adiciona um evento ao formulário para impedir o envio padrão e executar as funções principais
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário
    adicionaLinha();    // Adiciona uma nova linha de atividade na tabela
    atualizaTabela();   // Atualiza o conteúdo da tabela com as atividades
    atualizaMediaFinal(); // Atualiza a média final das notas
});

// Função para adicionar uma nova linha na tabela com nome da atividade e nota
function adicionaLinha() {
    // Captura os valores inseridos pelo usuário nos campos de nome e nota
    const inputNomeAtividade = document.getElementById('nomeAtividade');
    const inputNotaAtividade = document.getElementById('notaAtividade');

    // Verifica se a atividade já foi inserida para evitar duplicação
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        // Adiciona os valores nos arrays de atividades e notas
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        // Cria a linha HTML da tabela com nome, nota e imagem de aprovação ou reprovação
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value} </td>`;
        linha += `<td>${inputNotaAtividade.value} </td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `<tr>`;

        // Adiciona a linha criada ao conjunto de linhas
        linhas += linha;
    }

    // Limpa os campos de entrada após a inserção
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

// Função para atualizar o corpo da tabela com as atividades inseridas
function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); // Seleciona o corpo da tabela
    corpoTabela.innerHTML = linhas; // Atualiza o conteúdo do corpo da tabela
}

// Função para atualizar a média final e exibir se o aluno foi aprovado ou reprovado
function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal().toFixed(1); // Calcula a média final e arredonda para 1 casa decimal

    // Insere a média final calculada no campo específico da tabela
    document.getElementById('mediaFinalValor').innerHTML = mediaFinal;

    // Insere o span de aprovação ou reprovação com base na média
    document.getElementById('mediaFinalResultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

// Função para calcular a média final somando todas as notas e dividindo pelo total de atividades
function calculaMediaFinal() {
    let somaDasNotas = 0;

    // Percorre o array de notas e calcula a soma total
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    // Retorna a média final dividindo a soma total pelo número de atividades
    return somaDasNotas / notas.length;
}
