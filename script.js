// Estruturas para armazenar cadastros e fluxo de caixa temporariamente
let bancos = [];
let safras = [];
let codigos = [
    // Receitas
    'ARROZ - Arroz',
    'BOIS - Bois',
    'NOVIL - Novilhas',
    'OUTRR - Outras Receitas',
    'TERNE - Terneiros',
    'TOURO - Touros',
    'VACAS - Vacas',
    'VADES - Vacas descarte parição',
    // Despesas Lavoura
    'ADUBO - Adubos',
    'AGROQ - Agroquímicos',
    'APOLA - Apoio e Administração (LAV)',
    'ARREN - Arrendamento/Adiantamentos',
    'AVIAÇ - Aviação agrícola',
    'COLHT - Colheita Terceirizada',
    'COMBU - Combustível',
    'COMIL - Participações/Comissões',
    'CONSL - Consultorias/Prestação de Serviços',
    'DESPL - Despesas Financeiras e Bancárias',
    'ENECA - Energia Elétrica Casas',
    'ENELE - Energia Elétrica Levantes e Combustiveis',
    'ENESE - Energia Elétrica Secador',
    'FRETE - Fretes',
    'IMPTX - Impostos e Taxas',
    'INVES - Investimentos',
    'JUROS - Juros e Acessórios',
    'LUBRI - Lubrificantes',
    'MANBE - Manutenção Benfeitorias',
    'MANCA - Manutenção Caminhões',
    'MANIM - Manutenção Implementos',
    'MANLE - Manutenção Levantes',
    'MANMA - Manutenção Maquinário',
    'MANSE - Manutenção Secador',
    'MANVE - Manutenção de Veículos',
    'OUTLA - Outras Despesas',
    'OUTST - Outros Serviços Terceirizados',
    'PRETE - Preparo de Solo Terceirizado',
    'SALAL - Salários e encargos (LAV)',
    'SECAT - Secagem Terceirizada',
    'SEMET - Sementes',
    // Bancos
    'BANRE - Banco Receitas',
    'BANDE - Banco Despesas',
    // Despesas Administração
    'AGLUT - Agua, Luz e Telefone',
    'APOAD - Apoio e Administração (ADM)',
    'CONCJ - Consultorias Contábil e Jurídica',
    'DESPA - Despesas Financeiras e Bancárias',
    'MAEXP - Material de Expediente',
    'OUTAD - Outras Despesas Administrativas',
    'SALAA - Salários e encargos (ADM)',
    // Despesas Pecuária
    'ALANI - Alimentação Animais',
    'ARAMA - Aramados',
    'COMIP - Comissões Pecuária',
    'CONSP - Consultorias/Serviços Técnicos',
    'DESPP - Despesas de Comercialização',
    'FRETP - Fretes Pecuária',
    'ALIME - Gêneros Alimentícios',
    'IMPPE - Impostos e Taxas',
    'INSEM - Inseminação',
    'AGRPE - Agroquímicos Pecuária',
    'INVPE - Investimentos Pecuária',
    'JURPE - Juros e Acessórios Pecuária',
    'COMPE - Combustivel Pecuária',
    'MANPE - Manutenção e Benfeitorias',
    'RASTR - Rastreabilidade',
    'OUTPE - Outras Despesas',
    'PRVET - Produtos Veterinários',
    'SALPR - Sal Mineral/Proteinado',
    'SALAP - Salários e encargos (PEC)',
    'SEMPA - Semente Pastagem',
    'ASSOP - Associações e Outras',
    'ARRPE - Arrendamento/Adiantamento (PEC)',
    'MAVPE - Manutenção de Veículos (PEC)',
    'COMAN - Compra de Animais',
    'APOPE - Apoio e Administração (PEC)',
    'FERTI - Fertilizantes',
    'SEVPA - Serviços Pastagens',
    'SERVA - Serviços Varios (Esquilas/Domas, Etc)'
];
let fluxoCaixa = [];

// URL do backend Flask hospedado
const URL_BACKEND = 'https://SEU-BACKEND.onrender.com'; // Substitua pela URL real após deploy

// Mapeamento de origem dos códigos
const origemCodigos = {
    // Receitas
    'ARROZ': 'Receita',
    'BOIS': 'Receita',
    'NOVIL': 'Receita',
    'OUTRR': 'Receita',
    'TERNE': 'Receita',
    'TOURO': 'Receita',
    'VACAS': 'Receita',
    'VADES': 'Receita',
    // Custo da Lavoura
    'ADUBO': 'Custo da Lavoura',
    'AGROQ': 'Custo da Lavoura',
    'APOLA': 'Custo da Lavoura',
    'ARREN': 'Custo da Lavoura',
    'AVIAÇ': 'Custo da Lavoura',
    'COLHT': 'Custo da Lavoura',
    'COMBU': 'Custo da Lavoura',
    'COMIL': 'Custo da Lavoura',
    'CONSL': 'Custo da Lavoura',
    'DESPL': 'Custo da Lavoura',
    'ENECA': 'Custo da Lavoura',
    'ENELE': 'Custo da Lavoura',
    'ENESE': 'Custo da Lavoura',
    'FRETE': 'Custo da Lavoura',
    'IMPTX': 'Custo da Lavoura',
    'INVES': 'Custo da Lavoura',
    'JUROS': 'Custo da Lavoura',
    'LUBRI': 'Custo da Lavoura',
    'MANBE': 'Custo da Lavoura',
    'MANCA': 'Custo da Lavoura',
    'MANIM': 'Custo da Lavoura',
    'MANLE': 'Custo da Lavoura',
    'MANMA': 'Custo da Lavoura',
    'MANSE': 'Custo da Lavoura',
    'MANVE': 'Custo da Lavoura',
    'OUTLA': 'Custo da Lavoura',
    'OUTST': 'Custo da Lavoura',
    'PRETE': 'Custo da Lavoura',
    'SALAL': 'Custo da Lavoura',
    'SECAT': 'Custo da Lavoura',
    'SEMET': 'Custo da Lavoura',
    // Bancos (pode ser tratado como Receita ou Custo, conforme uso)
    'BANRE': 'Receita',
    'BANDE': 'Custo da Lavoura',
    // Administrativo
    'AGLUT': 'Administrativo',
    'APOAD': 'Administrativo',
    'CONCJ': 'Administrativo',
    'DESPA': 'Administrativo',
    'MAEXP': 'Administrativo',
    'OUTAD': 'Administrativo',
    'SALAA': 'Administrativo',
    // Pecuária
    'ALANI': 'Pecuária',
    'ARAMA': 'Pecuária',
    'COMIP': 'Pecuária',
    'CONSP': 'Pecuária',
    'DESPP': 'Pecuária',
    'FRETP': 'Pecuária',
    'ALIME': 'Pecuária',
    'IMPPE': 'Pecuária',
    'INSEM': 'Pecuária',
    'AGRPE': 'Pecuária',
    'INVPE': 'Pecuária',
    'JURPE': 'Pecuária',
    'COMPE': 'Pecuária',
    'MANPE': 'Pecuária',
    'RASTR': 'Pecuária',
    'OUTPE': 'Pecuária',
    'PRVET': 'Pecuária',
    'SALPR': 'Pecuária',
    'SALAP': 'Pecuária',
    'SEMPA': 'Pecuária',
    'ASSOP': 'Pecuária',
    'ARRPE': 'Pecuária',
    'MAVPE': 'Pecuária',
    'COMAN': 'Pecuária',
    'APOPE': 'Pecuária',
    'FERTI': 'Pecuária',
    'SEVPA': 'Pecuária',
    'SERVA': 'Pecuária'
};

