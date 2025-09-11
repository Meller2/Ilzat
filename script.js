// ===== Код для переключения темы =====

// 1. Находим нашу кнопку в HTML по id
const themeToggleBtn = document.getElementById('themeToggle');

// 2. Проверяем, есть ли сохраненная тема в localStorage, или используем 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

// 3. Если тема была 'dark', то применяем ее сразу при загрузке страницы
if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.textContent = '☀️ Светлая'; // Меняем текст кнопки
}

// 4. Вешаем на кнопку обработчик события 'click'
themeToggleBtn.addEventListener('click', () => {
  // 5. Получаем текущее значение атрибута data-theme у тега <html>
  let theme = document.documentElement.getAttribute('data-theme');

  // 6. Если тема dark – меняем на light, и наоборот
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '🌙 Тёмная';
    localStorage.setItem('theme', 'light'); // Сохраняем выбор в память браузера
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️ Светлая';
    localStorage.setItem('theme', 'dark'); // Сохраняем выбор в память браузера
  }
});

// ===== Код для модального окна с картинкой =====

// 1. Находим элементы модального окна в DOM
const modal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const modalCaption = document.querySelector('.modal-caption');
const closeModalBtn = document.querySelector('.close-modal');

// 2. Находим ВСЕ картинки в галерее
const galleryImages = document.querySelectorAll('.gallery-item img');

// 3. Добавляем обработчик клика на КАЖДУЮ картинку
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        // 4. При клике подставляем в модальное окно src и alt текущей картинки
        modalImage.src = image.src;
        modalCaption.textContent = image.alt; // Используем текст из alt как подпись
        
        // 5. Показываем модальное окно (добавляем класс .show)
        modal.classList.add('show');
        // Запрещаем прокрутку body под модалкой
        document.body.style.overflow = 'hidden';
    });
});

// 6. Вешаем обработчик на кнопку закрытия
closeModalBtn.addEventListener('click', () => {
    closeModal();
});

// 7. Закрываем модалку при клике на затемненную область вокруг картинки
modal.addEventListener('click', (event) => {
    if (event.target === modal) { // Если кликнули именно на фон, а не на контент
        closeModal();
    }
});

// 8. Закрываем модалку по клавише Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// 9. Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('show');
    // Возвращаем возможность прокрутки
    document.body.style.overflow = 'auto';
}

// ===== Код для обработки формы обратной связи =====

// 1. Находим форму в DOM
const contactForm = document.getElementById('feedbackForm');

// 2. Вешаем обработчик на событие "submit" (отправка формы)
contactForm.addEventListener('submit', function(event) {
  // 3. Предотвращаем стандартное поведение браузера (перезагрузку страницы)
  event.preventDefault();
  
  // 4. Собираем данные из полей формы
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  // 5. Простая валидация (дополнительно к required)
  if (!isValidEmail(formData.email)) {
    alert('Пожалуйста, введите корректный email адрес.');
    return;
  }
  
  // 6. В реальном проекте здесь был бы AJAX-запрос к серверу
  // Но для учебного проекта просто покажем alert
  console.log('Данные формы:', formData); // Для дебага в консоли
  alert(`Спасибо, ${formData.name}! Ваше сообщение отправлено. \nМы ответим на: ${formData.email}`);
  
  // 7. Очищаем форму после успешной "отправки"
  contactForm.reset();
});

// 8. Функция для простой проверки email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}