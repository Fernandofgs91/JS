// Função chamada automaticamente ao carregar a página
window.onload = function() {
    getTextAndGroupWords();
};

function getTextAndGroupWords() {
    // Solicitar o texto ao usuário via prompt
    let text = prompt("Digite um texto para agrupar as palavras por letra inicial:");

    // Verificar se o texto não está vazio
    if (!text || text.trim() === "") {
        alert('Você não inseriu um texto válido. Tente novamente.');
        return;
    }

    // Transformar o texto em minúsculas e remover espaços extras
    text = text.trim().toLowerCase();

    // Dividir o texto em palavras
    let words = text.split(/\s+/);

    // Objeto para armazenar as palavras agrupadas por letra inicial
    let wordGroups = {};

    // Agrupar palavras por letra inicial
    words.forEach(word => {
        let firstLetter = word[0];
        if (!wordGroups[firstLetter]) {
            wordGroups[firstLetter] = [];
        }
        wordGroups[firstLetter].push(word);
    });

    // Limpar a área onde as palavras serão exibidas
    const wordGroupsDiv = document.getElementById('wordGroups');
    wordGroupsDiv.innerHTML = '';

    // Criar a exibição das palavras agrupadas
    for (let letter in wordGroups) {
        // Criar seção para cada letra
        const letterSection = document.createElement('div');
        letterSection.className = 'letter-section';

        // Adicionar título para a letra
        const letterTitle = document.createElement('h3');
        letterTitle.textContent = `Palavras iniciadas com a letra ${letter}:`;
        letterSection.appendChild(letterTitle);

        // Criar lista de palavras
        const wordList = document.createElement('ul');
        wordGroups[letter].forEach(word => {
            const listItem = document.createElement('li');
            listItem.textContent = word;
            wordList.appendChild(listItem);
        });

        // Adicionar lista à seção
        letterSection.appendChild(wordList);

        // Adicionar seção ao corpo do documento
        wordGroupsDiv.appendChild(letterSection);
    }
}