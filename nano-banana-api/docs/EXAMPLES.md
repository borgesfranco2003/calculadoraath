# 📚 Exemplos de Uso

Este documento contém exemplos práticos de como usar a API Nano Banana em diferentes cenários.

## Índice

1. [Exemplos Básicos](#exemplos-básicos)
2. [Exemplos Avançados](#exemplos-avançados)
3. [Casos de Uso Reais](#casos-de-uso-reais)
4. [Exemplos por Linguagem](#exemplos-por-linguagem)
5. [Melhores Práticas](#melhores-práticas)

---

## Exemplos Básicos

### 1. Primeira Imagem

O exemplo mais simples possível:

```javascript
const response = await fetch('http://localhost:3000/api/images/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Um gato laranja dormindo em um sofá'
  })
});

const data = await response.json();
console.log(data.data.images[0]);
```

### 2. Múltiplas Imagens

Gerar várias variações ao mesmo tempo:

```javascript
await api.generateImage({
  prompt: 'Uma xícara de café fumegante sobre uma mesa de madeira',
  numberOfImages: 4
});
```

### 3. Diferentes Proporções

#### Quadrado (1:1) - Ideal para redes sociais

```javascript
await api.generateImage({
  prompt: 'Logo minimalista de uma montanha',
  aspectRatio: '1:1'
});
```

#### Retrato Vertical (9:16) - Stories, Reels

```javascript
await api.generateImage({
  prompt: 'Torre Eiffel iluminada à noite',
  aspectRatio: '9:16'
});
```

#### Paisagem Horizontal (16:9) - Banners, YouTube

```javascript
await api.generateImage({
  prompt: 'Pôr do sol sobre o oceano',
  aspectRatio: '16:9'
});
```

---

## Exemplos Avançados

### 1. Controle Preciso com Prompt Negativo

```javascript
await api.generateImage({
  prompt: `
    Uma floresta antiga com árvores gigantescas,
    raios de sol atravessando a neblina,
    atmosfera mística e pacífica
  `,
  aspectRatio: '16:9',
  negativePrompt: `
    pessoas, animais, construções, carros,
    tecnologia, objetos modernos
  `,
  numberOfImages: 2
});
```

### 2. Arte Conceitual de Alta Qualidade

```javascript
await api.generateImage({
  prompt: `
    Cidade cyberpunk futurista ao anoitecer,
    arranha-céus com iluminação neon,
    carros voadores entre os prédios,
    chuva refletindo as luzes,
    estilo blade runner,
    ultra detalhado, arte conceitual
  `,
  aspectRatio: '16:9',
  model: 'imagen-3.0-generate-001',
  language: 'pt',
  numberOfImages: 3
});
```

### 3. Retratos com Configurações de Segurança

```javascript
await api.generateImage({
  prompt: `
    Retrato profissional de uma executiva,
    iluminação de estúdio,
    fundo desfocado,
    expressão confiante e profissional
  `,
  aspectRatio: '3:4',
  personGeneration: 'allow_adult',
  safetyFilterLevel: 'strict',
  negativePrompt: 'desenho animado, caricatura'
});
```

### 4. Geração Rápida para Protótipos

```javascript
await api.generateImage({
  prompt: 'Interface de aplicativo mobile moderno',
  model: 'imagen-3.0-fast-generate-001',  // Modelo mais rápido
  aspectRatio: '9:16',
  numberOfImages: 4  // Gerar várias opções rapidamente
});
```

---

## Casos de Uso Reais

### Caso 1: Gerador de Capas de Livro

```javascript
async function generateBookCover(title, genre, theme) {
  const genrePrompts = {
    fantasy: 'elementos mágicos, castelos, dragões',
    scifi: 'naves espaciais, planetas, tecnologia futurista',
    romance: 'atmosfera romântica, cores suaves',
    thriller: 'atmosfera sombria, tensão, mistério'
  };

  return await api.generateImage({
    prompt: `
      Capa de livro profissional,
      título: "${title}",
      gênero: ${genre},
      ${genrePrompts[genre]},
      ${theme},
      design editorial,
      tipografia elegante,
      composição equilibrada
    `,
    aspectRatio: '3:4',
    numberOfImages: 3,
    negativePrompt: 'amador, baixa qualidade, texto ilegível'
  });
}

// Uso
await generateBookCover(
  'O Último Feiticeiro',
  'fantasy',
  'torre de magia sob lua cheia'
);
```

### Caso 2: Assets para Jogo

```javascript
async function generateGameAssets(assetType, style) {
  const assetPrompts = {
    character: 'personagem de jogo, pose dinâmica, vista frontal',
    environment: 'cenário de jogo, vista isométrica',
    item: 'item de jogo, ícone detalhado, fundo transparente',
    background: 'background de jogo, panorâmica'
  };

  return await api.generateImage({
    prompt: `
      ${assetPrompts[assetType]},
      estilo: ${style},
      qualidade profissional,
      detalhes nítidos,
      cores vibrantes
    `,
    aspectRatio: '1:1',
    numberOfImages: 4,
    model: 'imagen-3.0-generate-001'
  });
}

// Uso
await generateGameAssets('character', 'pixel art');
await generateGameAssets('environment', 'low poly 3D');
```

### Caso 3: Conteúdo para Redes Sociais

```javascript
class SocialMediaGenerator {
  async generatePost(topic, platform) {
    const configs = {
      instagram_post: { aspectRatio: '1:1' },
      instagram_story: { aspectRatio: '9:16' },
      facebook_cover: { aspectRatio: '16:9' },
      youtube_thumbnail: { aspectRatio: '16:9' }
    };

    const config = configs[platform];

    return await api.generateImage({
      prompt: `
        Post para redes sociais sobre ${topic},
        design atrativo e moderno,
        cores vibrantes,
        espaço para texto no topo,
        profissional e engajante
      `,
      aspectRatio: config.aspectRatio,
      numberOfImages: 3,
      negativePrompt: 'texto, letras, números'
    });
  }

  async generateBatch(topics, platform) {
    const results = [];
    for (const topic of topics) {
      const result = await this.generatePost(topic, platform);
      results.push(result);
      // Aguardar um pouco para respeitar rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return results;
  }
}

// Uso
const generator = new SocialMediaGenerator();
await generator.generatePost('dicas de produtividade', 'instagram_post');
await generator.generateBatch(
  ['receitas saudáveis', 'exercícios', 'meditação'],
  'instagram_story'
);
```

### Caso 4: Edição de Produto

```javascript
async function enhanceProductImage(productImageUrl, enhancement) {
  return await api.editImage({
    imageUrl: productImageUrl,
    prompt: enhancement,
    numberOfImages: 2
  });
}

// Exemplos de uso
await enhanceProductImage(
  'https://exemplo.com/produto.jpg',
  'Adicionar fundo branco limpo e profissional'
);

await enhanceProductImage(
  'https://exemplo.com/produto.jpg',
  'Colocar o produto em um ambiente luxuoso e elegante'
);

await enhanceProductImage(
  'https://exemplo.com/produto.jpg',
  'Melhorar a iluminação para destacar detalhes do produto'
);
```

---

## Exemplos por Linguagem

### JavaScript/Node.js

```javascript
const axios = require('axios');

async function generateImage(prompt) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/images/generate',
      {
        prompt: prompt,
        numberOfImages: 2,
        aspectRatio: '16:9'
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}

// Uso
generateImage('Uma montanha majestosa ao amanhecer')
  .then(data => console.log('Sucesso:', data))
  .catch(err => console.error('Falha:', err));
```

### Python

```python
import requests
import json

def generate_image(prompt, num_images=1, aspect_ratio='1:1'):
    url = 'http://localhost:3000/api/images/generate'

    payload = {
        'prompt': prompt,
        'numberOfImages': num_images,
        'aspectRatio': aspect_ratio
    }

    headers = {
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Erro: {e}')
        return None

# Uso
result = generate_image(
    'Uma floresta encantada com luzes mágicas',
    num_images=3,
    aspect_ratio='16:9'
)

if result:
    print('Sucesso:', json.dumps(result, indent=2))
```

### PHP

```php
<?php

function generateImage($prompt, $numImages = 1, $aspectRatio = '1:1') {
    $url = 'http://localhost:3000/api/images/generate';

    $data = [
        'prompt' => $prompt,
        'numberOfImages' => $numImages,
        'aspectRatio' => $aspectRatio
    ];

    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    return json_decode($result, true);
}

// Uso
$result = generateImage(
    'Um castelo medieval sob um céu estrelado',
    2,
    '16:9'
);

print_r($result);
?>
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type GenerateRequest struct {
    Prompt         string `json:"prompt"`
    NumberOfImages int    `json:"numberOfImages"`
    AspectRatio    string `json:"aspectRatio"`
}

func generateImage(prompt string, numImages int, aspectRatio string) error {
    url := "http://localhost:3000/api/images/generate"

    reqBody := GenerateRequest{
        Prompt:         prompt,
        NumberOfImages: numImages,
        AspectRatio:    aspectRatio,
    }

    jsonData, err := json.Marshal(reqBody)
    if err != nil {
        return err
    }

    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)

    fmt.Printf("Resultado: %+v\n", result)
    return nil
}

func main() {
    generateImage("Um robô futurista em uma cidade cyberpunk", 2, "16:9")
}
```

---

## Melhores Práticas

### 1. Prompts Efetivos

✅ **BOM:**
```javascript
await api.generateImage({
  prompt: `
    Paisagem montanhosa ao pôr do sol,
    picos nevados,
    céu alaranjado e rosa,
    lago cristalino no vale,
    estilo fotorrealista,
    alta resolução
  `
});
```

❌ **RUIM:**
```javascript
await api.generateImage({
  prompt: 'montanha'
});
```

### 2. Uso de Prompt Negativo

```javascript
await api.generateImage({
  prompt: 'Interior de uma biblioteca moderna',
  negativePrompt: `
    pessoas, bagunça, itens fora do lugar,
    má iluminação, baixa qualidade
  `
});
```

### 3. Tratamento de Erros

```javascript
async function safeGenerate(params) {
  try {
    const result = await api.generateImage(params);
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro na geração:', error);

    if (error.message.includes('rate limit')) {
      // Aguardar e tentar novamente
      await new Promise(resolve => setTimeout(resolve, 60000));
      return safeGenerate(params);
    }

    return { success: false, error: error.message };
  }
}
```

### 4. Batch Processing

```javascript
async function generateBatch(prompts, delayMs = 2000) {
  const results = [];

  for (const prompt of prompts) {
    try {
      const result = await api.generateImage({ prompt });
      results.push({ prompt, result, success: true });
    } catch (error) {
      results.push({ prompt, error: error.message, success: false });
    }

    // Delay entre requisições
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  return results;
}
```

### 5. Cache de Resultados

```javascript
class ImageCache {
  constructor() {
    this.cache = new Map();
  }

  getCacheKey(params) {
    return JSON.stringify(params);
  }

  async generate(params) {
    const key = this.getCacheKey(params);

    if (this.cache.has(key)) {
      console.log('Usando resultado em cache');
      return this.cache.get(key);
    }

    const result = await api.generateImage(params);
    this.cache.set(key, result);

    return result;
  }
}

// Uso
const cache = new ImageCache();
await cache.generate({ prompt: 'Gato dormindo' });
await cache.generate({ prompt: 'Gato dormindo' }); // Usa cache
```

---

## Dicas de Performance

1. **Use o modelo Fast para protótipos**: `imagen-3.0-fast-generate-001`
2. **Gere múltiplas imagens em uma requisição**: Mais eficiente que múltiplas requisições
3. **Implemente cache**: Evite gerar a mesma imagem múltiplas vezes
4. **Respeite rate limits**: Adicione delays entre requisições em batch
5. **Use prompts claros**: Evite re-gerações por resultados insatisfatórios

## Recursos Adicionais

- [Documentação da API](./API.md)
- [README Principal](../README.md)
- [Exemplos cURL](../examples/curl-examples.sh)
