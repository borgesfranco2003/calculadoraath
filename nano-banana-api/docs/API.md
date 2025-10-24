# 📖 Documentação da API

## Base URL

```
http://localhost:3000/api
```

## Autenticação

Atualmente, a API não requer autenticação. A chave do Google Gemini é configurada no backend via variáveis de ambiente.

> **Nota**: Para produção, implemente autenticação adequada (JWT, API Keys, etc.)

## Headers Padrão

```
Content-Type: application/json
```

## Rate Limiting

- **Janela**: 15 minutos
- **Máximo**: 100 requisições por IP
- **Header de resposta**: `X-RateLimit-Remaining`

## Endpoints

### 1. Health Check

Verifica o status do servidor.

**Endpoint**: `GET /health`

**Resposta**:
```json
{
  "status": "ok",
  "timestamp": "2025-10-24T12:00:00.000Z",
  "environment": "development"
}
```

---

### 2. Documentação da API

Retorna documentação completa da API.

**Endpoint**: `GET /api/images/docs`

**Resposta**: Objeto JSON com documentação completa

---

### 3. Gerar Imagens

Gera uma ou mais imagens a partir de um prompt de texto.

**Endpoint**: `POST /api/images/generate`

**Parâmetros**:

| Campo | Tipo | Obrigatório | Padrão | Descrição |
|-------|------|-------------|---------|-----------|
| `prompt` | string | Sim | - | Descrição da imagem (3-2000 caracteres) |
| `numberOfImages` | number | Não | 1 | Número de imagens (1-4) |
| `aspectRatio` | string | Não | "1:1" | Proporção: 1:1, 3:4, 4:3, 9:16, 16:9 |
| `model` | string | Não | imagen-3.0 | Modelo a usar |
| `negativePrompt` | string | Não | "" | O que evitar na imagem |
| `language` | string | Não | "pt" | Idioma (pt, en, es, fr) |
| `addWatermark` | boolean | Não | false | Adicionar marca d'água |
| `safetyFilterLevel` | string | Não | "default" | Filtro: strict, default, permissive |
| `personGeneration` | string | Não | "allow_adult" | allow_adult, allow_all, block_all |

**Exemplo de Request**:
```json
{
  "prompt": "Um dragão majestoso voando sobre um castelo medieval",
  "numberOfImages": 2,
  "aspectRatio": "16:9",
  "negativePrompt": "pessoas, carros",
  "language": "pt"
}
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "message": "Imagens geradas com sucesso",
  "data": {
    "success": true,
    "count": 2,
    "images": [
      {
        "id": "img_1729770000000_0",
        "prompt": "Um dragão majestoso voando sobre um castelo medieval",
        "aspectRatio": "16:9",
        "model": "imagen-3.0-generate-001",
        "createdAt": "2025-10-24T12:00:00.000Z",
        "imageData": {
          "format": "png",
          "size": "16:9",
          "url": null,
          "base64": null
        },
        "metadata": {
          "negativePrompt": "pessoas, carros",
          "language": "pt",
          "hasWatermark": false,
          "safetyFilterLevel": "default"
        }
      }
    ],
    "usage": {
      "promptTokens": 50,
      "model": "imagen-3.0-generate-001"
    }
  }
}
```

**Erros Possíveis**:

- `400 Bad Request`: Parâmetros inválidos
  ```json
  {
    "error": "Erro de validação",
    "details": [
      {
        "field": "prompt",
        "message": "Prompt é obrigatório"
      }
    ]
  }
  ```

- `429 Too Many Requests`: Rate limit excedido
- `502 Bad Gateway`: Erro na API do Google

---

### 4. Editar Imagem

Edita uma imagem existente com base em instruções.

**Endpoint**: `POST /api/images/edit`

**Parâmetros**:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `imageUrl` | string | Sim | URL ou base64 da imagem original |
| `prompt` | string | Sim | Descrição das mudanças desejadas |
| `maskUrl` | string | Não | URL da máscara (área a editar) |
| `numberOfImages` | number | Não | Número de variações (1-4) |
| `model` | string | Não | Modelo a usar |

**Exemplo de Request**:
```json
{
  "imageUrl": "https://example.com/image.png",
  "prompt": "Transformar o céu em um pôr do sol dramático",
  "maskUrl": "https://example.com/sky-mask.png",
  "numberOfImages": 2
}
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "message": "Imagem editada com sucesso",
  "data": {
    "success": true,
    "originalImage": "https://example.com/image.png",
    "editedImages": [
      {
        "id": "edit_1729770000000",
        "prompt": "Transformar o céu em um pôr do sol dramático",
        "model": "imagen-3.0-generate-001",
        "createdAt": "2025-10-24T12:00:00.000Z",
        "imageData": {
          "format": "png",
          "url": null,
          "base64": null
        },
        "metadata": {
          "originalImageUrl": "https://example.com/image.png",
          "maskUsed": true,
          "editPrompt": "Transformar o céu em um pôr do sol dramático"
        }
      }
    ]
  }
}
```