// Variável para controlar qual linha está em edição
let linhaEditando = null;

// Variáveis de paginação
let paginaAtual = 1;
const itensPorPagina = 20;

// Indicador de carregamento
function mostrarCarregamento() {
    const el = document.getElementById('loading');
    if (el) el.style.display = 'flex';
}
function esconderCarregamento() {
    const el = document.getElementById('loading');
    if (el) el.style.display = 'none';
}

// Sistema de fila para limitar requisições simultâneas
const requestQueue = [];
let activeRequests = 0;
const MAX_CONCURRENT = 2;
async function fetchWithQueue(url) {
    return new Promise((resolve) => {
        requestQueue.push({ url, resolve });
        processQueue();
    });
}
function processQueue() {
    while (activeRequests < MAX_CONCURRENT && requestQueue.length) {
        activeRequests++;
        const { url, resolve } = requestQueue.shift();
        fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
            .finally(() => {
                activeRequests--;
                processQueue();
            });
    }
}

// Exemplo de uso de Web Worker para processamento pesado:
// const worker = new Worker('worker.js');
// worker.onmessage = function(e) {
//     const resultados = e.data;
//     // Atualize a UI
// };
// worker.postMessage({ fluxoCaixa, safraSelecionada });

// Carregar cadastros do backend
async function carregarCadastros() {
    mostrarCarregamento();
    try {
        const bancosResp = await fetchWithQueue(`${URL_BACKEND}/api/bancos`);
        bancos = bancosResp;
        const safrasResp = await fetchWithQueue(`${URL_BACKEND}/api/safras`);
        safras = safrasResp;
        const codigosResp = await fetchWithQueue(`${URL_BACKEND}/api/codigos`);
        codigos = codigosResp;
    } finally {
        esconderCarregamento();
    }
}

// Carregar lançamentos do backend
async function carregarFluxoCaixa() {
    mostrarCarregamento();
    try {
        const resp = await fetchWithQueue(`${URL_BACKEND}/api/fluxo`);
        fluxoCaixa = resp;
    } finally {
        esconderCarregamento();
    }
}

// Adicionar banco via API
async function adicionarBanco() {
    const banco = document.getElementById('banco-input').value.trim();
    if (banco && !bancos.includes(banco)) {
        await fetch(`${URL_BACKEND}/api/bancos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ banco })
        });
        bancos.push(banco); // Atualiza localmente
        atualizarListasCadastros();
        renderizarLinhaAddFluxo();
    }
    document.getElementById('banco-input').value = '';
}

// Adicionar safra via API
async function adicionarSafra() {
    const safra = document.getElementById('safra-input').value.trim();
    if (safra && !safras.includes(safra)) {
        await fetch(`${URL_BACKEND}/api/safras`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ safra })
        });
        safras.push(safra); // Atualiza localmente
        atualizarListasCadastros();
        renderizarLinhaAddFluxo();
    }
    document.getElementById('safra-input').value = '';
}

// Adicionar código via API
async function adicionarCodigo() {
    const codigo = document.getElementById('codigo-input').value.trim();
    const origem = document.getElementById('origem-codigo-input').value;
    if (!origem) {
        alert('Selecione a origem do código!');
        return;
    }
    if (codigo && !codigos.some(c => (typeof c === 'object' ? c.codigo : c) === codigo)) {
        await fetch(`${URL_BACKEND}/api/codigos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo, origem })
        });
        codigos.push({ codigo, origem }); // Atualiza localmente
        atualizarListasCadastros();
        renderizarLinhaAddFluxo();
    }
    document.getElementById('codigo-input').value = '';
    document.getElementById('origem-codigo-input').value = '';
}

// Remover banco via API
async function removerBanco(banco) {
    await fetch(`${URL_BACKEND}/api/bancos/${encodeURIComponent(banco)}`, { method: 'DELETE' });
    bancos = bancos.filter(b => b !== banco); // Atualiza localmente
    atualizarListasCadastros();
}
// Remover safra via API
async function removerSafra(safra) {
    await fetch(`${URL_BACKEND}/api/safras/${encodeURIComponent(safra)}`, { method: 'DELETE' });
    safras = safras.filter(s => s !== safra); // Atualiza localmente
    atualizarListasCadastros();
}
// Remover código via API
async function removerCodigo(codigo) {
    await fetch(`${URL_BACKEND}/api/codigos/${encodeURIComponent(codigo)}`, { method: 'DELETE' });
    codigos = codigos.filter(c => (typeof c === 'object' ? c.codigo : c) !== codigo); // Atualiza localmente
    atualizarListasCadastros();
}

// Atualizar listas de cadastros na interface
function atualizarListasCadastros() {
    document.getElementById('lista-bancos').innerHTML = bancos.map(b =>
        `<span>${b} <button onclick="removerBanco('${b}')" title="Remover" style="color:red;border:none;background:none;cursor:pointer;">&times;</button></span>`
    ).join(', ');
    document.getElementById('lista-safras').innerHTML = safras.map(s =>
        `<span>${s} <button onclick="removerSafra('${s}')" title="Remover" style="color:red;border:none;background:none;cursor:pointer;">&times;</button></span>`
    ).join(', ');
    document.getElementById('lista-codigos').innerHTML = codigos.map(c => {
        const nome = typeof c === 'object' ? c.codigo : c;
        const origem = typeof c === 'object' ? c.origem : 'Receita';
        return `<span>${nome} <small style="color:#888;">(${origem})</small> <button onclick="removerCodigo('${nome}')" title="Remover" style="color:red;border:none;background:none;cursor:pointer;">&times;</button></span>`;
    }).join(', ');
    atualizarSafraSelect();
}

function atualizarSafraSelect() {
    const select = document.getElementById('safra-select');
    select.innerHTML = '';
    safras.forEach(safra => {
        const option = document.createElement('option');
        option.value = safra;
        option.textContent = safra;
        select.appendChild(option);
    });
}

function carregarFluxoPorSafra() {
    // Aqui você pode implementar a lógica para carregar os dados do CSV da safra selecionada
    // Por enquanto, limpa a tabela
    fluxoCaixa = [];
    renderizarTabelaFluxo();
}

