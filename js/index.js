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

    //подстановка телефона в ссылку
    let moreTels = document.querySelectorAll('.phone__substitution');
    for (let moreTel of moreTels) {
        moreTel.href = 'tel:' + moreTel.textContent;
    }

    //подстановка почты в ссылку
    let moreMails = document.querySelectorAll('.mail__substitution');
    for (let moreMail of moreMails) {
        moreMail.href = 'mailto:' + moreMail.textContent;
    }

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

    //Подстановка меню в выпадающее меню
    let headerNav = document.querySelector('#headerNav');
    menu.innerHTML = headerNav.innerHTML + menu.innerHTML;
    let headerDropdown = document.querySelector('.header__dropdown');
    menu.innerHTML = menu.innerHTML + headerDropdown.innerHTML;


    //Аккордеон слева
    let links = document.querySelectorAll('.aside__menu__rectangle');

    for (let link of links) {
        link.addEventListener('click', function (event) {
            event.target.parentNode.parentNode.classList.toggle('active');
            this.classList.toggle('aside__menu__rectangle-active');
        })
    }


    /* Карта */

    if (document.getElementById('map')) {
        ymaps.ready(init);
    }

    function init() {
        var myPlacemark,
            myMap = new ymaps.Map('map', {
                center: [61.241778, 73.393032],
                zoom: 13
            }, {
                searchControlProvider: 'yandex#search'
            });

        // Слушаем клик на карте.
        myMap.events.add('click', function (e) {
            var coords = e.get('coords');

            // Если метка уже создана – просто передвигаем ее.
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add('dragend', function () {
                    getAddress(myPlacemark.geometry.getCoordinates());
                });
            }
            getAddress(coords);
        });

        // Создание метки.
        function createPlacemark(coords) {
            return new ymaps.Placemark(coords, {
                iconCaption: 'поиск...'
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: true
            });
        }

        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {
            myPlacemark.properties.set('iconCaption', 'поиск...');
            ymaps.geocode(coords).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);

                myPlacemark.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            // Название населенного пункта или вышестоящее административно-территориальное образование.
                            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        balloonContent: firstGeoObject.getAddressLine()
                    });
                mapAddress.value = myPlacemark.properties._data['balloonContent'];
                mapAddress.nextElementSibling.classList.add('placeholder__top');
            });

        }
    }

    let mapAddress = document.querySelector('#mapAddress');

    /* Селект на странице проблемы */
    let selects = document.querySelectorAll('.select');
    let options = document.querySelectorAll('.select__option');

    //Открытие селекта
    for (let select of selects) {
        select.addEventListener('click', function (event) {
            this.classList.toggle('open');
            this.classList.toggle('border');
            this.firstChild.nextElementSibling.firstChild.nextElementSibling.classList.toggle('open');
        })
        //Закрытие селекта по клику вне него
        document.addEventListener('click', (e) => {
            const withinBoundaries = e.composedPath().includes(select);
            if (!withinBoundaries) {
                select.classList.remove('open');
                select.classList.remove('border');
                select.firstChild.nextElementSibling.firstChild.nextElementSibling.classList.remove('open');
            }
        })
    }

    //Выбор пункта из открытого селекта
    for (let option of options) {
        option.addEventListener('click', function (event) {
            event.target.parentNode.previousElementSibling.firstChild.innerHTML = option.innerHTML;
        })
    }

    //Маска телефона

    if (document.querySelector("input[type='tel']")) {
        let inputTel = document.querySelectorAll("input[type='tel']");
        var im = new Inputmask("+7 (999)-999-99-99");
        for (let tel of inputTel) {
            im.mask(tel);
        }
    }

    //смещение плейсхолдера инпута на границу
    let inputPlaceholders = document.querySelectorAll('.input__placeholder');
    let txtPlaceholders = document.querySelectorAll('.form__input__placeholder');


    for (let inputPlaceholder of inputPlaceholders) {

        //Смещаем текст по фокусу
        inputPlaceholder.addEventListener('focus', function () {
            this.nextElementSibling.classList.add('placeholder__top');
        })
        //Ждем ввода текста, если инпут пустой, то возвращаем текст по потери фокуса
        inputPlaceholder.addEventListener('input', function () {
            if (inputPlaceholder.value === '') {
                inputPlaceholder.addEventListener('blur', function () {
                    if (inputPlaceholder.value === '') {
                        this.nextElementSibling.classList.remove('placeholder__top');
                    }
                })
            }
        })

        //возвращаем текст обратно, по потери фокуса с проверкой на пустоту
        inputPlaceholder.addEventListener('blur', function () {
            if (inputPlaceholder.value === '') {
                this.nextElementSibling.classList.remove('placeholder__top');
            }
        })
    }

    //При клике на текст в инпуте, смещаем его и делаем инпут активным
    for (let txtPlaceholder of txtPlaceholders) {
        txtPlaceholder.addEventListener('click', function () {
            txtPlaceholder.classList.add('placeholder__top');
            txtPlaceholder.previousElementSibling.focus();
        })
    }

    //Показ файлов выбранных для загрузки 
    let files = document.querySelectorAll('.form__input__file input[type="file"]');
    let fileList = document.querySelector('.form__input__file__list');
    let numberFiles = 0;
    let sizeFiles = 0;

    for (let file of files) {
        //Выводим название файлов при изменении инпута
        file.addEventListener('input', function () {

            for (let i = 0; i < file.files.length; i++) {
                let li = document.createElement('li');
                li.innerHTML = file.files[`${i}`].name + `<span class="file__delete__icon"></span>`;
                fileList.appendChild(li);
            }
            let deleteFileButtons = document.querySelectorAll('.file__delete__icon');
            for (let deleteFileButton of deleteFileButtons) {
                deleteFileButton.addEventListener('click', function (event) {
                    console.log(file.files)
                })
            }
        })
    }


    //Аккордеон на странцие контакты
    let contactsAccordBtns = document.querySelectorAll('.contacts__accordeon__btn');

    for (let contactsAccordBtn of contactsAccordBtns) {
        contactsAccordBtn.addEventListener('click', function() {
            contactsAccordBtn.childNodes[3].classList.toggle('contacts__accordeon-active');
            contactsAccordBtn.childNodes[1].childNodes[1].classList.toggle('aside__menu__rectangle-active');
        })
    }
})


/* aside__menu__rectangle-active */