/**
 * API Client para comunicação com o backend Nano Banana
 */

const API_BASE_URL = 'http://localhost:3000/api';

class NanoBananaAPI {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Faz uma requisição HTTP
     * @param {string} endpoint
     * @param {object} options
     * @returns {Promise}
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /**
     * Gera imagens a partir de um prompt
     * @param {object} params
     * @returns {Promise}
     */
    async generateImage(params) {
        return this.request('/images/generate', {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Edita uma imagem existente
     * @param {object} params
     * @returns {Promise}
     */
    async editImage(params) {
        return this.request('/images/edit', {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Faz upscale de uma imagem
     * @param {object} params
     * @returns {Promise}
     */
    async upscaleImage(params) {
        return this.request('/images/upscale', {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Gera variações de uma imagem
     * @param {object} params
     * @returns {Promise}
     */
    async generateVariations(params) {
        return this.request('/images/variations', {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * Lista modelos disponíveis
     * @returns {Promise}
     */
    async listModels() {
        return this.request('/images/models', {
            method: 'GET'
        });
    }

    /**
     * Obtém documentação da API
     * @returns {Promise}
     */
    async getDocs() {
        return this.request('/images/docs', {
            method: 'GET'
        });
    }

    /**
     * Health check
     * @returns {Promise}
     */
    async healthCheck() {
        return this.request('/health', {
            method: 'GET'
        });
    }
}

// Instância global da API
const api = new NanoBananaAPI();
