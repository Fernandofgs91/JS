document.addEventListener('DOMContentLoaded', () => {
    const easyTable = document.getElementById('easyTable');
    const mediumTable = document.getElementById('mediumTable');
    const hardTable = document.getElementById('hardTable');
    const resultados = JSON.parse(localStorage.getItem('results')) || [];

    resultados.forEach(resultado => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resultado.jogador}</td>
            <td>${resultado.modalidade}</td>
            <td>${resultado.acertos}</td>
        `;

        if (resultado.modalidade === 'Fácil') {
            easyTable.appendChild(row);
        } else if (resultado.modalidade === 'Médio') {
            mediumTable.appendChild(row);
        } else if (resultado.modalidade === 'Difícil') {
            hardTable.appendChild(row);
        }
    });
});

function goToMenu() {
    try {
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao redirecionar para o menu:', error);
    }
}

function clearResults() {
    try {
        // Limpar os dados do localStorage
        localStorage.removeItem('results');

        // Limpar as tabelas
        document.getElementById('easyTable').innerHTML = '';
        document.getElementById('mediumTable').innerHTML = '';
        document.getElementById('hardTable').innerHTML = '';

        alert('Resultados limpos com sucesso!');
    } catch (error) {
        console.error('Erro ao limpar resultados:', error);
    }
}