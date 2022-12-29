$(document).ready(function(){
    const tablatSize = 1180;

    // 스크롤시 메뉴 
    scrollMenu();

    // 메뉴 클릭 스크롤 무브
    scrollMove();

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
            $(this).scrollTop() - scrollPosition < 0 ? $('.securityPage .rowScroll').addClass('active') : $('.securityPage .rowScroll').removeClass('active')
            $(this).scrollTop() - scrollPosition < 0 ? $('[data-scroll="click"]').addClass('active') : $('[data-scroll="click"]').removeClass('active')
            scrollPosition = $(this).scrollTop();

            
        })
    }
    
    // 메뉴 클릭 스크롤 무브
    function scrollMove(){
        let scrollPosition = $(window).scrollTop();
        $(window).scroll(function(e){
            $('.introducePage').length && $(this).scrollTop() > $('.introducePage h2').offset().top ? $('.introducePage .rowScroll').addClass('change') : $('.introducePage .rowScroll').removeClass('change')
            scrollPosition = $(this).scrollTop();
            $('[data-scroll="location"] section').each(function(i){
                if(scrollPosition + 300 > $(this).offset().top){
                    $('[data-scroll="click"] ul li').eq(i).addClass('active').siblings().removeClass('active');
                }
            })
        })

        $('[data-scroll="click"] ul li a').click(function(e){
            e.preventDefault();
            let newIdx = $('[data-scroll="click"] ul li.active').index();
            let clickIdx = $(this).parent().index();
            let moveTop = $('[data-scroll="location"] section').eq(clickIdx).offset().top;
            let headerHeight = clickIdx > newIdx ? 0 : $('header').height();
            let subMenu = $('header').height();
            let test = tablatSize < $(window).width() ? headerHeight + subMenu + 100 : 50;
            $('html').animate({scrollTop : moveTop - (test)});
            
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