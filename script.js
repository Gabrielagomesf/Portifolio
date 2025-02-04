document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário de contato
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Captura os valores dos campos
            const nomeInput = document.querySelector('input[placeholder="Seu Nome"]');
            const emailInput = document.querySelector('input[placeholder="Seu Email"]');
            const mensagemInput = document.querySelector('textarea[placeholder="Sua Mensagem"]');

            if (!nomeInput || !emailInput || !mensagemInput) {
                console.error("Erro: Alguns campos do formulário não foram encontrados.");
                return;
            }

            const nome = nomeInput.value.trim();
            const email = emailInput.value.trim();
            const mensagem = mensagemInput.value.trim();

            if (!nome || !email || !mensagem) {
                displayFormMessage('Por favor, preencha todos os campos.', 'error');
                return;
            }

            try {
                const response = await fetch('https://folio-sable-eight.vercel.app/api/contato', {
                    method: 'POST', // Adicionei o método POST
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, mensagem }),
                });

                if (response.ok) {
                    displayFormMessage('Obrigado! Sua mensagem foi enviada com sucesso.', 'success');
                    showNotification('Mensagem enviada com sucesso!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error("Erro ao enviar a mensagem.");
                }
            } catch (error) {
                displayFormMessage('Erro ao enviar a mensagem. Verifique sua conexão.', 'error');
                showNotification('Erro ao enviar mensagem.', 'error');
            }
        });
    }

    // Função para exibir notificações na tela
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="close-btn">&times;</button>
        `;

        document.body.appendChild(notification);

        // Fecha a notificação ao clicar no botão
        notification.querySelector('.close-btn').addEventListener('click', () => {
            notification.remove();
        });

        // Remove a notificação automaticamente após 5 segundos
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Função para exibir mensagens dentro do formulário
    function displayFormMessage(message, type) {
        let formMessage = document.querySelector('.form-message');

        if (!formMessage) {
            formMessage = document.createElement('p');
            formMessage.classList.add('form-message');
            contactForm.appendChild(formMessage);
        }

        formMessage.className = `form-message ${type}`;
        formMessage.textContent = message;

        // Remove a mensagem após 7 segundos
        setTimeout(() => {
            formMessage.remove();
        }, 7000);
    }
});
