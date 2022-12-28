$(document).ready(function(){

    // 스크롤시 메뉴 
    scrollMenu();
    // 텝
    tabEvent();
    // 모바일 메뉴
    mobileMenu();
    // 도입문의 셀릭트
    inquirySelect();

    function scrollMenu(){
        let scrollPosition = $(window).scrollTop();
        // 스크롤 메뉴 배경
        $(window).scroll(function(e){
            $(this).scrollTop() > 0 ? $('header').addClass('background') : $('header').removeClass('background');
            $(this).scrollTop() - scrollPosition < 0 ? $('header').addClass('active') : $('header').removeClass('active')
            scrollPosition = $(this).scrollTop();
        })
    }

    // 텝 이벤트
    function tabEvent(){
        $('.tabBtn ul li').click(function(){
            $('.tabBtn ul li').removeClass('active');
            $(this).addClass('active');
            $('.tabContents div').removeClass('active');
            $('.tabContents div').eq($(this).index()).addClass('active');
        })
    }

    // 도입문의 셀릭트
    function inquirySelect(){
        $('select').each(function(){
            let selectSelector = $(this);
            $(this).find('option').each(function(i){
                i === 0 ? 
                    selectSelector.siblings('.selectBox').append(`${$(this)[0].label}`):
                    selectSelector.siblings('.selectList').append(`<div>${$(this)[0].label}</div>`);
                console.log($(this));
    
            })
        })
    
        $('.selectBox').click(function(){
            $(this).siblings('.selectList').stop().slideToggle();
        })
    
        $('.selectList div').click(function(){
            $(this).parent().siblings('select').find('option').removeAttr('selected')
            $(this).parent().siblings('select').find('option').eq($(this).index() + 1).attr('selected','selected')
            $(this).parent().siblings('.selectBox').addClass('active');
            $(this).parent().siblings('.selectBox').html($(this).html())
            $(this).parent().slideUp();
        })
    }

    // 자주 묻는 질문
    function FAQDropdown(){
        $('.FAQPage .contentArea ul li button').click(function(){
            $(this).toggleClass('active');
            $(this).stop().next().slideToggle();
        })
    }

    function mobileMenu(){
        $('nav').on('touchmove , mousewheel',function(e){
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