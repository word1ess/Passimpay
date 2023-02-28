// Слайд у кошельков
$("body").delegate(".wallets__show", "click", function (event) {
  if ($(event.target).closest(".wallets__btns").length) return;
  $(this).toggleClass("active").next().slideToggle(300);
  event.stopImmediatePropagation();
});

// Перемещение у кошельков
const tasksListElement = Array.from(
  document.querySelectorAll(`.wallets__slide`)
);

tasksListElement.forEach((element) => {
  const taskElements = Array.from(
    element.querySelectorAll(`.slide-wallets__input`)
  );
  for (const task of taskElements) {
    task.draggable = true;
  }
  element.addEventListener(
    `dragstart`,
    (evt) => {
      evt.target.classList.add(`selected`);
      evt.stopImmediatePropagation();
    },
    true
  );
  element.addEventListener(
    `dragend`,
    (evt) => {
      evt.target.classList.remove(`selected`);
      evt.stopImmediatePropagation();
    },
    true
  );
  element.addEventListener(
    `dragover`,
    (evt) => {
      // Разрешаем сбрасывать элементы в эту область
      evt.preventDefault();
      evt.dataTransfer.dropEffect = "move";
      // Находим перемещаемый элемент
      const activeElement = element.querySelector(`.selected`);
      // Находим элемент, над которым в данный момент находится курсор
      const currentElement = evt.target;
      // Проверяем, что событие сработало:
      // 1. не на том элементе, который мы перемещаем,
      // 2. именно на элементе списка
      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains(`slide-wallets__input`);

      // Если нет, прерываем выполнение функции
      if (!isMoveable) {
        return;
      }

      // Находим элемент, перед которым будем вставлять
      const nextElement =
        currentElement === activeElement.nextElementSibling
          ? currentElement.nextElementSibling
          : currentElement;

      // Вставляем activeElement перед nextElement
      let parent = activeElement.parentElement;
      parent.insertBefore(activeElement, nextElement);
      evt.stopImmediatePropagation();
    },
    true
  );
});

const allWalletsDrag = document.querySelector(`.all-wallets__drag`);

if (allWalletsDrag) {
  const walletsItems = allWalletsDrag.querySelectorAll(`.wallets__item`);
  for (const wallet of walletsItems) {
    wallet.draggable = true;
  }
  allWalletsDrag.addEventListener(
    `dragstart`,
    (evt) => {
      evt.target.classList.add(`selected`);
      evt.stopImmediatePropagation();
      evt.target.style.cursor = "move";
    },
    true
  );

  allWalletsDrag.addEventListener(
    `dragend`,
    (evt) => {
      evt.target.classList.remove(`selected`);
      evt.stopImmediatePropagation();
      evt.target.style.cursor = "default";
    },
    true
  );

  allWalletsDrag.addEventListener(
    `dragover`,
    (evt) => {
      // Разрешаем сбрасывать элементы в эту область
      evt.preventDefault();

      // Находим перемещаемый элемент
      const activeElement = allWalletsDrag.querySelector(`.selected`);
      // Находим элемент, над которым в данный момент находится курсор
      const currentElement = evt.target.parentElement;
      // Проверяем, что событие сработало:
      // 1. не на том элементе, который мы перемещаем,
      // 2. именно на элементе списка
      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains(`wallets__item`, "wallets__show");
      // Находим элемент, перед которым будем вставлять
      const nextElement =
        currentElement === activeElement.nextElementSibling
          ? currentElement.nextElementSibling
          : currentElement;
      // Вставляем activeElement перед nextElement
      allWalletsDrag.insertBefore(activeElement, nextElement);
      evt.stopImmediatePropagation();
    },
    true
  );
}

// Ховер у попапа с кошельками
const wallets = document.querySelector(".wallets");
if (wallets) {
  const walletsHover = document.querySelector(".wallets__hover");

  if (window.screen.width > 993) {
    hover(wallets, walletsHover);
  } else {
    click(wallets, walletsHover);
  }
}

const walletsBtn = Array.from(document.querySelectorAll(".wallets__btn"));

if (walletsBtn[0]) {
  walletsBtn.forEach((btn) => {
    hover(btn, btn);
  });
}

// Добавление активных классов в изменении кошелька
const settingsRowArr = Array.from(
  document.querySelectorAll(".create-wallet__items")
);

if (settingsRowArr[0]) {
  settingsRowArr.forEach((settingsRow) => {
    let childArr = Array.from(settingsRow.children);

    childArr.forEach((el) => {
      el.onclick = function () {
        removeAllActiveClass();
        this.classList.add("active");
      };
    });
    function removeAllActiveClass() {
      childArr.forEach((el) => {
        el.classList.remove("active");
      });
    }
  });
}

// Перенос кнопки Структура комиссий

const structureBtn = document.querySelector("#open_list_partners");

if (structureBtn && window.screen.width < 993) {
  const structureParentBlock = document.querySelector("#content-menu");
  let cloneBtn = structureBtn.cloneNode(true);
  structureBtn.style.display = "none";
  cloneBtn.style.cssText = `
    max-width: 324px;
    margin: 0 auto;
    margin-top: 20px;
  `;
  structureParentBlock.appendChild(cloneBtn);
}

function hover(parent, children) {
  parent.addEventListener("mouseover", () => {
    children.classList.add("active");
  });
  parent.addEventListener("mouseout", () => {
    children.classList.remove("active");
  });
}

function click(parent, children) {
  parent.addEventListener(
    "click",
    (event) => {
      if (
        event.target.classList.contains("balance_total") ||
        event.target.classList.contains("_wallets-img")
      ) {
        children.classList.toggle("active");
        event.stopImmediatePropagation();
      } else {
        return;
      }
    },
    { capture: true }
  );
}

const walletsHoverParent = Array.from(
  document.querySelectorAll(".wallets__show__hover")
);

if (walletsHoverParent && window.screen.width < 992) {
  walletsHoverParent.forEach((el) => {
    // el.classList.add("wallets__show");
  });
}

const slideWalletsInput = Array.from(
  document.querySelectorAll(".slide-wallets__input__hover")
);

if (slideWalletsInput[0]) {
  slideWalletsInput.forEach((el) => {
    el.onclick = function (e) {
      if (e.target.tagName == "INPUT") {
        walletsHoverParent.forEach((el) => {
          el.classList.remove("active");
        });
        this.classList.toggle("active");
        this.parentElement.previousElementSibling.classList.add("active");
        if (slideWalletsInput.every((el) => !el.classList.contains("active"))) {
          console.log("123");

          this.parentElement.previousElementSibling.classList.remove("active");
        }
      }
    };
  });
}
