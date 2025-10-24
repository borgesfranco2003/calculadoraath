# CLAUDE.md - Nano Banana Image Generator API

Este arquivo contém todas as instruções para recriar o projeto **Nano Banana Image Generator API** do zero.

## 📋 Descrição do Projeto

Criar uma API REST completa para explorar todas as funcionalidades do **Gemini 2.5 Flash Image** (também conhecido como Nano Banana) - Sistema de geração de imagens usando inteligência artificial da Google.

**Custo**: $0.039 por imagem (95% mais barato que OpenAI)

## 🎯 Requisitos

### Tecnologias Backend
- Node.js 18+
- Express.js 4.18+
- @google/generative-ai ^0.21.0
- cors, dotenv, helmet, morgan
- express-rate-limit
- joi (validação)
- multer, axios

### Tecnologias Frontend
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Fetch API

### Modelo de IA
- **Gemini 2.5 Flash Image** (ID: `gemini-2.5-flash-image`)
- **Gemini 2.5 Flash Image Preview** (ID: `gemini-2.5-flash-image-preview`)

## 📁 Estrutura de Diretórios

```
nano-banana-api/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.js
│   │   ├── controllers/
│   │   │   └── imageController.js
│   │   ├── middlewares/
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   └── imageRoutes.js
│   │   ├── services/
│   │   │   └── geminiService.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       ├── api.js
│   │       ├── ui.js
│   │       └── app.js
│   ├── index.html
│   └── package.json
├── docs/
│   ├── API.md
│   └── EXAMPLES.md
├── examples/
│   └── curl-examples.sh
├── .gitignore
├── README.md
├── QUICKSTART.md
└── CLAUDE.md (este arquivo)
```

## 🚀 Funcionalidades Implementadas

### Endpoints da API (Backend)

1. **POST /api/images/generate** - Gerar imagens a partir de texto
2. **POST /api/images/edit** - Editar imagens existentes
3. **POST /api/images/upscale** - Aumentar resolução (2x ou 4x)
4. **POST /api/images/variations** - Gerar variações de uma imagem
5. **GET /api/images/models** - Listar modelos disponíveis
6. **GET /api/images/docs** - Documentação da API
7. **GET /health** - Health check

### Interface Frontend

1. **Tab "Gerar Imagem"**
   - Formulário com prompt, número de imagens, aspect ratio, modelo
   - Prompt negativo, idioma, filtros de segurança
   - Exemplos de prompts clicáveis
   - Visualização de resultados

2. **Tab "Editar Imagem"**
   - URL da imagem original
   - Prompt de edição
   - Máscara opcional

3. **Tab "Upscale"**
   - URL da imagem
   - Fator de escala (2x ou 4x)

4. **Tab "Variações"**
   - URL da imagem
   - Número de variações
   - Prompt de orientação

5. **Tab "Modelos"**
   - Lista de modelos disponíveis
   - Capacidades de cada modelo
   - Informações de preço

### Recursos Especiais

- **5 Aspect Ratios**: 1:1, 3:4, 4:3, 9:16, 16:9
- **Prompt Negativo**: Especificar o que evitar
- **2 Modelos**: Standard e Preview
- **Até 4 imagens** por requisição
- **Filtros de Segurança**: strict, default, permissive
- **Suporte Multilíngue**: pt, en, es, fr
- **Rate Limiting**: 100 requisições por 15 minutos
- **Validação**: Joi para validação de entrada
- **Segurança**: Helmet, CORS, Error Handling

## 📝 Configuração de Variáveis de Ambiente

Arquivo `.env` no backend:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Google Gemini API
GOOGLE_API_KEY=your_google_api_key_here

# CORS
CORS_ORIGIN=*

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Configurações de Imagem
DEFAULT_IMAGE_COUNT=1
MAX_IMAGE_COUNT=4
DEFAULT_IMAGE_SIZE=1024x1024
```

## 🎨 Design do Frontend

### Cores (CSS Variables)
```css
--primary-color: #4285f4;
--primary-hover: #357ae8;
--secondary-color: #34a853;
--danger-color: #ea4335;
--warning-color: #fbbc04;
--dark-bg: #1a1a1a;
--card-bg: #2d2d2d;
--text-primary: #ffffff;
--text-secondary: #b3b3b3;
--border-color: #404040;
--input-bg: #383838;
```

### Layout
- Design responsivo (mobile-friendly)
- Dark theme moderno
- Gradientes e sombras
- Animações suaves
- Toast notifications
- Loading overlay
- Grid de resultados

## 💻 Código-Chave

### Backend - config.js

```javascript
module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  googleApiKey: process.env.GOOGLE_API_KEY,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  rateLimitWindow: 900000,
  rateLimitMax: 100,
  defaultImageCount: 1,
  maxImageCount: 4,
  costPerImage: 0.039,

  models: {
    nanoBanana: 'gemini-2.5-flash-image',
    nanoBananaPreview: 'gemini-2.5-flash-image-preview'
  },

  aspectRatios: ['1:1', '3:4', '4:3', '9:16', '16:9'],

  safetySettings: [
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
  ]
};
```

### Backend - geminiService.js (Estrutura Principal)

```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');

