/**
 * LocalYatra — Toast Notification Manager
 * Accessible, lightweight toast alerts with auto-dismiss and screen-reader polite announcement.
 */

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'info', durationMs = 4000) {
  const container = ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');

  const iconMap = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <span aria-hidden="true" style="font-weight: 700; color: currentColor;">${iconMap[type] || 'ℹ'}</span>
    <div class="toast-content">${message}</div>
    <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  let timeoutId = null;

  const dismiss = () => {
    if (timeoutId) clearTimeout(timeoutId);
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s ease-out';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 200);
  };

  closeBtn.addEventListener('click', dismiss);

  if (durationMs > 0) {
    timeoutId = setTimeout(dismiss, durationMs);
  }

  container.appendChild(toast);
  return { dismiss };
}