function adicionarLinhaFluxo() {
    const safraSelecionada = document.getElementById('safra-select').value;
    if (!safraSelecionada) {
        alert('Por favor, selecione uma safra antes de adicionar um lançamento.');
        return;
    }
    fluxoCaixa.push({
        Safra: safraSelecionada,
        nData: '', Banco: '', Numero: '', Historico: '', EntradaSaida: 'Entrada', Valor: '', Codigo: ''
    });
    renderizarTabelaFluxo();
    renderizarLinhaAddFluxo();
}

function renderizarTabelaFluxo() {
    const tbody = document.querySelector('#fluxo-table tbody');
    tbody.innerHTML = '';
    // Ordena por data decrescente (mais recente em cima)
    const fluxoOrdenado = [...fluxoCaixa].sort((a, b) => {
        const dataA = a.nData ? Date.parse(a.nData) : 0;
        const dataB = b.nData ? Date.parse(b.nData) : 0;
        return dataB - dataA;
    });
    // Paginação
    const totalPaginas = Math.ceil(fluxoOrdenado.length / itensPorPagina) || 1;
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const paginaDados = fluxoOrdenado.slice(inicio, fim);
    paginaDados.forEach((linha, idx) => {
        // Monta as opções de bancos
        let bancoOptions = bancos.map(b => `<option value="${b}"${linha.Banco === b ? ' selected' : ''}>${b}</option>`).join('');
        // Monta as opções de códigos
        let codigoOptions = codigos.map(c => {
            const nome = typeof c === 'object' ? c.codigo : c;
            return `<option value="${nome}"${linha.Codigo === nome ? ' selected' : ''}>${nome}</option>`;
        }).join('');
        // Opções Entrada/Saída
        let entradaSaidaOptions = [
            `<option value="Entrada"${linha.EntradaSaida === 'Entrada' ? ' selected' : ''}>Entrada</option>`,
            `<option value="Saída"${linha.EntradaSaida === 'Saída' ? ' selected' : ''}>Saída</option>`
        ].join('');
        // Valor formatado para exibição
        let valorFormatado = '';
        if (linha.Valor && !isNaN(parseFloat(linha.Valor.toString().replace(',', '.')))) {
            // Troca apenas vírgula por ponto, sem remover pontos decimais
            let valorNumerico = linha.Valor.toString().replace(',', '.');
            valorFormatado = parseFloat(valorNumerico).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } else {
            valorFormatado = linha.Valor || '';
        }
        // Verifica se a linha está em modo edição
        const emEdicao = linhaEditando === (inicio + idx);
        const disabled = emEdicao ? '' : 'disabled';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input value="${linha.Safra}" readonly class="safra-readonly"></td>
            <td><input type="date" value="${linha.nData}" onchange="atualizarValorEdicao(${inicio + idx}, 'nData', this.value)" ${disabled}></td>
            <td><select onchange="atualizarValorEdicao(${inicio + idx}, 'Banco', this.value)" ${disabled}>${bancoOptions}</select></td>
            <td><input value="${linha.Numero}" onchange="atualizarValorEdicao(${inicio + idx}, 'Numero', this.value)" ${disabled}></td>
            <td><input value="${linha.Historico}" onchange="atualizarValorEdicao(${inicio + idx}, 'Historico', this.value)" ${disabled}></td>
            <td><select onchange="atualizarValorEdicao(${inicio + idx}, 'EntradaSaida', this.value)" ${disabled}>${entradaSaidaOptions}</select></td>
            <td><input class='valor-monetario' value="${valorFormatado}" onchange="atualizarValorEdicao(${inicio + idx}, 'Valor', this.value)" onfocus="mostrarValorPuro(this)" onblur="formatarValorMonetario(this)" ${disabled}></td>
            <td><select onchange="atualizarValorEdicao(${inicio + idx}, 'Codigo', this.value)" ${disabled}>${codigoOptions}</select></td>
            <td class='action-cell'>
                <button class='delete-btn' title='Remover' onclick="confirmarRemoverLinhaFluxo(${inicio + idx})"><i class='fas fa-trash'></i></button>
                <button class='edit-btn' title='${emEdicao ? 'Salvar' : 'Editar'}' onclick="${emEdicao ? `salvarEdicaoLinha(${inicio + idx})` : `editarLinhaFluxo(${inicio + idx})`}">
                    <i class='fas ${emEdicao ? 'fa-check' : 'fa-pencil-alt'}' style='color:${emEdicao ? '#27ae60' : ''};'></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    // Paginação - controles
    const paginacaoDiv = document.getElementById('paginacao-fluxo');
    if (paginacaoDiv) paginacaoDiv.remove();
    const novaDiv = document.createElement('div');
    novaDiv.id = 'paginacao-fluxo';
    novaDiv.style = 'display:flex;gap:8px;justify-content:center;margin:12px 0;';
    novaDiv.innerHTML = `
        <button onclick="mudarPaginaFluxo(-1)" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>
        <span>Página ${paginaAtual} de ${totalPaginas}</span>
        <button onclick="mudarPaginaFluxo(1)" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>
    `;
    tbody.parentElement.appendChild(novaDiv);
}

// Atualiza apenas o valor localmente durante edição
function atualizarValorEdicao(idx, campo, valor) {
    fluxoCaixa[idx][campo] = valor;
}

// Função para ativar edição de uma linha
function editarLinhaFluxo(idx) {
    linhaEditando = idx;
    renderizarTabelaFluxo();
}

// Função para salvar edição e desabilitar novamente
async function salvarEdicaoLinha(idx) {
    linhaEditando = null;
    // Persistir a edição no backend
    await fetch(`${URL_BACKEND}/api/fluxo/${idx}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fluxoCaixa[idx])
    });
    await carregarFluxoCaixa();
    renderizarTabelaFluxo();
}

function removerLinhaFluxo(idx) {
    fluxoCaixa.splice(idx, 1);
    renderizarTabelaFluxo();
    renderizarTabelaFluxoConsolidado();
}

function salvarFluxoCSV() {
    // Função para exportar o fluxoCaixa para CSV (apenas download local)
    let csv = 'Safra;nData;Banco;Número;Histórico;Entrada/Saída;Valor;Código\n';
    fluxoCaixa.forEach(linha => {
        csv += `${linha.Safra};${linha.nData};${linha.Banco};${linha.Numero};${linha.Historico};${linha.EntradaSaida};${linha.Valor};${linha.Codigo}\n`;
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (document.getElementById('safra-select').value || 'fluxo') + '.csv';
    a.click();
}

function carregarCSV() {
    const fileInput = document.getElementById('csv-file-input');
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const linhas = e.target.result.split(/\r?\n/);
        fluxoCaixa = [];
        for (let i = 1; i < linhas.length; i++) {
            if (!linhas[i]) continue;
            const [Safra, nData, Banco, Numero, Historico, EntradaSaida, Valor, Codigo] = linhas[i].split(';');
            fluxoCaixa.push({Safra, nData, Banco, Numero, Historico, EntradaSaida, Valor, Codigo});
        }
        renderizarTabelaFluxo();
    };
    reader.readAsText(file);
}

function criarArquivoSafraCSV(safra) {
    // No navegador, não é possível criar arquivos diretamente no diretório raiz do sistema.
    // Esta função pode ser adaptada para backend futuramente.
    // Por enquanto, apenas inicializa um CSV vazio para download.
    const csv = 'Safra;nData;Banco;Número;Histórico;Entrada/Saída;Valor;Código\n';
    const blob = new Blob([csv], {type: 'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = safra + '.csv';
    a.click();
}

// Função para obter o nome do mês a partir do índice (0=junho, 11=maio)
const mesesFluxo = [
    'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
    'Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'
];

// Função para extrair o mês (0=junho, 11=maio) de uma data no formato yyyy-mm-dd
function getMesFluxo(data) {
    if (!data) return null;
    // Extrai o mês da string (YYYY-MM-DD)
    const partes = data.split('-');
    if (partes.length < 2) return null;
    let mes = parseInt(partes[1], 10); // 6 = junho
    // Ajustar para que junho seja 0, julho 1, ..., maio 11
    mes = (mes + 6) % 12;
    return mes;
}

function preencherFiltroSafraFluxo() {
    const select = document.getElementById('filtro-safra-fluxo');
    if (select) {
        select.innerHTML = safras.map(s => `<option value="${s}">${s}</option>`).join('');
        // Seleciona a primeira safra por padrão
        if (safras.length > 0) select.value = safras[0];
    }
}

function getSafraSelecionadaFluxo() {
    const select = document.getElementById('filtro-safra-fluxo');
    return select ? select.value : '';
}

function renderizarTabelaFluxoConsolidado() {
    const tbody = document.querySelector('#tabela-fluxo-consolidado tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const safraSelecionada = getSafraSelecionadaFluxo();
    // Agrupar códigos por origem
    const grupos = {
        'Receita': [],
        'Bancos': [],
        'Despesas de lavoura': [],
        'Despesas administrativas': [],
        'Despesas de pecuária': []
    };
    codigos.forEach(codObj => {
        let codigo, descricao, origem;
        if (typeof codObj === 'object') {
            codigo = codObj.codigo;
            descricao = codObj.codigo;
            origem = codObj.origem;
        } else {
            const partes = codObj.split(' - ');
            codigo = partes[0];
            descricao = codObj;
            origem = 'Receita';
        }
        if (grupos[origem]) {
            grupos[origem].push({codigo, descricao});
        }
    });
    // Ordem dos grupos
    const ordemGrupos = ['Receita', 'Bancos', 'Despesas de lavoura', 'Despesas administrativas', 'Despesas de pecuária'];
    ordemGrupos.forEach(origem => {
        if (grupos[origem].length > 0) {
            // Linha de cabeçalho do grupo
            const trHeader = document.createElement('tr');
            trHeader.innerHTML = `<td colspan='14' style='background:#e0f7fa;font-weight:bold;text-align:left;'>${origem}</td>`;
            tbody.appendChild(trHeader);
            let totaisOrigemMes = Array(12).fill(0);
            let totalOrigemAnual = 0;
            grupos[origem].forEach(({codigo, descricao}) => {
                let totaisMes = Array(12).fill(0);
                let totalAnual = 0;
                fluxoCaixa.filter(lanc => lanc.Safra === safraSelecionada).forEach(lanc => {
                    if (lanc.Codigo === descricao && lanc.nData && lanc.Valor) {
                        const mes = getMesFluxo(lanc.nData);
                        if (mes !== null && mes >= 0 && mes < 12) {
                            let valor = parseFloat(lanc.Valor.replace(',', '.')) || 0;
                            let isSaida = lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída');
                            if (isSaida) {
                                valor = -Math.abs(valor);
                            }
                            totaisMes[mes] += valor;
                            totaisOrigemMes[mes] += valor;
                        }
                    }
                });
                totalAnual = totaisMes.reduce((a, b) => a + b, 0);
                totalOrigemAnual += totalAnual;
                // NOVO: só exibe se houver algum valor diferente de zero
                const todosZeros = totaisMes.every(v => v === 0) && totalAnual === 0;
                if (todosZeros) return; // pula linha sem movimentação
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${codigo}</td>
                    ${totaisMes.map(v => {
                        let cor = v > 0 ? 'green' : (v < 0 ? 'red' : '');
                        let sinal = v < 0 ? '-' : '';
                        return `<td style='color:${cor};'>${sinal}${Math.abs(v).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td>`;
                    }).join('')}
                    <td>${totalAnual >= 0 ? '<span style="color:green;">' : '<span style="color:red;">'}${totalAnual.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</span></td>
                `;
                tbody.appendChild(tr);
            });
            // Linha de totais do grupo
            const trTotal = document.createElement('tr');
            trTotal.innerHTML = `
                <td colspan="1" style="background:#b2ebf2;font-weight:bold;">Total ${origem}</td>
                ${totaisOrigemMes.map(v => {
                    let cor = v > 0 ? 'green' : (v < 0 ? 'red' : '');
                    let sinal = v < 0 ? '-' : '';
                    return `<td style='background:#b2ebf2;color:${cor};'>${sinal}${Math.abs(v).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td>`;
                }).join('')}
                <td style='background:#b2ebf2;${totalOrigemAnual >= 0 ? 'color:green;' : 'color:red;'}'><strong>${totalOrigemAnual.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</strong></td>
            `;
            tbody.appendChild(trTotal);
            // Linha em branco para separar grupos
            const trBlank = document.createElement('tr');
            trBlank.innerHTML = `<td colspan='14' style='height:10px;background:#fff;'></td>`;
            tbody.appendChild(trBlank);
        }
    });

    // Linha em branco após todos os grupos
    const trBlankFinal = document.createElement('tr');
    trBlankFinal.innerHTML = `<td colspan='14' style='height:10px;background:#fff;'></td>`;
    tbody.appendChild(trBlankFinal);

    // Título Totais
    const trTotaisTitulo = document.createElement('tr');
    trTotaisTitulo.innerHTML = `<td colspan='14' style='background:#e0f7fa;font-weight:bold;text-align:left;'>Totais</td>`;
    tbody.appendChild(trTotaisTitulo);

    // Linha de meses acima dos totais
    const trMesesTotais = document.createElement('tr');
    trMesesTotais.innerHTML = `
        <th>Código</th>
        <th>Junho</th>
        <th>Julho</th>
        <th>Agosto</th>
        <th>Setembro</th>
        <th>Outubro</th>
        <th>Novembro</th>
        <th>Dezembro</th>
        <th>Janeiro</th>
        <th>Fevereiro</th>
        <th>Março</th>
        <th>Abril</th>
        <th>Maio</th>
        <th>Total</th>
    `;
    tbody.appendChild(trMesesTotais);

    // Tabela de totais por origem
    const gruposTotais = ['Bancos', 'Despesas de lavoura', 'Despesas administrativas', 'Despesas de pecuária'];
    let totaisPorOrigem = {};
    let totaisMesGeral = Array(12).fill(0);
    let totalGeral = 0;
    gruposTotais.forEach(origem => {
        let totaisMes = Array(12).fill(0);
        let totalAnual = 0;
        if (grupos[origem]) {
            grupos[origem].forEach(({codigo, descricao}) => {
                fluxoCaixa.filter(lanc => lanc.Safra === safraSelecionada).forEach(lanc => {
                    if (lanc.Codigo === descricao && lanc.nData && lanc.Valor) {
                        const mes = getMesFluxo(lanc.nData);
                        if (mes !== null && mes >= 0 && mes < 12) {
                            let valor = parseFloat(lanc.Valor.replace(',', '.')) || 0;
                            let isSaida = lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída');
                            if (isSaida) {
                                valor = -Math.abs(valor);
                            }
                            totaisMes[mes] += valor;
                            totaisMesGeral[mes] += valor;
                        }
                    }
                });
            });
        }
        totalAnual = totaisMes.reduce((a, b) => a + b, 0);
        totaisPorOrigem[origem] = { totaisMes, totalAnual };
    });
    totalGeral = totaisMesGeral.reduce((a, b) => a + b, 0);
    // Exibe uma linha para cada origem
    gruposTotais.forEach(origem => {
        const { totaisMes, totalAnual } = totaisPorOrigem[origem];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style='background:#fff;font-weight:bold;'>${origem}</td>
            ${totaisMes.map(v => {
                let cor = v > 0 ? 'green' : (v < 0 ? 'red' : '');
                let sinal = v < 0 ? '-' : '';
                return `<td style='background:#fff;color:${cor};'>${sinal}${Math.abs(v).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td>`;
            }).join('')}
            <td style='background:#fff;${totalAnual >= 0 ? 'color:green;' : 'color:red;'}'><strong>${totalAnual.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</strong></td>
        `;
        tbody.appendChild(tr);
    });
    // Linha Total Geral
    const trTotais = document.createElement('tr');
    trTotais.innerHTML = `
        <td style='background:#b2ebf2;font-weight:bold;'>Total Geral</td>
        ${totaisMesGeral.map(v => {
            let cor = v > 0 ? 'green' : (v < 0 ? 'red' : '');
            let sinal = v < 0 ? '-' : '';
            return `<td style='background:#b2ebf2;color:${cor};'>${sinal}${Math.abs(v).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td>`;
        }).join('')}
        <td style='background:#b2ebf2;${totalGeral >= 0 ? 'color:green;' : 'color:red;'}'><strong>${totalGeral.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</strong></td>
    `;
    tbody.appendChild(trTotais);
}

// Atualizar tabela consolidada sempre que o fluxoCaixa mudar
async function atualizarTudo() {
    await carregarCadastros();
    await carregarFluxoCaixa();
    atualizarListasCadastros();
    renderizarTabelaFluxo();
    renderizarTabelaFluxoConsolidado();
    renderizarLinhaAddFluxo();
}

// Inicialização
window.onload = async function() {
    await atualizarTudo();
    // Atualizar linha de adição ao mudar a safra selecionada
    const safraSelect = document.getElementById('safra-select');
    if (safraSelect) {
        safraSelect.addEventListener('change', renderizarLinhaAddFluxo);
    }
};

// --- GRÁFICOS DINÂMICOS ABA GRÁFICOS ---
let chartTotais = null;

function calcularTotaisPorOrigem(origem) {
    // Retorna um array com os totais de cada mês e o total anual para a origem
    let totaisMes = Array(12).fill(0);
    let totalAnual = 0;
    if (!origem) return { totaisMes, totalAnual };
    codigos.forEach(codDesc => {
        let codigo, origemCodigo;
        if (typeof codDesc === 'object') {
            codigo = codDesc.codigo;
            origemCodigo = codDesc.origem;
        } else {
            const partes = codDesc.split(' - ');
            codigo = partes[0];
            origemCodigo = origemCodigos[codigo] || 'Receita';
        }
        if (origemCodigo === origem) {
            fluxoCaixa.forEach(lanc => {
                if (lanc.Codigo === codigo && lanc.nData && lanc.Valor) {
                    const mes = getMesFluxo(lanc.nData);
                    if (mes !== null && mes >= 0 && mes < 12) {
                        let valor = parseFloat(lanc.Valor.replace(',', '.')) || 0;
                        if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                            valor = -Math.abs(valor);
                        }
                        totaisMes[mes] += valor;
                    }
                }
            });
        }
    });
    totalAnual = totaisMes.reduce((a, b) => a + b, 0);
    return { totaisMes, totalAnual };
}

function atualizarGraficoTotais(origem = 'Receita', tipo = 'bar') {
    const abaGraficos = document.getElementById('graficos');
    if (!abaGraficos || !abaGraficos.classList.contains('active')) return;
    const canvas = document.getElementById('grafico-totais');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { totaisMes, totalAnual } = calcularTotaisPorOrigem(origem);
    let labels = [...mesesFluxo, 'Total'];
    let data = [...totaisMes, totalAnual];
    let backgroundColors = tipo === 'pie'
        ? [
            '#3498db','#2ecc71','#f1c40f','#e67e22','#e74c3c','#9b59b6','#1abc9c','#34495e','#95a5a6','#f39c12','#7f8c8d','#16a085','#2980b9'
        ]
        : '#3498db';
    if (chartTotais) chartTotais.destroy();
    chartTotais = new Chart(ctx, {
        type: tipo,
        data: {
            labels: labels,
            datasets: [{
                label: `Totais (${origem})`,
                data: data,
                backgroundColor: backgroundColors,
                borderColor: '#2c3e50',
                borderWidth: 2,
                fill: tipo !== 'line',
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'right' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
                        }
                    }
                }
            },
            scales: tipo === 'pie' ? {} : {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
                        }
                    }
                }
            }
        }
    });
}

function configurarFiltrosGraficos() {
    let origemAtual = 'Receita';
    let tipoAtual = 'bar';
    document.querySelectorAll('.filtro-origem').forEach(btn => {
        btn.onclick = function() {
            origemAtual = this.dataset.origem;
            atualizarGraficoTotais(origemAtual, tipoAtual);
        };
    });
    document.querySelectorAll('.filtro-tipo').forEach(btn => {
        btn.onclick = function() {
            tipoAtual = this.dataset.tipo;
            atualizarGraficoTotais(origemAtual, tipoAtual);
        };
    });
    atualizarGraficoTotais(origemAtual, tipoAtual);
}

// Atualizar gráfico ao trocar de aba para gráficos
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.getAttribute('data-tab') === 'graficos') {
            configurarFiltrosGraficos();
        }
    });
});

// Função para mostrar valor puro ao focar
function mostrarValorPuro(input) {
    input.value = extrairValorPuro(input.value);
}
// Função para extrair valor puro de um valor monetário formatado
function extrairValorPuro(valor) {
    if (!valor) return '';
    // Remove R$, espaços, pontos e troca vírgula por ponto
    return valor.replace(/R\$|\s|\./g, '').replace(',', '.');
}
// Função para formatar valor monetário ao sair do campo
function formatarValorMonetario(input) {
    // Remove R$, espaços, pontos e troca vírgula por ponto
    let valor = input.value.replace(/R\$|\s|\./g, '').replace(',', '.');
    let num = parseFloat(valor);
    if (!isNaN(num)) {
        input.value = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        input.value = '';
    }
}

// Função para formatar valor enquanto digita
function formatarValorDigitando(input) {
    let valor = input.value.replace(/[^\d]/g, '');
    if (!valor) {
        input.value = '';
        return;
    }
    let num = parseFloat(valor) / 100;
    input.value = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // Move o cursor para o final
    setTimeout(() => {
        input.selectionStart = input.selectionEnd = input.value.length;
    }, 0);
}

// Renderiza a linha de entrada para adicionar novos lançamentos
function renderizarLinhaAddFluxo() {
    const tr = document.getElementById('linha-add-fluxo');
    if (!tr) return;
    // Safra selecionada
    const safraSelecionada = document.getElementById('safra-select') ? document.getElementById('safra-select').value : '';
    // Opções de banco com opção vazia
    const bancoOptions = [`<option value='' selected disabled>Selecione</option>`].concat(bancos.map(b => `<option value='${b}'>${b}</option>`)).join('');
    // Opções de código com opção vazia
    const codigoOptions = [`<option value='' selected disabled>Selecione</option>`]
        .concat(codigos.map(c => {
            const nome = typeof c === 'object' ? c.codigo : c;
            return `<option value='${nome}'>${nome}</option>`;
        })).join('');
    // Opções de entrada/saída com opção vazia
    const entradaSaidaOptions = [`<option value='' selected disabled>Selecione</option>`, '<option value="Entrada">Entrada</option>', '<option value="Saída">Saída</option>'].join('');
    // Campos
    tr.innerHTML = `
        <td><input value="${safraSelecionada}" readonly class="safra-readonly"></td>
        <td><input type="date" id="add-nData"></td>
        <td><select id="add-Banco">${bancoOptions}</select></td>
        <td><input id="add-Numero"></td>
        <td><input id="add-Historico"></td>
        <td><select id="add-EntradaSaida">${entradaSaidaOptions}</select></td>
        <td><input class='valor-monetario' id="add-Valor" oninput="formatarValorDigitando(this)" onblur="formatarValorMonetario(this)"></td>
        <td><select id="add-Codigo" style="text-align:left;">${codigoOptions}</select></td>
        <td class='action-cell'><button class='btn btn-success' title='Adicionar' onclick='adicionarFluxoDoInput()'><i class='fas fa-plus'></i></button></td>
    `;
}

// Adicionar lançamento via API
async function adicionarFluxoDoInput() {
    const safra = document.getElementById('safra-select') ? document.getElementById('safra-select').value : '';
    if (!safra) {
        alert('Por favor, selecione uma safra antes de adicionar um lançamento.');
        return;
    }
    const nData = document.getElementById('add-nData').value;
    const Banco = document.getElementById('add-Banco').value;
    const Numero = document.getElementById('add-Numero').value;
    const Historico = document.getElementById('add-Historico').value;
    const EntradaSaida = document.getElementById('add-EntradaSaida').value;
    let Valor = document.getElementById('add-Valor').value;
    Valor = extrairValorPuro(Valor);
    const Codigo = document.getElementById('add-Codigo').value;
    if (!nData || !Banco || !Numero || !Historico || !Valor || !Codigo) {
        alert('Preencha todos os campos para adicionar o lançamento.');
        return;
    }
    await fetch(`${URL_BACKEND}/api/fluxo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Safra: safra, nData, Banco, Numero, Historico, EntradaSaida, Valor, Codigo })
    });
    fluxoCaixa.push({ Safra: safra, nData, Banco, Numero, Historico, EntradaSaida, Valor, Codigo }); // Atualiza localmente
    renderizarTabelaFluxo();
    renderizarTabelaFluxoConsolidado();
    renderizarLinhaAddFluxo();
}

