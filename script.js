let score = 0;
let remainingTime = 30;
let objects = [1, 2, -1, 4, 0];

// Оновлення відображення очок
function updateScore() {
    document.getElementById('score').textContent = 'Очки: ' + score;
}

// Ініціалізація об'єктів
function initObjects() {
    document.querySelectorAll('.clickable-object').forEach(function (element, index) {
        element.textContent = objects[index];
        element.addEventListener('click', function () {
            score = score + objects[index];
            updateScore();
        });
    });
}

// Функція для оновлення номіналів
function updateObjects() {
    document.querySelectorAll('.clickable-object').forEach(function (element, index) {
        let newValue = Math.floor(Math.random() * 9) - 3; // Випадкові номінали (-3 до 5)
        objects[index] = newValue;
        element.textContent = newValue;
    });
}

// Таймер
function startTimer() {
    let timerInterval = setInterval(function () {
        remainingTime = remainingTime - 1;
        document.getElementById('timer').textContent = 'Час: ' + remainingTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Завершення гри
function endGame() {
    alert('Гра завершена! Ваш рахунок: ' + score);
    // Забороняємо натискати на кнопки
    document.querySelectorAll('.clickable-object').forEach(function (element) {
        element.disabled = true;
    });
    // Надіслати результат у Telegram
    Telegram.WebApp.sendData(score.toString());
}

// Запуск гри
initObjects();
startTimer();

// Оновлення об'єктів кожні 3 секунди
setInterval(updateObjects, 3000);
