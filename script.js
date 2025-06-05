'use strict';

// A chave da API deve ser definida em config.js como window.API_KEY
const criptoMoedas = {
  BTC: { nome: 'Bitcoin', ath: 64863.10 },
  ETH: { nome: 'Ethereum', ath: 4374.31 },
  BNB: { nome: 'Binance Coin', ath: 690.93 },
  ADA: { nome: 'Cardano', ath: 3.09 },
  DOGE: { nome: 'Dogecoin', ath: 0.731578 },
  XRP: { nome: 'Ripple', ath: 3.84 },
  MATIC: { nome: 'Polygon', ath: 2.68 },
  SOL: { nome: 'Solana', ath: 213.85 },
  DOT: { nome: 'Polkadot', ath: 49.35 },
  TRX: { nome: 'Tron', ath: 0.300363 },
  LTC: { nome: 'Litecoin', ath: 410.26 },
  AVAX: { nome: 'Avalanche', ath: 123.42 },
  UNI: { nome: 'Uniswap', ath: 44.92 },
  LINK: { nome: 'Chainlink', ath: 52.88 },
  ATOM: { nome: 'Cosmos', ath: 44.01 },
  XMR: { nome: 'Monero', ath: 542.33 },
  ETC: { nome: 'Ethereum Classic', ath: 167.09 },
  ICP: { nome: 'Internet Computer', ath: 700.65 },
  FIL: { nome: 'Filecoin', ath: 208.95 },
  CRO: { nome: 'Cronos', ath: 0.277134 },
  NEAR: { nome: 'Near Protocol', ath: 19.11 },
  VET: { nome: 'VeChain', ath: 0.278179 },
  APE: { nome: 'ApeCoin', ath: 13.30 },
  ALGO: { nome: 'Algorand', ath: 3.56 },
  GRT: { nome: 'The Graph', ath: 2.88 },
  SAND: { nome: 'The Sandbox', ath: 8.39 },
  XRD: { nome: 'Radix', ath: 0.3217 },
  AXS: { nome: 'Axie Infinity', ath: 162.86 },
  SNX: { nome: 'Synthetix Network', ath: 28.53 },
  AAVE: { nome: 'Aave', ath: 628.17 }
};

// IDs das criptomoedas na API da CoinGecko para atualizar o ATH automaticamente
const COINGECKO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  XRP: 'ripple',
  MATIC: 'matic-network',
  SOL: 'solana',
  DOT: 'polkadot',
  TRX: 'tron',
  LTC: 'litecoin',
  AVAX: 'avalanche-2',
  UNI: 'uniswap',
  LINK: 'chainlink',
  ATOM: 'cosmos',
  XMR: 'monero',
  ETC: 'ethereum-classic',
  ICP: 'internet-computer',
  FIL: 'filecoin',
  CRO: 'crypto-com-chain',
  NEAR: 'near',
  VET: 'vechain',
  APE: 'apecoin',
  ALGO: 'algorand',
  GRT: 'the-graph',
  SAND: 'the-sandbox',
  XRD: 'radix',
  AXS: 'axie-infinity',
  SNX: 'synthetix-network-token',
  AAVE: 'aave'
};

async function buscarPrecosCripto() {
  if (typeof API_KEY === 'undefined') {
    throw new Error('API key não definida. Crie um arquivo config.js com sua chave.');
  }
  const simbolos = 'BTC,ETH,BNB,ADA,DOGE,XRP,MATIC,SOL,DOT,TRX,LTC,AVAX,UNI,LINK,ATOM,XMR,ETC,ICP,FIL,CRO,NEAR,VET,APE,ALGO,GRT,SAND,XRD,AXS,SNX,AAVE';
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${simbolos}&tsyms=USD&api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha na requisição: ' + response.status);
    }
    const precos = await response.json();
    return precos;
  } catch (error) {
    console.error('Erro ao buscar preços das criptomoedas:', error);
    alert('Não foi possível obter os preços atuais. Tente novamente mais tarde.');
    return null;
  }
}

async function atualizarATH(criptoMoedas) {
  const ids = Object.values(COINGECKO_IDS).join(',');
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha na requisição: ' + response.status);
    }
    const dados = await response.json();
    dados.forEach(coin => {
      const simbolo = Object.keys(COINGECKO_IDS).find(key => COINGECKO_IDS[key] === coin.id);
      if (criptoMoedas[simbolo]) {
        criptoMoedas[simbolo].ath = coin.ath;
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar ATH:', error);
  }
}

async function atualizarPrecoAtual(criptoMoedas) {
  const precos = await buscarPrecosCripto();
  if (!precos) return;
  for (const simbolo in precos) {
    if (criptoMoedas[simbolo]) {
      criptoMoedas[simbolo].precoAtual = precos[simbolo].USD;
    }
  }
}

// Função pura para calcular quantidade e ganho potencial
function calcularGanho(investimento, precoAtual, ath) {
  if (!precoAtual || isNaN(precoAtual)) {
    throw new Error('Preço atual inválido');
  }
  const quantidade = investimento / precoAtual;
  const ganho = quantidade * ath - investimento;
  return { quantidade, ganho };
}

// Torna a função acessível para testes e para o navegador
if (typeof module !== 'undefined') {
  module.exports = { calcularGanho };
} else {
  window.calcularGanho = calcularGanho;
}

function adicionarLinhaCriptomoeda() {
  const container = document.getElementById('criptomoedas-container');
  const linhasExistentes = container.querySelectorAll('.criptomoeda-linha');

  if (linhasExistentes.length < 10) {
    const novaLinha = linhasExistentes[0].cloneNode(true);
    // Limpa a seleção da nova linha para evitar confusão
    const select = novaLinha.querySelector('.criptomoeda');
    if (select) select.selectedIndex = 0;
    container.appendChild(novaLinha);
  } else {
    alert('Limite máximo de 10 criptomoedas atingido.');
  }
}

if (typeof document !== 'undefined') {
document.getElementById("calculadora").addEventListener("submit", async function(event) {
  event.preventDefault();

  // Atualiza ATH e preços atuais antes dos cálculos
  await atualizarATH(criptoMoedas);
  await atualizarPrecoAtual(criptoMoedas);

  const investimento = parseFloat(document.getElementById("investimento").value);

  if (isNaN(investimento) || investimento <= 0) {
    alert("Por favor, insira um valor de investimento válido.");
    return;
  }

  const linhasCriptomoedas = document.querySelectorAll(".criptomoeda-linha");
  const tbody = document.querySelector('#tabela-resultados tbody');
  tbody.innerHTML = '';

  linhasCriptomoedas.forEach(linha => {
    const selecao = linha.querySelector(".criptomoeda");
    const moedaSelecionada = selecao.value;
    if (!criptoMoedas[moedaSelecionada]) {
      alert("Moeda selecionada inválida.");
      return;
    }
    const athMoeda = criptoMoedas[moedaSelecionada].ath;
    const moedaNome = criptoMoedas[moedaSelecionada].nome;
    const precoAtualMoeda = criptoMoedas[moedaSelecionada].precoAtual;

    if (typeof precoAtualMoeda === 'undefined') {
      alert(`Preço atual não encontrado para ${moedaNome}.`);
      return;
    }
    const { quantidade: quantidadeMoedas, ganho: potencialGanho } = calcularGanho(investimento, precoAtualMoeda, athMoeda);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${moedaNome}</td>
      <td>${quantidadeMoedas.toFixed(4)}</td>
      <td>$${potencialGanho.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
});
}
