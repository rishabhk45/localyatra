/**
 * LocalYatra — Accessible Modal Helper
 * Manages modal backdrop, focus trapping, Escape key dismiss, and ARIA attributes.
 */

let activeModal = null;
let previousFocusedElement = null;

export function openModal({ title, bodyHtml, footerHtml = '', onClose = null }) {
  closeModal(); // Close any currently open modal

  previousFocusedElement = document.activeElement;

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-labelledby', 'modal-dialog-title');

  backdrop.innerHTML = `
    <div class="modal-box" role="document">
      <div class="modal-header">
        <h2 id="modal-dialog-title" class="modal-title">${title}</h2>
        <button type="button" class="modal-close" aria-label="Close dialog">&times;</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.style.overflow = 'hidden';

  // Trigger animation next tick
  requestAnimationFrame(() => {
    backdrop.classList.add('is-open');
  });

  const closeButton = backdrop.querySelector('.modal-close');
  const close = () => {
    backdrop.classList.remove('is-open');
    setTimeout(() => {
      if (backdrop.parentNode) {
        backdrop.parentNode.removeChild(backdrop);
      }
      document.body.style.overflow = '';
      if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
        previousFocusedElement.focus();
      }
      if (typeof onClose === 'function') {
        onClose();
      }
    }, 200);
    document.removeEventListener('keydown', handleKeyDown);
    activeModal = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  closeButton.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      close();
    }
  });

  document.addEventListener('keydown', handleKeyDown);

  // Set focus to the first focusable element inside the modal
  const focusable = backdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length > 0) {
    focusable[0].focus();
  }

  activeModal = { close, element: backdrop };
  return activeModal;
}

export function closeModal() {
  if (activeModal) {
    activeModal.close();
  }
}
