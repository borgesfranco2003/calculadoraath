/**
 * Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🍌 Nano Banana Image Generator Initialized');

    // Verificar conexão com o servidor
    UI.validateServerConnection();

    // Tab Navigation
    setupTabNavigation();

    // Form Handlers
    setupGenerateForm();
    setupEditForm();
    setupUpscaleForm();
    setupVariationsForm();
    setupModelsButton();

    // Example Prompts
    setupExamplePrompts();

    // API Docs Link
    setupApiDocsLink();
});

/**
 * Configurar navegação entre tabs
 */
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remover active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adicionar active ao selecionado
            button.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');

            // Limpar resultados ao trocar de tab
            UI.clearResults();
        });
    });
}

/**
 * Configurar formulário de geração de imagens
 */
function setupGenerateForm() {
    const form = document.getElementById('generate-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar conexão
        const isConnected = await UI.validateServerConnection();
        if (!isConnected) return;

        const formData = UI.getFormData(form);

        console.log('📤 Enviando requisição de geração:', formData);

        UI.showLoading();
        UI.clearResults();

        try {
            const response = await api.generateImage(formData);

            console.log('✅ Resposta recebida:', response);

            if (response.success && response.data && response.data.images) {
                UI.showToast(
                    `${response.data.count} imagem(ns) gerada(s) com sucesso!`,
                    'success'
                );
                UI.renderResults(response.data.images);
            } else {
                UI.showToast('Resposta inesperada do servidor', 'warning');
            }
        } catch (error) {
            console.error('❌ Erro:', error);
            UI.showToast(
                `Erro ao gerar imagem: ${error.message}`,
                'error'
            );
        } finally {
            UI.hideLoading();
        }
    });
}

/**
 * Configurar formulário de edição
 */
function setupEditForm() {
    const form = document.getElementById('edit-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isConnected = await UI.validateServerConnection();
        if (!isConnected) return;

        const formData = UI.getFormData(form);

        console.log('📤 Enviando requisição de edição:', formData);

        UI.showLoading();
        UI.clearResults();

        try {
            const response = await api.editImage(formData);

            console.log('✅ Resposta recebida:', response);

            if (response.success && response.data) {
                UI.showToast('Imagem editada com sucesso!', 'success');

                if (response.data.editedImages) {
                    UI.renderResults(response.data.editedImages);
                }
            }
        } catch (error) {
            console.error('❌ Erro:', error);
            UI.showToast(
                `Erro ao editar imagem: ${error.message}`,
                'error'
            );
        } finally {
            UI.hideLoading();
        }
    });
}

/**
 * Configurar formulário de upscale
 */
function setupUpscaleForm() {
    const form = document.getElementById('upscale-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isConnected = await UI.validateServerConnection();
        if (!isConnected) return;

        const formData = UI.getFormData(form);

        console.log('📤 Enviando requisição de upscale:', formData);

        UI.showLoading();
        UI.clearResults();

        try {
            const response = await api.upscaleImage(formData);

            console.log('✅ Resposta recebida:', response);

            if (response.success && response.data) {
                UI.showToast('Upscale realizado com sucesso!', 'success');

                if (response.data.upscaledImage) {
                    UI.renderResults([response.data.upscaledImage]);
                }
            }
        } catch (error) {
            console.error('❌ Erro:', error);
            UI.showToast(
                `Erro ao fazer upscale: ${error.message}`,
                'error'
            );
        } finally {
            UI.hideLoading();
        }
    });
}

/**
 * Configurar formulário de variações
 */
function setupVariationsForm() {
    const form = document.getElementById('variations-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isConnected = await UI.validateServerConnection();
        if (!isConnected) return;

        const formData = UI.getFormData(form);

        console.log('📤 Enviando requisição de variações:', formData);

        UI.showLoading();
        UI.clearResults();

        try {
            const response = await api.generateVariations(formData);

            console.log('✅ Resposta recebida:', response);

            if (response.success && response.data) {
                UI.showToast('Variações geradas com sucesso!', 'success');

                if (response.data.variations) {
                    UI.renderResults(response.data.variations);
                }
            }
        } catch (error) {
            console.error('❌ Erro:', error);
            UI.showToast(
                `Erro ao gerar variações: ${error.message}`,
                'error'
            );
        } finally {
            UI.hideLoading();
        }
    });
}

/**
 * Configurar botão de carregar modelos
 */
function setupModelsButton() {
    const button = document.getElementById('load-models-btn');

    button.addEventListener('click', async () => {
        const isConnected = await UI.validateServerConnection();
        if (!isConnected) return;

        UI.showLoading();

        try {
            const response = await api.listModels();

            console.log('✅ Modelos recebidos:', response);

            if (response.success && response.data && response.data.models) {
                UI.showToast('Modelos carregados com sucesso!', 'success');
                UI.renderModels(response.data.models);
            }
        } catch (error) {
            console.error('❌ Erro:', error);
            UI.showToast(
                `Erro ao carregar modelos: ${error.message}`,
                'error'
            );
        } finally {
            UI.hideLoading();
        }
    });
}

/**
 * Configurar botões de exemplo de prompts
 */
function setupExamplePrompts() {
    const exampleButtons = document.querySelectorAll('.example-btn');
    const promptTextarea = document.getElementById('prompt');

    exampleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prompt = button.getAttribute('data-prompt');
            if (promptTextarea && prompt) {
                promptTextarea.value = prompt;
                promptTextarea.focus();

                // Scroll suave até o textarea
                promptTextarea.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}

/**
 * Configurar link de documentação da API
 */
function setupApiDocsLink() {
    const link = document.getElementById('api-docs-link');

    link.addEventListener('click', async (e) => {
        e.preventDefault();

        const isConnected = await UI.validateServerConnection();
        if (!isConnected) return;

        try {
            const docs = await api.getDocs();
            console.log('📚 Documentação da API:', docs);

            // Abrir documentação em nova aba
            const docsWindow = window.open('', '_blank');
            docsWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>API Documentation</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            max-width: 1200px;
                            margin: 0 auto;
                            padding: 20px;
                            background: #1a1a1a;
                            color: #fff;
                        }
                        pre {
                            background: #2d2d2d;
                            padding: 15px;
                            border-radius: 5px;
                            overflow-x: auto;
                        }
                        h1, h2, h3 { color: #4285f4; }
                    </style>
                </head>
                <body>
                    <h1>Nano Banana API Documentation</h1>
                    <pre>${JSON.stringify(docs, null, 2)}</pre>
                </body>
                </html>
            `);
        } catch (error) {
            UI.showToast(
                `Erro ao carregar documentação: ${error.message}`,
                'error'
            );
        }
    });
}
