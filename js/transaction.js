$(document).ready(function () {
  $(".slide-table").click(function name(event) {
    $(this).toggleClass("active").next().toggleClass("active");
  });
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

const dropdownBtn = document.querySelector(".transaction-chart__dropdown");
dropdownBtn.onclick = () => {
  dropdownBtn.classList.toggle("active");
  document.getElementById("dropdown-transaction").classList.toggle("active");
};

// Close the dropdown menu if the user clicks outside of it
document.onclick = function (event) {
  if (!event.target.matches(".transaction-chart__dropdown")) {
    let dropdowns = Array.from(
      document.getElementsByClassName("dropdown-content")
    );
    dropdowns.forEach((el) => {
      el.classList.remove("active");
    });
    dropdownBtn.classList.remove("active");
  }
};
