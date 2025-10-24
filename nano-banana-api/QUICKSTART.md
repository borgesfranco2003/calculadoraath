# 🚀 Guia de Início Rápido

Comece a usar a API Nano Banana em **5 minutos**!

## 1. Pré-requisitos

✅ Node.js 18+ instalado
✅ NPM ou Yarn
✅ Chave de API do Google Gemini

## 2. Obter Chave de API

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

## 3. Instalação

```bash
# Clone ou baixe o repositório
cd nano-banana-api/backend

# Instale as dependências
npm install

# Configure a chave de API
cp .env.example .env
# Edite .env e adicione sua chave: GOOGLE_API_KEY=sua_chave_aqui
```

## 4. Iniciar o Servidor

```bash
npm start
```

Você verá:
```
🚀 Servidor rodando na porta 3000
📝 Ambiente: development
🔗 API: http://localhost:3000
❤️  Health check: http://localhost:3000/health
```

## 5. Testar a API

### Opção A: Navegador (Interface Web)

1. Abra `frontend/index.html` no navegador
2. Preencha o prompt: "Um gato laranja sentado em uma janela"
3. Clique em "Gerar Imagem"

### Opção B: cURL (Terminal)

```bash
curl -X POST http://localhost:3000/api/images/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Um gato laranja sentado em uma janela ao pôr do sol"
  }'
```

### Opção C: JavaScript (Código)

```javascript
fetch('http://localhost:3000/api/images/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Um gato laranja sentado em uma janela ao pôr do sol'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 6. Explorar Funcionalidades

### Gerar Múltiplas Imagens

```bash
curl -X POST http://localhost:3000/api/images/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma floresta mágica",
    "numberOfImages": 3,
    "aspectRatio": "16:9"
  }'
```

### Usar Prompt Negativo

```bash
curl -X POST http://localhost:3000/api/images/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Paisagem montanhosa",
    "negativePrompt": "pessoas, carros, prédios"
  }'
```

### Listar Modelos Disponíveis

```bash
curl http://localhost:3000/api/images/models
```

## 7. Documentação Completa

Acesse a documentação completa:

- **README**: `README.md`
- **Documentação da API**: `docs/API.md`
- **Exemplos**: `docs/EXAMPLES.md`
- **Exemplos cURL**: `examples/curl-examples.sh`

## Problemas Comuns

### ❌ Erro: "GOOGLE_API_KEY não está configurada"

**Solução**: Configure a chave no arquivo `.env`:
```bash
cd backend
echo "GOOGLE_API_KEY=sua_chave_aqui" > .env
```

### ❌ Erro: "Cannot connect to server"

**Solução**: Verifique se o servidor está rodando:
```bash
# Terminal 1: Iniciar servidor
cd backend
npm start

# Terminal 2: Testar
curl http://localhost:3000/health
```

### ❌ Erro: "Rate limit exceeded"

**Solução**: Aguarde 15 minutos ou reduza a frequência de requisições.

## Próximos Passos

1. ✅ Explore o frontend em `frontend/index.html`
2. ✅ Leia `docs/EXAMPLES.md` para casos de uso avançados
3. ✅ Execute `examples/curl-examples.sh` para ver todos os exemplos
4. ✅ Customize as configurações em `backend/.env`

## Suporte

- 📖 Documentação: `docs/`
- 💬 Issues: Abra uma issue no repositório
- 🌐 Google Gemini Docs: https://ai.google.dev/

---

**Pronto! Você está usando a API Nano Banana! 🎉**