class GeminiService {
  constructor() {
    if (!config.googleApiKey) {
      throw new Error('GOOGLE_API_KEY não está configurada');
    }
    this.genAI = new GoogleGenerativeAI(config.googleApiKey);
  }

  async generateImage(options) {
    const {
      prompt,
      numberOfImages = config.defaultImageCount,
      aspectRatio = '1:1',
      model = config.models.nanoBanana,
      negativePrompt = '',
      language = 'pt',
      addWatermark = false,
      safetyFilterLevel = 'default',
      personGeneration = 'allow_adult'
    } = options;

    // Validações
    // Construir prompt completo
    // Configurar geração
    // Gerar imagens usando Gemini 2.5 Flash Image
    // Retornar resultados
  }

  async editImage(options) { /* ... */ }
  async upscaleImage(options) { /* ... */ }
  async generateVariations(options) { /* ... */ }
  async listModels() { /* ... */ }
}

module.exports = new GeminiService();
```

### Frontend - Estrutura HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nano Banana Image Generator - Gemini AI</title>
    <link rel="stylesheet" href="public/css/styles.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🍌 Nano Banana Image Generator</h1>
            <p class="subtitle">Gere imagens incríveis usando Gemini 2.5 Flash Image AI | 95% mais barato que OpenAI</p>
        </header>

        <nav class="tabs">
            <button class="tab-button active" data-tab="generate">🎨 Gerar Imagem</button>
            <button class="tab-button" data-tab="edit">✏️ Editar Imagem</button>
            <button class="tab-button" data-tab="upscale">📈 Upscale</button>
            <button class="tab-button" data-tab="variations">🔄 Variações</button>
            <button class="tab-button" data-tab="models">🤖 Modelos</button>
        </nav>

        <!-- Tab Contents -->
        <div class="tab-content active" id="generate-tab">
            <!-- Formulário de geração -->
        </div>

        <!-- Outros tabs -->

        <div id="loading-overlay" class="loading-overlay" style="display: none;">
            <div class="spinner"></div>
            <p>Gerando sua imagem...</p>
        </div>

        <div id="toast-container" class="toast-container"></div>
    </div>

    <footer class="footer">
        <p>Powered by Google Gemini 2.5 Flash Image (Nano Banana) | Custo: $0.039/imagem</p>
    </footer>

    <script src="public/js/api.js"></script>
    <script src="public/js/ui.js"></script>
    <script src="public/js/app.js"></script>
</body>
</html>
```

## 📦 package.json (Backend)

```json
{
  "name": "nano-banana-api-backend",
  "version": "1.0.0",
  "description": "API REST completa para explorar funcionalidades do Gemini Nano Banana",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "express-rate-limit": "^7.1.5",
    "multer": "^1.4.5-lts.1",
    "joi": "^17.11.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

## 🔧 Passos para Implementação

### 1. Criar Estrutura de Diretórios

```bash
mkdir -p nano-banana-api/{backend/{src/{routes,controllers,services,middlewares,config},config},frontend/{public/{css,js},src},docs,examples}
```

### 2. Criar Backend

1. **server.js** - Servidor Express principal
2. **config/config.js** - Configurações centralizadas
3. **services/geminiService.js** - Integração com Gemini API
4. **controllers/imageController.js** - Controladores de endpoints
5. **routes/imageRoutes.js** - Definição de rotas
6. **middlewares/validation.js** - Validação com Joi
7. **middlewares/errorHandler.js** - Tratamento de erros

### 3. Criar Frontend

1. **index.html** - Estrutura HTML com tabs
2. **public/css/styles.css** - Estilos dark theme
3. **public/js/api.js** - Cliente da API (fetch)
4. **public/js/ui.js** - Funções de UI (toast, loading, etc)
5. **public/js/app.js** - Lógica principal da aplicação

### 4. Criar Documentação

1. **README.md** - Documentação principal
2. **QUICKSTART.md** - Guia de início rápido
3. **docs/API.md** - Documentação detalhada da API
4. **docs/EXAMPLES.md** - Exemplos de uso em várias linguagens
5. **examples/curl-examples.sh** - Script com exemplos cURL

### 5. Configuração

1. Criar `.env.example` e `.env`
2. Criar `.gitignore`
3. Instalar dependências: `npm install`
4. Configurar GOOGLE_API_KEY
5. Iniciar servidor: `npm start`

## 🎯 Exemplos de Uso

### Gerar Imagem

```javascript
const response = await fetch('http://localhost:3000/api/images/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Um gato laranja dormindo em uma janela ao pôr do sol',
    numberOfImages: 2,
    aspectRatio: '16:9',
    model: 'gemini-2.5-flash-image',
    negativePrompt: 'pessoas, carros',
    language: 'pt'
  })
});