// --- GRÁFICOS DINÂMICOS ABA NOVA ---
let chartDinamico = null;

function preencherFiltrosGraficosDinamicos() {
    // Safras
    const selectSafra = document.getElementById('filtro-safra-dinamico');
    if (selectSafra) {
        selectSafra.innerHTML = '<option value="">Todas</option>' + safras.map(s => `<option value="${s}">${s}</option>`).join('');
    }
    // Bancos
    const selectBanco = document.getElementById('filtro-banco-dinamico');
    if (selectBanco) {
        selectBanco.innerHTML = '<option value="">Todos</option>' + bancos.map(b => `<option value="${b}">${b}</option>`).join('');
    }
    // Origens como botões
    const origens = Array.from(new Set(codigos.map(c => typeof c === 'object' ? c.origem : 'Receita')));
    const divBotoesOrigem = document.getElementById('botoes-origem-dinamico');
    if (divBotoesOrigem) {
        divBotoesOrigem.innerHTML = '<button class="btn btn-outline btn-origem-dinamico btn-primary" data-origem="" style="width:100%;height:42px;text-align:center;white-space:normal;word-break:break-word;">Todas</button>' +
            origens.map(o => `<button class="btn btn-outline btn-origem-dinamico" data-origem="${o}" style="width:100%;height:42px;text-align:center;white-space:normal;word-break:break-word;">${o}</button>`).join('');
    }
}

