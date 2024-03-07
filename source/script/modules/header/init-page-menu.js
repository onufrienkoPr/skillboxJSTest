document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector("[data-sandwich]");
  const mainNav = document.querySelector("[data-main-nav]");
  const logo = document.querySelector("[data-header-logo]");
  const navItems = document.querySelectorAll(".main-nav__item");

  const resetMenuItems = () => {
    navItems.forEach((item) => {
      item.style.transitionDelay = "0s";
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
    });
  };

  const closeMenu = () => {
    burgerButton.classList.remove("is-active");
    mainNav.classList.remove("is-active");
    document.body.classList.remove("scroll-lock");
    logo.classList.remove("is-menu");
    resetMenuItems();
  };

  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("is-active");
    mainNav.classList.toggle("is-active");
    document.body.classList.toggle("scroll-lock");
    logo.classList.toggle("is-menu");

    if (window.innerWidth < 1023) {
      if (mainNav.classList.contains("is-active")) {
        resetMenuItems();

        let delay = 0;
        navItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }, delay);
          delay += 100;
        });
      } else {
        resetMenuItems();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (!mainNav.classList.contains("is-active")) {
      navItems.forEach((item) => {
        item.style.opacity = "1";
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
