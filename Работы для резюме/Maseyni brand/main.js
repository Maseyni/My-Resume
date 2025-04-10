document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-buttons button');
    const items = document.querySelectorAll('.gallery-item');
  
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        // Сброс активной кнопки
        buttons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
  
        const filter = button.getAttribute('data-filter');
  
        items.forEach((item) => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });

  document.querySelector('.cta-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвратить стандартное действие формы
    alert('Спасибо за ваш запрос! Мы свяжемся с вами в ближайшее время.');
  });
  
  