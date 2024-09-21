// const introVideoElement = document.getElementById('introVideo');            // 인트로 비디오
// const startButtonElement = document.getElementById('startButton');          // 시작버튼
// const gameMenuContainer = document.getElementById('game-menu-container');   // 메뉴 컨테이너
// const gameMenuContainerBody = document.getElementById('game-menu-body');   // 메뉴 컨테이너

const inGameScreenElement = document.querySelector('.in-game-container');

// 게임 설정 객체
let gameConfig = {
    current_gameId : undefined,  // 현재 게임 ID
    body : undefined,  // 게임 바디 요소
    game1 : {
        'background-url' : "url('./assets/images/game1_background.png')",  // 게임1 배경 이미지 URL
        'main-img-url' : "./assets/images/stone.png",  // 게임1 메인 이미지 URL
        'video-url' : "./assets/video/test3.mp4",  // 게임1 비디오 URL
        'videoController' : new VideoController(  // 게임1 비디오 컨트롤러
            document.getElementById('gameIntroVideo') ,
            () => {
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    setTimeout(() => gameIntroVideoEndCallback(), dev_video_delay * 1000);  // 개발 모드에서 지연 후 콜백
                }
            }
        ),
        gameCompletion : {  // 게임1 완료 상태
            'A' : false,
            'B ': false,
            'C' : false
        }
    } ,
    game2 : {
        'background-url' : "url('./assets/images/game2/game2_background.png')",  // 게임2 배경 이미지 URL
        'component-img' : {  // 게임2 컴포넌트 이미지 URL
            'furnace' : "./assets/images/game2/game2-furnace.png",
            'section1' : "./assets/images/game2/game2-section1.png",
            'section2' : "./assets/images/game2/game2-section2.png",
            'section3' : "./assets/images/game2/game2-section3.png"
        },
        'video-url' : "./assets/video/test3.mp4",  // 게임2 비디오 URL
        'videoController' : new VideoController(  // 게임2 비디오 컨트롤러
            document.getElementById('gameIntroVideo') ,
            () => {
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    setTimeout(() => gameIntroVideoEndCallback(), dev_video_delay * 1000);  // 개발 모드에서 지연 후 콜백
                }
            }
        ),
        'current-level' : 1,  // 게임2 현재 레벨
        'current-section' : 3,  // 게임2 현재 섹션
        'sectionOneTimer' : null,  // 섹션 1 타이머 추가
        'sectionTwoTimer' : null,  // 섹션 2 타이머 추가
        'maxLevel' : 3  // 게임2 최대 레벨
    }
}

// 게임 인트로 비디오 종료 콜백 함수
const gameIntroVideoEndCallback = () => {
    console.log('end callback');
    const gameObject = getGameObject();
    // 비디오 페이드 아웃 + 인게임 페이드 인
    const videoEl = gameObject.videoController.video;
    controlContainerFadeInOut('out' , videoEl ,
        () => {
            // 배경화면 사전 변경
            gameConfig.body.style.backgroundImage = gameObject['background-url'];
        },
        () => {    
            // 비디오 초기화 
            gameObject.videoController.reset();
            gameObject.videoController.hide();

            // 게임 body fade in
            controlContainerFadeInOut('in' , inGameScreenElement , 
                inGameBodyFadeInStartCallback , inGameBodyFadeInCompleteCallback);
        }
    )
}

// 인게임 바디 페이드 인 시작 콜백
const inGameBodyFadeInStartCallback = () => {
    // 게임 오브젝트 관련 사전 추가
    console.log('사진 추가 하기');  

    gameConfig.body.setAttribute('current_game', gameConfig.current_gameId);

    if(gameConfig.current_gameId == 'game1'){
        game1_layout_setting(gameConfig.body);
    }

    if(gameConfig.current_gameId == 'game2'){
        game2_layout_setting(gameConfig.body);
    }
}

// 인게임 바디 페이드 인 완료 콜백
const inGameBodyFadeInCompleteCallback = () => {
    // 게임시작관련 함수
    console.log('in game body fade in complete');  
    timerController.start();
}

// 인트로 스크린 페이드 아웃 시작 콜백
const introScreenFadeOutStartCallback = () => {
    introVideo.reset();
}

