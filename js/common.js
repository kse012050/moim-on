$(document).ready(function(){
    $(window).scroll(function(e){
        $(this).scrollTop() > 0 ? $('header').addClass('background') : $('header').removeClass('background');
    })

    $(window).on('mousewheel',function(e){
        let delta = e.originalEvent.wheelDelta;
        delta > 0 ? $('header').addClass('active') : $('header').removeClass('active')
        
    })
});