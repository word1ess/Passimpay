function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

jQuery(document).ready(function ($) {
  $("body").on("click", "[data-modal]", function () {
    if (!$("#" + $(this).data("modal")).length) return false;
    $("body").addClass("open_modal");
    if ($(this).data("modal-close")) {
      $(".modal").removeClass("show");
    }
    $("#" + $(this).data("modal")).addClass("show");
    return false;
  });

  $(document).click(function (event) {
    if ($(event.target).closest(".modalban").length) return;
    if ($(event.target).closest(".inner_modal").length) return;
    $("body").removeClass("open_modal");
    $(".modal").removeClass("show");
    event.stopPropagation();
  });
  $("body").on("click", ".btn_close_modal, .close_modal", function () {
    $(this).closest(".modal").removeClass("show");
    if (!$(".modal.show").length) {
      $("body").removeClass("open_modal");
    }
  });
  $("body").on("click", ".btn_profile", function () {
    $("body").toggleClass("open_profilemenu");
  });
  $(document).click(function (event) {
    if ($(event.target).closest(".profile_block").length) return;
    $("body").removeClass("open_profilemenu");
    event.stopPropagation();
  });

  $("body").on("click", ".currency_rates_type_btn button", function () {
    $(".currency_rates_type_btn button").removeClass("active");
    $(this).addClass("active");
    if ($(this).children().hasClass("btn_rate_list")) {
      setCookie("currencyrateslist", true, 999);
    } else {
      setCookie("currencyrateslist", false, 999);
    }
    $(".currency_rates").toggleClass("active");
    $(".currency_rates_list").toggleClass("active");
    return false;
  });

  $("body").on("click", ".currency_selected", function () {
    if ($(this).parent().hasClass("show")) {
      $(".wrp_select_currency").removeClass("show");
      $(this).parent().removeClass("show");
    } else {
      $(".wrp_select_currency").removeClass("show");
      $(this).parent().addClass("show");
    }
    return false;
  });
  $(document).click(function (event) {
    if ($(event.target).closest(".wrp_select_currency").length) return;
    $(".wrp_select_currency").removeClass("show");
    event.stopPropagation();
  });
  $("body").on("click", ".currency_list li", function () {
    var btn = $(this)
      .closest(".wrp_select_currency")
      .find(".currency_selected");
    btn.find("input").val($(this).data("id"));
    btn.find("span").html($(this).find("b").html());
    btn.find(".balance_icon").remove();
    btn.prepend($(this).find(".balance_icon").clone());
    $(".wrp_select_currency").removeClass("show");
    var code = $(this).data("code");
    if (code == "xrp" || code == "xlm" || code == "bnb_bep2") {
      $(this).closest("form").find(".tag_field").show();
      $(".warning_text_xrp").show();
    } else {
      $(this).closest("form").find(".tag_field").hide();
      $(".warning_text_xrp").hide();
    }
  });
  if ($(".currency_list li.selected").length) {
    $(".currency_list li.selected").each(function () {
      $(this).trigger("click");
    });
  }

  $("body").on("click", "#bnn_size_f .currency_list li", function () {
    var id = $(this).data("id");
    if (id) {
      $("[data-size]").hide();
      $('[data-size="' + id + '"]').show();
    } else {
      $("[data-size]").show();
    }
  });
  $("body").on("click", "#bnn_set_f .currency_list li", function () {
    var id = $(this).data("id");
    $(".bnnset").hide();
    $(".bnnset" + id).show();
  });
  $("body").on("click", "#bnn_set_lang .currency_list li", function () {
    var id = $(this).data("id");
    $("#bnnlang1, #bnnlang2").hide();
    $("#bnnlang" + id).show();
  });

  $("body").on("click", ".currency_selected_balance", function () {
    $(this).parent().toggleClass("show");
    return false;
  });
  $(document).click(function (event) {
    if ($(event.target).closest(".select_currency_balance").length) return;
    $(".select_currency_balance").removeClass("show");
    event.stopPropagation();
  });
  $("body").on("click", ".currency_list_balance li", function () {
    $(this).parent().find("li").removeClass("selected");
    $(this).addClass("selected");
    var btn = $(this)
      .closest(".select_currency_balance")
      .find(".currency_selected_balance");
    var ps = $(this).data();
    btn.find('[name="ps"]').val($(this).data("id"));
    btn.find(".icon").html($(this).find(".balance_icon").clone());
    btn.find(".name").html($(this).find(".list_name").html());
    btn.find(".name2").html($(this).find(".list_name2").html());
    $(".select_currency_balance").removeClass("show");
    if (ps.platform != "") {
      btn.find(".name").append(" <span>(" + ps.platform + ")</span>");
      btn.find(".name").next("i").show();
    } else {
      btn.find(".name").next("i").hide();
    }
    if (ps.code == "xrp" || ps.code == "xlm" || ps.code == "bnb_bep2") {
      $(".tag_field").show();
      $(".warning_text_xrp").show();
      if (
        !getCookie("xrptagmodalhide") &&
        $("#" + ps.code + "_tag_modal").length
      ) {
        $("body").addClass("open_modal");
        $("#" + ps.code + "_tag_modal").addClass("show");
      }
    } else {
      $(".tag_field").hide();
      $(".warning_text_xrp").hide();
    }
    return false;
  });
  if ($(".currency_list_balance li.selected").length) {
    $(".currency_list_balance li.selected").each(function () {
      $(this).trigger("click");
    });
  }
  $("body").on("click", ".xrp_tag_modal_hide", function () {
    $("body").removeClass("open_modal");
    $(".modal").removeClass("show");
    setCookie("xrptagmodalhide", true, 999);
    return false;
  });

  $("body").on("click", ".btn_menu", function () {
    $("body").toggleClass("openmenu");
    return false;
  });
  $(document).click(function (event) {
    if ($(event.target).closest(".menu").length) return;
    $("body").removeClass("openmenu");
    event.stopPropagation();
  });

  $("body").on("click", ".btn_modal_balance", function () {
    $("body").addClass("openbalance");
    return false;
  });
  $("body").on("click", ".close_modal_balance", function () {
    $("body").removeClass("openbalance");
    return false;
  });

  $("body").on("click", ".balance_statistics_chart_info", function () {
    if ($(window).width() > 700) return false;
    $("body").addClass("open_statistics");
    return false;
  });
  $("body").on("click", ".close_balance_statistics_list", function () {
    $("body").removeClass("open_statistics");
    return false;
  });

  $("body").delegate(".close_alert", "click", function () {
    $(this).parents(".item_alert").addClass("hide");
    return false;
  });
  $("body").delegate(".close_alert_notif", "click", function () {
    var p = $(this).parents(".notif_alert");
    p.addClass("hide");
    setTimeout(function () {
      p.remove();
    }, 300);
    return false;
  });

  if ($(".balance_statistics_item").length) {
    var total = Number($(".balance_statistics_chart_svg").data("total"));
    var svg = '<svg width="200" height="200" viewBox="0 0 34 34">';
    var dashoffset = 25;
    $(".balance_statistics_item").each(function () {
      var color = $(this).find(".bsicon").css("background-color");
      var amount = Number($(this).data("amount"));
      var percent = Math.round((amount * 100) / total);
      var dasharray = percent + " " + (100 - percent);
      if (percent > 0) {
        svg +=
          '<circle r="15.91549430918954" cx="50%" cy="50%" stroke="' +
          color +
          '" fill="none" stroke-width="3%" stroke-linecap="round" stroke-dasharray="' +
          dasharray +
          '" stroke-dashoffset="' +
          dashoffset +
          '" ></circle>';
        dashoffset = dashoffset - percent;
      }
    });
    svg += "</svg>";
    $(".balance_statistics_chart_svg").html(svg);

    $(".balance_statistics_item").hover(
      function () {
        var name = $(this).data("name");
        var balance = $(this).data("balance");
        $("#payment_name").text(name);
        $("#payment_balance").text("$" + balance);
        return false;
      },
      function () {
        $("#payment_name").text($("#payment_name").data("name"));
        $("#payment_balance").text("$" + $("#payment_balance").data("total"));
      }
    );
  }

  $(document).on(
    {
      mouseenter: function () {
        var top = $(this).offset().top;
        var left = $(this).offset().left + $(this).outerWidth() / 2;
        $("body").append(
          '<div class="tooltipfixed" style="position:absolute;z-index:1000;top:' +
            top +
            "px;left:" +
            left +
            'px;">' +
            $(this).data("title") +
            "</div>"
        );
        var t = $(".tooltipfixed");
        if (t.offset().left + t.outerWidth() > $(window).width()) {
          t.css({
            left: $(window).width() - t.outerWidth() + t.outerWidth() / 2,
          });
        }
        if (t.offset().left < 0) {
          t.css({ left: t.outerWidth() / 2 });
        }
      },
      mouseleave: function () {
        $(".tooltipfixed").remove();
      },
    },
    ".tooltip"
  );

  $("body").delegate(".copy", "click", function (event) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp
      .val($(this).find(".copy_text").text().replace(/[\t]+/g, "").trim())
      .select();
    document.execCommand("copy");
    $tmp.remove();
    copySuccess();
    rippleAnimation($(this));
    return false;
  });
  $("body").delegate(".btn_bnncopy", "click", function (event) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp
      .val(
        $(this)
          .closest(".bnn")
          .find(".copy_text")
          .text()
          .replace(/[\t]+/g, "")
          .trim()
      )
      .select();
    document.execCommand("copy");
    $tmp.remove();
    copySuccess();
  });

  $("body").delegate("#balance_edit_form", "submit", function (e) {
    e.preventDefault();
    $("#balance_edit_form").addClass("loading");
    $.ajax({
      type: "post",
      url: $(this).attr("action"),
      data: $(this).serialize(),
      success: function (data) {
        location.reload();
      },
      error: function (xhr, ajaxOptions, thrownError) {
        $("#balance_edit_form").removeClass("load");
      },
    });
    return false;
  });

  $("body").delegate(".open_block_tagref", "click", function () {
    $(".textarea_tagref").toggle();
    return false;
  });
  $("body").delegate(".textarea_tagref textarea", "keyup", function () {
    var url = $(this).data("url");
    var newUrl = url + "/" + $(this).val();
    $("#tagref").text(newUrl);
    $(".partner_link_qr img").attr("src", "/qr-code/default/" + newUrl);
    $("#tagrefimg").html(
      '&lt;img src="https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=' +
        newUrl +
        '" alt="" border="0" /&gt;'
    );
    return false;
  });

  $("body").delegate(".count_length_enter", "keyup", function () {
    $(this)
      .closest(".wrp_count_length")
      .find(".count_length")
      .text($(this).val().length);
  });

  $("body").delegate(".balance_checked_all", "click", function () {
    $(".balance_edit_list input").prop("checked", true);
    return false;
  });

  $("body").delegate(".show-pass", "click", function () {
    $(this).parent().toggleClass("showpassword");
    if ($(this).parent().hasClass("showpassword")) {
      $(this).parent().find("input").attr("type", "text");
    } else {
      $(this).parent().find("input").attr("type", "password");
    }
    return false;
  });

  $("body").on(
    "mousemove",
    ".btn, .btn2, .btn3, .btn4, .btn_close_modal, .copy_partner_link, .btn_open_list_partners, .chart_transaction_header_btn a, .balance_btn a, .lang a, .btn_all_history, .btn_download_history, .currency_selected, .wrp_calendar, .pagination_select, .pagination_pn, .pagination_item, .list_sh a, .btn_add_api, .chart_filter a, .add_support_image, .support_submit, .list_dialogs a, .addressbook_item_copy, .addressbook_item_network, .table_address_btn, .whitelist_radio label, .addressbook_item, .btn_profile, .close_alert_notif",
    function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      $(this).css({ "--x": `${x}px`, "--y": `${y}px` });
    }
  );

  $("body").delegate(
    ".btn, .btn2, .btn3, .btn4, a, .btn_profile, .btn_add_api",
    "click",
    function () {
      rippleAnimation($(this));
    }
  );

  function rippleAnimation(btn) {
    btn.find(".ripple-obj").remove();
    btn.append(
      '<svg class="ripple-obj"><use height="100" width="100" xlink:href="#ripply-scott" class="js-ripple"></use></svg>'
    );
    var ripple = btn.find(".js-ripple");
    var tl = new TimelineMax();
    (x = event.offsetX),
      (y = event.offsetY),
      (w = event.target.offsetWidth),
      (h = event.target.offsetHeight),
      (offsetX = Math.abs(w / 2 - x)),
      (offsetY = Math.abs(h / 2 - y)),
      (deltaX = w / 2 + offsetX),
      (deltaY = h / 2 + offsetY),
      (scale_ratio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));

    tl.fromTo(
      ripple,
      0.75,
      {
        x: x,
        y: y,
        transformOrigin: "50% 50%",
        scale: 0,
        opacity: 1,
        ease: Linear.easeIn,
      },
      {
        scale: scale_ratio,
        opacity: 0,
      }
    );

    return tl;
  }

  if ($("[data-time]").length) {
    var init_time = $("[data-time]").data("time").split("/");
    var d = new Date(
      parseInt(init_time[0]),
      parseInt(init_time[1]) - 1,
      parseInt(init_time[2]),
      parseInt(init_time[3]),
      parseInt(init_time[4]),
      parseInt(init_time[5])
    );
    setInterval(clock, 1000);
    function clock() {
      d.setSeconds(d.getSeconds() + 1);
      var hour = d.getHours();
      var min = d.getMinutes();
      var sec = d.getSeconds();
      $("[data-time]").html(char2(hour) + ":" + char2(min) + ":" + char2(sec));
    }
    function char2(num) {
      return (num < 10 ? "0" : "") + num;
    }
  }

  if ($(".send_code").length) {
    if (getCookie("sendtime") > 0) {
      resultSendCode($(".send_code"), getCookie("sendtime"));
    }
  }

  $(".custom_underline").each(function () {
    $(this).html(
      "<span>" + $(this).text().split(" ").join(" </span><span>") + "</span>"
    );
  });

  $("body").delegate(".help_open_menu", "click", function () {
    $("body").toggleClass("helpopen");
    return false;
  });
  $(document).click(function (event) {
    if ($(event.target).closest(".menu_help").length) return;
    $("body").removeClass("helpopen");
    event.stopPropagation();
  });
  $("body").delegate(".menu_help .parent", "click", function () {
    var active = $(this).parent().hasClass("active");
    $(".menu_help > ul > li > ul").slideUp(300);
    $(".menu_help > ul > li").removeClass("active");
    if (!active) {
      $(this).parent().addClass("active");
      $(this).siblings().slideToggle(300);
    }
    return false;
  });
  $(".subcat").click(function () {
    var show = $(this).parent().hasClass("show");
    $(".menu_help ul li ul li ul").slideUp(300);
    $(".menu_help > ul > li > ul > li").removeClass("show");
    if (!show) {
      $(this).parent().addClass("show");
      $(this).siblings().slideDown(300);
    }
    return false;
  });
  $(".menu_help li.active").parent().show();
  $(".menu_help a.active").parent().parent().parent().addClass("show");
  $(".menu_help a.active").parent().parent().parent().parent().show();
  $(".menu_help a.active")
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .addClass("active");
  $(".menu_help a.active").parent().parent().show();

  $(".promo_text_more").click(function () {
    $(this).closest(".promo_text_item").addClass("open");
    return false;
  });

  $("body").delegate(".btn_hide_balance", "click", function () {
    $("body").toggleClass("hidebalance");
    setCookie("hidebalance", $("body").hasClass("hidebalance"), 999);
    return false;
  });
});
