$(document).ready(function(){
    // 스크롤 메뉴 배경
    $(window).scroll(function(e){
        $(this).scrollTop() > 0 ? $('header').addClass('background') : $('header').removeClass('background');
    })

    // 스크롤 업 & 다운
    $(window).on('mousewheel',function(e){
        let delta = e.originalEvent.wheelDelta;
        delta > 0 ? $('header').addClass('active') : $('header').removeClass('active')
    })

    // 자주 묻는 질문
    $('.FAQPage .contentArea ul li button').click(function(){
        $(this).toggleClass('active');
        $(this).stop().next().slideToggle();
    })
});