$(document).ready(function () {

    $('.hamburger').on('click', function(e) {
        e.preventDefault();

        $('.main-nav').slideToggle(150);

        $(this).toggleClass('button-x');
    });

    if($( window ).width() < 320) {

        $('.main-nav li a').on('click', function (e) {
            e.preventDefault();
            $('.main-nav').slideUp(400);
        });

    }

    // smooth scrolling

      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 750);
            return false;
          }
        }
      });

});
