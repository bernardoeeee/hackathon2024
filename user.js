
// Adiciona um listener que aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', async () => {
    // Obtém o token do localStorage
    const token = localStorage.getItem('token');

    // Verifica se não há token; se não houver, redireciona para a página de login
    if (!token) {
        window.location.href = 'login.html'; // Redireciona para o login se não houver token
        return; // Interrompe a execução do código
    }

    // Obtém dados do usuário da API
    const response = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho de autorização
        }
    });

    // Seleciona os elementos onde as informações serão exibidas
    const usercpfElement = document.getElementById('usercpf');
    const messageElement = document.getElementById('message');

    // Verifica se a resposta da API foi bem-sucedida
    if (response.ok) {
        // Converte a resposta em JSON
        const userData = await response.json();
        usercpfElement.textContent = userData.cpf; // Exibe o cpf do usuário na página

        // Preenche os campos de entrada com os dados do usuário
        document.getElementById('newcpf').value = userData.cpf; // Preenche o novo cpf com o cpf atual
    } else {
        // Se houver erro ao obter dados do usuário, exibe uma mensagem
        messageElement.textContent = 'Erro ao obter dados do usuário.';
    }
 
});

