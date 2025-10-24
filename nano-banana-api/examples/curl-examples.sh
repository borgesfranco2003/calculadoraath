#!/bin/bash

# Nano Banana API - Exemplos com cURL
# Execute este arquivo com: bash curl-examples.sh

API_BASE="http://localhost:3000/api"

echo "========================================="
echo "🍌 Nano Banana API - Exemplos de Uso"
echo "========================================="
echo ""

# 1. Health Check
echo "1️⃣ Health Check"
echo "--------------------------------"
curl -X GET http://localhost:3000/health
echo -e "\n\n"

# 2. Listar Modelos
echo "2️⃣ Listar Modelos Disponíveis"
echo "--------------------------------"
curl -X GET "$API_BASE/images/models"
echo -e "\n\n"

# 3. Gerar Imagem Simples
echo "3️⃣ Gerar Imagem Simples"
echo "--------------------------------"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Um gato laranja sentado em uma janela ao pôr do sol"
  }'
echo -e "\n\n"

# 4. Gerar Múltiplas Imagens
echo "4️⃣ Gerar Múltiplas Imagens"
echo "--------------------------------"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma floresta mágica com árvores bioluminescentes",
    "numberOfImages": 3,
    "aspectRatio": "16:9"
  }'
echo -e "\n\n"

# 5. Gerar com Prompt Negativo
echo "5️⃣ Gerar Imagem com Prompt Negativo"
echo "--------------------------------"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma paisagem montanhosa ao amanhecer",
    "numberOfImages": 2,
    "aspectRatio": "16:9",
    "negativePrompt": "pessoas, carros, prédios, animais"
  }'
echo -e "\n\n"

# 6. Gerar com Modelo Fast
echo "6️⃣ Gerar Imagem com Modelo Fast"
echo "--------------------------------"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Cidade futurista com arranha-céus iluminados",
    "model": "imagen-3.0-fast-generate-001",
    "aspectRatio": "16:9"
  }'
echo -e "\n\n"

# 7. Gerar Retrato
echo "7️⃣ Gerar Retrato (3:4)"
echo "--------------------------------"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Retrato de uma mulher em estilo art nouveau",
    "aspectRatio": "3:4",
    "personGeneration": "allow_adult",
    "safetyFilterLevel": "default"
  }'
echo -e "\n\n"

# 8. Gerar Arte Abstrata
echo "8️⃣ Gerar Arte Abstrata"
echo "--------------------------------"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Formas geométricas abstratas em cores vibrantes, estilo cubista",
    "aspectRatio": "1:1",
    "language": "pt"
  }'
echo -e "\n\n"

# 9. Editar Imagem
echo "9️⃣ Editar Imagem Existente"
echo "--------------------------------"
curl -X POST "$API_BASE/images/edit" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/image.png",
    "prompt": "Transformar o céu em um pôr do sol dramático com nuvens cor de rosa"
  }'
echo -e "\n\n"

# 10. Upscale 2x
echo "🔟 Upscale de Imagem (2x)"
echo "--------------------------------"
curl -X POST "$API_BASE/images/upscale" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/lowres.png",
    "scaleFactor": 2
  }'
echo -e "\n\n"

# 11. Upscale 4x
echo "1️⃣1️⃣ Upscale de Imagem (4x)"
echo "--------------------------------"
curl -X POST "$API_BASE/images/upscale" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/lowres.png",
    "scaleFactor": 4
  }'
echo -e "\n\n"

# 12. Gerar Variações
echo "1️⃣2️⃣ Gerar Variações de Imagem"
echo "--------------------------------"
curl -X POST "$API_BASE/images/variations" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/base.png",
    "numberOfVariations": 3,
    "prompt": "Variações com diferentes estilos artísticos"
  }'
echo -e "\n\n"

# 13. Gerar com Todas as Opções
echo "1️⃣3️⃣ Gerar Imagem com Todas as Opções"
echo "--------------------------------"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Um dragão majestoso voando sobre um castelo medieval ao amanhecer",
    "numberOfImages": 4,
    "aspectRatio": "16:9",
    "model": "imagen-3.0-generate-001",
    "negativePrompt": "pessoas, carros, prédios modernos",
    "language": "pt",
    "addWatermark": false,
    "safetyFilterLevel": "default",
    "personGeneration": "allow_adult"
  }'
echo -e "\n\n"

# 14. Diferentes Proporções
echo "1️⃣4️⃣ Gerar em Diferentes Proporções"
echo "--------------------------------"

echo "📱 Vertical (9:16):"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Torre Eiffel ao pôr do sol",
    "aspectRatio": "9:16"
  }'
echo -e "\n"

echo "🖼️ Horizontal (16:9):"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Praia tropical com águas cristalinas",
    "aspectRatio": "16:9"
  }'
echo -e "\n"

echo "⬛ Quadrado (1:1):"
curl -X POST "$API_BASE/images/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Mandala colorida e detalhada",
    "aspectRatio": "1:1"
  }'
echo -e "\n\n"

# 15. Documentação da API
echo "1️⃣5️⃣ Obter Documentação da API"
echo "--------------------------------"
curl -X GET "$API_BASE/images/docs"
echo -e "\n\n"

echo "========================================="
echo "✅ Todos os exemplos foram executados!"
echo "========================================="
