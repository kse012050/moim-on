$(document).ready(function(){
    const mobileSize = 768;

    console.log($(window).scrollTop());
    let scrollPosition = $(window).scrollTop();
    // 스크롤 메뉴 배경
    $(window).scroll(function(e){
        $(this).scrollTop() > 0 ? $('header').addClass('background') : $('header').removeClass('background');
        $(this).scrollTop() - scrollPosition < 0 ? $('header').addClass('active') : $('header').removeClass('active')
        scrollPosition = $(this).scrollTop();
    })

  

    // 자주 묻는 질문
    $('.FAQPage .contentArea ul li button').click(function(){
        $(this).toggleClass('active');
        $(this).stop().next().slideToggle();
    })


    mobileMenu();

    function mobileMenu(){
        $('nav').on('touchmove',function(e){
            e.preventDefault();
        })
    
        $('.menu-open').click(function(){
            $('nav').fadeIn();
        })
    
        $('nav > div').click(function(e){
            e.stopPropagation();
        })
    
        $('nav , .menu-close').click(function(){
            $('nav').fadeOut();
        })

        $(window).resize(function(){
            $('nav').removeAttr('style')
        })
    }

});