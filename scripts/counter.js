// counter.js
function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days*864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
function generateRandomId() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
function getOrCreateUserId() {
  let userId = localStorage.getItem('userId') || getCookie('userId');
  if (!userId) {
    userId = generateRandomId();
  }
  localStorage.setItem('userId', userId);
  setCookie('userId', userId, 365);
  return userId;
}
function getFingerprint() {
  // Лёгкая версия, можно заменить на fingerprintjs
  return [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    `${window.screen.width}x${window.screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ].join('||');
}
let startTime = Date.now();
let clickCount = 0;
let sessionEvents = [];
function sendEvent(eventType, extra = {}) {
  const userId = getOrCreateUserId();
  const fingerprint = getFingerprint();
  const url = window.location.href;
  const referrer = document.referrer;
  const screen = `${window.screen.width}x${window.screen.height}`;
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const platform = navigator.platform;
  const browser = navigator.userAgent;
  const date = new Date().toISOString();
    let event = {
    userId, fingerprint, action: eventType, url, referrer,
    date, screen, language, timezone, platform, browser,
    clickCount, ...extra
  };
  sessionEvents.push({ action: eventType, timestamp: Date.now() });
  navigator.sendBeacon('https://stats.artfixpro.com/collect', JSON.stringify(event));
}
window.addEventListener('load', () => sendEvent('pageview'));
window.addEventListener('beforeunload', () => sendEvent('unload'));
// window.addEventListener('click', () => { clickCount++; sendEvent('click'); });

// Пример: отслеживание открытия модального окна
window.openModal = function(modalName) {
  sendEvent('modal-open', { modalName });
};
// Пример: отслеживание отправки формы
window.formSubmit = function(formName) {
  sendEvent('form-submit', { formName });
};

// Отдельно считаем время на странице до первого действия (например, click, modal-open, form-submit)
let firstActionTime = null;
['click', 'modal-open', 'form-submit'].forEach(ev => {
  document.addEventListener(ev, function onceFirstAction() {
    if (!firstActionTime) {
      firstActionTime = Date.now();
      // Можно отправить спец-событие, если нужно
      // sendEvent('first-action', { duration: firstActionTime - startTime });
    }
    document.removeEventListener(ev, onceFirstAction, true);
  }, true);
});