function atualizarGraficoDinamico() {
    const safra = document.getElementById('filtro-safra-dinamico')?.value;
    const banco = document.getElementById('filtro-banco-dinamico')?.value;
    // Origem pelo botão ativo
    const btnOrigemAtivo = document.querySelector('.btn-origem-dinamico.btn-primary');
    const origem = btnOrigemAtivo ? btnOrigemAtivo.dataset.origem : '';
    const tipo = document.querySelector('.filtro-tipo-dinamico.btn-primary')?.dataset.tipo || 'bar';
    const canvas = document.getElementById('grafico-dinamico');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Filtrar lançamentos
    let dados = fluxoCaixa.filter(l =>
        (!safra || l.Safra === safra) &&
        (!banco || l.Banco === banco) &&
        (!origem || (codigos.find(c => (typeof c === 'object' ? c.codigo : c) === l.Codigo)?.origem || 'Receita') === origem)
    );

    // Códigos distintos para a origem selecionada
    let codigosFiltrados = codigos.filter(c => !origem || (typeof c === 'object' ? c.origem : 'Receita') === origem);
    let listaCodigos = codigosFiltrados.map(c => typeof c === 'object' ? c.codigo : c);
    // Cores para os códigos (paleta)
    const cores = [
        '#3498db','#2ecc71','#f1c40f','#e67e22','#e74c3c','#9b59b6','#1abc9c','#34495e','#95a5a6','#f39c12','#7f8c8d','#16a085','#2980b9',
        '#b9770e','#8e44ad','#27ae60','#c0392b','#2980b9','#d35400','#7f8c8d','#16a085','#f39c12','#e67e22','#e74c3c','#9b59b6','#1abc9c'
    ];

    let datasets = [];
    let labels = [...mesesFluxo];
    let options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'right' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        if (tipo === 'pie') {
                            const valor = Math.abs(context.raw);
                            const total = context.dataset.data.reduce((a, b) => a + Math.abs(b), 0);
                            const percentual = total > 0 ? (valor / total * 100) : 0;
                            return `${context.label}: ${context.raw.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})} (${percentual.toFixed(1)}%)`;
                        } else {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
                        }
                    }
                }
            }
        },
        scales: {}
    };

    if (tipo === 'bar' && listaCodigos.length > 0) {
        // Para cada código, calcular os totais por mês
        let codigosComMovimentacao = listaCodigos.filter((codigo) => {
            let totaisMes = Array(12).fill(0);
            dados.forEach(lanc => {
                if (lanc.Codigo === codigo) {
                    const mes = getMesFluxo(lanc.nData);
                    if (mes !== null && mes >= 0 && mes < 12) {
                        let valor = parseFloat(lanc.Valor?.toString().replace(',', '.')) || 0;
                        if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                            valor = -Math.abs(valor);
                        }
                        totaisMes[mes] += valor;
                    }
                }
            });
            let total = totaisMes.reduce((a, b) => a + b, 0);
            return totaisMes.some(v => v !== 0) || total !== 0;
        });
        listaCodigos = codigosComMovimentacao;
        datasets = [];
        listaCodigos.forEach((codigo, idx) => {
            let totaisMes = Array(12).fill(0);
            dados.forEach(lanc => {
                if (lanc.Codigo === codigo) {
                    const mes = getMesFluxo(lanc.nData);
                    if (mes !== null && mes >= 0 && mes < 12) {
                        let valor = parseFloat(lanc.Valor?.toString().replace(',', '.')) || 0;
                        if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                            valor = -Math.abs(valor);
                        }
                        totaisMes[mes] += valor;
                    }
                }
            });
            datasets.push({
                label: codigo,
                data: totaisMes,
                backgroundColor: cores[idx % cores.length],
                stack: 'stack1',
                borderWidth: 1
            });
        });
        options.scales = {
            x: { stacked: true },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
                    }
                }
            }
        };
    } else if (tipo === 'pie') {
        let totaisPorCodigo = listaCodigos.map((codigo) => {
            let total = 0;
            dados.forEach(lanc => {
                if (lanc.Codigo === codigo) {
                    let valor = parseFloat(lanc.Valor?.toString().replace(',', '.')) || 0;
                    if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                        valor = -Math.abs(valor);
                    }
                    total += valor;
                }
            });
            return total;
        });
        // Filtra códigos sem movimentação
        let codigosComMovimentacao = listaCodigos.filter((codigo, idx) => totaisPorCodigo[idx] !== 0);
        let totaisFiltrados = totaisPorCodigo.filter((total) => total !== 0);
        listaCodigos = codigosComMovimentacao;
        datasets = [{
            label: 'Totais por Código',
            data: totaisFiltrados,
            backgroundColor: cores.slice(0, listaCodigos.length),
            borderColor: '#2c3e50',
            borderWidth: 2
        }];
        labels = listaCodigos;
        options.scales = {};
    } else if (tipo === 'line') {
        // Gráfico de linha: receitas, despesas e saldo acumulado
        let receitasMes = Array(12).fill(0);
        let despesasMes = Array(12).fill(0);
        let saldoMes = Array(12).fill(0);
        // Considera apenas lançamentos da safra e origem filtrada
        fluxoCaixa.filter(l => (!safra || l.Safra === safra) && (!origem || (codigos.find(c => (typeof c === 'object' ? c.codigo : c) === l.Codigo)?.origem || 'Receita') === origem)).forEach(lanc => {
            const mes = getMesFluxo(lanc.nData);
            if (mes !== null && mes >= 0 && mes < 12) {
                let valor = parseFloat(lanc.Valor?.toString().replace(',', '.')) || 0;
                let origemLanc = codigos.find(c => (typeof c === 'object' ? c.codigo : c) === lanc.Codigo)?.origem || 'Receita';
                if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                    valor = -Math.abs(valor);
                }
                if (valor >= 0 && origemLanc === 'Receita') {
                    receitasMes[mes] += valor;
                } else if (valor < 0) {
                    despesasMes[mes] += valor; // sempre negativo
                }
            }
        });
        // Saldo acumulado
        for (let i = 0; i < 12; i++) {
            if (i === 0) {
                saldoMes[i] = receitasMes[i] + despesasMes[i];
            } else {
                saldoMes[i] = saldoMes[i-1] + receitasMes[i] + despesasMes[i];
            }
        }
        // Linhas pontilhadas para saldos dos bancos
        const coresBancos = [
            '#8e44ad','#f39c12','#16a085','#c0392b','#2980b9','#d35400','#7f8c8d','#27ae60','#e67e22','#e74c3c','#9b59b6','#1abc9c'
        ];
        let bancosAtivos = bancos.filter(b => b && b.trim() !== '');
        let datasetsBancos = bancosAtivos.map((banco, idx) => {
            let saldoBanco = Array(12).fill(0);
            let saldoAnterior = 0;
            for (let i = 0; i < 12; i++) {
                // Soma receitas e despesas do banco no mês
                let receitasBanco = 0;
                let despesasBanco = 0;
                fluxoCaixa.filter(l => (!safra || l.Safra === safra) && l.Banco === banco && (!origem || (codigos.find(c => (typeof c === 'object' ? c.codigo : c) === l.Codigo)?.origem || 'Receita') === origem)).forEach(lanc => {
                    const mesLanc = getMesFluxo(lanc.nData);
                    if (mesLanc === i) {
                        let valor = parseFloat(lanc.Valor?.toString().replace(',', '.')) || 0;
                        let origemLanc = codigos.find(c => (typeof c === 'object' ? c.codigo : c) === lanc.Codigo)?.origem || 'Receita';
                        if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                            valor = -Math.abs(valor);
                        }
                        if (valor >= 0 && origemLanc === 'Receita') {
                            receitasBanco += valor;
                        } else if (valor < 0) {
                            despesasBanco += valor;
                        }
                    }
                });
                saldoBanco[i] = (i === 0 ? 0 : saldoBanco[i-1]) + receitasBanco + despesasBanco;
            }
            return {
                label: `Saldo ${banco}`,
                data: saldoBanco,
                borderColor: coresBancos[idx % coresBancos.length],
                backgroundColor: 'rgba(0,0,0,0)',
                fill: false,
                tension: 0.2,
                borderDash: [8, 6],
                pointRadius: 2
            };
        });
        datasets = [
            {
                label: 'Receitas',
                data: receitasMes,
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39,174,96,0.1)',
                fill: false,
                tension: 0.2
            },
            {
                label: 'Despesas',
                data: despesasMes,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231,76,60,0.1)',
                fill: false,
                tension: 0.2
            },
            {
                label: 'Saldo acumulado',
                data: saldoMes,
                borderColor: '#2980b9',
                backgroundColor: 'rgba(41,128,185,0.1)',
                fill: false,
                tension: 0.2
            },
            ...datasetsBancos
        ];
        options.scales = {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
                    }
                }
            }
        };
    } else {
        // Gráfico não empilhado: soma total por mês
        let totaisMes = Array(12).fill(0);
        dados.forEach(lanc => {
            const mes = getMesFluxo(lanc.nData);
            if (mes !== null && mes >= 0 && mes < 12) {
                let valor = parseFloat(lanc.Valor?.toString().replace(',', '.')) || 0;
                if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                    valor = -Math.abs(valor);
                }
                totaisMes[mes] += valor;
            }
        });
        let totalAnual = totaisMes.reduce((a, b) => a + b, 0);
        let backgroundColors = tipo === 'pie'
            ? cores.slice(0, 13)
            : '#3498db';
        datasets = [{
            label: 'Totais Dinâmicos',
            data: [...totaisMes, totalAnual],
            backgroundColor: backgroundColors,
            borderColor: '#2c3e50',
            borderWidth: 2,
            fill: tipo !== 'line',
            tension: 0.2
        }];
        labels = [...mesesFluxo];
        if (tipo !== 'pie') {
            options.scales = {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
                        }
                    }
                }
            };
        }
    }
    if (chartDinamico) chartDinamico.destroy();
    chartDinamico = new Chart(ctx, {
        type: tipo,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: options
    });
}

