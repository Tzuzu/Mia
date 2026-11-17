function initCopyLinks() {
  document.querySelectorAll('[data-copy-encoded]').forEach(link => {
    const label = link.querySelector('.quick-link-label');
    const originalText = label.textContent;

    link.addEventListener('click', async event => {
      event.preventDefault();

      try {
        await navigator.clipboard.writeText(atob(link.dataset.copyEncoded));
        label.textContent = 'Copied!';
      } catch (error) {
        label.textContent = 'Copy failed';
      }

      setTimeout(() => {
        label.textContent = originalText;
      }, 1500);
    });
  });
}

function initAgeGate() {
  const links       = document.querySelectorAll('.age-link');
  const dialog      = document.getElementById('age-dialog');
  const confirmBtn  = document.getElementById('age-confirm');
  const cancelBtn   = document.getElementById('age-cancel');
  const destination = document.getElementById('age-destination');

  let pendingUrl = null;

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      pendingUrl = link.href;
      destination.textContent = new URL(link.href).hostname.replace(/^www\./, '');
      dialog.showModal();
    });
  });

  confirmBtn.addEventListener('click', () => {
    if (pendingUrl) window.location.href = pendingUrl;
  });

  cancelBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('close', () => {
    pendingUrl = null;
  });
}

initCopyLinks();
initAgeGate();