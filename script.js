// Definindo as cores
var colors = ['red', 'blue', 'yellow', 'green'];
// Obtendo referências aos elementos da página
var startButton = document.getElementById('start');
var messageDisplay = document.getElementById('message');
var colorDivs = colors.map(function (color) { return document.getElementById(color); });
// Variáveis do jogo
var sequence = [];
var userInput = [];
var level = 0;
// Função para gerar a sequência aleatória
function generateSequence() {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    level++;
    displaySequence();
}
// Função para exibir a sequência para o jogador
function displaySequence() {
    messageDisplay.textContent = "N\u00EDvel ".concat(level);
    var index = 0;
    var interval = setInterval(function () {
        if (index < sequence.length) {
            highlightColor(sequence[index]);
            index++;
        }
        else {
            clearInterval(interval);
            enableUserInput();
        }
    }, 1000);
}
// Função para destacar a cor
function highlightColor(color) {
    var colorDiv = document.getElementById(color);
    colorDiv.style.opacity = '1';
    setTimeout(function () {
        colorDiv.style.opacity = '0.5';
    }, 500);
}
// Função para habilitar a entrada do usuário
function enableUserInput() {
    colorDivs.forEach(function (div) {
        div.addEventListener('click', handleUserClick);
    });
}
// Função para lidar com a entrada do usuário
function handleUserClick(event) {
    var color = event.target.id;
    userInput.push(color);
    checkInput();
}
// Função para verificar a entrada do usuário
function checkInput() {
    var lastIndex = userInput.length - 1;
    if (userInput[lastIndex] !== sequence[lastIndex]) {
        messageDisplay.textContent = 'Você perdeu! Tente novamente.';
        resetGame();
    }
    else if (userInput.length === sequence.length) {
        messageDisplay.textContent = 'Correto! Proximo nível...';
        userInput = [];
        setTimeout(generateSequence, 1000);
    }
}
// Função para reiniciar o jogo
function resetGame() {
    sequence = [];
    userInput = [];
    level = 0;
    messageDisplay.textContent = 'Clique em "Iniciar Jogo" para começar.';
}
// Adicionando evento de clique ao botão de início
startButton.addEventListener('click', function () {
    resetGame();
    generateSequence();
});
