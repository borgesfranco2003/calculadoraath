# Repositório de Projetos

Este repositório contém múltiplos projetos relacionados a calculadoras e APIs de inteligência artificial.

## 📂 Projetos

### 1. 🍌 Nano Banana Image Generator API

**Localização**: `nano-banana-api/`

API REST completa para geração de imagens usando **Google Gemini 2.5 Flash Image** (Nano Banana). Inclui backend Node.js/Express e frontend web interativo.

**Características**:
- Geração de imagens a partir de prompts de texto
- Edição de imagens existentes
- Upscale (aumento de resolução)
- Geração de variações
- Gemini 2.5 Flash Image (state-of-the-art)
- **Custo: $0.039 por imagem (95% mais barato que OpenAI)**
- Múltiplas proporções (1:1, 3:4, 4:3, 9:16, 16:9)
- Interface web completa
- Documentação extensiva

**Links Rápidos**:
- [README Completo](nano-banana-api/README.md)
- [Guia de Início Rápido](nano-banana-api/QUICKSTART.md)
- [Documentação da API](nano-banana-api/docs/API.md)
- [Exemplos de Uso](nano-banana-api/docs/EXAMPLES.md)

**Como Usar**:
```bash
cd nano-banana-api/backend
npm install
cp .env.example .env
# Configure GOOGLE_API_KEY no .env
npm start
```

### 2. 💰 Calculadora de Cripto ATH (Original)

**Localização**: `old-calculadora/`

Calculadora web para estimar ganhos potenciais de investimentos em criptomoedas baseado em preços de All-Time High (ATH).

**Características**:
- 30+ criptomoedas suportadas
- Preços em tempo real via CryptoCompare API
- Interface simples e intuitiva
- Sem backend necessário

## 🚀 Início Rápido

### Nano Banana API
```bash
cd nano-banana-api/backend
npm install
echo "GOOGLE_API_KEY=sua_chave_aqui" > .env
npm start
```

Acesse: http://localhost:3000

### Calculadora Cripto
Simplesmente abra `old-calculadora/index.html` no navegador.

## 📚 Documentação

Cada projeto possui sua própria documentação detalhada em seus respectivos diretórios.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📄 Licença

MIT License - Veja os arquivos LICENSE em cada projeto para detalhes.

## 🔗 Links Úteis

- [Google Gemini AI](https://ai.google.dev/)
- [CryptoCompare API](https://www.cryptocompare.com/)

---

**Desenvolvido com ❤️**
