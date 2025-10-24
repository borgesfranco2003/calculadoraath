require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const imageRoutes = require('./routes/imageRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const config = require('./config/config');

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindow,
  max: config.rateLimitMax,
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});
app.use('/api/', limiter);

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// Rotas da API
app.use('/api/images', imageRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'Nano Banana API - Geração de Imagens com Gemini',
    version: '1.0.0',
    docs: '/api/images/docs',
    endpoints: {
      generateImage: 'POST /api/images/generate',
      editImage: 'POST /api/images/edit',
      upscaleImage: 'POST /api/images/upscale',
      getModels: 'GET /api/images/models',
      health: 'GET /health'
    }
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Ambiente: ${config.nodeEnv}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
