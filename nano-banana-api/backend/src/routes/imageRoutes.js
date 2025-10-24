const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const { validateImageGeneration } = require('../middlewares/validation');

// Documentação
router.get('/docs', imageController.getDocs);

// Listar modelos disponíveis
router.get('/models', imageController.listModels);

// Gerar imagens
router.post('/generate', validateImageGeneration, imageController.generateImage);

// Editar imagem
router.post('/edit', imageController.editImage);

// Upscale de imagem
router.post('/upscale', imageController.upscaleImage);

// Gerar variações
router.post('/variations', imageController.generateVariations);

module.exports = router;
