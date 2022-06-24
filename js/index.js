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


    /* Карта на странице проблема */

    if (document.getElementById('map')) {
        ymaps.ready(init);
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
        contactsAccordBtn.addEventListener('click', function () {
            contactsAccordBtn.childNodes[3].classList.toggle('contacts__accordeon-active');
            contactsAccordBtn.childNodes[1].childNodes[1].classList.toggle('aside__menu__rectangle-active');
        })
    }


    // Popups фото
    let photoOpeneds = document.querySelectorAll('.photo__opened');
    for (let photoOpened of photoOpeneds) {
        photoOpened.addEventListener('click', function () {
            var popupPhoto = document.querySelector('#photo');
            popupPhoto.classList.add('popup_opened');
            popupPhoto.childNodes[1].childNodes[1].childNodes[1].src = this.src;

            popupPhoto.childNodes[1].childNodes[3].addEventListener('click', function () {
                popupPhoto.classList.remove('popup_opened');
                popupPhoto.childNodes[1].childNodes[1].childNodes[1].src = '';
            })
        })
    }

    //Табы в личном кабинете
    let individualBtn = document.querySelector('#individualBtn');
    let legalBtn = document.querySelector('#legalBtn');
    let individualForm = document.querySelector('#individualForm');
    let legalForm = document.querySelector('#legalForm');

    if (individualBtn) {
        individualBtn.addEventListener('click', function () {
            legalBtn.classList.remove('personal__area__active');
            individualBtn.classList.add('personal__area__active');
            legalForm.classList.remove('personal__form__active')
            individualForm.classList.add('personal__form__active')
        })
    }

    if (legalBtn) {
        legalBtn.addEventListener('click', function () {
            individualBtn.classList.remove('personal__area__active');
            legalBtn.classList.add('personal__area__active');
            individualForm.classList.remove('personal__form__active')
            legalForm.classList.add('personal__form__active')
        })
    }

    //Маска телефона

    let inputTel = document.querySelectorAll("input[type='tel']");
    if (inputTel.length > 0) {
        let im = new Inputmask("+7 (999)-999-99-99");
        for (let tel of inputTel) {
            im.mask(tel);
        }
    }


    //Карта на странице качество воды


    if (document.getElementById('mapQuality')) {
        ymaps.ready(init);

        function init() {
            var myMapQual = new ymaps.Map("mapQuality", {
                center: [61.264050, 73.42080],
                zoom: 16
            });

            // Создаем многоугольник, используя класс GeoObject.
            var northernIndustrialArea = new ymaps.GeoObject({
                // Описываем геометрию геообъекта.
                geometry: {
                    // Тип геометрии - "Многоугольник".
                    type: "Polygon",
                    // Указываем координаты вершин многоугольника.
                    coordinates: [
                        // Координаты вершин внешнего контура.
                        [
                            [61.270000, 73.371522],
                            [61.297500, 73.38392],
                            [61.297700, 73.38592],
                            [61.297550, 73.38892],
                            [61.297000, 73.39150],
                            [61.296500, 73.39250],
                            [61.288000, 73.40780],
                            [61.287350, 73.40980],
                            [61.286590, 73.41280],
                            [61.281190, 73.45222],
                            [61.280190, 73.45552],
                            [61.277690, 73.45952],
                            [61.273690, 73.46462],
                            [61.271890, 73.46862],
                            [61.270320, 73.47600],
                            [61.260500, 73.47642],
                            [61.260250, 73.47542],
                            [61.259950, 73.47042],
                            [61.259390, 73.46142],
                            [61.258300, 73.45380],
                            [61.259000, 73.45300],
                            [61.259225, 73.45275],
                            [61.259450, 73.45150],
                            [61.260950, 73.44150],
                            [61.261450, 73.43780],
                            [61.262050, 73.43580],
                            [61.264090, 73.42180],
                        ],
                        // Координаты вершин внутреннего контура.
                        /* [
                            [55.75, 37.82],
                            [55.75, 37.98],
                            [55.65, 37.90]
                        ] */
                    ],
                    // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                    fillRule: "nonZero"
                },
                // Описываем свойства геообъекта.
                properties: {
                    // Содержимое балуна.
                    balloonContent: "Многоугольник"
                }
            }, {
                // Описываем опции геообъекта.
                // Цвет заливки.
                fillColor: '#0085FF4D',
                // Цвет обводки.
                strokeColor: '#0085FF',
                // Общая прозрачность (как для заливки, так и для обводки).
                opacity: 0.5,
                // Ширина обводки.
                strokeWidth: 3,
                // Стиль обводки.
                strokeStyle: 'solid'
            });

            // Добавляем многоугольник на карту.
            myMapQual.geoObjects.add(northernIndustrialArea);

            // Создаем многоугольник, используя класс GeoObject.
            var northEastResidentialArea = new ymaps.GeoObject({
                // Описываем геометрию геообъекта.
                geometry: {
                    // Тип геометрии - "Многоугольник".
                    type: "Polygon",
                    // Указываем координаты вершин многоугольника.
                    coordinates: [
                        // Координаты вершин внешнего контура.
                        [
                            [61.264000, 73.421722],
                            [61.255600, 73.416622],
                            [61.255200, 73.416490],
                            [61.254700, 73.416560],
                            [61.247550, 73.422322],
                            [61.248400, 73.427022],
                            [61.248450, 73.429822],
                            [61.248400, 73.433922],
                            [61.252600, 73.457522],
                            [61.259000, 73.452522],
                            [61.259400, 73.450522],
                            [61.261350, 73.437522],
                            [61.262000, 73.435522],
                        ],
                    ],
                    // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                    fillRule: "nonZero"
                },
                // Описываем свойства геообъекта.
                properties: {
                    // Содержимое балуна.
                    balloonContent: "Многоугольник"
                }
            }, {
                // Описываем опции геообъекта.
                // Цвет заливки.
                fillColor: '#FF00004D',
                // Цвет обводки.
                strokeColor: 'FF0000',
                // Общая прозрачность (как для заливки, так и для обводки).
                opacity: 0.5,
                // Ширина обводки.
                strokeWidth: 3,
                // Стиль обводки.
                strokeStyle: 'solid'
            });

            // Добавляем многоугольник на карту.
            myMapQual.geoObjects.add(northEastResidentialArea);

            
            
            
            // Создаем многоугольник, используя вспомогательный класс Polygon.
            /* var myPolygon = new ymaps.Polygon([
                // Указываем координаты вершин многоугольника.
                // Координаты вершин внешнего контура.
                [
                    [55.75, 37.50],
                    [55.80, 37.60],
                    [55.75, 37.70],
                    [55.70, 37.70],
                    [55.70, 37.50]
                ],
                // Координаты вершин внутреннего контура.
                [
                    [55.75, 37.52],
                    [55.75, 37.68],
                    [55.65, 37.60]
                ]
            ], {
                // Описываем свойства геообъекта.
                // Содержимое балуна.
                hintContent: "Многоугольник"
            }, {
                // Задаем опции геообъекта.
                // Цвет заливки.
                fillColor: '#00FF0088',
                // Ширина обводки.
                strokeWidth: 5
            }); */

            // Добавляем многоугольник на карту.
            /* myMapQual.geoObjects.add(myPolygon); */
        }
    }



})
