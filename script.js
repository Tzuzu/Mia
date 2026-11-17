function initDropdowns() {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');

  const closeAll = () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  };

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(':scope > a');

    toggle.addEventListener('click', event => {
      event.preventDefault();
      const wasOpen = dropdown.classList.contains('open');

      closeAll();
      if (!wasOpen) dropdown.classList.add('open');
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdown')) closeAll();
  });
}

function initCopyLinks() {
  document.querySelectorAll('[data-copy]').forEach(link => {
    const originalText = link.textContent;

    link.addEventListener('click', async event => {
      event.preventDefault();

      try {
        await navigator.clipboard.writeText(link.dataset.copy);
        link.textContent = 'Copied!';
      } catch (error) {
        link.textContent = 'Copy failed';
      }

      setTimeout(() => {
        link.textContent = originalText;
      }, 1500);
    });
  });
}

function initAgeGate() {
  const links     = document.querySelectorAll('.age-link');
  const dialog    = document.getElementById('age-dialog');
  const confirmBtn = document.getElementById('age-confirm');
  const cancelBtn  = document.getElementById('age-cancel');

  let pendingUrl = null;

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      pendingUrl = link.href;
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

initDropdowns();
initCopyLinks();
initAgeGate();