const themeToggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.textContent = '☀️ Светлая';
}

themeToggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');

  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '🌙 Тёмная';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️ Светлая';
    localStorage.setItem('theme', 'dark');
  }
});
const modal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const modalCaption = document.querySelector('.modal-caption');
const closeModalBtn = document.querySelector('.close-modal');
const galleryImages = document.querySelectorAll('.gallery-item img');

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        modalImage.src = image.src;
        modalCaption.textContent = image.alt; 
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

closeModalBtn.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) { 
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

const contactForm = document.getElementById('feedbackForm');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
 const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  if (!isValidEmail(formData.email)) {
    alert('Пожалуйста, введите корректный email адрес.');
    return;
  }
  
  console.log('Данные формы:', formData); 
  alert(`Спасибо, ${formData.name}! Ваше сообщение отправлено. \nМы ответим на: ${formData.email}`);
  
  contactForm.reset();
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);

}
