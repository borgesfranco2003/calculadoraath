const geminiService = require('../services/geminiService');

class ImageController {
  /**
   * POST /api/images/generate
   * Gera imagens a partir de um prompt de texto
   */
  async generateImage(req, res, next) {
    try {
      const {
        prompt,
        numberOfImages,
        aspectRatio,
        model,
        negativePrompt,
        language,
        addWatermark,
        safetyFilterLevel,
        personGeneration
      } = req.body;

      if (!prompt) {
        return res.status(400).json({
          error: 'Prompt é obrigatório',
          example: {
            prompt: 'Um gato laranja sentado em uma janela ao pôr do sol',
            numberOfImages: 1,
            aspectRatio: '16:9'
          }
        });
      }

      const result = await geminiService.generateImage({
        prompt,
        numberOfImages,
        aspectRatio,
        model,
        negativePrompt,
        language,
        addWatermark,
        safetyFilterLevel,
        personGeneration
      });

      res.json({
        success: true,
        message: 'Imagens geradas com sucesso',
        data: result
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/images/edit
   * Edita uma imagem existente
   */
  async editImage(req, res, next) {
    try {
      const {
        imageUrl,
        prompt,
        maskUrl,
        numberOfImages,
        model
      } = req.body;

      if (!imageUrl || !prompt) {
        return res.status(400).json({
          error: 'imageUrl e prompt são obrigatórios',
          example: {
            imageUrl: 'https://example.com/image.png',
            prompt: 'Adicionar um chapéu ao gato',
            maskUrl: 'https://example.com/mask.png'
          }
        });
      }

      const result = await geminiService.editImage({
        imageUrl,
        prompt,
        maskUrl,
        numberOfImages,
        model
      });

      res.json({
        success: true,
        message: 'Imagem editada com sucesso',
        data: result
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/images/upscale
   * Aumenta a resolução de uma imagem
   */
  async upscaleImage(req, res, next) {
    try {
      const {
        imageUrl,
        scaleFactor,
        model
      } = req.body;

      if (!imageUrl) {
        return res.status(400).json({
          error: 'imageUrl é obrigatório',
          example: {
            imageUrl: 'https://example.com/image.png',
            scaleFactor: 2
          }
        });
      }

      const result = await geminiService.upscaleImage({
        imageUrl,
        scaleFactor,
        model
      });

      res.json({
        success: true,
        message: 'Upscale realizado com sucesso',
        data: result
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/images/variations
   * Gera variações de uma imagem
   */
  async generateVariations(req, res, next) {
    try {
      const {
        imageUrl,
        numberOfVariations,
        prompt
      } = req.body;

      if (!imageUrl) {
        return res.status(400).json({
          error: 'imageUrl é obrigatório',
          example: {
            imageUrl: 'https://example.com/image.png',
            numberOfVariations: 3,
            prompt: 'Variações com diferentes estilos artísticos'
          }
        });
      }

      const result = await geminiService.generateVariations({
        imageUrl,
        numberOfVariations,
        prompt
      });

      res.json({
        success: true,
        message: 'Variações geradas com sucesso',
        data: result
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/images/models
   * Lista modelos disponíveis
   */
  async listModels(req, res, next) {
    try {
      const result = await geminiService.listModels();

      res.json({
        success: true,
        data: result
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/images/docs
   * Documentação da API
   */
  async getDocs(req, res) {
    res.json({
      name: 'Nano Banana Image Generation API',
      version: '1.0.0',
      description: 'API REST completa para geração, edição e manipulação de imagens usando Gemini Nano Banana',
      endpoints: {
        generate: {
          method: 'POST',
          path: '/api/images/generate',
          description: 'Gera imagens a partir de prompts de texto',
          parameters: {
            prompt: {
              type: 'string',
              required: true,
              description: 'Descrição da imagem desejada'
            },
            numberOfImages: {
              type: 'number',
              required: false,
              default: 1,
              min: 1,
              max: 4,
              description: 'Número de imagens a gerar'
            },
            aspectRatio: {
              type: 'string',
              required: false,
              default: '1:1',
              options: ['1:1', '3:4', '4:3', '9:16', '16:9'],
              description: 'Proporção da imagem'
            },
            model: {
              type: 'string',
              required: false,
              default: 'imagen-3.0-generate-001',
              options: ['imagen-3.0-generate-001', 'imagen-3.0-fast-generate-001'],
              description: 'Modelo a ser usado'
            },
            negativePrompt: {
              type: 'string',
              required: false,
              description: 'Elementos a evitar na imagem'
            },
            language: {
              type: 'string',
              required: false,
              default: 'pt',
              description: 'Idioma do prompt'
            },
            addWatermark: {
              type: 'boolean',
              required: false,
              default: false,
              description: 'Adicionar marca d\'água'
            },
            safetyFilterLevel: {
              type: 'string',
              required: false,
              default: 'default',
              options: ['default', 'strict', 'permissive'],
              description: 'Nível de filtro de segurança'
            },
            personGeneration: {
              type: 'string',
              required: false,
              default: 'allow_adult',
              options: ['allow_adult', 'allow_all', 'block_all'],
              description: 'Política de geração de pessoas'
            }
          },
          example: {
            prompt: 'Um pôr do sol vibrante sobre montanhas nevadas, estilo aquarela',
            numberOfImages: 2,
            aspectRatio: '16:9',
            negativePrompt: 'pessoas, carros, prédios',
            language: 'pt'
          }
        },
        edit: {
          method: 'POST',
          path: '/api/images/edit',
          description: 'Edita uma imagem existente',
          parameters: {
            imageUrl: {
              type: 'string',
              required: true,
              description: 'URL ou base64 da imagem original'
            },
            prompt: {
              type: 'string',
              required: true,
              description: 'Descrição das mudanças desejadas'
            },
            maskUrl: {
              type: 'string',
              required: false,
              description: 'Máscara para edição específica'
            },
            numberOfImages: {
              type: 'number',
              required: false,
              default: 1,
              description: 'Número de variações da edição'
            },
            model: {
              type: 'string',
              required: false,
              default: 'imagen-3.0-generate-001'
            }
          },
          example: {
            imageUrl: 'https://example.com/original.png',
            prompt: 'Transformar o céu em um pôr do sol dramático',
            maskUrl: 'https://example.com/sky-mask.png'
          }
        },
        upscale: {
          method: 'POST',
          path: '/api/images/upscale',
          description: 'Aumenta a resolução de uma imagem',
          parameters: {
            imageUrl: {
              type: 'string',
              required: true,
              description: 'URL ou base64 da imagem'
            },
            scaleFactor: {
              type: 'number',
              required: false,
              default: 2,
              options: [2, 4],
              description: 'Fator de escala (2x ou 4x)'
            },
            model: {
              type: 'string',
              required: false,
              default: 'imagen-3.0-generate-001'
            }
          },
          example: {
            imageUrl: 'https://example.com/lowres.png',
            scaleFactor: 4
          }
        },
        variations: {
          method: 'POST',
          path: '/api/images/variations',
          description: 'Gera variações de uma imagem',
          parameters: {
            imageUrl: {
              type: 'string',
              required: true,
              description: 'URL ou base64 da imagem'
            },
            numberOfVariations: {
              type: 'number',
              required: false,
              default: 2,
              description: 'Número de variações'
            },
            prompt: {
              type: 'string',
              required: false,
              description: 'Prompt de orientação para as variações'
            }
          },
          example: {
            imageUrl: 'https://example.com/base.png',
            numberOfVariations: 3,
            prompt: 'Variações com diferentes estilos artísticos'
          }
        },
        models: {
          method: 'GET',
          path: '/api/images/models',
          description: 'Lista todos os modelos disponíveis',
          parameters: {},
          example: {}
        }
      },
      rateLimits: {
        window: '15 minutos',
        maxRequests: 100
      },
      authentication: {
        type: 'API Key',
        header: 'X-API-Key',
        note: 'Configurar GOOGLE_API_KEY no arquivo .env'
      }
    });
  }
}

module.exports = new ImageController();
