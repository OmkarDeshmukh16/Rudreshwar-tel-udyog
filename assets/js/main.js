$(function () {

    "use strict";

    //===== Prealoder

    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });


    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".header_navbar").removeClass("sticky");
        } else {
            $(".header_navbar").addClass("sticky");
        }
    });


    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });

    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });


    //===== Slick Slider

    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single_slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single_slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 6000,
            dots: true,
            fade: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();



    //=====  Slick Customer

    $('.customer_active').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        //        prevArrow: '<span class="prev"><i class="lni lni-chevron-left"></i></span>',
        //        nextArrow: '<span class="next"><i class="lni lni-chevron-right"></i></span>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    //=====  Slick Customer



    //=====  WOW active

    var wow = new WOW({
        boxClass: 'wow', //
        mobile: false, // 
    })
    wow.init();


    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });


    //===== 
    $('.customer_active').slick({
        dots: true,        // MUST BE TRUE
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,     // Hide arrows for a cleaner look
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /* gallery_active was originally initialized as a slick carousel, but the layout
       has been changed to a static 3‑column grid with 3D hover cards.  The slider code
       is therefore disabled to preserve the new layout. */
    // $('.gallery_active').slick({
    //     centerMode: true,
    //     centerPadding: '20%', // This shows the side photos tilted
    //     slidesToShow: 1,      // Focus on one at a time
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     speed: 1000,
    //     infinite: true,
    //     arrows: false,
    //     dots: true,
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 centerPadding: '40px',
    //                 slidesToShow: 1
    //             }
    //         }
    //     ]
    // });    

    // Import Firebase (Add these script tags to your index.html head first)
    // <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    // <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

    const firebaseConfig = {
        apiKey: "AIzaSyBSwXElhSrLEt_MrkmWnxb3ybT1efTSOK8",
        authDomain: "rudreshwarreviews.firebaseapp.com",
        databaseURL: "https://rudreshwarreviews-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "rudreshwarreviews",
        // storageBucket: "rudreshwarreviews.firebasestorage.app",
        // messagingSenderId: "895028012493",
        // appId: "1:895028012493:web:7dc0a0da91cf431e4a9084",
        // measurementId: "G-WJS95PXBBR"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // Submit Review
    $('#global-review-form').on('submit', function (e) {
        e.preventDefault();
        const reviewData = {
            name: $('#rev_name').val(),
            rating: $('#rev_rating').val(),
            message: $('#rev_msg').val(),
            date: new Date().toLocaleDateString(),
            timestamp: Date.now()
        };

        database.ref('reviews').push(reviewData);
        $(this)[0].reset();
        alert("Review posted successfully!");
    });

    // Sync Display (Instant for all users)
    database.ref('reviews').orderByChild('timestamp').on('value', (snapshot) => {
        let html = '';
        snapshot.forEach((child) => {
            const rev = child.val();
            // We prepend the HTML so the newest review is always at the top
            html = `
            <div class="global_review_card mb-3 p-3 shadow-sm border-left-gold">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">${rev.name}</h6>
                    <span class="text-warning">${"★".repeat(rev.rating)}</span>
                </div>
                <p class="mt-2 text-dark">"${rev.message}"</p>
                <small class="text-muted">${rev.date}</small>
            </div>
        ` + html;
        });
        $('#global-review-display').html(html || '<p>No reviews yet.</p>');
    });

});