// 인트로 스크린 페이드 아웃 완료 콜백
const introScreenFadeOutCompleteCallback = () => {
    controlContainerFadeInOut('in' , inGameScreenElement , inGameScreenFadeInStartCallback , inGameScreenFadeInCompleteCallback);
}

// 인게임 스크린 페이드 인 시작 콜백
const inGameScreenFadeInStartCallback = () => {
    const introScreenElement = document.querySelector('.intro_container');
    introScreenElement.style.display = 'none';              // 인트로 제거
    inGameScreenElement.style.display = 'block';            // 인게임 뷰

    const gameObject = gameConfig[gameConfig.current_gameId];
    const videoController = gameObject.videoController;
    videoController.video.src = gameObject['video-url'];
}

// 인게임 스크린 페이드 인 완료 콜백
const inGameScreenFadeInCompleteCallback = () => {
    status = 'in-game';
    userOut.currnet_time_reset();

    const gameObject = gameConfig[gameConfig.current_gameId];
    const videoController = gameObject.videoController;

    console.log('비디오 플레이~~~')
    videoController.play(false);
}

// 게임 화면 전환 함수
const convertGameScreen = (gameId) => {
    gameConfig.current_gameId = gameId;
    controlContainerFadeInOut('out' , document.querySelector('.intro_container') , introScreenFadeOutStartCallback , introScreenFadeOutCompleteCallback);
};

// 현재 게임 오브젝트 가져오기
function getGameObject(){
    if(gameConfig.current_gameId == undefined){
        return undefined;
    }else{
        return gameConfig[gameConfig.current_gameId];
    }
}

// 게임1 레이아웃 설정 함수
function game1_layout_setting(bodyElement){
    // 메인 컨테이너 생성
    const gameBox = document.createElement('div');
    gameBox.className = 'aaaaa';
    gameBox.id = 'gameBox';

    // A, B, C 레이아웃 박스 생성 함수
    function createLayoutBox(letter) {
        const box = document.createElement('div');
        box.className = `gameBox ${letter}-box`;
        box.textContent = `${letter} layout`;
        box.boxId = letter;
        return box;
    }

    // A, B, C 레이아웃 박스 생성 및 추가
    const layoutLetters = ['A', 'B', 'C'];
    layoutLetters.forEach(letter => {
        const box = createLayoutBox(letter);

        // 터치이벤트 추가
        box.addEventListener('touchstart' , (event) => {
            game1BoxTouchEvent(event.target);
        })
        gameBox.appendChild(box);
    });

    // 이미지 요소 생성
    const img = document.createElement('img');
    const gameObject = getGameObject();
    img.src = gameObject['main-img-url'];

    // 이미지를 gameBox에 추가
    gameBox.appendChild(img);

    // 게이지바 추가
    const gaugeBar = createGaugeBar();
    bodyElement.appendChild(gameBox);
    bodyElement.appendChild(gaugeBar);
}

// 게이지바 생성 함수
function createGaugeBar(){
    if(gameConfig.current_gameId == 'game1'){
        // 게이지 바 컨테이너 생성
        const gaugeBar = document.createElement('div');
        gaugeBar.className = 'gauge-bar';
        
        // 하이라이트 요소 생성
        const highlight = document.createElement('div');
        highlight.className = 'game1_highlight';
        highlight.id = 'highlight'
        
        // 타겟 요소 생성
        const target = document.createElement('div');
        target.className = 'target';
        target.id = 'target';
        
        // 요소들을 게이지 바에 추가
        gaugeBar.appendChild(highlight);
        gaugeBar.appendChild(target);

        return gaugeBar;
    }

    if(gameConfig.current_gameId == 'game2'){
        // game2 게이지 바 생성 로직
        console.log('game2 게이지 바 생성');
    }
}

