# Calculadora ATH

Esta aplicação web calcula o potencial de lucro caso determinadas criptomoedas voltem ao seu valor máximo histórico (ATH).
Os valores de ATH são atualizados automaticamente a partir da API pública da CoinGecko sempre que o cálculo é executado.

## Como usar

1. Copie o arquivo `config.example.js` para `config.js` e insira sua chave de API da [CryptoCompare](https://www.cryptocompare.com/).
2. Abra `index.html` em seu navegador.
3. Informe o valor a investir em dólares e selecione até 10 criptomoedas.
4. Clique em **Calcular** para ver em uma tabela o possível ganho se cada moeda atingir novamente o ATH.

## Configuração da chave de API

O arquivo `config.js` é ignorado pelo Git para evitar o vazamento da chave.
Ele deve conter o seguinte código:

```javascript
window.API_KEY = 'SUA_CHAVE_AQUI';
```

Sem uma chave válida a aplicação não conseguirá consultar os preços atuais.

## Aviso

Esta ferramenta é apenas para fins educacionais e não constitui recomendação de investimento.
