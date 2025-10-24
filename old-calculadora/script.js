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

async function buscarPrecosCripto() {
  const apiKey = 'fcac89c29fc03198df0cd48373b27f366a266fdbdd344a9e865cd5067ae704c4';
  const simbolos = 'BTC,ETH,BNB,ADA,DOGE,XRP,MATIC,SOL,DOT,TRX,LTC,AVAX,UNI,LINK,ATOM,XMR,ETC,ICP,FIL,CRO,NEAR,VET,APE,ALGO,GRT,SAND,XRD,AXS,SNX,AAVE';
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${simbolos}&tsyms=USD&api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const precos = await response.json();
    return precos;
  } catch (error) {
    console.error('Erro ao buscar preços das criptomoedas:', error);
  }
}

async function atualizarPrecoAtual(criptoMoedas) {
  const precos = await buscarPrecosCripto();
  for (const simbolo in precos) {
    criptoMoedas[simbolo].precoAtual = precos[simbolo].USD;
  }
}

function adicionarLinhaCriptomoeda() {
  const container = document.getElementById('criptomoedas-container');
  const linhasExistentes = container.querySelectorAll('.criptomoeda-linha');

  if (linhasExistentes.length < 10) {
    const novaLinha = linhasExistentes[0].cloneNode(true);
    container.appendChild(novaLinha);
  } else {
    alert('Limite máximo de 10 criptomoedas atingido.');
  }
}

document.getElementById("calculadora").addEventListener("submit", async function(event) {
  event.preventDefault();

  await atualizarPrecoAtual(criptoMoedas);

  const investimento = parseFloat(document.getElementById("investimento").value);

  if (isNaN(investimento) || investimento <= 0) {
    alert("Por favor, insira um valor de investimento válido.");
    return;
  }

  const linhasCriptomoedas = document.querySelectorAll(".criptomoeda-linha");

  linhasCriptomoedas.forEach(linha => {
    const selecao = linha.querySelector(".criptomoeda");
    const moedaSelecionada = selecao.value;
    const athMoeda = criptoMoedas[moedaSelecionada].ath;
    const moedaNome = criptoMoedas[moedaSelecionada].nome;
    const precoAtualMoeda = criptoMoedas[moedaSelecionada].precoAtual;

    const quantidadeMoedas = investimento / precoAtualMoeda;
    const potencialGanho = quantidadeMoedas * athMoeda - investimento;

    const resultadoLinha = linha.querySelector(".resultado-linha");
    resultadoLinha.innerHTML = `Se você investir <strong>$${investimento.toFixed(2)}</strong> em <strong>${moedaNome}</strong> e ele atingir o ATH novamente, você poderá obter um ganho potencial de <strong>$${potencialGanho.toFixed(2)}</strong>.`;
  });
});