// Eventos para filtros dinâmicos
function configurarFiltrosGraficosDinamicos() {
    preencherFiltrosGraficosDinamicos();
    document.getElementById('filtro-safra-dinamico')?.addEventListener('change', atualizarGraficoDinamico);
    document.getElementById('filtro-banco-dinamico')?.addEventListener('change', atualizarGraficoDinamico);
    document.querySelectorAll('.filtro-tipo-dinamico').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('.filtro-tipo-dinamico').forEach(b => b.classList.remove('btn-primary'));
            this.classList.add('btn-primary');
            atualizarGraficoDinamico();
        };
    });
    // Botões de origem
    document.getElementById('botoes-origem-dinamico')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-origem-dinamico')) {
            document.querySelectorAll('.btn-origem-dinamico').forEach(b => b.classList.remove('btn-primary'));
            e.target.classList.add('btn-primary');
            atualizarGraficoDinamico();
        }
    });
    atualizarGraficoDinamico();
}

// Ativar ao trocar para a aba de gráficos dinâmicos
const tabBtnsDinamico = document.querySelectorAll('.tab-btn');
tabBtnsDinamico.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.getAttribute('data-tab') === 'graficos-dinamicos') {
            configurarFiltrosGraficosDinamicos();
        }
    });
});

// --- SALDOS DOS BANCOS ---
function renderizarSaldosBancos() {
    const div = document.getElementById('lista-saldos-bancos');
    if (!div) return;
    if (!bancos || bancos.length === 0) {
        div.innerHTML = '<p>Nenhum banco cadastrado.</p>';
        return;
    }
    let html = `<table style='width:100%;max-width:500px;margin:auto;border-collapse:collapse;'>
        <thead><tr><th style='text-align:left;padding:8px 4px;'>Banco</th><th style='text-align:right;padding:8px 4px;'>Saldo</th></tr></thead><tbody>`;
    bancos.forEach(banco => {
        let saldo = 0;
        fluxoCaixa.filter(l => l.Banco === banco).forEach(lanc => {
            let valor = parseFloat(lanc.Valor?.toString().replace(',', '.')) || 0;
            if (lanc.EntradaSaida && lanc.EntradaSaida.toLowerCase().includes('saída')) {
                valor = -Math.abs(valor);
            }
            saldo += valor;
        });
        html += `<tr><td style='padding:8px 4px;'>${banco}</td><td style='padding:8px 4px;text-align:right;font-weight:bold;'>${saldo.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td></tr>`;
    });
    html += '</tbody></table>';
    div.innerHTML = html;
}

