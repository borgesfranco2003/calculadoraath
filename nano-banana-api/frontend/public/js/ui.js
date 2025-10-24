/**
 * UI Helper Functions
 */

const UI = {
    /**
     * Mostra overlay de loading
     */
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    },

    /**
     * Esconde overlay de loading
     */
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    },

    /**
     * Mostra toast notification
     * @param {string} message
     * @param {string} type - success, error, warning, info
     * @param {number} duration
     */
    showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Renderiza resultados de imagens
     * @param {array} images
     */
    renderResults(images) {
        const resultsSection = document.getElementById('results');
        const resultsGrid = document.getElementById('results-grid');

        if (!resultsSection || !resultsGrid) return;

        resultsGrid.innerHTML = '';

        images.forEach((image, index) => {
            const card = this.createImageCard(image, index);
            resultsGrid.appendChild(card);
        });

        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    /**
     * Cria um card de imagem
     * @param {object} image
     * @param {number} index
     * @returns {HTMLElement}
     */
    createImageCard(image, index) {
        const card = document.createElement('div');
        card.className = 'result-card';

        // Placeholder para imagem (já que não temos URL real)
        const imgPlaceholder = document.createElement('div');
        imgPlaceholder.style.cssText = `
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            margin-bottom: 15px;
        `;
        imgPlaceholder.textContent = `Imagem ${index + 1}`;

        const info = document.createElement('div');
        info.className = 'result-info';
        info.innerHTML = `
            <p><strong>ID:</strong> ${image.id}</p>
            <p><strong>Proporção:</strong> ${image.aspectRatio || 'N/A'}</p>
            <p><strong>Modelo:</strong> ${image.model || 'N/A'}</p>
            <p><strong>Criado em:</strong> ${new Date(image.createdAt).toLocaleString('pt-BR')}</p>
            ${image.prompt ? `<p><strong>Prompt:</strong> ${image.prompt.substring(0, 100)}...</p>` : ''}
        `;

        card.appendChild(imgPlaceholder);
        card.appendChild(info);

        return card;
    },

    /**
     * Renderiza lista de modelos
     * @param {array} models
     */
    renderModels(models) {
        const modelsList = document.getElementById('models-list');
        if (!modelsList) return;

        modelsList.innerHTML = '';

        models.forEach(model => {
            const card = this.createModelCard(model);
            modelsList.appendChild(card);
        });
    },

    /**
     * Cria um card de modelo
     * @param {object} model
     * @returns {HTMLElement}
     */
    createModelCard(model) {
        const card = document.createElement('div');
        card.className = 'model-card';

        const capabilities = model.capabilities
            .map(cap => `<span class="capability-badge">${cap}</span>`)
            .join('');

        card.innerHTML = `
            <h3>${model.name}</h3>
            <p><strong>ID:</strong> ${model.id}</p>
            <p>${model.description}</p>
            <p><strong>Máximo de Imagens:</strong> ${model.maxImages}</p>
            <p><strong>Proporções Suportadas:</strong> ${model.supportedAspectRatios.join(', ')}</p>
            <div class="model-capabilities">
                <strong>Capacidades:</strong> ${capabilities}
            </div>
        `;

        return card;
    },

    /**
     * Limpa os resultados
     */
    clearResults() {
        const resultsSection = document.getElementById('results');
        const resultsGrid = document.getElementById('results-grid');

        if (resultsGrid) {
            resultsGrid.innerHTML = '';
        }

        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
    },

    /**
     * Obtém dados do formulário como objeto
     * @param {HTMLFormElement} form
     * @returns {object}
     */
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            // Converter strings numéricas para números
            if (key === 'numberOfImages' || key === 'numberOfVariations' || key === 'scaleFactor') {
                data[key] = parseInt(value);
            }
            // Converter checkbox para boolean
            else if (key === 'addWatermark') {
                data[key] = form.elements[key].checked;
            }
            // Ignorar campos vazios
            else if (value.trim() !== '') {
                data[key] = value;
            }
        }

        return data;
    },

    /**
     * Valida se o servidor está acessível
     * @returns {Promise<boolean>}
     */
    async validateServerConnection() {
        try {
            await api.healthCheck();
            return true;
        } catch (error) {
            this.showToast(
                'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:3000',
                'error',
                8000
            );
            return false;
        }
    }
};

// Adicionar CSS para animação de slideOut
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