// 게이지 체크 함수
function checkGauge(){
    let isCorrect = false;

    function game1_check(){
        const target = document.getElementById('target');
        const highlight = document.getElementById('highlight');    
        
        let isCorrect = false;
        const targetRect = target.getBoundingClientRect(); // 타겟의 위치 정보
        const highlightRect = highlight.getBoundingClientRect(); // 하이라이트의 위치 정보
        
        // 타겟의 80% 크기 계산
        const targetWidth = targetRect.width;
        const target80Percent = targetWidth * 0.3;
        
        // 타겟의 80%가 하이라이트 안에 들어와 있는지 확인
        if (
            targetRect.left + target80Percent >= highlightRect.left && // 타겟의 80% 이상이 하이라이트 왼쪽에 걸치고
            targetRect.right - target80Percent <= highlightRect.right // 타겟의 80% 이하가 하이라이트 오른쪽에 걸쳐 있을 때
        ) {
            isCorrect = true;
            console.log('성공! 타겟이 중앙 80% 들어왔습니다!');
        } else {
            console.log('실패! 타겟이 중앙에 충분히 들어오지 않았습니다!');
        }
        return isCorrect;
    }

    function game2_check(){
        // game2 체크 로직 (game1과 동일)
    }

    function game3_check(){
        // game3 체크 로직 (game1과 동일)
    }

    switch(gameConfig.current_gameId){
        case 'game1':
            isCorrect = game1_check();
            break;
        case 'game2':
            isCorrect = game2_check();
            break;
        case 'game3':
            isCorrect = game3_check();
            break;
    }

    return isCorrect;
}

// 게임1 박스 터치 이벤트 처리 함수
function game1BoxTouchEvent(box) {
    if(!checkGauge()){
        alert('게이지 맞지 않네');
        return;
    }

    const gameObject = getGameObject();
    const gameCompletion = gameObject.gameCompletion;
    gameCompletion[box.boxId] = true;

    box.textContent = 'X';

    console.log(gameCompletion);
    if(gameCompletion.A && gameCompletion.B && gameCompletion.C){
        alert('게임완료');
    }
}

// 게임2의 메인 컨테이너를 생성하는 함수
function game2_createGameContainer(gameObject) {
    const gameContainer = document.createElement('div');
    gameContainer.className = 'game2-container';
    gameContainer.setAttribute('current_level', gameObject['current-level']);
    return gameContainer;
}

// 게임2의 컴포넌트 컨테이너를 생성하는 함수
function game2_createComponentContainer(gameObject) {
    const componentContainer = document.createElement('div');
    componentContainer.className = 'component_container';
    componentContainer.setAttribute('current_level', gameObject['current-level']);
    componentContainer.setAttribute('current_section', '3');  // 초기 섹션을 3으로 설정
    return componentContainer;
}

// 게임2의 결과 이미지를 생성하는 함수
function game2_createResultImage(gameObject) {
    const resultImage = document.createElement('div');
    resultImage.id = 'result-image';
    const componentImg = gameObject['component-img'];
    const level = gameObject['current-section'];
    resultImage.style.backgroundImage = `url(${componentImg['section' + level]})`;
    return resultImage;
}

// 게임2의 게이지 컨테이너를 생성하는 함수
function game2_createGaugeContainer() {
    const gaugeContainer = document.createElement('div');
    gaugeContainer.className = 'gauge-container';
    return gaugeContainer;
}

// 게임2의 게이지를 생성하는 함수
function game2_createGauge() {
    const gauge = document.createElement('div');
    gauge.id = 'gauge';
    for (let i = 1; i <= 3; i++) {
        const gaugeSection = document.createElement('div');
        gaugeSection.className = 'gauge-section';
        gaugeSection.id = `section${i}`;
        gauge.appendChild(gaugeSection);
    }
    return gauge;
}

// 게임2의 타겟을 생성하는 함수
function game2_createTarget() {
    const target = document.createElement('div');
    target.id = 'target';
    target.draggable = true;
    
    // 초기 위치 설정을 지연
    setTimeout(() => {
        const gaugeContainer = document.querySelector('.gauge-container');
        if (gaugeContainer) {
            const gaugeRect = gaugeContainer.getBoundingClientRect();
            target.style.top = `${gaugeRect.height - target.offsetHeight}px`;
        } else {
            console.error('Gauge container not found');
        }
    }, 0);
    
    game2_addTargetEventListeners(target);
    return target;
}

