const headroom = new Headroom(document.querySelector('header.header'));
headroom.init();

(function ($) {
    const items = $('#accordion').children();
    const header = $('.header');
    const btn = $('.modal .modal__button .button');
    const checkbox = $('#agreement');
    const nav = $('.navigation');
    const links = $(nav).find('a');

    //Filter nav links by hash
    let linkArr = $(links).toArray();
    let withHash = linkArr.filter(el => el.hash)

    //Highlight menu anchors on scroll
    function scrollActive() {
        let documentHeight = $(document).scrollTop();

        $(withHash).each(function () {
            let hash = $(this).attr('href');
            let section = $(hash);
            section.position().top <= documentHeight && section.position().top + section.outerHeight() > documentHeight
                ? ($(this).siblings().removeClass('active'), $(this).addClass('active'))
                : $(this).removeClass('active');
        });
    }

    $(document).on("scroll", scrollActive);

    //Init swiper slide on single project page
    if ($('.swiper').length) {
        const swiper = new Swiper('.swiper', {
            breakpoints: {
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 32
                }
            },
        });
        swiper.slideNext();
    }

    $(items).each(function () {
        $(this).on('click', function () {
            $(this).toggleClass('active').children('.item__text').slideToggle();
            $(this).siblings().removeClass('active').children('.item__text').slideUp();
        });
    });

    $('.hamburger').click(function () {
        if ($(header).hasClass('menu-open')) {
            $(header).removeClass('menu-open');
            $('.mask').css('visibility', 'hidden').animate({opacity: 0}, 1000);
            $('body').css('overflow', 'inherit');
        } else {
            $(header).addClass('menu-open');
            $('.mask').css('visibility', 'visible').animate({opacity: 1}, 1000);
            $('body').css('overflow', 'hidden');
        }
    });

    $('.mask, .header__menu .navigation__link').click(function () {
        $(header).removeClass('menu-open');
        $('.mask').css('visibility', 'hidden').animate({opacity: 0}, 1000);
        $('body').css('overflow', 'inherit');
    });

    $('.btn-connect').click(function () {
        $('.modal').css('display', 'flex');
        $('body').css('overflow', 'hidden');
    });

    $('.modal .modal__cancel, .modal .btn-okay').click(function () {
        $('.modal').css('display', 'none');
        $('body').css('overflow', 'inherit');
    });

    $(checkbox).click(function () {
        if ($(this).is(':checked')) {
            $(btn).removeClass('button-disabled').addClass('button-active');
        } else {
            $(btn).addClass('button-disabled').removeClass('button-active');
        }
    });

    $(btn).click(() => {
        $('.error-input').hide();
        let name = $('#username');
        let email = $('#email');
        name.css('background', 'white');
        email.css('background', 'white');

        if (!name.val()) {
            name.siblings('.error-input').show();
            name.css('background', '#FFFCE3');
            // hasError = true;
        }
        if (!email.val()) {
            email.siblings('.error-input').show();
            email.css('background', '#FFFCE3');
            // hasError = true;
        } else {
            $('.modal__success').css('display', 'flex');
            $('.modal__content').hide();
        }
        // if (!hasError) {
        //     $.ajax({
        //         method: "POST",
        //         url: 'mail.php',
        //         data: '&name=' + name.val() + '&email=' + email.val(),
        //         success: () => {
        //             $('.modal__success').css('display', 'flex');
        //         },
        //         error: () => {
        //             alert('Ошибка! Свяжитесь с нами, пожалуйста, по номеру телефона.');
        //         }
        //     });
        // }
    });

}(jQuery));
