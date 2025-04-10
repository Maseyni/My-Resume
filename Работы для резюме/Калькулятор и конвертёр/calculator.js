function appendValue(value) {
    const display = document.getElementById("display");

    // Проверяем, чтобы длина не превышала 22 символов
    if (display.value.length < 22) {
      display.value += value;
    } else {
      alert("Достигнуто максимальное количество символов (22)!");
    }
  }

  // Удалить последний символ
function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1); // Убираем последний символ
}
  
  // Возведение в квадрат
function square() {
    const display = document.getElementById("display");
    try {
      display.value = Math.pow(eval(display.value), 2); // Возводим в квадрат текущее значение
    } catch (error) {
      display.value = "Error"; // Если что-то пошло не так
    }
}
  
// Квадратный корень
function squareRoot() {
    const display = document.getElementById("display");
    try {
      display.value = Math.sqrt(eval(display.value)); // Вычисляем квадратный корень текущего значения
    } catch (error) {
      display.value = "Error"; // Обработка ошибок ввода
    }
  }
  
  
function clearDisplay() {
    const display = document.getElementById("display");
    display.value = "";
}
  
function calculateResult() {
    const display = document.getElementById("display");
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = "Error";
    }
}
  