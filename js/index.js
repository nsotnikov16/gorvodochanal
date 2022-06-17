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
            clickable: true,
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
            clickable: true,
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


    //Подстановка телефона в хедере
    let headerTel = document.querySelector('#headerTel');
    let headerTelDropdown = document.querySelector('#headerTelDropdown');
    headerTelDropdown.href = 'tel:' + headerTel.textContent;
    headerTelDropdown.textContent = headerTel.textContent;

    //Бургер меню
    const btn = document.getElementById('menuBtn');
    let menu = document.getElementById('menuContainer');

    btn.addEventListener('click', showMenu);

    function showMenu() {
        menu.classList.toggle('menu-show');
        var toggle = document.querySelector('.nav-toggle');
        this.classList.toggle('opened');
    }



    //Выезжающее меню при нажатии на кнопку "помощь"
    let helpBackground = document.querySelector('#helpBackground'); //затемненный фон
    let btnHelps = document.querySelectorAll('.call__menu'); //кнопки открытия меню
    let menuHelp = document.querySelector('#menuHelp'); //меню
    let closeMenus = document.querySelectorAll('.help__close__menu'); //закрытие меню при нажатии на фон или крестик
    let menuLinks = document.querySelectorAll('#menuHelp a'); // ссылки в меню
    let menuDefault = menuHelp.innerHTML; //Контент меню по умолчанию
    let menuAsideHead = document.querySelector('#menuAsideHead'); //Заголовок "Быстрая помощь" в меню

    //Открыть меню
    for (let btnHelp of btnHelps) {
        btnHelp.addEventListener('click', function () {
            helpBackground.classList.add('menu__help__container-open');
            menuHelp.classList.add('menu__help-open');
        })
    }

    //Закрыть меню
    for (let closeMenu of closeMenus) {
        closeMenu.addEventListener('click', function (event) {
            if (event.target.tagName === 'ASIDE') {
                helpBackground.classList.remove('menu__help__container-open');
                menuHelp.classList.remove('menu__help-open');
                menuHelp.innerHTML = menuDefault;
            } else if (event.target.tagName === 'BUTTON') {
                helpBackground.classList.remove('menu__help__container-open');
                menuHelp.classList.remove('menu__help-open');
                menuHelp.innerHTML = menuDefault;
            }
        })
    }

    //Смена контента по клику на ссылку
    for (let menuLink of menuLinks) {
        menuLink.addEventListener('click', function (event) {
            event.preventDefault();
            menuAsideHead.style.visibility = "hidden";
            menuHelp.innerHTML = '<div class="menu__help__head"><span class="menu-aside__back-btn">&lt; Назад</span><button class="menu__close__icon help__close__menu" aria-label="Закрыть окно"></button></div>'
                + `<div class="menu__aside__enter__container"><h2 class="menu__aside__head__link">${event.target.textContent}</h2><p class="menu__aside__enter__text">Для оформления заявки по перекрытию/открытию/отглушению водопроводного ввода необходимо направить на эл. адрес: <a href="mailto:info@vodokanal-surgut.ru">info@vodokanal-surgut.ru</a> или привезти нарочно, гарантийное письмо на выполнение работ. Образцы заявки находятся по следующей <a href="#">ссылке</a>. Также просим обратить внимание, что при направлении заявки на "отглушение" водопроводного ввода необходимо приложить свидетельство о государственной регистрации права на объекты и на земельные участки (либо выписки из ЕГРН), а также схему с указанием точек отглушения.</p></div>`;
            var menuBack = document.querySelector('.menu-aside__back-btn'); //Кнопка назад в боковом меню
            menuBack.addEventListener('click', function () {
                menuHelp.innerHTML = menuDefault;
            })
        })
    }

    //брейкпоинт 1100px
    const screenWidth = window.screen.width
    if (screenWidth <= 1100) {
        //Подстановка меню в выпадающее меню
        let headerNav = document.querySelector('#headerNav');
        menu.innerHTML = headerNav.innerHTML + menu.innerHTML;
        let headerDropdown = document.querySelector('.header__dropdown');
        menu.innerHTML = menu.innerHTML + headerDropdown.innerHTML;
    }


    //Аккордеон слева
    let links = document.querySelectorAll('.asside__menu__head__button');
    let rectMenu = document.querySelectorAll('.aside__menu__rectangle');

    for (let link of links) {
        link.addEventListener('click', function () {
            link.parentNode.classList.toggle('active');
            link.firstElementChild.classList.toggle('aside__menu__rectangle-active');
        })
    }

})