// Atualizar ao trocar para a aba ou ao atualizar dados
const tabBtnsSaldos = document.querySelectorAll('.tab-btn');
tabBtnsSaldos.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.getAttribute('data-tab') === 'saldos-bancos') {
            renderizarSaldosBancos();
        }
    });
});

// Atualizar ao carregar cadastros ou fluxo
const _carregarCadastrosFluxo = window.carregarCadastros;
window.carregarCadastros = async function() {
    await _carregarCadastrosFluxo.apply(this, arguments);
    preencherFiltroSafraFluxo();
    renderizarTabelaFluxoConsolidado();
    // Garante que o evento de change está ativo
    const select = document.getElementById('filtro-safra-fluxo');
    if (select && !select._fluxoChangeBound) {
        select.addEventListener('change', renderizarTabelaFluxoConsolidado);
        select._fluxoChangeBound = true;
    }
};
const _carregarFluxoCaixaSaldos = window.carregarFluxoCaixa;
window.carregarFluxoCaixa = async function() {
    await _carregarFluxoCaixaSaldos.apply(this, arguments);
    renderizarSaldosBancos();
};

function confirmarRemoverLinhaFluxo(idx) {
    if (confirm('Tem certeza que deseja apagar este lançamento?')) {
        removerLinhaFluxo(idx);
    }
}

function mudarPaginaFluxo(delta) {
    paginaAtual += delta;
    renderizarTabelaFluxo();
}

// Debounce utilitário
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Exemplo de uso de debounce em filtro de busca (adicione onde houver busca/filtro):
// document.getElementById('filtro-codigos').addEventListener('input', debounce(filtrarCodigos, 300));

// Exemplo de uso de debounce em filtros de gráficos:
// document.getElementById('filtro-safra-dinamico').addEventListener('change', debounce(atualizarGraficoDinamico, 200));
// document.getElementById('filtro-banco-dinamico').addEventListener('change', debounce(atualizarGraficoDinamico, 200));

// Evento para carregar apenas a safra selecionada
window.addEventListener('DOMContentLoaded', function() {
    const btnCarregarSafra = document.getElementById('carregar-safra');
    if (btnCarregarSafra) {
        btnCarregarSafra.addEventListener('click', function() {
            paginaAtual = 1;
            renderizarTabelaFluxo();
            renderizarLinhaAddFluxo();
        });
    }
});