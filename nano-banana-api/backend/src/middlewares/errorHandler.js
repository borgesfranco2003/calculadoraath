/**
 * Middleware de tratamento de erros centralizado
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro capturado:', err);

  // Erro de validação do Joi
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // Erro da API do Google
  if (err.message && err.message.includes('API')) {
    return res.status(502).json({
      error: 'Erro na API do Google',
      message: err.message,
      suggestion: 'Verifique se a GOOGLE_API_KEY está configurada corretamente'
    });
  }

  // Erro de autenticação
  if (err.status === 401 || err.message.includes('unauthorized')) {
    return res.status(401).json({
      error: 'Não autorizado',
      message: 'API Key inválida ou ausente'
    });
  }

  // Erro de rate limit
  if (err.status === 429) {
    return res.status(429).json({
      error: 'Muitas requisições',
      message: 'Limite de taxa excedido. Tente novamente mais tarde.',
      retryAfter: err.retryAfter || 900
    });
  }

  // Erro genérico
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    error: 'Erro no servidor',
    message: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack
    })
  });
};

module.exports = {
  errorHandler
};
