const transferBlocks = Array.from(document.querySelectorAll(".transfer-block"));
const transferLinks = Array.from(document.querySelectorAll("._transfer-link"));
const transferSteps = Array.from(
  document.querySelectorAll(".transfer-block__step")
);
const transferBlockLinks = Array.from(
  document.querySelectorAll(".transfer-block__link")
);
const transferBlockBlocks = Array.from(
  document.querySelectorAll(".border_block")
);
const exchangeBlocks = Array.from(document.querySelectorAll(".exchange-block"));
const exchangeBlocksBottom = Array.from(
  document.querySelectorAll(".exchange-block__bottom")
);
const exchangeIcon = document.querySelector(".exchange-block__top-animation");
const exchangeStatus = Array.from(
  document.getElementsByClassName("exchange-block__top-status")
);
const exchangeBack = document.querySelector("#exchange-back");
const exchangeId = document.querySelector("#exchange-id");
const exchangeRight = document.querySelector("#withdraw_right");
const exchangeLink = document.querySelector("._exchange-link");
const exchangeLinkSecond = document.querySelector("._exchange-link-second");
// Здесь тоже самое, что и в верстке - только для демоснтрации разных блоков
if (exchangeLink) {
  exchangeBlocks[0].style.display = "flex";
  transferSteps[0].classList.add("active");
  exchangeId.style.display = "none";

  // Первая кнопка - Отправить
  exchangeLink.onclick = () => {
    exchangeBlocks[0].style.display = "none";
    transferSteps[0].classList.remove("active");
    transferSteps[1].classList.add("active");
    exchangeBlocks[1].style.display = "block";
    exchangeBlocksBottom[0].style.display = "block";
  };
  // Кнопка для демонстрации верстки
  exchangeLinkSecond.addEventListener("click", exchangeClick);
  let index = 0;
  let exchangeStatusText = "Ожидание депозита";
  function exchangeClick(e) {
    exchangeBlocksBottom[index].style.display = "none";
    exchangeBlocksBottom[index + 1].style.display = "block";
    transferSteps[index + 1].classList.remove("active");
    transferSteps[index + 2].classList.add("active");
    index += 1;

    switch (index) {
      // Здесб провряем счетчик слайда и добавляем нужный контент
      case 0:
        break;
      case 1:
        exchangeStatusText = "Подтверждение депозита";
        exchangeRight.style.display = "none";
        exchangeId.style.display = "flex";
        exchangeStatus[0].classList.add("loading");
        transferSteps[1].style.display = "none";
        break;
      case 2:
        exchangeStatus[0].classList.remove("loading");
        exchangeStatus[0].classList.add("success");
        exchangeStatusText = "Завершено";
        exchangeIcon.classList.remove("animation-playing");
        exchangeIcon.classList.remove("follow-the-leader");
        exchangeIcon.innerHTML = `
          <img src="svg/success.svg" alt="">
        `;
        break;

      default:
        break;
    }
    exchangeStatus[0].innerHTML = exchangeStatusText;
  }

  // Кнопка вернуться на первый экран "Обмен валют"

  exchangeBack.onclick = () => {
    exchangeBlocksBottom[index].style.display = "none";
    exchangeId.style.display = "none";
    exchangeIcon.innerHTML = `
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    `;
    exchangeIcon.classList.add("animation-playing");
    exchangeIcon.classList.add("follow-the-leader");
    exchangeBlocks[1].style.display = "none";
    exchangeStatus[0].classList.remove("success");
    exchangeRight.style.display = "block";
    exchangeBlocks[0].style.display = "block";
    exchangeStatus[0].innerHTML = "Ожидание депозита";
    transferSteps[1].style.display = "block";
    transferSteps[0].classList.add("active");
    transferSteps[3].classList.remove("active");
    index = 0;
  };
}
// Общие стили для переключения табов
function nav(blocks, links, activeClass, secondClass = "") {
  if (links[0]) {
    links[0].classList.add(activeClass);
    blocks[0].style.display = "block";

    links.forEach((link) => {
      link.addEventListener("click", toggleActiveBlock);
    });

    function toggleActiveBlock() {
      hideAllBlock(links, blocks);
      let index = links.indexOf(this);
      this.classList.add(activeClass);
      blocks[index].style.display = "block";

      links.forEach((link) => {
        if (link != this) {
          link.classList.add(secondClass);
        }
      });
    }

    function hideAllBlock(linksArr, blocksArr) {
      linksArr.forEach((link) => {
        link.classList.remove(activeClass);
      });
      blocksArr.forEach((block) => {
        block.style.display = "none";
      });
    }
  }
  if (transferLinks[0].classList.contains("border_title")) {
    document.querySelector("#withdraw-info-first").style.display = "flex";
    document.querySelector("#withdraw-info-second").style.display = "none";
  } else {
    document.querySelector("#withdraw-info-second").style.display = "flex";
    document.querySelector("#withdraw-info-first").style.display = "none";
  }
}

nav(transferBlocks, transferLinks, "active");
nav(
  transferBlockBlocks,
  transferBlockLinks,
  "border_title",
  "exchange-block__item"
);

// Чекбокс и статус защищенности
const checkBoxVpm = document.querySelector("#check-vpm");
const vpmStatus = document.querySelector(".vpm-volatility__status");

if (checkBoxVpm) {
  let vpbStatusChildren = Array.from(vpmStatus.children);
  vpbStatusChildren[0].classList.add("active");

  checkBoxVpm.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("checkbox-ios-switch") ||
      e.target.classList.contains("checkbox-ios")
    ) {
      checkBoxVpm.classList.toggle("active");
      vpbStatusChildren.forEach((el) => {
        el.classList.toggle("active");
      });
    }
  });
}

// slider

const rangeValue = document.querySelector("#rangeValue");

function rangeSlide(value) {
  rangeValue.innerHTML = `${value}%`;
}
