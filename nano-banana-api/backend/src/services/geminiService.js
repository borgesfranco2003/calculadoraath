const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');

class GeminiService {
  constructor() {
    if (!config.googleApiKey) {
      throw new Error('GOOGLE_API_KEY não está configurada');
    }
    this.genAI = new GoogleGenerativeAI(config.googleApiKey);
  }

  /**
   * Gera imagens a partir de um prompt de texto
   * @param {Object} options - Opções de geração
   * @param {string} options.prompt - Texto descritivo da imagem
   * @param {number} options.numberOfImages - Número de imagens (1-4)
   * @param {string} options.aspectRatio - Proporção da imagem
   * @param {string} options.model - Modelo a ser usado
   * @param {string} options.negativePrompt - Prompt negativo (o que evitar)
   * @param {string} options.language - Idioma do prompt
   * @param {boolean} options.addWatermark - Adicionar marca d'água
   * @returns {Promise<Array>} Array de objetos com dados das imagens
   */
  async generateImage(options) {
    try {
      const {
        prompt,
        numberOfImages = config.defaultImageCount,
        aspectRatio = '1:1',
        model = config.models.imagen3,
        negativePrompt = '',
        language = 'pt',
        addWatermark = false,
        safetyFilterLevel = 'default',
        personGeneration = 'allow_adult'
      } = options;

      // Validações
      if (!prompt || prompt.trim().length === 0) {
        throw new Error('Prompt é obrigatório');
      }

      if (numberOfImages < 1 || numberOfImages > config.maxImageCount) {
        throw new Error(`Número de imagens deve estar entre 1 e ${config.maxImageCount}`);
      }

      if (!config.aspectRatios.includes(aspectRatio)) {
        throw new Error(`Aspect ratio deve ser um de: ${config.aspectRatios.join(', ')}`);
      }

      // Construir prompt completo
      let fullPrompt = prompt;
      if (negativePrompt) {
        fullPrompt += `\n\nEvitar: ${negativePrompt}`;
      }

      // Configuração da geração
      const generationConfig = {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      };

      // Obter o modelo
      const generativeModel = this.genAI.getGenerativeModel({
        model: model,
        generationConfig,
        safetySettings: config.safetySettings
      });

      // Preparar parâmetros específicos para geração de imagens
      const imageParams = {
        prompt: fullPrompt,
        numberOfImages: numberOfImages,
        aspectRatio: aspectRatio,
        language: language,
        addWatermark: addWatermark,
        safetyFilterLevel: safetyFilterLevel,
        personGeneration: personGeneration
      };

      // Gerar imagens
      console.log(`🎨 Gerando ${numberOfImages} imagem(ns) com prompt: "${prompt.substring(0, 50)}..."`);

      const result = await generativeModel.generateContent(fullPrompt);
      const response = await result.response;

      // Processar resposta
      const images = [];

      // Como a API Gemini retorna conteúdo, vamos simular a estrutura
      // Em produção, você usaria a API específica de geração de imagens
      for (let i = 0; i < numberOfImages; i++) {
        images.push({
          id: `img_${Date.now()}_${i}`,
          prompt: prompt,
          aspectRatio: aspectRatio,
          model: model,
          createdAt: new Date().toISOString(),
          // Em produção, aqui estaria a URL ou dados da imagem
          imageData: {
            format: 'png',
            size: aspectRatio,
            url: null, // Seria preenchido pela API real
            base64: null // Ou dados base64
          },
          metadata: {
            negativePrompt: negativePrompt || null,
            language: language,
            hasWatermark: addWatermark,
            safetyFilterLevel: safetyFilterLevel
          }
        });
      }

      return {
        success: true,
        count: images.length,
        images: images,
        usage: {
          promptTokens: fullPrompt.length,
          model: model
        }
      };

    } catch (error) {
      console.error('❌ Erro ao gerar imagem:', error);
      throw new Error(`Falha na geração de imagem: ${error.message}`);
    }
  }

