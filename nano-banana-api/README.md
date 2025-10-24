# 🍌 Nano Banana Image Generator API

API REST completa para explorar todas as funcionalidades do Gemini Nano Banana - Sistema de geração de imagens usando inteligência artificial da Google.

## 📋 Índice

- [Características](#características)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints da API](#endpoints-da-api)
- [Frontend](#frontend)
- [Exemplos](#exemplos)
- [Segurança](#segurança)
- [Contribuindo](#contribuindo)

## ✨ Características

- **Geração de Imagens**: Crie imagens incríveis a partir de prompts de texto
- **Edição de Imagens**: Modifique imagens existentes com instruções em linguagem natural
- **Upscale**: Aumente a resolução de imagens (2x ou 4x)
- **Variações**: Gere múltiplas variações de uma imagem base
- **Múltiplos Modelos**: Suporte para Imagen 3.0 e Imagen 3.0 Fast
- **Proporções Diversas**: Suporte para 1:1, 3:4, 4:3, 9:16, 16:9
- **Prompt Negativo**: Especifique o que evitar nas imagens
- **Filtros de Segurança**: Configurações de segurança ajustáveis
- **Rate Limiting**: Proteção contra abuso
- **Interface Web**: Frontend completo para interação com a API

## 🚀 Tecnologias

### Backend
- Node.js 18+
- Express.js
- Google Generative AI SDK
- Joi (validação)
- Helmet (segurança)
- Morgan (logging)
- CORS

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Fetch API

## 📁 Estrutura do Projeto

```
nano-banana-api/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.js           # Configurações centralizadas
│   │   ├── controllers/
│   │   │   └── imageController.js  # Controladores da API
│   │   ├── middlewares/
│   │   │   ├── validation.js       # Validação de requisições
│   │   │   └── errorHandler.js     # Tratamento de erros
│   │   ├── routes/
│   │   │   └── imageRoutes.js      # Rotas da API
│   │   ├── services/
│   │   │   └── geminiService.js    # Integração com Gemini
│   │   └── server.js               # Ponto de entrada
│   ├── .env.example                # Exemplo de variáveis de ambiente
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css          # Estilos
│   │   └── js/
│   │       ├── api.js              # Cliente da API
│   │       ├── ui.js               # Funções de UI
│   │       └── app.js              # Lógica principal
│   └── index.html                  # Interface web
├── docs/
│   ├── API.md                      # Documentação da API
│   └── EXAMPLES.md                 # Exemplos de uso
├── examples/
│   └── curl-examples.sh            # Exemplos com cURL
└── README.md
```

## 📦 Instalação

### Pré-requisitos

- Node.js 18 ou superior
- NPM ou Yarn
- Chave de API do Google Gemini

### Passo 1: Clone o repositório

```bash
git clone <repository-url>
cd calculadoraath/nano-banana-api
```

### Passo 2: Instalar dependências do backend

```bash
cd backend
npm install
```

### Passo 3: Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave de API do Google:

```env
GOOGLE_API_KEY=sua_chave_aqui
PORT=3000
NODE_ENV=development
```

### Passo 4: Iniciar o servidor

```bash
npm start
# ou para desenvolvimento com hot reload:
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Passo 5: Abrir o frontend

Abra o arquivo `frontend/index.html` em seu navegador ou use um servidor local:

```bash
cd ../frontend
python -m http.server 8080
# ou
npx serve
```

Acesse `http://localhost:8080`

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `GOOGLE_API_KEY` | Chave de API do Google Gemini | **Obrigatório** |
| `PORT` | Porta do servidor | 3000 |
| `NODE_ENV` | Ambiente (development/production) | development |
| `CORS_ORIGIN` | Origem CORS permitida | * |
| `RATE_LIMIT_WINDOW_MS` | Janela de rate limiting (ms) | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de requisições por janela | 100 |
| `DEFAULT_IMAGE_COUNT` | Número padrão de imagens | 1 |
| `MAX_IMAGE_COUNT` | Máximo de imagens por requisição | 4 |

### Obtendo a Chave de API do Google

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie um novo projeto ou selecione um existente
3. Gere uma chave de API
4. Copie a chave e adicione ao arquivo `.env`

## 🎯 Uso

### Health Check

Verifique se o servidor está funcionando:

```bash
curl http://localhost:3000/health
```

### Gerar Imagem

```bash
curl -X POST http://localhost:3000/api/images/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Um pôr do sol vibrante sobre montanhas nevadas, estilo aquarela",
    "numberOfImages": 2,
    "aspectRatio": "16:9",
    "negativePrompt": "pessoas, carros"
  }'
```

## 🔌 Endpoints da API

### Documentação Interativa

GET `/api/images/docs`

Retorna documentação completa da API com exemplos.

### Gerar Imagens

POST `/api/images/generate`

**Body:**
```json
{
  "prompt": "string (obrigatório)",
  "numberOfImages": 1-4,
  "aspectRatio": "1:1|3:4|4:3|9:16|16:9",
  "model": "imagen-3.0-generate-001|imagen-3.0-fast-generate-001",
  "negativePrompt": "string",
  "language": "pt|en|es|fr",
  "addWatermark": false,
  "safetyFilterLevel": "default|strict|permissive",
  "personGeneration": "allow_adult|allow_all|block_all"
}
```

### Editar Imagem

POST `/api/images/edit`

**Body:**
```json
{
  "imageUrl": "string (obrigatório)",
  "prompt": "string (obrigatório)",
  "maskUrl": "string (opcional)",
  "numberOfImages": 1-4
}
```

### Upscale de Imagem

POST `/api/images/upscale`

**Body:**
```json
{
  "imageUrl": "string (obrigatório)",
  "scaleFactor": 2|4
}
```

### Gerar Variações

POST `/api/images/variations`

**Body:**
```json
{
  "imageUrl": "string (obrigatório)",
  "numberOfVariations": 2-4,
  "prompt": "string (opcional)"
}
```

### Listar Modelos

GET `/api/images/models`

Retorna lista de modelos disponíveis com suas capacidades.

## 🖥️ Frontend

O frontend oferece uma interface intuitiva para todas as funcionalidades:

- **Tab "Gerar Imagem"**: Interface completa para geração de imagens
- **Tab "Editar Imagem"**: Edição de imagens existentes
- **Tab "Upscale"**: Aumento de resolução
- **Tab "Variações"**: Geração de variações
- **Tab "Modelos"**: Visualização de modelos disponíveis

### Recursos do Frontend

- Design responsivo (mobile-friendly)
- Tema escuro moderno
- Notificações toast
- Loading overlay
- Exemplos de prompts
- Validação de formulários
- Visualização de resultados

## 📚 Exemplos

### Exemplo 1: Paisagem Natural

```javascript
const response = await fetch('http://localhost:3000/api/images/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Uma floresta tropical exuberante com cachoeira ao amanhecer',
    numberOfImages: 1,
    aspectRatio: '16:9',
    negativePrompt: 'pessoas, animais'
  })
});

const data = await response.json();
console.log(data);
```

### Exemplo 2: Arte Digital

```javascript
await api.generateImage({
  prompt: 'Cidade futurista com arranha-céus de vidro e carros voadores',
  numberOfImages: 3,
  aspectRatio: '16:9',
  model: 'imagen-3.0-generate-001',
  language: 'pt'
});
```

### Exemplo 3: Retrato Artístico

```javascript
await api.generateImage({
  prompt: 'Retrato de uma mulher em estilo art nouveau',
  aspectRatio: '3:4',
  negativePrompt: 'fotorrealista, moderno',
  safetyFilterLevel: 'default',
  personGeneration: 'allow_adult'
});
```

## 🔒 Segurança

O projeto implementa várias medidas de segurança:

- **Helmet**: Headers de segurança HTTP
- **CORS**: Controle de acesso cross-origin
- **Rate Limiting**: Proteção contra abuso
- **Validação**: Joi para validação de entrada
- **Filtros de Segurança**: Gemini Safety Settings
- **Error Handling**: Tratamento centralizado de erros

### Boas Práticas

- Nunca compartilhe sua `GOOGLE_API_KEY`
- Use HTTPS em produção
- Configure CORS adequadamente
- Monitore logs e erros
- Implemente autenticação para produção

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

- Google Gemini Team pelo Nano Banana
- Comunidade Open Source

## 📞 Suporte

Para dúvidas e suporte:

- Abra uma issue no GitHub
- Consulte a [Documentação do Gemini](https://ai.google.dev/gemini-api/docs)

---

**Desenvolvido com ❤️ usando Gemini Nano Banana**
