document.addEventListener('DOMContentLoaded', function () {

    //Слайдер на главной
    const swiperMain = new Swiper('.swiper__main', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        effect: "fade",
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    //Слайдер услуги
    const swiperSecond = new Swiper('.swiper__second', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        effect: "flip",
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
    });


    //фокус инпута в хедере
    let inputHeader = document.querySelector('#inputHeader');
    let formHeader = document.querySelector('#formHeader');

    inputHeader.addEventListener('focus', function () {
        formHeader.classList.add('header__search__outline');
    })

    inputHeader.addEventListener('blur', function () {
        formHeader.classList.remove('header__search__outline');
    })


    //Выезжающее меню при нажатии на кнопку "помощь"
    let helpBackground = document.querySelector('#helpBackground');
    let btnHelps = document.querySelectorAll('.call__menu');
    let menuHelp = document.querySelector('#menuHelp');
    let closeMenu = document.querySelector('#closeMenu');

    for (let btnHelp of btnHelps) {
        btnHelp.addEventListener('click', function () {
            helpBackground.classList.add('menu__help__container-open');
            menuHelp.classList.add('menu__help-open');
        })
    }

    closeMenu.addEventListener('click', function () {
        helpBackground.classList.remove('menu__help__container-open');
        menuHelp.classList.remove('menu__help-open');
    })

    helpBackground.addEventListener('click', function() {
        helpBackground.classList.remove('menu__help__container-open');
        menuHelp.classList.remove('menu__help-open');
    })



})