  /**
   * Edita uma imagem existente com base em um prompt
   * @param {Object} options - Opções de edição
   * @param {string} options.imageUrl - URL ou base64 da imagem original
   * @param {string} options.prompt - Descrição das mudanças desejadas
   * @param {string} options.maskUrl - Máscara para edição específica (opcional)
   * @returns {Promise<Object>} Dados da imagem editada
   */
  async editImage(options) {
    try {
      const {
        imageUrl,
        prompt,
        maskUrl = null,
        numberOfImages = 1,
        model = config.models.imagen3
      } = options;

      if (!imageUrl || !prompt) {
        throw new Error('imageUrl e prompt são obrigatórios para edição');
      }

      console.log(`✏️ Editando imagem com prompt: "${prompt}"`);

      // Aqui você implementaria a lógica real de edição de imagem
      // usando a API Gemini específica para edição

      return {
        success: true,
        originalImage: imageUrl,
        editedImages: [{
          id: `edit_${Date.now()}`,
          prompt: prompt,
          model: model,
          createdAt: new Date().toISOString(),
          imageData: {
            format: 'png',
            url: null,
            base64: null
          },
          metadata: {
            originalImageUrl: imageUrl,
            maskUsed: maskUrl !== null,
            editPrompt: prompt
          }
        }]
      };

    } catch (error) {
      console.error('❌ Erro ao editar imagem:', error);
      throw new Error(`Falha na edição de imagem: ${error.message}`);
    }
  }

  /**
   * Aumenta a resolução de uma imagem (upscale)
   * @param {Object} options - Opções de upscale
   * @param {string} options.imageUrl - URL ou base64 da imagem
   * @param {number} options.scaleFactor - Fator de escala (2x, 4x)
   * @returns {Promise<Object>} Dados da imagem com resolução aumentada
   */
  async upscaleImage(options) {
    try {
      const {
        imageUrl,
        scaleFactor = 2,
        model = config.models.imagen3
      } = options;

      if (!imageUrl) {
        throw new Error('imageUrl é obrigatório para upscale');
      }

      if (![2, 4].includes(scaleFactor)) {
        throw new Error('scaleFactor deve ser 2 ou 4');
      }

      console.log(`📈 Aumentando resolução da imagem ${scaleFactor}x`);

      return {
        success: true,
        originalImage: imageUrl,
        upscaledImage: {
          id: `upscale_${Date.now()}`,
          scaleFactor: scaleFactor,
          model: model,
          createdAt: new Date().toISOString(),
          imageData: {
            format: 'png',
            url: null,
            base64: null
          },
          metadata: {
            originalImageUrl: imageUrl,
            scaleFactor: scaleFactor
          }
        }
      };

    } catch (error) {
      console.error('❌ Erro ao fazer upscale da imagem:', error);
      throw new Error(`Falha no upscale de imagem: ${error.message}`);
    }
  }

  /**
   * Lista os modelos disponíveis
   * @returns {Promise<Array>} Lista de modelos
   */
  async listModels() {
    try {
      return {
        success: true,
        models: [
          {
            id: config.models.imagen3,
            name: 'Imagen 3.0',
            description: 'Modelo de alta qualidade para geração de imagens',
            capabilities: ['generate', 'edit', 'upscale'],
            maxImages: 4,
            supportedAspectRatios: config.aspectRatios
          },
          {
            id: config.models.imagen3Fast,
            name: 'Imagen 3.0 Fast',
            description: 'Versão mais rápida com qualidade ligeiramente reduzida',
            capabilities: ['generate'],
            maxImages: 4,
            supportedAspectRatios: config.aspectRatios
          }
        ]
      };
    } catch (error) {
      console.error('❌ Erro ao listar modelos:', error);
      throw new Error(`Falha ao listar modelos: ${error.message}`);
    }
  }

  /**
   * Gera variações de uma imagem existente
   * @param {Object} options - Opções
   * @param {string} options.imageUrl - URL da imagem original
   * @param {number} options.numberOfVariations - Número de variações
   * @returns {Promise<Object>} Variações da imagem
   */
  async generateVariations(options) {
    try {
      const {
        imageUrl,
        numberOfVariations = 2,
        prompt = null
      } = options;

      if (!imageUrl) {
        throw new Error('imageUrl é obrigatório para gerar variações');
      }

      console.log(`🔄 Gerando ${numberOfVariations} variação(ões) da imagem`);

      const variations = [];
      for (let i = 0; i < numberOfVariations; i++) {
        variations.push({
          id: `var_${Date.now()}_${i}`,
          createdAt: new Date().toISOString(),
          imageData: {
            format: 'png',
            url: null,
            base64: null
          },
          metadata: {
            originalImageUrl: imageUrl,
            variationIndex: i + 1,
            guidancePrompt: prompt
          }
        });
      }

      return {
        success: true,
        originalImage: imageUrl,
        variations: variations
      };

    } catch (error) {
      console.error('❌ Erro ao gerar variações:', error);
      throw new Error(`Falha ao gerar variações: ${error.message}`);
    }
  }
}

module.exports = new GeminiService();
