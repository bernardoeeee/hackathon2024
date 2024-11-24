// Aguarda o carregamento completo do DOM para garantir que todos os elementos estejam prontos antes da execução do código
document.addEventListener('DOMContentLoaded', async () => {
    // Recupera o token JWT de autenticação armazenado no localStorage
    const token = localStorage.getItem('token');

    // Caso o token não esteja presente, o usuário é redirecionado para a página de login
    if (!token) {
        window.location.href = 'login.html';
        return; // Interrompe a execução do código restante nesta função
    }

    // Seleciona os elementos onde as informações do usuário e mensagens serão exibidas
    const usercpfElement = document.getElementById('usercpf');
    const messageElement = document.getElementById('message');

    // Realiza uma requisição para obter os dados do usuário autenticado
    const response = await fetch('http://localhost:3000/user', {
        method: 'GET', // Método HTTP GET para recuperar dados
        headers: { 'Authorization': `Bearer ${token}` } // Envia o token no cabeçalho de autorização
    });

    // Verifica se a requisição foi bem-sucedida (status HTTP 200)
    if (response.ok) {
        // Converte a resposta para JSON e obtém os dados do usuário
        const userData = await response.json();
        
        // Exibe o cpf do usuário no elemento designado da página
        usercpfElement.textContent = userData.cpf;

        // Preenche o campo 'newcpf' com o cpf atual do usuário para facilitar a edição
        document.getElementById('newcpf').value = userData.cpf;
    } else {
        // Exibe uma mensagem de erro caso a requisição falhe
        messageElement.textContent = 'Erro ao obter dados do usuário.';
    }

    // Adiciona um evento de submissão para o formulário de atualização de dados do usuário
    document.getElementById('updateForm').addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de atualização da página

        // Obtém os valores dos campos de novo cpf e nova senha
        const newcpf = document.getElementById('newcpf').value;
        const newPassword = document.getElementById('newPassword').value;

        // Realiza uma requisição para atualizar os dados do usuário no servidor
        const updateResponse = await fetch('http://localhost:3000/user', {
            method: 'PUT', // Método HTTP PUT para atualização
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                'Authorization': `Bearer ${token}` // Envia o token no cabeçalho para autenticação
            },
            body: JSON.stringify({ newcpf, newPassword }) // Envia os novos dados no corpo da requisição
        });

        // Verifica se a atualização foi bem-sucedida
        if (updateResponse.ok) {
            messageElement.textContent = 'Usuário atualizado com sucesso!'; // Mensagem de sucesso
        } else {
            messageElement.textContent = 'Erro ao atualizar usuário.'; // Mensagem de erro
        }
    });

    // Adiciona um evento de clique para o botão de deletar o usuário
    document.getElementById('deleteUser').addEventListener('click', async () => {
        // Exibe uma mensagem de confirmação; se o usuário cancelar, a função termina
        if (!confirm('Tem certeza de que deseja deletar sua conta?')) return;

        // Realiza uma requisição para deletar o usuário do banco de dados
        const deleteResponse = await fetch('http://localhost:3000/user', {
            method: 'DELETE', // Método HTTP DELETE para exclusão
            headers: { 'Authorization': `Bearer ${token}` } // Envia o token no cabeçalho para autenticação
        });

        // Verifica se a exclusão foi bem-sucedida
        if (deleteResponse.ok) {
            localStorage.removeItem('token'); // Remove o token do localStorage para efetuar o logout
            window.location.href = 'login.html'; // Redireciona o usuário para a página de login
        } else {
            messageElement.textContent = 'Erro ao deletar usuário.'; // Exibe uma mensagem de erro em caso de falha
        }
    });
});
