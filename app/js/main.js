$(document).ready(function () {

    $('.hamburger').on('click', function(e) {
        e.preventDefault();

        $('.main-nav').toggleClass('visible');
    });

        $('.thumbn-img').on('click', function () {
            var nextImgSrc = $(this).prop('src');
            $('.img-big').attr('src', nextImgSrc);
        });

        $('.thumbn-img').click(function() {
          $('#shutter').addClass('on');
          $('audio')[0].play();
          setTimeout(function() {
            $('#shutter').removeClass('on');
          }, 35*2+45);/* Shutter speed (double & add 45) */
        });

        $('.slide-next').on('click', slideToNext);

        function slideToNext() {
            var currImgSrc = $('.img-big').attr('src');

        }




        $('.thumbn-img').hover(function() {
            var a = Math.random() * 10 - 5;
            $(this).css('transform', 'rotate(' + a + 'deg) ');
        }, function() {
            $(this).css('transform', 'none');
        });

});
