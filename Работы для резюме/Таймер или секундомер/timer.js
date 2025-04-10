    let timerInterval;
    let startTime;
    let elapsedTime = 0; // Время в миллисекундах

    const clockDisplay = document.getElementById('clock');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');

    // Обновление часов каждую секунду
    function updateClock() {
      const currentTime = new Date();
      const hrs = currentTime.getHours();
      const mins = currentTime.getMinutes();
      const secs = currentTime.getSeconds();
      clockDisplay.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    setInterval(updateClock, 1000);

    // Форматирует время в hh:mm:ss.000
    function formatTime(milliseconds) {
      const hrs = Math.floor(milliseconds / (1000 * 60 * 60));
      const mins = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((milliseconds % (1000 * 60)) / 1000);
      const millis = milliseconds % 1000;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
    }

    // Обновляет отображение таймера
    function updateTimerDisplay() {
      const currentTime = new Date().getTime();
      elapsedTime = currentTime - startTime;
      timerDisplay.textContent = formatTime(elapsedTime);
    }

    // Запускает таймер
    startButton.addEventListener('click', () => {
      if (timerInterval) return; // Если таймер уже запущен, ничего не делаем
      startTime = new Date().getTime() - elapsedTime; // Учитываем текущее время
      timerInterval = setInterval(updateTimerDisplay, 10); // Обновляем каждые 10 миллисекунд
    });

    // Останавливает таймер
    stopButton.addEventListener('click', () => {
      clearInterval(timerInterval);
      timerInterval = null;
    });

    // Сбрасывает таймер
    resetButton.addEventListener('click', () => {
      clearInterval(timerInterval);
      timerInterval = null;
      elapsedTime = 0;
      timerDisplay.textContent = formatTime(elapsedTime);
    });