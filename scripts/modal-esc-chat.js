// Обработка Esc — закрытие любых модальных окон по клавише Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Закрытие overlay-модалок
    const plansOverlay = document.getElementById("plansOverlay");
    const bookingOverlay = document.getElementById("bookingFormOverlay");

    if (plansOverlay && !plansOverlay.classList.contains("hidden")) {
      plansOverlay.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
    if (bookingOverlay && !bookingOverlay.classList.contains("hidden")) {
      bookingOverlay.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  }
});

// toggleChatMenu — открытие/закрытие меню чата
function toggleChatMenu() {
  const menu = document.getElementById('chat-menu-items');
  const chatIcon = document.getElementById('chat-icon');
  const closeIcon = document.getElementById('close-icon');
  const tooltip = document.getElementById('tooltip-toggle');

  const isOpening = menu.classList.contains('hidden');

  menu.classList.toggle('hidden');
  chatIcon.classList.toggle('icon-hidden');
  closeIcon.classList.toggle('icon-hidden');
  tooltip.textContent = isOpening ? 'Hide' : 'Chat';
}

// События Google Tag Manager для кликов на WhatsApp и SMS/телефон (делегирование)
document.addEventListener("click", function(e) {
  // WhatsApp: отслеживаем клик по ссылке на wa.me с aria-label="WhatsApp"
  if (e.target.closest('a[href^="https://wa.me/"][aria-label="WhatsApp"]')) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "WhatsApp button" });
    if (typeof window.sendEvent === 'function') {
      window.sendEvent('whatsapp-click');
    }
  }

  // SMS или телефон: отслеживаем клик по sms: ссылке
  if (e.target.closest('a[href^="sms:"]')) {
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "phoneClick" });
    if (typeof window.sendEvent === 'function') {
      window.sendEvent('sms-click');
    }
  }
});

// Обработка кнопок телефона и почта в навигации
document.addEventListener('DOMContentLoaded', function() {
  // Десктопные копии
  document.querySelectorAll('.nav_contact_links .copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Сначала убираем у всех .copy-btn
      document.querySelectorAll('.nav_contact_links .copy-btn').forEach(b => b.classList.remove('copied'));
      const value = btn.getAttribute('data-copy');
      btn.classList.add('copied');
      navigator.clipboard.writeText(value).then(function() {
        setTimeout(function() {
          btn.classList.remove('copied');
          btn.blur();
        }, 1200);
      });
    });
  });

  // Мобильные копии
  document.querySelectorAll('.nav_mobile_link .copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll('.nav_mobile_link .copy-btn').forEach(b => b.classList.remove('copied'));
      const href = btn.closest('.nav_mobile_link').getAttribute('href');
      let value = '';
      if (href.startsWith('tel:')) value = href.replace('tel:', '');
      else if (href.startsWith('mailto:')) value = href.replace('mailto:', '');
      btn.classList.add('copied');
      navigator.clipboard.writeText(value).then(function() {
        setTimeout(function(){
          btn.classList.remove('copied');
          btn.blur();
        }, 1000);
      });
    });
  });
});