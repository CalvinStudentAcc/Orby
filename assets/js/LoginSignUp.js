(() => {
  "use strict";

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const body = document.body;
  const scene = document.getElementById("scene");
  const wave = document.getElementById("shockwave");
  const card = document.getElementById("card");
  const panesContainer = document.querySelector(".panes");

  const panes = {
    login: document.getElementById("pane-login"),
    signup: document.getElementById("pane-signup")
  };

  const tabs = document.querySelectorAll(
    ".tabs [data-mode-target]"
  );

  let spin = 0;
  let mode = null;
  let resizeFrame = 0;


  /* =========================================================
     ANIMATION HELPER
     ========================================================= */

  function retrigger(element, className) {
    if (!element) return;

    element.classList.remove(className);

    // Force a reflow so the animation can start again.
    void element.offsetWidth;

    element.classList.add(className);
  }


  /* =========================================================
     ACTIVE PANE HEIGHT
     ========================================================= */

  function syncPaneHeight(paneKey = mode) {
    if (!panesContainer || !panes[paneKey]) {
      return;
    }

    const activePane = panes[paneKey];

    // scrollHeight measures the form's content without depending
    // on the current animated height of the .panes container.
    const targetHeight = Math.ceil(activePane.scrollHeight);

    if (targetHeight > 0) {
      panesContainer.style.height = `${targetHeight}px`;
    }
  }


  /* =========================================================
     SWITCH BETWEEN LOGIN AND SIGN UP
     ========================================================= */

  function setMode(next, instant = false) {
    if (!panes[next]) return;
    if (next === mode) return;

    const isFirstLoad = mode === null;

    mode = next;

    body.dataset.mode = next;

    // Rotate the orbital backdrop on actual mode changes.
    if (!isFirstLoad) {
      spin += next === "signup" ? 120 : -120;
    }

    if (scene) {
      scene.style.setProperty("--spin", `${spin}deg`);
    }

    // Update the tab selection.
    tabs.forEach(tab => {
      const selected = tab.dataset.modeTarget === next;

      tab.setAttribute(
        "aria-selected",
        String(selected)
      );
    });

    // Activate one form and deactivate the other.
    Object.entries(panes).forEach(([key, pane]) => {
      const active = key === next;

      pane.classList.toggle("is-active", active);

      pane.toggleAttribute("inert", !active);

      pane.setAttribute(
        "aria-hidden",
        String(!active)
      );
    });

    // Measure the new form after updating its active state.
    if (isFirstLoad || instant) {
      // Skip the initial 0px-to-content height animation.
      panesContainer.classList.remove("is-ready");

      syncPaneHeight(next);

      requestAnimationFrame(() => {
        syncPaneHeight(next);

        requestAnimationFrame(() => {
          panesContainer.classList.add("is-ready");
        });
      });
    } else {
      // The .is-ready class enables the CSS height transition.
      syncPaneHeight(next);

      retrigger(wave, "go");
      retrigger(card, "jolt");
    }

    // Only update the URL after a user switches modes.
    if (!isFirstLoad) {
      history.replaceState(
        null,
        "",
        next === "signup" ? "#signup" : "#login"
      );
    }
  }


  /* =========================================================
     TAB AND SWITCH BUTTONS
     ========================================================= */

  document.querySelectorAll("[data-mode-target]").forEach(button => {
    button.addEventListener("click", () => {
      const next = button.dataset.modeTarget;

      if (next === mode) return;

      setMode(next);

      // Focus the new form after the transition starts.
      window.setTimeout(() => {
        const input = panes[next]?.querySelector("input");

        if (input && mode === next) {
          input.focus({ preventScroll: true });
        }
      }, 350);
    });
  });


  /* =========================================================
     SHOW / HIDE PASSWORD
     ========================================================= */

  document.querySelectorAll(".peek").forEach(button => {
    button.addEventListener("click", () => {
      const field = button.closest(".field");
      const input = field?.querySelector("input");

      if (!input) return;

      const showPassword = input.type === "password";

      input.type = showPassword ? "text" : "password";
      button.textContent = showPassword ? "Hide" : "Show";

      button.setAttribute(
        "aria-label",
        showPassword ? "Hide password" : "Show password"
      );
    });
  });


  /* =========================================================
     FORM VALIDATION
     Front-end only. No account is saved or authenticated.
     ========================================================= */

  document.querySelectorAll("form[data-form]").forEach(form => {
    const note = form.querySelector(".form-note");

    const inputs = [
      ...form.querySelectorAll("input")
    ];

    // Clear previous error states while the user edits a field.
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        input.classList.remove("is-invalid");

        if (note) {
          note.textContent = "";
          note.classList.remove("ok");
        }
      });
    });

    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!note) return;

      note.className = "form-note";
      note.textContent = "";

      // Required field validation.
      const emptyInput = inputs.find(input => {
        return !input.value.trim();
      });

      if (emptyInput) {
        emptyInput.classList.add("is-invalid");
        emptyInput.focus();

        note.textContent = "Please fill in every field.";
        return;
      }

      // Signup validation.
      if (form.dataset.form === "signup") {
        const email = form.elements.email;
        const password = form.elements.password;
        const confirm = form.elements.confirm;

        // Basic email format check.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
          email.classList.add("is-invalid");
          email.focus();

          note.textContent = "Enter a valid email address.";
          return;
        }

        // Confirm that both password fields match.
        if (password.value !== confirm.value) {
          confirm.classList.add("is-invalid");
          confirm.focus();

          note.textContent = "Passwords do not match.";
          return;
        }
      }

      // Demo feedback only. A backend is still required.
      note.classList.add("ok");

      note.textContent =
        form.dataset.form === "signup"
          ? "Validation successful. Backend connection pending."
          : "Fields validated. Backend authentication pending.";
    });
  });


  /* =========================================================
     RESPONSIVE HEIGHT UPDATES
     ========================================================= */

  function scheduleHeightUpdate() {
    cancelAnimationFrame(resizeFrame);

    resizeFrame = requestAnimationFrame(() => {
      syncPaneHeight();
    });
  }

  // Recalculate wrapping and form height when viewport width changes.
  window.addEventListener("resize", scheduleHeightUpdate);

  // Recalculate if fonts or other content change the active form size.
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(() => {
      scheduleHeightUpdate();
    });

    Object.values(panes).forEach(pane => {
      const inner = pane.querySelector(".pane__inner");

      if (inner) {
        observer.observe(inner);
      }
    });
  }


  /* =========================================================
     INITIAL MODE
     ========================================================= */

  const initialMode =
    window.location.hash === "#signup"
      ? "signup"
      : "login";

  setMode(initialMode, true);

})();