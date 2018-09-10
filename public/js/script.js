$(document).ready(function() {
  $(".main-slider .owl-carousel").owlCarousel({
    loop: true,
    mouseDrag: true,
    margin: 0,
    //animateOut: 'slideOutDown',
    //animateIn: 'zoomIn',
    nav: true,
    navText: [],
    autoHeight: false,
    smartSpeed: 550,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    items: 1
  });
});

var owlCarousel = $(".main-slider .owl-carousel");
owlCarousel.mouseover(function() {
  owlCarousel.trigger("stop.owl.autoplay");
});

owlCarousel.mouseleave(function() {
  owlCarousel.trigger("play.owl.autoplay", [3000]);
});

$(document).ready(function() {
  $(".partner-slider .owl-carousel").owlCarousel({
    loop: true,
    mouseDrag: true,
    margin: 0,
    //animateOut: 'slideOutDown',
    //animateIn: 'zoomIn',
    nav: true,
    navText: [],

    smartSpeed: 550,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    items: 4
  });
});

var owlCarousel = $(".partner-slider .owl-carousel");
owlCarousel.mouseover(function() {
  owlCarousel.trigger("stop.owl.autoplay");
});

owlCarousel.mouseleave(function() {
  owlCarousel.trigger("play.owl.autoplay", [3000]);
});

$(document).ready(function() {
  $(".product-slider .owl-carousel").owlCarousel({
    loop: true,
    mouseDrag: true,
    margin: 0,
    //animateOut: 'slideOutDown',
    //animateIn: 'zoomIn',
    nav: true,
    navText: [],

    smartSpeed: 550,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    items: 4
  });
});

var owlCarousel = $(".product-slider .owl-carousel");
owlCarousel.mouseover(function() {
  owlCarousel.trigger("stop.owl.autoplay");
});

owlCarousel.mouseleave(function() {
  owlCarousel.trigger("play.owl.autoplay", [3000]);
});

$(document).ready(function() {
  var user, to, subject, text;
  $("#send_email").click(function() {
    // enter your email account that you want to recieve emails at.
    to = "yespeace@bk.ru";
    name = $("#name").val();
    user = $("#user_email").val();
    text = $("#textarea1").val();
    // $("#message").text("Sending E-mail...Please wait");
    $.get(
      "http://localhost:5656/send",
      {
        to: to,
        name: name,
        user: user,
        text: text
      },
      function(data) {
        if (data == "sent") {
          console.log("Email sent");
        }
      }
    );
  });
});
