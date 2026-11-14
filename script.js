/* ==========================================================================
   Navbar dropdowns (tap to open on touch devices)
   ========================================================================== */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');

  const closeAll = () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  };

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(':scope > a');

    toggle.addEventListener('click', event => {
      event.preventDefault();                       // stop the "#" jump
      const wasOpen = dropdown.classList.contains('open');

      closeAll();                                   // only one menu open at a time
      if (!wasOpen) dropdown.classList.add('open');
    });
  });

  // Tapping anywhere outside a dropdown closes them all
  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdown')) closeAll();
  });
}

/* ==========================================================================
   Click-to-copy (Apple Pay email)
   ========================================================================== */
function initCopyLinks() {
  const copyLinks = document.querySelectorAll('[data-copy]');

  copyLinks.forEach(link => {
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


/* ==========================================================================
   Age warning dialog
   ========================================================================== */
function initAgeGate() {
  const links   = document.querySelectorAll('.age-link');
  const dialog  = document.getElementById('age-dialog');
  const confirm = document.getElementById('age-confirm');
  const cancel  = document.getElementById('age-cancel');

  let pendingUrl = null;                            // the link that was clicked

  // Show the warning instead of following the link
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      pendingUrl = link.href;
      dialog.showModal();
    });
  });

  // Confirmed: continue to the clicked link
  confirm.addEventListener('click', () => {
    if (pendingUrl) window.location.href = pendingUrl;
  });

  // Declined: close the warning
  cancel.addEventListener('click', () => dialog.close());

  // Closed by any method (Exit button, Esc key): forget the link
  dialog.addEventListener('close', () => {
    pendingUrl = null;
  });
}


/* ==========================================================================
   Start everything
   ========================================================================== */
initDropdowns();
initAgeGate();
initDropdowns();
initAgeGate();
initCopyLinks();