// 게임2의 타겟에 이벤트 리스너를 추가하는 함수
function game2_addTargetEventListeners(target) {
    let startY, initialTop;

    target.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        initialTop = parseInt(window.getComputedStyle(this).top);
        e.preventDefault();
        
        // 터치 시작 시 1섹션과 2섹션 타이머 모두 취소
        const gameObject = getGameObject();
        if (gameObject.sectionOneTimer) {
            clearTimeout(gameObject.sectionOneTimer);
            gameObject.sectionOneTimer = null;
        }
        if (gameObject.sectionTwoTimer) {
            clearTimeout(gameObject.sectionTwoTimer);
            gameObject.sectionTwoTimer = null;
        }
    });

    target.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        let deltaY = currentY - startY;
        let newTop = initialTop + deltaY;

        const gaugeContainer = this.closest('.gauge-container');
        const gaugeRect = gaugeContainer.getBoundingClientRect();
        const targetRect = this.getBoundingClientRect();
        
        newTop = Math.max(0, Math.min(newTop, gaugeRect.height - targetRect.height));

        this.style.top = newTop + 'px';

        // 결과 이미지 업데이트
        const position = newTop / (gaugeRect.height - targetRect.height);
        game2_updateResultImage(position);

        e.preventDefault();
    });

    target.addEventListener('touchend', function() {
        const gaugeContainer = this.closest('.gauge-container');
        const gaugeRect = gaugeContainer.getBoundingClientRect();
        const targetRect = this.getBoundingClientRect();
        const position = parseInt(this.style.top) / (gaugeRect.height - targetRect.height);
        game2_updateResultImage(position);
    });
}

// 게임2의 용광로 이미지를 생성하는 함수
function game2_createFurnaceImage(gameObject) {
    const furnaceImage = document.createElement('div');
    furnaceImage.id = 'furnace-image';
    furnaceImage.style.backgroundImage = `url(${gameObject['component-img'].furnace})`;
    return furnaceImage;
}

// 게임2의 전체 레이아웃을 설정하는 함수
function game2_layout_setting(bodyElement) {
    const gameObject = getGameObject();
    
    // 각 요소 생성
    const gameContainer = game2_createGameContainer(gameObject);
    const componentContainer = game2_createComponentContainer(gameObject);
    const resultImage = game2_createResultImage(gameObject);
    const gaugeContainer = game2_createGaugeContainer();
    const gauge = game2_createGauge();
    const target = game2_createTarget();
    const furnaceImage = game2_createFurnaceImage(gameObject);

    // 요소들을 조립
    gaugeContainer.appendChild(gauge);
    gaugeContainer.appendChild(target);

    componentContainer.appendChild(resultImage);
    componentContainer.appendChild(gaugeContainer);

    gameContainer.appendChild(componentContainer);
    gameContainer.appendChild(furnaceImage);

    // 최종적으로 body에 추가
    bodyElement.appendChild(gameContainer);

    // 타겟 위치 초기화 (DOM에 추가된 후)
    setTimeout(() => {
        const gaugeContainer = document.querySelector('.gauge-container');
        if (gaugeContainer && target) {
            const gaugeRect = gaugeContainer.getBoundingClientRect();
            target.style.top = `${gaugeRect.height - target.offsetHeight}px`;
        }
    }, 0);

    // 초기 결과 이미지 설정 (섹션 3)
    game2_updateResultImage(1);

    console.log('game2 레이아웃 설정 완료');
}

