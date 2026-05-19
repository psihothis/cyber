const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add('active');
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const counters = document.querySelectorAll('.counter');
let counterStarted = false;
window.addEventListener('scroll', () => {
  const stats = document.querySelector('.stats').getBoundingClientRect().top;
  if (!counterStarted && stats < window.innerHeight - 100) {
    counterStarted = true;
    counters.forEach((counter) => {
      const target = +counter.dataset.target;
      let value = 0;
      const increment = Math.max(1, Math.ceil(target / 50));
      const update = () => {
        value += increment;
        if (value >= target) value = target;
        counter.textContent = value;
        if (value < target) requestAnimationFrame(update);
      };
      update();
    });
  }
});

const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
document.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('show')));

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 500 ? 'block' : 'none';
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const quizData = [
  { q: 'Що таке фішинг?', a: ['Метод шифрування', 'Шахрайство для викрадення даних', 'Тип антивірусу'], c: 1 },
  { q: 'Що найкраще захищає акаунт?', a: ['Один простий пароль', '2FA', 'Відключення оновлень'], c: 1 },
  { q: 'Ransomware — це...', a: ['Програма-вимагач', 'Пошукова система', 'Брандмауер'], c: 0 },
  { q: 'DDoS-атака спрямована на...', a: ['Покращення швидкості сайту', 'Перевантаження сервісу', 'Створення резервної копії'], c: 1 },
  { q: 'Який пароль безпечніший?', a: ['12345678', 'qwerty', 'A!m9_kT#72'], c: 2 },
  { q: 'Соціальна інженерія базується на...', a: ['Психологічному впливі', 'Лише апаратному збої', 'Випадковості'], c: 0 },
  { q: 'Що робити з підозрілим листом?', a: ['Відкрити вкладення', 'Переслати всім', 'Видалити або перевірити відправника'], c: 2 },
  { q: 'NotPetya найбільше запам’яталась як...', a: ['Гра', 'Руйнівна кібератака', 'Антивірус'], c: 1 },
  { q: 'Навіщо оновлювати ПЗ?', a: ['Щоб закривати вразливості', 'Щоб витрачати трафік', 'Без причини'], c: 0 },
  { q: 'Крадіжка особистих даних може призвести до...', a: ['Фінансових втрат', 'Покращення кредитної історії', 'Збільшення безпеки'], c: 0 }
];

let current = 0;
let score = 0;
const quizBox = document.getElementById('quiz-box');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');

function renderQuestion() {
  const item = quizData[current];
  quizBox.innerHTML = `<h3>${current + 1}. ${item.q}</h3>`;
  item.a.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = option;
    btn.onclick = () => {
      document.querySelectorAll('.quiz-option').forEach((b) => (b.disabled = true));
      if (i === item.c) {
        score++;
        btn.style.borderColor = '#1aff9b';
      } else {
        btn.style.borderColor = '#ff4a7a';
      }
    };
    quizBox.appendChild(btn);
  });
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < quizData.length) {
    renderQuestion();
  } else {
    quizBox.innerHTML = '';
    nextBtn.style.display = 'none';
    const grade = score >= 9 ? 'Відмінно' : score >= 7 ? 'Добре' : score >= 5 ? 'Задовільно' : 'Потрібно повторити матеріал';
    result.textContent = `Ваш результат: ${score} / ${quizData.length}. Оцінка знань: ${grade}.`;
  }
});

renderQuestion();

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

document.querySelectorAll('.gallery-grid img').forEach((img) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});
closeLightbox.addEventListener('click', () => (lightbox.style.display = 'none'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});
