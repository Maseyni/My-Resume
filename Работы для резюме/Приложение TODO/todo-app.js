(function() {
    //создаём и возвращаем заголовок приложения
    function createAppTitle(title) {
        //создаём элемент h2 и помещаем его в let appTitle
        let appTitle = document.createElement("h2"); 
        //присваиваем с помощью innerHTML title который мы передаём в качестве аргумента (title)
        appTitle.innerHTML = title;
        //возвращаем созданный элемент, который потом будем использовать в div container
        return appTitle;
    };

    //создаём и возвращаем форму для создания дела
    function createTodoItemForm() {
        //создаём элемент формы
        let form = document.createElement("form");
        //создаём поле для ввода
        let input = document.createElement("input");
        //создаём вспомогательный элемент, чтобы правильно стилизовать кнопку в стилях bootstrap
        let buttonWrapper = document.createElement("div");
        //создаём кнопку
        let button = document.createElement("button");

        //расставим различные атрибуты нашим элементам
        //для формы мы назначим два класса элементам
        form.classList.add("input-group", "mb-3"); //всё создаётся бутстрапом
        input.classList.add("form-control");
        //в инпут добавим пояснение
        input.placeholder = "Введите название нового дела";
        buttonWrapper.classList.add("input-group-append"); //всё создаётся бутстрапом
        button.classList.add("btn", "btn-primary");
        //текст в кнопке
        button.textContent = "Добавить дело";

        //все элементы объединияем в единую структуру
        buttonWrapper.append(button); //button вкладываем в btnWrapper
        form.append(input); //input в form
        form.append(buttonWrapper); //btnWrapper в form 

        //в html это код выглядел бы:
        // <form class="input-group, mb-3">
        //     <input class="form-control" placeholder="Введите название нового дела">
        //     <div class="input-group-append">
        //         <button class="btn, btn-primary">Добавить дело</button>
        //     </div>
        // </form>

        return {
            form,
            input,
            button,
        };
    };

    //создаём и возвращаем список элементов
    function createTodoList() {
        //создадим и вернём переменную list
        let list = document.createElement("ul");
        list.classList.add("list-group");
        return list;
    };


    //создаст элемент для списка дел и вернёт всё необходимое для взаимодействия с этим элемннтом
    function createTodoItem(name) {
        let item = document.createElement("li");
        //кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement("div");
        let doneButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        //устанавливаем стили для элементов списка, а также для размещения кнопок
        //в его правой части с помощью flex
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        item.textContent = name;

        buttonGroup.classList.add("btn-group", "btn-group-sm");
        doneButton.classList.add("btn", "btn-success");
        doneButton.textContent = "Готово";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.textContent = "Удалить";

        //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return {
            item,
            doneButton,
            deleteButton,
        };
    };


    function createTodoApp(container, title = "Список дел") {
        // Уникальный ключ для Local Storage, основанный на URL текущей страницы
        const storageKey = `todoList_${window.location.pathname}`;
        //вызываем все функции поочерёдно
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        
        //их результат внури размещаем контейнера 
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);


        // Функция загрузки данных из Local Storage
        function loadTodoItems() {
            const savedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
            savedItems.forEach((savedItem) => {
                let todoItem = createTodoItem(savedItem.name);
                if (savedItem.done) {
                    todoItem.item.classList.add("list-group-item-success");
                }

                // Обработчики кнопок
                todoItem.doneButton.addEventListener("click", function () {
                    todoItem.item.classList.toggle("list-group-item-success");
                    saveTodoItems();
                });
                todoItem.deleteButton.addEventListener("click", function () {
                    if (confirm("Вы уверены?")) {
                        todoItem.item.remove();
                        saveTodoItems();
                    }
                });

                todoList.append(todoItem.item);
            });
        }


            // Функция сохранения данных в Local Storage
        function saveTodoItems() {
            const items = [];
            todoList.querySelectorAll(".list-group-item").forEach((listItem) => {
                items.push({
                    name: listItem.firstChild.textContent,
                    done: listItem.classList.contains("list-group-item-success"),
                });
            });
            localStorage.setItem(storageKey, JSON.stringify(items));
        }

        
        //браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
        todoItemForm.form.addEventListener("submit", function(e) {
            //эта строчка необходима, чтобы предотвратить стандартное действие браузера
            //в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            //игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            //добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener("click", function() {
                todoItem.item.classList.toggle("list-group-item-success");
                saveTodoItems();
            });
            todoItem.deleteButton.addEventListener("click", function() {
                if (confirm("Вы уверены?")) {
                    todoItem.item.remove();
                    saveTodoItems();
                }
            });

            //создаём и добавляем в список новое дело с названием из поля ввода
            todoList.append(todoItem.item);
            saveTodoItems();

            //создаём и добавляем в список новое дело с названием из поля для ввода 
            //todoList.append(createTodoItem(todoItemForm.input.value).item);

            //обнуляем значение в поле, чтобы не пришлось стирать его в ручную
            todoItemForm.input.value = "";
        });

        // Загружаем дела из Local Storage
        loadTodoItems();
    };


    //зарегистрируем функцию create todo-app в глобальном окне window, чтобы получить доступ
    //к функции из других скриптов
    window.createTodoApp = createTodoApp;
     
    // //чтобы все элементы были помещены в DOM нашей страницы
    // document.addEventListener("DOMContentLoaded", function(){
    //     createTodoApp(document.getElementById("my-todos"), "Мои дела");
    //     createTodoApp(document.getElementById("sister-todos"), "Дела сестры");
    //     createTodoApp(document.getElementById("mom-todos"), "Дела мамы");
    //     createTodoApp(document.getElementById("dad-todos"), "Дела папы");
    // });
})();