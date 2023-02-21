$(document).ready(function () {
  $(".slide-table").click(function name(event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
});
