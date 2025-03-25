const apiKey = "53424971fc7306b5d586e217"; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

document.addEventListener("DOMContentLoaded", () => {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const searchFromCurrency = document.getElementById("searchFromCurrency");
  const searchToCurrency = document.getElementById("searchToCurrency");
  const amountInput = document.getElementById("amount");

  // Ограничение ввода до 34 цифр
  amountInput.addEventListener("input", function () {
    if (this.value.length > 34) {
      this.value = this.value.slice(0, 34);
      alert("Вы можете ввести максимум 34 цифры!");
    }
  });

  // Получаем список валют
  fetch(apiUrl + "USD")
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.conversion_rates);
      
      // Заполняем выпадающие списки
      currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = currency;
        option2.value = currency;
        option1.text = currency;
        option2.text = currency;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
      });

      // Добавляем функционал поиска
      searchFromCurrency.addEventListener("input", () => filterCurrencies(searchFromCurrency.value, fromCurrency));
      searchToCurrency.addEventListener("input", () => filterCurrencies(searchToCurrency.value, toCurrency));
    })
    .catch((error) => console.error("Ошибка при загрузке списка валют:", error));
});

// Фильтр валют на основе поиска
function filterCurrencies(searchValue, currencySelect) {
  const options = currencySelect.options;
  const query = searchValue.toLowerCase();

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (option.text.toLowerCase().includes(query)) {
      option.style.display = ""; 
    } else {
      option.style.display = "none"; 
    }
  }
}

// Конвертация валют
function convert() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const result = document.getElementById("result");

  if (!amount || !fromCurrency || !toCurrency) {
    result.textContent = "Пожалуйста, заполните все поля!";
    return;
  }

  fetch(apiUrl + fromCurrency)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    })
    .catch((error) => {
      console.error("Ошибка при конверсии:", error);
      result.textContent = "Ошибка! Попробуйте ещё раз.";
    });
}
