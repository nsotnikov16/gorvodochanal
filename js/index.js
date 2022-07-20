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
    let menuLink = document.querySelector('#menuHelp'); // Контейнер ссылок для делегирования
    let menuDefault = menuHelp.innerHTML; //Контент меню по умолчанию, записывается в переменную
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


    //Делигирование клика по ссылкам и смена контента
    menuLink.addEventListener('click', function (event) {
        //Задаем дата атрибуты с номерами всем ссылкам
        let dataLinks = document.querySelectorAll('.menu__help__content__link');
        let i = 0;
        for (let dataLink of dataLinks) {
            dataLink.dataset.number = i;
            i++;
        }
        //Делегируем событие клика
        if (event.target.classList.contains('menu__help__content__link')) {
            event.preventDefault();
            menuAsideHead.style.visibility = "hidden";
            //Подставляем контент из объекта в соответствии с номером равному номеру дата атрибута
            menuHelp.innerHTML = '<div class="menu__help__head"><span class="menu-aside__back-btn">&lt; Назад</span><button class="menu__close__icon help__close__menu" aria-label="Закрыть окно"></button></div>'
                + `<div class="menu__aside__enter__container"><h2 class="menu__aside__head__link">${event.target.textContent}</h2>${objAside[event.target.dataset.number]}`;
            //Кнопка назад в меню
            var menuBack = document.querySelector('.menu-aside__back-btn');
            menuBack.addEventListener('click', function () {
                menuHelp.innerHTML = menuDefault;
            })
        }
    })

    //Объект с контентом для бокового меню "Помощь"
    let objAside = {
        0: '<p class="menu__aside__enter__text">Для оформления заявки по перекрытию/открытию/отглушению водопроводного ввода необходимо направить на эл. адрес: <a href="mailto:info@vodokanal-surgut.ru">info@vodokanal-surgut.ru</a> или привезти нарочно, гарантийное письмо на выполнение работ. Образцы заявки находятся по следующей <a href="#">ссылке</a>. Также просим обратить внимание, что при направлении заявки на "отглушение" водопроводного ввода необходимо приложить свидетельство о государственной регистрации права на объекты и на земельные участки (либо выписки из ЕГРН), а также схему с указанием точек отглушения.</p></div>',

        1: '<p class="menu__aside__enter__text">Порядок подключения к централизованным системам холодного водоснабжения и/или водоотведения</p></div>',

        2: '<p class="menu__aside__enter__text">Форма заявления о подключении к централизованным системам холодного водоснабжения и/или водоотведения</p></div>',

        3: '<p class="menu__aside__enter__text">Для оформления заявки по перекрытию/открытию/отглушению водопроводного ввода необходимо направить на эл. адрес: <a href="mailto:info@vodokanal-surgut.ru">info@vodokanal-surgut.ru</a> или привезти нарочно, гарантийное письмо на выполнение работ. Образцы заявки находятся по следующей <a href="#">ссылке</a>. Также просим обратить внимание, что при направлении заявки на "отглушение" водопроводного ввода необходимо приложить свидетельство о государственной регистрации права на объекты и на земельные участки (либо выписки из ЕГРН), а также схему с указанием точек отглушения.</p></div>',

        4: '<p class="menu__aside__enter__text">Порядок подключения к централизованным системам холодного водоснабжения и/или водоотведения</p></div>',

        5: '<p class="menu__aside__enter__text">Форма заявления о подключении к централизованным системам холодного водоснабжения и/или водоотведения</p></div>',

        6: '<p class="menu__aside__enter__text">Для оформления заявки по перекрытию/открытию/отглушению водопроводного ввода необходимо направить на эл. адрес: <a href="mailto:info@vodokanal-surgut.ru">info@vodokanal-surgut.ru</a> или привезти нарочно, гарантийное письмо на выполнение работ. Образцы заявки находятся по следующей <a href="#">ссылке</a>. Также просим обратить внимание, что при направлении заявки на "отглушение" водопроводного ввода необходимо приложить свидетельство о государственной регистрации права на объекты и на земельные участки (либо выписки из ЕГРН), а также схему с указанием точек отглушения.</p></div>',

        7: '<p class="menu__aside__enter__text">Порядок подключения к централизованным системам холодного водоснабжения и/или водоотведения</p></div>',

        8: '<p class="menu__aside__enter__text">Форма заявления о подключении к централизованным системам холодного водоснабжения и/или водоотведения</p></div>',

    }

    //Подстановка меню в выпадающее меню
    let headerNav = document.querySelector('#headerNav');
    menu.innerHTML = headerNav.innerHTML + menu.innerHTML;
    let headerDropdown = document.querySelector('.header__dropdown');
    menu.innerHTML = menu.innerHTML + headerDropdown.innerHTML;


    //Аккордеон меню слева
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
                    // Записываем в ипут адрес
                    mapAddress.value = myPlacemark.properties._data['balloonContent'];
                    mapAddress.nextElementSibling.classList.add('placeholder__top');
                    mapAddress.classList.add('valid');
                });
            }
        }
    }



    let mapAddress = document.querySelector('#mapAddress');

    /* Селекты */
    let selects = document.querySelectorAll('.select');
    let options = document.querySelectorAll('.select__option label');

    //Открытие селекта
    for (let select of selects) {
        select.addEventListener('click', function () {
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
            event.target.parentNode.parentNode.previousElementSibling.firstChild.innerHTML = option.innerHTML;
            option.parentNode.parentNode.parentNode.classList.remove('open');
            option.parentNode.parentNode.parentNode.classList.remove('border');
            option.parentNode.parentNode.parentNode.firstChild.nextElementSibling.firstChild.nextElementSibling.classList.remove('open');
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
     //Показ файлов выбранных для загрузки 
     class File {
        constructor(input, index) {
            this._input = input
            this._list = document.querySelector(`[data-input="${index}"]`)
            this._accept = input.getAttribute('accept')
            this._size = Number(input.dataset.size) * 1024 * 1024
            this._sizeCounter = 0
            this._files = []
            this._multiple = Number(input.dataset.multiple)
            this._input.addEventListener('change', () => {
                this._files.length == 0 ? this._files = Array.from(this._input.files) : this._files = [...this._files, ...this._input.files]

                this._list.innerHTML = ''

                if (this._multiple && this._files.length > this._multiple) return this.checkCounter()

                this._files.forEach(item => this._sizeCounter += item.size)

                if (this._sizeCounter > this._size) return this.checkSize()

                this._files.forEach(item => {
                    this._sizeCounter += item.size
                    this.checkFormat(item.name)
                })

                const deleteIcons = this._list.querySelectorAll('.file__delete__icon')
                deleteIcons.forEach(icon => icon.addEventListener('click', () => {
                    this._files = this._files.filter(item => item.name !== icon.dataset.name)
                    icon.parentNode.remove()
                }))

                const noFormats = this._list.querySelectorAll('.file__no-format')
                if (noFormats.length > 0) noFormats.forEach(no => setTimeout(() => no.remove(), 3000))

            })
        }

        checkFormat(fileName) {
            const indexLastPoint = fileName.lastIndexOf('.')
            const type = fileName.split('').splice(indexLastPoint + 1, fileName.length - indexLastPoint).join('')
            if (!this._accept.includes(type)) {
                this._list.insertAdjacentHTML('beforeend', `<li class="file__no-format" style="color: red">Неподходящий формат для файла: ${fileName}</li>`)
                this._files = this._files.filter(item => item.name !== fileName)
            } else {
                this._list.insertAdjacentHTML('beforeend', `<li>${fileName} <span data-name="${fileName}" class="file__delete__icon"></span></li>`)
            }
        }

        checkSize() {
            this._list.innerHTML = `<li style="color: red"><b>Объем превышен указанного лимита<b></li>`
            this._files = []
            this._sizeCounter = 0
        }

        checkCounter() {
            this._list.innerHTML = `<li style="color: red"><b>Максимальное количество файлов: ${this._multiple}<b></li>`
            this._files = []
        }
    }
    let files = document.querySelectorAll('.form__input__file input[type="file"]');
    let fileLists = document.querySelectorAll('.form__input__file__list')
    if (files.length > 0) files.forEach((file, index) => { fileLists[index].setAttribute('data-input', index); new File(file, index); })
    /*  console.log(arrInputsFile) */


    //Выводим название файлов при изменении инпута
    /* for (let file of files) {
        
        let arrFiles = [];
        file.addEventListener('input', function (event) {
            for (let i = 0; i < file.files.length; i++) {
                arrFiles = Array.from(event.target.files);
                console.log(arrFiles)
                let li = document.createElement('li');
                li.innerHTML = file.files[`${i}`].name + `<span data-name="${file.files[i].name}" class="file__delete__icon"></span>`;
                if (file.parentNode.parentNode.nextElementSibling.tagName == 'UL') {
                    file.parentNode.parentNode.nextElementSibling.appendChild(li);
                }
            }
            let deleteFileButtons = document.querySelectorAll('.file__delete__icon');
            for (let deleteFileButton of deleteFileButtons) {
                deleteFileButton.addEventListener('click', function (event) {
                    const { name } = event.target.dataset;
                    arrFiles = arrFiles.filter(file => file.name !== name);
                    this.parentNode.innerHTML = '';
                    console.log(arrFiles)
                })
            }
        })
    } */


    //Аккордеон на странице контакты
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

            document.addEventListener('click', function (event) {
                if ((popupPhoto.childNodes[1].childNodes[1].childNodes[1].src != '') && (event.target == popupPhoto)) {
                    popupPhoto.classList.remove('popup_opened');
                    popupPhoto.childNodes[1].childNodes[1].childNodes[1].src = '';
                }
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
            legalForm.classList.remove('personal__form__active');
            individualForm.classList.add('personal__form__active');
        })
    }
    if (legalBtn) {
        legalBtn.addEventListener('click', function () {
            individualBtn.classList.remove('personal__area__active');
            legalBtn.classList.add('personal__area__active');
            individualForm.classList.remove('personal__form__active');
            legalForm.classList.add('personal__form__active');
        })
    }

    //Маска телефона
    let inputTels = document.querySelectorAll("input[type='tel']");
    if (inputTels.length > 0) {
        let im = new Inputmask("+7 (999)-999-99-99");
        for (let tel of inputTels) {
            im.mask(tel);
        }
    }

    //Валдиация инпутов
    let validInputs = document.querySelectorAll('input[data-rule]');
    let buttonSubmits = document.querySelectorAll('.form__submit');
    let checkAgree = document.querySelector('input[type="checkbox"][data-agree]');
    for (let validInput of validInputs) {
        validInput.addEventListener('input', function () {
            let rule = this.dataset.rule;
            let value = this.value;
            let check;
            switch (rule) {
                case 'text':
                    check = this.value.length >= 1;
                    break;
                case 'number':
                    check = /^\d+$/.test(value);
                    break;
                case 'email':
                    check = (this.value.includes('@') && this.value.includes('.')) && this.value.length > 2;
                    break;
                case 'tel':
                    check = (!this.value.includes('_') && this.value.includes(' '));
                    break;
                case 'inn':
                    check = /^\d+$/.test(value) && this.value.length == 10;
                    break;
                case 'date':
                    check = this.value.includes('-');
                    break;
                case 'password':
                    check = this.value.length > 4;
                    break;
                default:
                    check;
                    break;
            }
            if (check) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        })
    }

    // Валидация селекта
    let inputSelects = document.querySelectorAll('input[type="radio"]');
    for (let select of selects) {
        select.addEventListener('click', function (event) {
            for (let inputSelect of inputSelects) {
                if (inputSelect.checked) {
                    select.classList.add('valid');
                }
            }
        })
    }

    //Проверка всех полей на валидность перед отправкой
    for (let buttonSubmit of buttonSubmits) {
        buttonSubmit.addEventListener('click', function (event) {
            event.preventDefault();
            let validInputCounter = 0;
            let selectCount = 0;
            // Если есть селекты на странице то валидируем их
            if (selects.length > 0) {
                for (let select of selects) {
                    if(select.classList.contains('valid')) {
                        selectCount++;
                    } else {
                        select.classList.add('invalid');
                    }
                }
            }
            // Проверка полей на валидность
            for (let validInput of validInputs) {
                if (validInput.classList.contains('valid')) {
                    validInputCounter++;
                } else {
                    validInput.classList.add('invalid');
                }
            }
            if(checkAgree) { //Если чекбокс согласия присутствуют, то он учитываются при валидации, иначе нет
                if ((validInputCounter == validInputs.length) && checkAgree.checked && selectCount == selects.length) {
                    console.log('valid');
                } else {
                    console.log('invalid');
                }
            } else {
                if ((validInputCounter == validInputs.length) && selectCount == selects.length) {
                    console.log('valid');
                } else {
                    console.log('invalid');
                }
            }
        })
    }


    // Валидация входа в личный кабинет
    let submitIndividualArea = document.querySelector('#submitIndividualArea');
    let submitLegalArea = document.querySelector('#submitLegalArea');
    
    // Частные лица
    if(submitIndividualArea) {
        let inputIndividualForms = individualForm.querySelectorAll('input');
        let validInputCounter = 0;
        submitIndividualArea.addEventListener('click', (event) => {
            event.preventDefault();
            for(let inputIndividualForm of inputIndividualForms) {
                if(inputIndividualForm.classList.contains('valid')) {
                    validInputCounter++;
                }else {
                    inputIndividualForm.classList.add('invalid');
                }
            }
            if ((validInputCounter == (validInputs.length - 2))) {
                console.log('valid');
            } else {
                console.log('invalid');
            }
        })
    }

    // Юр.лица
    if(submitLegalArea) {
        let inputLegalForms = legalForm.querySelectorAll('input');
        let validInputCounter = 0;
        submitLegalArea.addEventListener('click', (event) => {
            event.preventDefault();
            for(let inputLegalForm of inputLegalForms) {
                if(inputLegalForm.classList.contains('valid')) {
                    validInputCounter++;
                } else {
                    inputLegalForm.classList.add('invalid');
                }
            }
            if ((validInputCounter == (validInputs.length - 2))) {
                console.log('valid');
            } else {
                console.log('invalid');
            }
        })
    }
    
    

    //Карта на странице качество воды
    if (document.getElementById('mapQuality')) {
        ymaps.ready(init);

        function init() {
            var myMapQual = new ymaps.Map("mapQuality", {
                center: [61.287350, 73.40980],
                zoom: 11
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
                    ],
                    // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                    fillRule: "nonZero"
                },
                // Описываем свойства геообъекта.
                properties: {
                    // Содержимое балуна.
                    balloonContent: "Северный промышленный район"
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
                    balloonContent: "Северо-Восточный жилой район"
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

            // Создаем многоугольник, используя класс GeoObject.
            var centralDistrict = new ymaps.GeoObject({
                // Описываем геометрию геообъекта.
                geometry: {
                    // Тип геометрии - "Многоугольник".
                    type: "Polygon",
                    // Указываем координаты вершин многоугольника.
                    coordinates: [
                        // Координаты вершин внешнего контура.
                        [
                            [61.257600, 73.417522],
                            [61.255800, 73.416522],
                            [61.255300, 73.416222],
                            [61.255000, 73.416222],
                            [61.254500, 73.416522],
                            [61.247460, 73.421822],
                            [61.247200, 73.420422],
                            [61.246060, 73.419522],
                            [61.245060, 73.419022],
                            [61.244560, 73.418522],
                            [61.243260, 73.414522],
                            [61.243060, 73.414022],
                            [61.242060, 73.414022],
                            [61.241060, 73.414522],
                            [61.239060, 73.415522],
                            [61.238060, 73.415022],
                            [61.235060, 73.411922],
                            [61.234060, 73.411922],
                            [61.233460, 73.410922],
                            [61.232960, 73.407022],
                            [61.232960, 73.404422],
                            [61.232960, 73.402422],
                            [61.231960, 73.401922],
                            [61.230960, 73.402922],
                            [61.229960, 73.403922],
                            [61.229060, 73.403922],
                            [61.228060, 73.403922],
                            [61.227560, 73.400922],
                            [61.227560, 73.399922],
                            [61.227560, 73.390922],
                            [61.229560, 73.380922],
                            [61.235560, 73.360022],
                            [61.236560, 73.358022],
                            [61.246560, 73.354022],
                            [61.247560, 73.352222],
                            [61.257560, 73.341422],
                            [61.258560, 73.340822],
                            [61.259560, 73.341022],
                            [61.260560, 73.341322],
                            [61.262060, 73.342322],
                            [61.267800, 73.350122],
                            [61.267000, 73.357022],
                            [61.266200, 73.359922],
                            [61.265600, 73.361500],
                            [61.265200, 73.362000],
                            [61.262000, 73.365500],
                            [61.264100, 73.374000],
                            [61.262800, 73.375550],
                            [61.262350, 73.376550],
                        ],
                    ],
                    // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                    fillRule: "nonZero"
                },
                // Описываем свойства геообъекта.
                properties: {
                    // Содержимое балуна.
                    balloonContent: "Центральный район"
                }
            }, {
                // Описываем опции геообъекта.
                // Цвет заливки.
                fillColor: '7BFF88',
                // Цвет обводки.
                strokeColor: '24FF00',
                // Общая прозрачность (как для заливки, так и для обводки).
                opacity: 0.5,
                // Ширина обводки.
                strokeWidth: 3,
                // Стиль обводки.
                strokeStyle: 'solid'
            });

            // Добавляем многоугольник на карту.
            myMapQual.geoObjects.add(centralDistrict);
            // Создаем многоугольник, используя класс GeoObject.
            var easternRegion = new ymaps.GeoObject({
                // Описываем геометрию геообъекта.
                geometry: {
                    // Тип геометрии - "Многоугольник".
                    type: "Polygon",
                    // Указываем координаты вершин многоугольника.
                    coordinates: [
                        // Координаты вершин внешнего контура.
                        [
                            [61.258150, 73.453900],
                            [61.259250, 73.462100],
                            [61.260150, 73.476700],
                            [61.270450, 73.476200],
                            [61.272100, 73.468700],
                            [61.273800, 73.464700],
                            [61.277100, 73.461000],
                            [61.278000, 73.464000],
                            [61.280500, 73.466000],
                            [61.280000, 73.470000],
                            [61.280500, 73.470400],
                            [61.280500, 73.470400],
                            [61.280750, 73.470100],
                            [61.281000, 73.469950],
                            [61.289000, 73.469750],
                            [61.286500, 73.490750],
                            [61.286000, 73.492750],
                            [61.282500, 73.506750],
                            [61.282300, 73.509750],
                            [61.282550, 73.516750],
                            [61.282350, 73.520750],
                            [61.281050, 73.521750],
                            [61.280050, 73.522750],
                            [61.275050, 73.524750],
                            [61.274050, 73.525750],
                            [61.272050, 73.525050],
                            [61.270050, 73.522050],
                            [61.260050, 73.522250],
                            [61.252050, 73.531250],
                            [61.250050, 73.531250],
                            [61.247050, 73.529250],
                            [61.244050, 73.527250],
                            [61.242950, 73.517750],
                            [61.241550, 73.511750],
                            [61.235550, 73.501750],
                            [61.230550, 73.480750],
                            [61.226550, 73.459750],
                            [61.226550, 73.409750],
                            [61.227550, 73.406750],
                            [61.228550, 73.404750],
                            [61.230550, 73.404050],
                            [61.232050, 73.402250],
                            [61.232650, 73.403250],
                            [61.232650, 73.408250],
                            [61.233050, 73.410250],
                            [61.233550, 73.411250],
                            [61.234050, 73.412100],
                            [61.235050, 73.412100],
                            [61.238050, 73.415100],
                            [61.239050, 73.415700],
                            [61.242100, 73.414100],
                            [61.243050, 73.414100],
                            [61.244550, 73.418600],
                            [61.245350, 73.419300],
                            [61.247200, 73.420500],
                            [61.248350, 73.427050],
                            [61.248350, 73.427050],
                            [61.248400, 73.430000],
                            [61.248350, 73.434000],
                            [61.252650, 73.458000],
                        ],
                    ],
                    // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                    fillRule: "nonZero"
                },
                // Описываем свойства геообъекта.
                properties: {
                    // Содержимое балуна.
                    balloonContent: "Восточный район"
                }
            }, {
                // Описываем опции геообъекта.
                // Цвет заливки.
                fillColor: 'FCFF7B',
                // Цвет обводки.
                strokeColor: 'FFE600',
                // Общая прозрачность (как для заливки, так и для обводки).
                opacity: 0.5,
                // Ширина обводки.
                strokeWidth: 3,
                // Стиль обводки.
                strokeStyle: 'solid'
            });

            // Добавляем многоугольник на карту.
            myMapQual.geoObjects.add(easternRegion);


            // Создаем многоугольник, используя класс GeoObject.
            var northernResidentialArea = new ymaps.GeoObject({
                // Описываем геометрию геообъекта.
                geometry: {
                    // Тип геометрии - "Многоугольник".
                    type: "Polygon",
                    // Указываем координаты вершин многоугольника.
                    coordinates: [
                        // Координаты вершин внешнего контура.
                        [
                            [61.257700, 73.417600],
                            [61.262400, 73.376650],
                            [61.262850, 73.375650],
                            [61.264150, 73.374050],
                            [61.262050, 73.365550],
                            [61.265620, 73.361600],
                            [61.266220, 73.360000],
                            [61.267050, 73.357000],
                            [61.267850, 73.350000],
                            [61.262050, 73.342150],
                            [61.260550, 73.341150],
                            [61.260750, 73.340150],
                            [61.261750, 73.336150],
                            [61.265750, 73.306150],
                            [61.261050, 73.282150],
                            [61.264350, 73.276550],
                            [61.263850, 73.272550],
                            [61.264080, 73.271150],
                            [61.270080, 73.279150],
                            [61.272080, 73.281000],
                            [61.273080, 73.281500],
                            [61.275500, 73.282000],
                            [61.275600, 73.231000],
                            [61.276400, 73.230300],
                            [61.276400, 73.228300],
                            [61.276920, 73.226250],
                            [61.276920, 73.221200],
                            [61.276720, 73.219900],
                            [61.277720, 73.222400],
                            [61.278420, 73.225600],
                            [61.278800, 73.229400],
                            [61.279500, 73.235950],
                            [61.280000, 73.235950],
                            [61.283500, 73.265950],
                            [61.284000, 73.268950],
                            [61.284500, 73.270950],
                            [61.285500, 73.273550],
                            [61.286500, 73.274950],
                            [61.288500, 73.277950],
                            [61.289400, 73.279950],
                            [61.290900, 73.286950],
                            [61.295000, 73.284450],
                            [61.296000, 73.293050],
                            [61.298000, 73.293050],
                            [61.298500, 73.299050],
                            [61.296000, 73.300550],
                            [61.299000, 73.340550],
                            [61.297800, 73.380550],
                            [61.297500, 73.383100],
                            [61.270000, 73.370700],
                            [61.264020, 73.421580],
                        ],
                    ],
                    // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                    fillRule: "nonZero"
                },
                // Описываем свойства геообъекта.
                properties: {
                    // Содержимое балуна.
                    balloonContent: "Северный жилой район"
                }
            }, {
                // Описываем опции геообъекта.
                // Цвет заливки.
                fillColor: 'AD7BFF',
                // Цвет обводки.
                strokeColor: '7000FF',
                // Общая прозрачность (как для заливки, так и для обводки).
                opacity: 0.5,
                // Ширина обводки.
                strokeWidth: 3,
                // Стиль обводки.
                strokeStyle: 'solid'
            });

            // Добавляем многоугольник на карту.
            myMapQual.geoObjects.add(northernResidentialArea);

            // Создаем многоугольник, используя класс GeoObject.
            var northernResidentialArea2 = new ymaps.GeoObject({
                // Описываем геометрию геообъекта.
                geometry: {
                    // Тип геометрии - "Многоугольник".
                    type: "Polygon",
                    // Указываем координаты вершин многоугольника.
                    coordinates: [
                        // Координаты вершин внешнего контура.
                        [
                            [61.338350, 73.409700],
                            [61.330350, 73.409400],
                            [61.328250, 73.407000],
                            [61.328900, 73.404250],
                            [61.328200, 73.403550],
                            [61.328300, 73.402550],
                            [61.328940, 73.403300],
                            [61.329050, 73.402900],
                            [61.329300, 73.402950],
                            [61.330090, 73.403750],
                            [61.330090, 73.403750],
                            [61.330090, 73.401750],
                            [61.329190, 73.399800],
                            [61.329190, 73.397500],
                            [61.329900, 73.395900],
                            [61.331400, 73.395800],
                            [61.331550, 73.393800],
                            [61.332100, 73.393600],
                            [61.332150, 73.392800],
                            [61.332220, 73.392440],
                            [61.332370, 73.392260],
                            [61.333700, 73.392850],
                            [61.333720, 73.392620],
                            [61.335150, 73.392670],
                            [61.335400, 73.393000],
                            [61.335650, 73.393670],
                            [61.335700, 73.393870],
                            [61.335750, 73.395670],
                            [61.336700, 73.395250],
                            [61.337800, 73.395100],
                            [61.338800, 73.394000],
                            [61.340200, 73.394000],
                            [61.340200, 73.390200],
                            [61.341200, 73.390200],
                            [61.341600, 73.379000],
                            [61.344000, 73.374000],
                            [61.344500, 73.374000],
                            [61.344500, 73.430000],
                            [61.341300, 73.430000],
                            [61.340400, 73.425700],
                            [61.339900, 73.425100],
                            [61.339750, 73.422500],
                            [61.338000, 73.421000],
                            [61.337600, 73.418300],
                            [61.337450, 73.414250],
                            [61.338300, 73.413900],
                        ],
                    ],
                    // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
                    fillRule: "nonZero"
                },
                // Описываем свойства геообъекта.
                properties: {
                    // Содержимое балуна.
                    balloonContent: "Северный жилой район"
                }
            }, {
                // Описываем опции геообъекта.
                // Цвет заливки.
                fillColor: 'AD7BFF',
                // Цвет обводки.
                strokeColor: '7000FF',
                // Общая прозрачность (как для заливки, так и для обводки).
                opacity: 0.5,
                // Ширина обводки.
                strokeWidth: 3,
                // Стиль обводки.
                strokeStyle: 'solid'
            });

            // Добавляем многоугольник на карту.
            myMapQual.geoObjects.add(northernResidentialArea2);


            let selectedArea = document.querySelector('#selectedArea');
            //получение координат клика по объектам
            northernResidentialArea2.events.add('click', function (e) {
                selectedArea.innerHTML = 'Вы выбрали: <span>Северный жилой район</span>';
                qualityTable.innerHTML = `<tr><th>Определяемый показатель</th><th>Единицы измерения</th><th>Значение</th><th>Норматив (СанПиН 2.1.4.1074-01)</th></tr>
                <tr><td>Водородный показатель (рН)</td><td>ед. рН</td><td>7,9</td><td>в пределах 6,0-9,0</td></tr>
                <tr><td>Жесткость общая</td><td>градус жесткости</td><td>6,8</td><td>не более 7,0</td></tr>
                <tr><td>Цветность</td><td>градус</td><td>6</td><td>не более 20</td></tr><tr><td>Мутность</td><td>мг/дм3</td><td>&#706; 0,58</td><td>не более 1,5</td></tr>
                <tr><td>Остаточный хлор</td><td>мг/дм3</td><td>1,15</td><td>в распределительной сети не нормируется</td></tr>
                <tr><td>Запах при 20С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Запах при 60С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Железо общее</td><td>мг/дм3</td><td>0,10</td><td>не более 0,3</td></tr>
                <tr><td>Общее микробное число (ОМЧ)</td><td>кол. в 1 мл</td><td>отс</td><td>не более 50</td></tr>
                <tr><td>Общие колиформные бактерии (ОКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>
                <tr><td>Термотолерантные колиформные бактерии (ТКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>`;
                addAreaDescription();
                tableAddDataset();
            });

            northernResidentialArea.events.add('click', function (e) {
                selectedArea.innerHTML = 'Вы выбрали: <span>Северный жилой район</span>';
                qualityTable.innerHTML = `<tr><th>Определяемый показатель</th><th>Единицы измерения</th><th>Значение</th><th>Норматив (СанПиН 2.1.4.1074-01)</th></tr>
                <tr><td>Водородный показатель (рН)</td><td>ед. рН</td><td>7,4</td><td>в пределах 6,0-9,0</td></tr>
                <tr><td>Жесткость общая</td><td>градус жесткости</td><td>6,12</td><td>не более 7,0</td></tr>
                <tr><td>Цветность</td><td>градус</td><td>6</td><td>не более 20</td></tr><tr><td>Мутность</td><td>мг/дм3</td><td>&#706; 0,58</td><td>не более 1,5</td></tr>
                <tr><td>Остаточный хлор</td><td>мг/дм3</td><td>1,15</td><td>в распределительной сети не нормируется</td></tr>
                <tr><td>Запах при 20С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Запах при 60С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Железо общее</td><td>мг/дм3</td><td>0,10</td><td>не более 0,3</td></tr>
                <tr><td>Общее микробное число (ОМЧ)</td><td>кол. в 1 мл</td><td>отс</td><td>не более 50</td></tr>
                <tr><td>Общие колиформные бактерии (ОКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>
                <tr><td>Термотолерантные колиформные бактерии (ТКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>`;
                addAreaDescription();
                tableAddDataset();
            });

            centralDistrict.events.add('click', function (e) {
                selectedArea.innerHTML = 'Вы выбрали: <span>Центральный район</span>';
                qualityTable.innerHTML = `<tr><th>Определяемый показатель</th><th>Единицы измерения</th><th>Значение</th><th>Норматив (СанПиН 2.1.4.1074-01)</th></tr>
                <tr><td>Водородный показатель (рН)</td><td>ед. рН</td><td>7,9</td><td>в пределах 6,0-9,0</td></tr>
                <tr><td>Жесткость общая</td><td>градус жесткости</td><td>6,5</td><td>не более 7,0</td></tr>
                <tr><td>Цветность</td><td>градус</td><td>6</td><td>не более 20</td></tr><tr><td>Мутность</td><td>мг/дм3</td><td>&#706; 0,58</td><td>не более 1,5</td></tr>
                <tr><td>Остаточный хлор</td><td>мг/дм3</td><td>1,15</td><td>в распределительной сети не нормируется</td></tr>
                <tr><td>Запах при 20С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Запах при 60С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Железо общее</td><td>мг/дм3</td><td>0,10</td><td>не более 0,3</td></tr>
                <tr><td>Общее микробное число (ОМЧ)</td><td>кол. в 1 мл</td><td>отс</td><td>не более 50</td></tr>
                <tr><td>Общие колиформные бактерии (ОКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>
                <tr><td>Термотолерантные колиформные бактерии (ТКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>`;
                addAreaDescription();
                tableAddDataset();
            });

            northernIndustrialArea.events.add('click', function (e) {
                selectedArea.innerHTML = 'Вы выбрали: <span>Северный промышленный район</span>';
                qualityTable.innerHTML = `<tr><th>Определяемый показатель</th><th>Единицы измерения</th><th>Значение</th><th>Норматив (СанПиН 2.1.4.1074-01)</th></tr>
                <tr><td>Водородный показатель (рН)</td><td>ед. рН</td><td>7,2</td><td>в пределах 6,0-9,0</td></tr>
                <tr><td>Жесткость общая</td><td>градус жесткости</td><td>6,02</td><td>не более 7,0</td></tr>
                <tr><td>Цветность</td><td>градус</td><td>6</td><td>не более 20</td></tr><tr><td>Мутность</td><td>мг/дм3</td><td>&#706; 0,58</td><td>не более 1,5</td></tr>
                <tr><td>Остаточный хлор</td><td>мг/дм3</td><td>1,15</td><td>в распределительной сети не нормируется</td></tr>
                <tr><td>Запах при 20С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Запах при 60С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Железо общее</td><td>мг/дм3</td><td>0,10</td><td>не более 0,3</td></tr>
                <tr><td>Общее микробное число (ОМЧ)</td><td>кол. в 1 мл</td><td>отс</td><td>не более 50</td></tr>
                <tr><td>Общие колиформные бактерии (ОКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>
                <tr><td>Термотолерантные колиформные бактерии (ТКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>`;
                addAreaDescription();
                tableAddDataset();
            });

            northEastResidentialArea.events.add('click', function (e) {
                selectedArea.innerHTML = 'Вы выбрали: <span>Северо восточный жилой район</span>';
                qualityTable.innerHTML = `<tr><th>Определяемый показатель</th><th>Единицы измерения</th><th>Значение</th><th>Норматив (СанПиН 2.1.4.1074-01)</th></tr>
                <tr><td>Водородный показатель (рН)</td><td>ед. рН</td><td>7,5</td><td>в пределах 6,0-9,0</td></tr>
                <tr><td>Жесткость общая</td><td>градус жесткости</td><td>6,5</td><td>не более 7,0</td></tr>
                <tr><td>Цветность</td><td>градус</td><td>6</td><td>не более 20</td></tr><tr><td>Мутность</td><td>мг/дм3</td><td>&#706; 0,58</td><td>не более 1,5</td></tr>
                <tr><td>Остаточный хлор</td><td>мг/дм3</td><td>1,15</td><td>в распределительной сети не нормируется</td></tr>
                <tr><td>Запах при 20С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Запах при 60С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Железо общее</td><td>мг/дм3</td><td>0,10</td><td>не более 0,3</td></tr>
                <tr><td>Общее микробное число (ОМЧ)</td><td>кол. в 1 мл</td><td>отс</td><td>не более 50</td></tr>
                <tr><td>Общие колиформные бактерии (ОКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>
                <tr><td>Термотолерантные колиформные бактерии (ТКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>`;
                addAreaDescription();
                tableAddDataset();
            });

            easternRegion.events.add('click', function (e) {
                selectedArea.innerHTML = 'Вы выбрали: <span>Восточный район</span>';
                qualityTable.innerHTML = `<tr><th>Определяемый показатель</th><th>Единицы измерения</th><th>Значение</th><th>Норматив (СанПиН 2.1.4.1074-01)</th></tr>
                <tr><td>Водородный показатель (рН)</td><td>ед. рН</td><td>7,9</td><td>в пределах 6,0-9,0</td></tr>
                <tr><td>Жесткость общая</td><td>градус жесткости</td><td>6,0</td><td>не более 7,0</td></tr>
                <tr><td>Цветность</td><td>градус</td><td>6</td><td>не более 20</td></tr><tr><td>Мутность</td><td>мг/дм3</td><td>&#706; 0,58</td><td>не более 1,5</td></tr>
                <tr><td>Остаточный хлор</td><td>мг/дм3</td><td>1,15</td><td>в распределительной сети не нормируется</td></tr>
                <tr><td>Запах при 20С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Запах при 60С</td><td>баллы</td><td>1</td><td>не более 2</td></tr>
                <tr><td>Железо общее</td><td>мг/дм3</td><td>0,10</td><td>не более 0,3</td></tr>
                <tr><td>Общее микробное число (ОМЧ)</td><td>кол. в 1 мл</td><td>отс</td><td>не более 50</td></tr>
                <tr><td>Общие колиформные бактерии (ОКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>
                <tr><td>Термотолерантные колиформные бактерии (ТКБ)</td><td>КОЕ/100 мл</td><td>отс</td><td>отсутствие</td></tr>`;
                addAreaDescription();
                tableAddDataset();
            });
        }
    }

    function addAreaDescription() {
        qualityTable.nextSibling.nextSibling.classList.add('quality__description__under__table-active');
    }

    let qualityTable = document.querySelector('#qualityTable');

    //Таблица качества воды, присваивание data-label всем td для адаптива таблицы
    function tableAddDataset() {
        let qualityTableTrs = document.querySelectorAll('#qualityTable tr');
        for (let qualityTableTr of qualityTableTrs) {
            qualityTableTr.childNodes[0].dataset.label = 'Определяемый показатель';
            qualityTableTr.childNodes[1].dataset.label = 'Единицы измерения';
            qualityTableTr.childNodes[2].dataset.label = 'Значение';
            qualityTableTr.childNodes[3].dataset.label = 'Норматив';
        }
    }
})
