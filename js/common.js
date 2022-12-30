$(document).ready(function(){
    const mobileSize = 767;
    const tablatSize = 1180;

    // 특정 a 태그 클릭 막기 (이용가이드 페이지)
    $('a[data-link="disable"]').click(function(e){
        e.preventDefault();
    })

    // 메인 페이지 애니메이션
    // $('.mainPage').length && mainCircleAni();

    // 스크롤시 메뉴 
    scrollMenu();

    // 메뉴 클릭 스크롤 무브
    scrollMove();

    // 텝
    tabEvent();

    // 드랍다운
    FAQDropdown();

    // 모바일 메뉴
    mobileMenu();

    // 도입문의
    if($('.inquiryPage').length){
        // 도입문의 셀렉트
        inquirySelect();  
        // 도입문의 인풋 유효성 검사
        inputValidity();
        // 도입문의 팝업
        inquiryPopup()
    } 


    function mainCircleAni(){
        let mainBGCircleCount = 6;
        for(let a = 0; a < mainBGCircleCount; a++){
            $('.mainPage .BG .BGArea').append('<div class="circle"></div>');
        }

        $('.mainPage .BG .BGArea .circle').each(function(){
            let size;
            if($(window).width() > tablatSize){
                size = (Math.random() * 560) + 45
            }else if($(window).width() > mobileSize){
                size = (Math.random() * 360) + 45
            }else{
                size = (Math.random() * 160) + 45
            }

            let positonLeft = Math.random() * ($(this).parent().width() - size);
            let positonTop = Math.random() * ($(this).parent().height() - size);
            $(this).css({
                'width' : size,
                'height' : size,
                'left' : positonLeft,
                'top' : positonTop
            })
        })

        $('.mainPage .BG .BGArea .circle').each(function(){
            let selector = $(this);
            let parentSelector = $(this).parent();
            let moveX = (Math.random() * 1) - 0.5
            let moveY = (Math.random() * 1) - 0.5
            let rotate = 0;
            setInterval(function(){
                let selectorX = parseFloat(selector.css('left'));
                let selectorY = parseFloat(selector.css('top'));
                rotate++;
                rotate > 360 && (rotate = 0);
                (selectorX <= 0 || selectorX > (parentSelector.width() - selector.width())) && (moveX = -moveX);
                (selectorY <= 0 || selectorY > (parentSelector.height() - selector.height())) && (moveY = -moveY);
                selector.css({
                    'left' : selectorX + moveX,
                    'top' : selectorY - moveY,
                    'transform' : `rotate(${rotate}deg)`
                })
            },10)
        })
    }

    function scrollMenu(){
        let scrollPosition = $(window).scrollTop();
        if(scrollPosition > 0 ){
            $('header').addClass('active');
            $('header').addClass('background');
            $('.introducePage').length && $('.introducePage .rowScroll').addClass('change' , 'active');
        }
        // 스크롤 메뉴 배경
        $(window).scroll(function(e){
            $(this).scrollTop() > 0 ? $('header').addClass('background') : $('header').removeClass('background');
            if($(this).scrollTop() > 0){
                $(this).scrollTop() - scrollPosition < 0 ? $('header').addClass('active') : $('header').removeClass('active')
            }
            $(this).scrollTop() - scrollPosition < 0 ? $('.securityPage .rowScroll').addClass('active') : $('.securityPage .rowScroll').removeClass('active')
            $(this).scrollTop() - scrollPosition < 0 ? $('[data-scroll="click"]').addClass('active') : $('[data-scroll="click"]').removeClass('active')
            scrollPosition = $(this).scrollTop();

            $(this).scrollTop()  > $(document).height() - $(window).height() - $('footer').innerHeight() ? $('.floatingLink').addClass('stop') : $('.floatingLink').removeClass('stop');
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
            let subMenu = $('[data-scroll="click"]').height();
            let test = 0;
            if($('.introducePage').length){
                test = (tablatSize < $(window).width() ? -100 : -100);
            }else{
                test = (tablatSize < $(window).width() ? 100 : 50);
            }
            $('html').stop().animate({scrollTop : moveTop - (headerHeight + subMenu + test)});
            
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

    // 도입문의 셀렉트
    function inquirySelect(){
        $('select').each(function(){
            let selectSelector = $(this);
            $(this).find('option').each(function(i){
                i === 0 ? 
                    selectSelector.siblings('.selectBox').append(`${$(this)[0].label}`):
                    selectSelector.siblings('.selectList').append(`<div>${$(this)[0].label}</div>`);
            })
        })
    
        $('.selectBox').click(function(e){
            e.stopPropagation();
            $(this).siblings('.selectList').stop().slideToggle();
        })
        $('body').click(function(){
            $('.selectList').stop().slideUp();
        })
    
        $('.selectList div').click(function(){
            $(this).parent().siblings('select').find('option').removeAttr('selected')
            $(this).parent().siblings('select').find('option').eq($(this).index() + 1).attr('selected','selected')
            $(this).parent().siblings('.selectBox').addClass('active');
            $(this).parent().siblings('.selectBox').html($(this).html())
            $(this).parent().slideUp();
        })
    }

    // 도입문의 팝업
    function inquiryPopup(){
        $('label span').click(function(){
            $('.agreePopup').fadeIn().css('display' , 'flex');
            $('body').css('overflow','hidden');
        })
        $('.inquiryPage .contentArea .agreePopup').click(function(){
            $(this).fadeOut();
            $('body').removeAttr('style');
        })
        $('.inquiryPage .contentArea .agreePopup > div').click(function(e){
            e.stopPropagation();
        })
        $('.inquiryPage .contentArea .agreePopup > div button').click(function(e){
            e.preventDefault();
            $('.inquiryPage .contentArea .agreePopup').fadeOut();
            $('body').removeAttr('style');
        })
    }

    // 자주 묻는 질문
    function FAQDropdown(){
        $('.FAQPage .contentArea ul li button').click(function(){
            $(this).toggleClass('active');
            $(this).stop().next().slideToggle().css('display','flex');
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

    function inputValidity(){
        // 인풋 입력시 유효성
        $('[data-input]').on('input',function(){
            let attrValue = $(this).attr('data-input');
            let validityBoolean ;
            attrValue === 'mobile' && (validityBoolean = /^01(\d{9,9})/.test($(this).val()))
            attrValue === 'text' && (validityBoolean = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/.test($(this).val()))
            attrValue === 'email' && (validityBoolean = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/.test($(this).val()))
            attrValue === 'checkbox' && (validityBoolean = $(this).is(':checked'))
            validityBoolean ? $(this).removeClass('error') : $(this).addClass('error');
            
        })

        // 셀렉트 선택시 에러 제거
        $('.selectList div').click(function(){
            $(this).parent().siblings('select').removeClass('error')
        })

        // submit 버튼을 누르면
        $('input[type="submit"]').click(function(e){
            e.preventDefault();
            let inputValue = []

            // input , select 값 저장
            $('[data-input]').not('[type="submit"]').each(function(){
                inputValue.push({
                    selector : $(this),
                    name : $(this).attr('id'),
                    attrName : $(this).attr('data-input'),
                    value : $(this).val(),
                })
            })

            // input , select 값 유효성 검서
            inputValue.map((v)=>{
                // 핸드폰 번호  첫글자 01 , 11자
                v.attrName === 'mobile' && (v.boolean = /^01(\d{9,9})/.test(v.value))
                // 한글 , 영어만 
                v.attrName === 'text' && (v.boolean = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/.test(v.value))
                // 이메일
                v.attrName === 'email' && (v.boolean = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/.test(v.value))
                // 셀렉트 선택
                v.attrName === 'select' && (v.boolean = (v.value != ''))
                // 체크박스 클릭 여부
                v.attrName === 'checkbox' && (v.boolean = v.selector.is(':checked'))

                // 유효성 검사에서 false가 나오면 error 표시
                v.boolean === false && v.selector.addClass('error')
            })

            // 필수 항목 체크
            var inputResult = inputValue.every((v)=>{
                return v.boolean;
            })

            // 필수 항목 제외한 나머지 값 저장 (textarea , checkbox)
            $('input , select , textarea').not('[data-input]').not('[type="submit"]').each(function(){
                inputValue.push({
                    selector : $(this),
                    name : $(this).attr('id'),
                    value : $(this).val(),
                })
            })

           
            // 필수 항목 입력 여부 검사
            if(inputResult){
                // 필수 항목을 모두 입력했을 떄 동작 하는 여역

                // 최종적으로 value 값만 추출
                let resultValue = {}
                inputValue.map((v)=>{
                    v.selector.attr('type') !== 'checkbox' ?
                        (resultValue[v.name] = v.value) :
                        (resultValue[v.name] = v.selector.is(':checked'));
                })

    
                // resultValue 배열의 value 값으로 데이터 저장
                // 필수
                // userName : 이름 , companyName : 회사명 , userMobile : 전화번호 , userEmail : 이메일
                // userRank : 직급 , userDepartment : 부서 , inquiryType : 문의 내용 , numberOfEmployees : 사원 수
                // requiredAgree : 이용약관 / 개인정보 정책 동의 (boolean으로 저장)
                // 필수X
                // contentOfInquiry : 문의 내용
                // chooseAgree : 홍보 및 마케팅 수집 동의 (boolean으로 저장)
                // requiredAgree , chooseAgree만 boolean 나머지는 String ''
            }else{
                // 필수 항목이 하나라도 false면 submit 동작 막기
                e.preventDefault();

                // 유효성 검사 실패한 input 중 첫번째 input focus
                let focusInput = inputValue.find((v)=>{
                    return !v.boolean
                })
                focusInput.selector.focus();
            }
            
        })
    }
});