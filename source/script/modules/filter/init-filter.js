document.addEventListener("DOMContentLoaded", () => {
  function loadJSON(callback) {
    fetch("/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function fillCard(card, data) {
    card.querySelector(".product-card__label").textContent = data.label;
    card.querySelector(".product-card__title").textContent = data.title;
    card.querySelector(".product-card__img").src = data.src;
    card.querySelector(".product-card__img").alt = data.alt;
    card.querySelector(".product-card__date").textContent = data.date;
    card.querySelector(".product-card__shadow-link").href = data.href;
    if (data.hit) {
      card.querySelector(".product-card__hit").style.display = "block";
    } else {
      card.querySelector(".product-card__hit").style.display = "none";
    }
    if (data.classes && data.classes.length > 0) {
      data.classes.forEach(function (className) {
        card.querySelector(".product-card").classList.add(className);
      });
    }
  }

  function createCard(data) {
    let template = document.querySelector(".template-project-card");
    let card = template.content.cloneNode(true);
    fillCard(card, data);
    return card;
  }

  function renderCards(data) {
    let list = document.querySelector(".courses__list");
    list.innerHTML = "";
    data.forEach(function (item) {
      let card = createCard(item);
      list.appendChild(card);
    });
    list.classList.add("is-active");
  }

  loadJSON(function (data) {
    renderCards(data);
  });
});
