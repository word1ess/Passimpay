// Слайд у кошельков
$(document).ready(function () {
  $(".wallets__show").click(function name(event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
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
  wallets.addEventListener("mouseover", () => {
    walletsHover.classList.add("active");
  });
  wallets.addEventListener("mouseout", () => {
    walletsHover.classList.remove("active");
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
