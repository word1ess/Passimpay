const transferBlocks = Array.from(document.querySelectorAll(".transfer-block"));
const transferLinks = Array.from(document.querySelectorAll("._transfer-link"));

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
  exchangeId.style.display = "none";

  // Первая кнопка - Отправить
  exchangeLink.onclick = () => {
    exchangeBlocks[0].style.display = "none";
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
        break;
      case 2:
        exchangeStatus[0].classList.remove("loading");
        exchangeStatus[0].classList.add("success");
        exchangeStatusText = "Завершено";
        exchangeIcon.classList.remove("animation-playing");
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
      <img src="svg/loading.svg" alt="">
    `;
    exchangeIcon.classList.add("animation-playing");
    exchangeBlocks[1].style.display = "none";
    exchangeStatus[0].classList.remove("success");
    exchangeRight.style.display = "block";
    exchangeBlocks[0].style.display = "block";
    exchangeStatus[0].innerHTML = "Ожидание депозита";
    index = 0;
  };
}
// Общие стили для переключения табов
function nav(blocks, links) {
  if (links[0]) {
    links[0].classList.add("active");
    blocks[0].style.display = "block";

    links.forEach((link) => {
      link.addEventListener("click", toggleActiveBlock);
    });

    function toggleActiveBlock() {
      hideAllBlock(links, blocks);
      let index = links.indexOf(this);
      this.classList.add("active");
      blocks[index].style.display = "block";
    }
    function hideAllBlock(linksArr, blocksArr) {
      linksArr.forEach((link) => {
        link.classList.remove("active");
      });
      blocksArr.forEach((block) => {
        block.style.display = "none";
      });
    }
  }
}

nav(transferBlocks, transferLinks);
