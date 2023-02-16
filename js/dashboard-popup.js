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
  element.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  });
  element.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });
  element.addEventListener(`dragover`, (evt) => {
    // Разрешаем сбрасывать элементы в эту область
    evt.preventDefault();

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
  });
});

// const allWalletsDrag = document.querySelector(`.all-wallets__drag`);
// const walletsItems = allWalletsDrag.querySelectorAll(`.wallets__item`);

// for (const wallet of walletsItems) {
//   wallet.draggable = true;
// }

// allWalletsDrag.addEventListener(`dragstart`, (evt) => {
//   evt.target.classList.add(`selected`);
// });

// allWalletsDrag.addEventListener(`dragend`, (evt) => {
//   evt.target.classList.remove(`selected`);
// });

// allWalletsDrag.addEventListener(`dragover`, (evt) => {
//   // Разрешаем сбрасывать элементы в эту область
//   evt.preventDefault();

//   // Находим перемещаемый элемент
//   const activeElement = allWalletsDrag.querySelector(`.selected`);
//   // Находим элемент, над которым в данный момент находится курсор
//   const currentElement = evt.target;
//   // Проверяем, что событие сработало:
//   // 1. не на том элементе, который мы перемещаем,
//   // 2. именно на элементе списка
//   const isMoveable =
//     activeElement !== currentElement &&
//     currentElement.classList.contains(`wallets__item`);

//   // Если нет, прерываем выполнение функции
//   if (!isMoveable) {
//     return;
//   }

//   // Находим элемент, перед которым будем вставлять
//   const nextElement =
//     currentElement === activeElement.nextElementSibling
//       ? currentElement.nextElementSibling
//       : currentElement;

//   let parent = activeElement.parentElement;
//   console.log(123);
//   // Вставляем activeElement перед nextElement
//   parent.insertBefore(activeElement, nextElement);
// });

// Ховер у попапа с кошельками
const wallets = document.querySelector("#wallets");
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
      children.classList.toggle("active");
      event.stopPropagation();
    },
    true
  );
}
