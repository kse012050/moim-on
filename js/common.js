$(document).ready(function(){
    const tablatSize = 1180;

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
    // 도입문의 셀렉트
    inquirySelect();


    $('.inquiryPage').length && inputValidity();

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

    function inputValidity(){
        // 인풋 입력시 유효성
        $('[data-input]').on('input',function(){
            let attrValue = $(this).attr('data-input');
            let validityBoolean;
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
            let inputValue = []

            // input , select 값 저장
            $('input , select').not('[type="submit"]').each(function(){
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
                !v.boolean && v.selector.addClass('error')
            })

            // 필수 항목 체크
            var inputResult = inputValue.every((v)=>{
                return v.boolean;
            })

            // textarea 내용 저장
            inputValue.push({
                selector : $('textarea'),
                name : $('textarea').attr('id'),
                value : $('textarea').val(),
            })
            
           
            // 필수 항목 입력 여부 검사
            if(inputResult){
                // 필수 항목을 모두 입력했을 떄 동작 하는 여역

                // 최종적으로 value 값만 추출
                let resultValue = {}
                inputValue.map((v)=>{
                    v.attrName !== 'checkbox' ?
                        (resultValue[v.name] = v.value) :
                        (resultValue[v.name] = true)
                })
    
                // resultValue 배열의 value 값으로 데이터 저장
                // 필수
                // userName : 이름 , companyName : 회사명 , userMobile : 전화번호 , userEmail : 이메일
                // userRank : 직급 , userDepartment : 부서 , inquiryType : 문의 내용 , numberOfEmployees : 사원 수
                // agree : 이용약관 여부 (boolean으로 저장)
                // 필수X
                // contentOfInquiry : 문의 내용
                // agree만 boolean 나머지는 String ''

                // submit 기본값 막기 form 태그 이용해서 데이터 넘길 시 제거
                e.preventDefault();
            }else{
                // 필수 항목이 하나라도 false면 submit 동작 막기
                e.preventDefault();
            }
        })
    }
});