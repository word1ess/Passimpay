// Слайд у кошельков
$(document).ready(function () {
  $(".wallets__show").click(function name(event) {
    $(this).toggleClass("active").next().slideToggle(300);
    event.stopImmediatePropagation();
  }, true);
});

// Перемещение у кошельков
document.querySelectorAll(".wallets__slide").forEach((e) => {
  e.draggable = true;
  e.ondragstart = (e) => {
    e.dataTransfer.setData("id", e.target.id);
    e.target.classList.add("dragging");
  };
  e.ondragover = (e) => {
    let old = document.querySelector(".over");
    old && old.classList.remove("over");
    e.target.classList.add("over");
    e.preventDefault();
  };
  e.ondrop = (e) => {
    let old = document.querySelector(".dragging");
    old && old.classList.remove("dragging");
    old = document.querySelector(".over");
    old && old.classList.remove("over");
    let v = e.target.innerHTML;
    let fromEl = document.querySelector("#" + e.dataTransfer.getData("id"));
    e.target.innerHTML = fromEl.innerHTML;
    fromEl.innerHTML = v;
  };
});

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
  parent.addEventListener("click", (event) => {
    children.classList.toggle("active");
  });
}