// 게임2의 결과 이미지를 업데이트하는 함수
function game2_updateResultImage(position) {
    const gameObject = getGameObject();
    const componentImg = gameObject['component-img'];
    const resultImage = document.getElementById('result-image');
    const componentContainer = document.querySelector('.component_container');
    const target = document.getElementById('target');
    
    let newSection;
    if (position < 0.33) {
        newSection = 1;
    } else if (position < 0.66) {
        newSection = 2;
    } else {
        newSection = 3;
    }

    // 현재 섹션이 변경되었을 때만 이미지 업데이트
    if (newSection !== parseInt(componentContainer.getAttribute('current_section'))) {
        componentContainer.setAttribute('current_section', newSection);
        gameObject['current-section'] = newSection;

        resultImage.style.opacity = '0';
        setTimeout(() => {
            resultImage.style.backgroundImage = `url(${componentImg['section' + newSection]})`;
            resultImage.style.opacity = '1';
            
            if (newSection === 1) {
                resultImage.classList.add('tilted');
                if (gameObject.sectionOneTimer) clearTimeout(gameObject.sectionOneTimer);
                gameObject.sectionOneTimer = setTimeout(() => {
                    game2_resetTargetPosition(target);
                }, 2000);
                // 2섹션 타이머 취소
                if (gameObject.sectionTwoTimer) {
                    clearTimeout(gameObject.sectionTwoTimer);
                    gameObject.sectionTwoTimer = null;
                }
            } else if (newSection === 2) {
                resultImage.classList.remove('tilted');
                if (gameObject.sectionOneTimer) {
                    clearTimeout(gameObject.sectionOneTimer);
                    gameObject.sectionOneTimer = null;
                }
                // 2섹션에 진입했을 때 타이머 시작
                if (gameObject.sectionTwoTimer) clearTimeout(gameObject.sectionTwoTimer);
                gameObject.sectionTwoTimer = setTimeout(() => {
                    if (gameObject['current-level'] < gameObject.maxLevel) {
                        gameObject['current-level']++;
                        componentContainer.setAttribute('current_level', gameObject['current-level']);
                        console.log(`레벨이 ${gameObject['current-level']}로 올라갔습니다.`);
                        // 레벨 업 후 타겟을 초기 위치로 리셋
                        game2_resetTargetPosition(target);
                    } else {
                        // 최대 레벨 도달 시 게임 종료
                        alert('게임 종료 (예정)');
                    }
                }, 2000);
            } else {
                resultImage.classList.remove('tilted');
                // 1섹션과 2섹션 타이머 모두 취소
                if (gameObject.sectionOneTimer) {
                    clearTimeout(gameObject.sectionOneTimer);
                    gameObject.sectionOneTimer = null;
                }
                if (gameObject.sectionTwoTimer) {
                    clearTimeout(gameObject.sectionTwoTimer);
                    gameObject.sectionTwoTimer = null;
                }
            }
        }, 150);

        console.log(`타겟이 ${newSection}번째 영역에 진입했습니다.`);
    }
}

// 타겟을 초기 위치로 돌려보내는 함수
function game2_resetTargetPosition(target) {
    const gaugeContainer = target.closest('.gauge-container');
    const gaugeRect = gaugeContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    
    const startY = parseFloat(target.style.top);
    const endY = gaugeRect.height - targetRect.height;
    
    let startTime;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const duration = 500; // 애니메이션 지속 시간 (0.5초)
        
        if (elapsedTime < duration) {
            // easeOutQuad 이징 함수를 사용하여 부드러운 움직임 구현
            const progress = 1 - Math.pow(1 - elapsedTime / duration, 2);
            const newY = startY + (endY - startY) * progress;
            
            target.style.top = `${newY}px`;
            game2_updateResultImage(newY / gaugeRect.height);
            
            requestAnimationFrame(animate);
        } else {
            // 애니메이션 완료
            target.style.top = `${endY}px`;
            game2_updateResultImage(1);
            
            // 리셋 후 current-section을 3으로 설정
            const gameObject = getGameObject();
            gameObject['current-section'] = 3;
            const componentContainer = document.querySelector('.component_container');
            componentContainer.setAttribute('current_section', 3);
            
            console.log('타겟이 초기 위치로 돌아갔습니다. 현재 섹션: 3');
        }
    }
    
    requestAnimationFrame(animate);
}

function game3_layout_setting(bodyElement){
    // game3 레이아웃 설정 로직
    console.log('game3 레이아웃 설정');
}


// 테스트용 함수 추가
function testChangeLevel(level) {
    if (level < 1 || level > 3) {
        console.error('레벨은 1, 2, 3 중 하나여야 합니다.');
        return;
    }

    const gameContainer = document.querySelector('.game2-container');
    const componentContainer = document.querySelector('.component_container');
    if (!gameContainer || !componentContainer) {
        console.error('필요한 컨테이너를 찾을 수 없습니다.');
        return;
    }

    // current_level 속성 변경
    gameContainer.setAttribute('current_level', level);
    componentContainer.setAttribute('current_level', level);

    const gameObject = getGameObject();
    gameObject['current-level'] = 3;


    console.log(`레벨이 ${level}로 변경되었습니다.`);
}