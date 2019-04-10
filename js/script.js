/*jshint esversion: 6 */

const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item');
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    const box = document. querySelector(boxBody),
          boxContent = document. querySelector(content);

    button.element.addEventListener('click', () => {
        if (button.active === false) { // проверяем активно ли меню
            button.active = true;  //если нет- делаем активным
            box.style.height = boxContent.clientHeight + 'px';  //див с классом header__menu
            box.classList.add(openClass); //активный класс для меню, тк мы еще не знаем назв класса
        } else {
            button.active = false;
            box.style.height = 0 + 'px';  //див с классом header__menu
            box.classList.remove(openClass);
        }
    });
}
bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {
    if (night === false) {
        night = true;
        /*document.body.style.backgroundColor = '#000';*/
        document.body.classList.add('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#fff';
        });

        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#fff';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#fff';
        });

        document.querySelector('.header__item-descr').style.color = '#fff';
        document.querySelector('.logo > img').src = 'logo/youtube_night.svg';
    } else {
        night = false;
        document.body.classList.remove('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000';
        });

        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelector('.header__item-descr').style.color = '#000';
        document.querySelector('.logo > img').src = 'logo/youtube.svg';
    }
}

let night = false;
switcher.addEventListener('change', () => {
    switchMode();
});

const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
        '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки  Урок 2',
        '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
    ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];

more. addEventListener('click', () => {
    const videosWrapper = document.querySelector('.videos__wrapper');
    more.remove(); //если бы не стрелочная ф, то могли бы this использ

    for (let i = 0; i < data[0].length; i++) { //для тех видео, кот. уже есть
        let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', data[3][i]);
        card.innerHTML = `
            <img src="${data[0][i]}" alt="thumb">
            <div class="videos__item-descr">
                ${data[1][i]}
            </div>
            <div class="videos__item-views">
                ${data[2][i]}
            </div>
        `;
        videosWrapper.appendChild(card);     
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        }, 10);
        bindNewModal(card);
    }

    sliceTitle('.videos__item-descr', 100);
});

function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        item.textContent.trim();

        if (item.textContent.length < count) {
            return;
        } else {
            const str = item.textContent.slice(0, count + 1) + "...";
            item.textContent = str;
        }
    });
}
sliceTitle('.videos__item-descr', 100);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    player.stopVideo(); //их докум взять из списка функций
}

function bindModal(cards) { // это videos все
    cards.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // тк видео это ссылка, то чтобы не переходить по ссылке на нов стр
            const id = item.getAttribute('data-url'); // для получения id для видео
            loadVideo(id); // загрузка видео до открытия мод окна
            openModal();          
        });   
    });
}
bindModal(videos); //не сможем ее в цикл выше вставить, тк она массив на вход принимает, а не по одному

function bindNewModal(newCards) { // для новых  подгруж.видео!каждый отдельный элемент, а не массив
    newCards.addEventListener('click', (event) => {
        event.preventDefault(); // тк видео это ссылка, то чтобы не переходить по ссылке на нов стр
        const id = newCards.getAttribute('data-url'); // для получения id для видео
        loadVideo(id); // загрузка видео до открытия мод окна
        openModal();
    });
}

modal.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal__body') /*&& || 'X'*/) { // если я не нажал на само окно, а в свобод.область,то закрыть его
        closeModal();
    }
});

/*function createVideoPlayer() { //внутри модалки создаем видео. !берем код из ютуб iframe api
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
        player = new YT.Player('frame', { // id дива, кот удалится
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE'
        });
    }, 300);
}
createVideoPlayer();*/

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    
    player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: 'M7lc1UVf-VE'
    });
  }  
onYouTubeIframeAPIReady();

function loadVideo(id) { //для загрузки нового видео
    player.loadVideoById({'videoId': `${id}`}); //взята функция из апи.интерполяция на всякий сделана, можно просто id
}
