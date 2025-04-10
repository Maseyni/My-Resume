const itemList = document.getElementById('itemList');
    const addButton = document.getElementById('addButton');
    const sortButton = document.getElementById('sortButton');
    const itemInput = document.getElementById('itemInput');

    // Загрузка списка из localStorage
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];

    // Функция для обновления localStorage
    function updateLocalStorage() {
      const items = Array.from(itemList.children).map(li => li.textContent.replace("Удалить", "").trim());
      localStorage.setItem('items', JSON.stringify(items));
    }

    // Отображение сохраненных элементов
    function renderItems() {
      itemList.innerHTML = '';
      savedItems.forEach((itemText, index) => {
        const li = createListItem(itemText);
        itemList.appendChild(li);
        setTimeout(() => li.classList.add('appear'), index * 100);
      });
    }

    function createListItem(text) {
      const li = document.createElement('li');
      li.textContent = text;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.className = 'deleteButton';
      deleteButton.addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
      });

      li.appendChild(deleteButton);
      return li;
    }

    renderItems();

    // Добавление нового товара
    addButton.addEventListener('click', () => addItem());
    itemInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') addItem();
    });

    function addItem() {
      const newItemText = itemInput.value.trim();
      if (newItemText) {
        const li = createListItem(newItemText);
        li.classList.add('appear'); // Анимация появления
        itemList.appendChild(li);
        itemInput.value = '';
        updateLocalStorage();
      }
    }

    // Сортировка списка
    sortButton.addEventListener('click', () => {
      const items = Array.from(itemList.children);
      items.sort((a, b) => {
        const textA = a.textContent.replace("Удалить", "").trim().toLowerCase();
        const textB = b.textContent.replace("Удалить", "").trim().toLowerCase();
        return textA.localeCompare(textB);
      });

      items.forEach((li, index) => {
        itemList.appendChild(li); // Перемещаем элементы в DOM
        li.classList.remove('appear'); // Убираем класс для повторной анимации
        setTimeout(() => li.classList.add('appear'), index * 100); // Анимация появления
      });

      updateLocalStorage();
    });