---

### 5. Upscale de Imagem

Aumenta a resolução de uma imagem.

**Endpoint**: `POST /api/images/upscale`

**Parâmetros**:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `imageUrl` | string | Sim | URL ou base64 da imagem |
| `scaleFactor` | number | Não | Fator de escala: 2 ou 4 |
| `model` | string | Não | Modelo a usar |

**Exemplo de Request**:
```json
{
  "imageUrl": "https://example.com/lowres.png",
  "scaleFactor": 4
}
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "message": "Upscale realizado com sucesso",
  "data": {
    "success": true,
    "originalImage": "https://example.com/lowres.png",
    "upscaledImage": {
      "id": "upscale_1729770000000",
      "scaleFactor": 4,
      "model": "imagen-3.0-generate-001",
      "createdAt": "2025-10-24T12:00:00.000Z",
      "imageData": {
        "format": "png",
        "url": null,
        "base64": null
      },
      "metadata": {
        "originalImageUrl": "https://example.com/lowres.png",
        "scaleFactor": 4
      }
    }
  }
}
```

---

### 6. Gerar Variações

Gera variações de uma imagem existente.

**Endpoint**: `POST /api/images/variations`

**Parâmetros**:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `imageUrl` | string | Sim | URL ou base64 da imagem |
| `numberOfVariations` | number | Não | Número de variações (2-4) |
| `prompt` | string | Não | Orientação para as variações |

**Exemplo de Request**:
```json
{
  "imageUrl": "https://example.com/base.png",
  "numberOfVariations": 3,
  "prompt": "Variações com diferentes estilos artísticos"
}
```

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "message": "Variações geradas com sucesso",
  "data": {
    "success": true,
    "originalImage": "https://example.com/base.png",
    "variations": [
      {
        "id": "var_1729770000000_0",
        "createdAt": "2025-10-24T12:00:00.000Z",
        "imageData": {
          "format": "png",
          "url": null,
          "base64": null
        },
        "metadata": {
          "originalImageUrl": "https://example.com/base.png",
          "variationIndex": 1,
          "guidancePrompt": "Variações com diferentes estilos artísticos"
        }
      }
    ]
  }
}
```

---

### 7. Listar Modelos

Lista todos os modelos disponíveis e suas capacidades.

**Endpoint**: `GET /api/images/models`

**Resposta de Sucesso** (200):
```json
{
  "success": true,
  "data": {
    "success": true,
    "models": [
      {
        "id": "imagen-3.0-generate-001",
        "name": "Imagen 3.0",
        "description": "Modelo de alta qualidade para geração de imagens",
        "capabilities": ["generate", "edit", "upscale"],
        "maxImages": 4,
        "supportedAspectRatios": ["1:1", "3:4", "4:3", "9:16", "16:9"]
      },
      {
        "id": "imagen-3.0-fast-generate-001",
        "name": "Imagen 3.0 Fast",
        "description": "Versão mais rápida com qualidade ligeiramente reduzida",
        "capabilities": ["generate"],
        "maxImages": 4,
        "supportedAspectRatios": ["1:1", "3:4", "4:3", "9:16", "16:9"]
      }
    ]
  }
}
```

---

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 400 | Requisição inválida (erro de validação) |
| 401 | Não autorizado |
| 429 | Muitas requisições (rate limit) |
| 500 | Erro interno do servidor |
| 502 | Erro na API externa (Google) |

## Tratamento de Erros

Todas as respostas de erro seguem o formato:

```json
{
  "error": "Descrição do erro",
  "message": "Mensagem detalhada",
  "details": []  // Opcional, array com detalhes
}
```

## Exemplos de Uso

### JavaScript (Fetch API)

```javascript
const response = await fetch('http://localhost:3000/api/images/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Uma paisagem montanhosa ao pôr do sol',
    numberOfImages: 2,
    aspectRatio: '16:9'
  })
});

const data = await response.json();
console.log(data);
```

### cURL

```bash
curl -X POST http://localhost:3000/api/images/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma paisagem montanhosa ao pôr do sol",
    "numberOfImages": 2,
    "aspectRatio": "16:9"
  }'
```

### Python (requests)

```python
import requests

response = requests.post(
    'http://localhost:3000/api/images/generate',
    json={
        'prompt': 'Uma paisagem montanhosa ao pôr do sol',
        'numberOfImages': 2,
        'aspectRatio': '16:9'
    }
)

data = response.json()
print(data)
```
