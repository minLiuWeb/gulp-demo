"use strict";

// TODO: site logics
$(function ($) {
  var $body = $('html, body');
  $('#scroll_top').on('click', function () {
    $body.animate({
      scrollTop: 0
    }, 600);
    console.log(2);
    return false;
  });
});
