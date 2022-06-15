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


    //Открытие меню при клике на телефон в хэдере
    /* let headerDropdown = document.querySelector('#headerDropdown');
    let menuDropdown = document.querySelector('#menuDropdown');

    headerDropdown.addEventListener('click', function () {
        menuDropdown.classList.add('open');
    })

    document.addEventListener('click', function(event) {
        console.log(event.target)
        if(event.target !== menuDropdown) {
            menuDropdown.classList.remove('open');
        }
    }) */

})


