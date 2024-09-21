let gameScreen;             // 현재 실행중인 게임 Container
let sliderContainer;        // 메뉴 Container
let swiper;

document.addEventListener('DOMContentLoaded', function () {
    const gameImages = [
        'https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&dpr=1', 
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&dpr=1', 
        'https://images.pexels.com/photos/3791464/pexels-photo-3791464.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&dpr=1', 
        'https://images.pexels.com/photos/2760318/pexels-photo-2760318.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&dpr=1', 
        'https://images.pexels.com/photos/355988/pexels-photo-355988.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&dpr=1'
    ];

    const swiperWrapper = document.querySelector('.swiper-wrapper');
    sliderContainer = document.querySelector('.slider-container');

    NProgress.start(); // NProgress 시작

    let imagesLoaded = 0;
    const totalImages = gameImages.length;

    gameImages.forEach(image => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = "Game Image";
        slide.appendChild(imgElement);
        swiperWrapper.appendChild(slide);

        // 이미지가 로드될 때마다 로딩바 업데이트
        imgElement.onload = function() {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                NProgress.done(); // 모든 이미지 로드 완료 시 NProgress 종료
                sliderContainer.style.display = 'block';
                gsap.fromTo(sliderContainer, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            }
        };
    });

    swiper= new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const startButton = document.querySelector('.start-button');

    startButton.addEventListener('touchstart', function() {
        gameScreen = createGameLodingScreen(swiper.realIndex);
        document.querySelector('body').appendChild(gameScreen);
        
        gsap.to(sliderContainer, { opacity: 0, duration: 0.5 });
        gsap.to(gameScreen, { opacity: 1, duration: 0.5, pointerEvents: 'auto' });
    });
});

// 게임로딩 스크린 생성
function createGameLodingScreen( gameScreenIdx ){

    // select game id
    const activeSlideIndex = swiper.realIndex;
    const gameScreenId = `game-screen-${activeSlideIndex + 1}`;

    // game Container
    const gameLodingContainer = document.createElement('div');
    gameLodingContainer.id = gameScreenId;
    gameLodingContainer.className = 'game-screen';
    
    const lodingTitle = document.createElement('h1');
    lodingTitle.innerHTML = `게임 ${activeSlideIndex+1} 실행중`;

    gameLodingContainer.appendChild(lodingTitle);
    return gameLodingContainer;
}




