module.exports = {
  // Servidor
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // API Keys
  googleApiKey: process.env.GOOGLE_API_KEY,

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // Rate Limiting
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 min
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // Configurações de Imagem
  defaultImageCount: parseInt(process.env.DEFAULT_IMAGE_COUNT) || 1,
  maxImageCount: parseInt(process.env.MAX_IMAGE_COUNT) || 4,
  defaultImageSize: process.env.DEFAULT_IMAGE_SIZE || '1024x1024',

  // Modelos disponíveis
  models: {
    imagen3: 'imagen-3.0-generate-001',
    imagen3Fast: 'imagen-3.0-fast-generate-001'
  },

  // Aspect ratios suportados
  aspectRatios: [
    '1:1',    // Quadrado
    '3:4',    // Retrato
    '4:3',    // Paisagem
    '9:16',   // Retrato vertical
    '16:9'    // Paisagem horizontal
  ],

  // Safety settings
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ]
};
