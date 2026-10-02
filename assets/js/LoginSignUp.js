(() => {
  const body = document.body;
  const scene = document.getElementById('scene');
  const wave = document.getElementById('shockwave');
  const card = document.getElementById('card');
  const panes = {
    login: document.getElementById('pane-login'),
    signup: document.getElementById('pane-signup'),
  };
  const tabs = document.querySelectorAll('.tabs [data-mode-target]');
  let spin = 0;
  let mode = null;

  function retrigger(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth; // restart the animation
    el.classList.add(cls);
  }

  function setMode(next, instant = false) {
    if (next === mode) return;
    const first = mode === null;
    mode = next;

    body.dataset.mode = next;
    spin += next === 'signup' ? 120 : -120;
    scene.style.setProperty('--spin', spin + 'deg');

    tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.modeTarget === next)));

    Object.entries(panes).forEach(([key, pane]) => {
      const active = key === next;
      pane.classList.toggle('is-active', active);
      pane.toggleAttribute('inert', !active);
      pane.setAttribute('aria-hidden', String(!active));
    });

    if (!first && !instant) {
      retrigger(wave, 'go');
      retrigger(card, 'jolt');
    }

    history.replaceState(null, '', next === 'signup' ? '#signup' : '#login');
  }

  // Tabs and "switch" links
  document.querySelectorAll('[data-mode-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.modeTarget);
      setTimeout(() => {
        const input = panes[mode].querySelector('input');
        if (input) input.focus({ preventScroll: true });
      }, 700);
    });
  });

  // Show / hide password
  document.querySelectorAll('.peek').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Hide' : 'Show';
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  // Form handling (front-end only for now)
  document.querySelectorAll('form').forEach(form => {
    const note = form.querySelector('.form-note');
    const inputs = [...form.querySelectorAll('input')];

    inputs.forEach(i => i.addEventListener('input', () => {
      i.classList.remove('is-invalid');
      note.textContent = '';
    }));

    form.addEventListener('submit', e => {
      e.preventDefault();
      note.className = 'form-note';

      const empty = inputs.find(i => !i.value.trim());
      if (empty) {
        empty.classList.add('is-invalid');
        empty.focus();
        note.textContent = 'Please fill in every field.';
        return;
      }

      if (form.dataset.form === 'signup') {
        const email = form.elements.email;
        if (!/^\S+@\S+\.\S+$/.test(email.value)) {
          email.classList.add('is-invalid');
          email.focus();
          note.textContent = 'Enter a valid email address.';
          return;
        }
        if (form.elements.password.value !== form.elements.confirm.value) {
          form.elements.confirm.classList.add('is-invalid');
          form.elements.confirm.focus();
          note.textContent = 'Passwords do not match.';
          return;
        }
      }

      // TODO: connect to your backend here.
      note.classList.add('ok');
      note.textContent = form.dataset.form === 'signup'
        ? 'Account created (demo). Connect a backend to save it.'
        : 'Logged in (demo). Connect a backend to verify it.';
    });
  });

  // Start on #signup if linked directly, otherwise login
  setMode(location.hash === '#signup' ? 'signup' : 'login', true);
  spin = 0;
  scene.style.setProperty('--spin', '0deg');
})();