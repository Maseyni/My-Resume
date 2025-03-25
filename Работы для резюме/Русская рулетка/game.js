// Массив с фразами для "выстрелов"
const phrases = [
    "Вы выжили! 😌",
    "Мимо! 😅",
    "Фух, пронесло!",
    "Удача на вашей стороне! 🎉",
    "Это было близко... 😰",
    "Игра окончена! 💥"
  ];

  // Элементы
  const drum = document.getElementById("drum");
  const resultDisplay = document.getElementById("resultDisplay");
  const resetButton = document.getElementById("resetButton");
  const currentSurvivalDisplay = document.getElementById("currentSurvival");
  const maxSurvivalDisplay = document.getElementById("maxSurvival");

  let gameOver = false; // Флаг состояния игры

  // Загрузка данных из localStorage
  let currentSurvival = 0; // Текущий счетчик выживаний
  let maxSurvival = localStorage.getItem("maxSurvival");
  maxSurvival = maxSurvival ? parseInt(maxSurvival) : 0;

  // Обновление отображения счётчиков
  currentSurvivalDisplay.textContent = `Выживания: ${currentSurvival}`;
  maxSurvivalDisplay.textContent = `Максимум выживаний: ${maxSurvival}`;

  // Функция вращения барабана
  drum.addEventListener("click", () => {
    if (gameOver) return; // Если игра окончена, запрещаем нажатие

    // Добавляем класс для анимации
    drum.classList.add("spin");

    // Удаляем класс после окончания анимации
    setTimeout(() => {
      drum.classList.remove("spin");
    }, 500);

    // Генерация результата
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const result = phrases[randomIndex];
    resultDisplay.textContent = result;

    // Проверка результата
    if (result === "Игра окончена! 💥") {
      gameOver = true; // Меняем флаг состояния игры
      document.body.style.backgroundColor = "red";
      setTimeout(() => {
        document.body.style.backgroundColor = "#f4f4f4";
      }, 2000);

      // Сброс текущего счётчика и обновление максимального
      if (currentSurvival > maxSurvival) {
        maxSurvival = currentSurvival;
        localStorage.setItem("maxSurvival", maxSurvival);
      }
      currentSurvival = 0;
      currentSurvivalDisplay.textContent = `Выживания: ${currentSurvival}`;
      maxSurvivalDisplay.textContent = `Максимум выживаний: ${maxSurvival}`;

      // Показываем кнопку "Попробовать снова"
      resetButton.style.display = "block";
    } else {
      // Увеличиваем текущий счетчик выживаний
      currentSurvival++;
      currentSurvivalDisplay.textContent = `Выживания: ${currentSurvival}`;
    }
  });

  // Функция сброса игры
  resetButton.addEventListener("click", () => {
    gameOver = false; // Сбрасываем состояние игры
    resultDisplay.textContent = "Нажмите на барабан, чтобы сыграть!";
    resetButton.style.display = "none"; // Скрываем кнопку
  });