const data = await response.json();
// Custo: 2 × $0.039 = $0.078
```

### cURL

```bash
curl -X POST http://localhost:3000/api/images/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma floresta mágica com árvores bioluminescentes",
    "numberOfImages": 1,
    "aspectRatio": "16:9",
    "model": "gemini-2.5-flash-image"
  }'
```

## 💰 Informações de Preço

- **$30.00** por 1 milhão de tokens de saída
- **1 imagem** = 1290 tokens de saída
- **Custo por imagem**: **$0.039**
- **Economia vs OpenAI**: **95%**

## 🔐 Segurança

- Helmet para headers HTTP
- CORS configurável
- Rate limiting (100 req/15min)
- Validação de entrada com Joi
- Safety settings do Gemini
- Error handling centralizado

## 📚 Recursos Importantes

### Obter API Key

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com conta Google
3. Clique em "Create API Key"
4. Copie a chave

### Modelos Disponíveis

1. **gemini-2.5-flash-image** (principal)
   - Alta qualidade
   - Todas as funcionalidades
   - $0.039 por imagem

2. **gemini-2.5-flash-image-preview** (preview)
   - Recursos experimentais
   - Mesma precificação

### Aspect Ratios Suportados

- **1:1** - Quadrado (redes sociais)
- **3:4** - Retrato
- **4:3** - Paisagem
- **9:16** - Vertical (Stories)
- **16:9** - Horizontal (YouTube)

## 🧪 Testes

### Health Check
```bash
curl http://localhost:3000/health
```

### Documentação
```bash
curl http://localhost:3000/api/images/docs
```

### Listar Modelos
```bash
curl http://localhost:3000/api/images/models
```

## 📝 Notas Importantes

1. **Nano Banana** é o nome interno/apelido do **Gemini 2.5 Flash Image**
2. O modelo foi anunciado em agosto de 2025
3. É 95% mais barato que OpenAI
4. Suporta geração, edição, upscale e variações
5. Cada imagem consome 1290 tokens de saída
6. Rate limit padrão: 100 requisições por 15 minutos
7. Frontend funciona sem API key (modo demonstração)
8. Backend requer API key válida para funcionar

## 🎨 Features do Frontend

- Design responsivo (mobile-friendly)
- Dark theme moderno com gradientes
- Sistema de tabs para diferentes funcionalidades
- Toast notifications para feedback
- Loading overlay durante processamento
- Exemplos de prompts clicáveis
- Grid de resultados
- Validação de formulários
- Tratamento de erros amigável

## 🚀 Deploy

### Backend
- Pode ser deployado em Heroku, Railway, Render, etc.
- Configurar variáveis de ambiente na plataforma
- Usar `npm start` como comando de inicialização

### Frontend
- Pode ser hospedado em Netlify, Vercel, GitHub Pages
- É uma SPA estática (HTML/CSS/JS)
- Atualizar URL da API para produção

## 📖 Referências

- [Gemini API Docs](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google AI Studio](https://makersuite.google.com/)
- [Nano Banana Announcement](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/)

## ✅ Checklist de Implementação

- [ ] Criar estrutura de diretórios
- [ ] Implementar backend completo
- [ ] Implementar frontend completo
- [ ] Criar documentação (README, QUICKSTART, API.md, EXAMPLES.md)
- [ ] Criar exemplos (curl-examples.sh)
- [ ] Configurar .env e .gitignore
- [ ] Instalar dependências
- [ ] Testar todos os endpoints
- [ ] Testar interface web
- [ ] Validar com API key real do Google
- [ ] Commit e push para repositório

---

**Este arquivo contém TODAS as informações necessárias para recriar o projeto Nano Banana Image Generator API do zero. Use-o como referência completa para implementação.**

**Desenvolvido com ❤️ usando Claude Code e Gemini 2.5 Flash Image (Nano Banana)** 🍌
