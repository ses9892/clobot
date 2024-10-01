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
        'video-url' : "./assets/video/game3_1_des.mp4?version=1.0.3",  // 게임1 비디오 URL
        'end-video-url' : "./assets/video/game3_1_end.mp4?version=1.0.3",  // 게임1 비디오 URL
        'videoController' : new VideoController(  // 게임1 비디오 컨트롤러
            document.getElementById('gameIntroVideo') ,
            () => {
                console.log('touch?');
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    // setTimeout(() => gameIntroVideoEndCallback(), dev_video_delay * 1000);  // 개발 모드에서 지연 후 콜백
                }
            }
        ),
        gameCompletionQueue : ['B-box' , 'C-box' , 'A-box'],
        gameCompletion : {  // 게임1 완료 상태
            'A-box' : false,
            'B-box ': false,
            'C-box' : false
        },

        gameSetTimeout : undefined,

        isTargetTouch : false,

        resetGameCompletion : () => {
            gameConfig.game1.gameCompletion = {
                'A-box' : false,
                'B-box ': false,
                'C-box' : false
            };
            gameConfig.game1.gameCompletionQueue = ['B-box' , 'C-box' , 'A-box'];

            gameConfig.game1.isTargetTouch = false;
        } ,

        restartGame : () => {
            // 타겟 애니메이션 추가
            const targetElement = document.getElementById('target');
            targetElement.className = 'target animation';

            // 게임 완료 큐 초기화
            gameConfig.game1.resetGameCompletion();

            // 게임 박스 투명도 1
            document.querySelectorAll('.gameBox').forEach(box => {
                box.style.display = 'block';
                box.style.opacity = 1;
            });

            // game1_item_container 속성 초기화
            const game1ItemContainer = document.getElementById('game1_item_container');
            console.log(gameConfig.game1.gameCompletionQueue[0])
            game1ItemContainer.setAttribute('Completion', gameConfig.game1.gameCompletionQueue[0]);
        } ,

        timeoutGame : () => {
            console.log('시간 초과되어 검증 시작 불가');

            // 타임아웃 초기화
            clearTimeout(this.gameSetTimeout);
            this.gameSetTimeout = undefined;

            // 막대기 애니메이션 제거
            const magchiItem = document.getElementById('game1_item_magchi');
            magchiItem.classList.remove('magchi_rotate');
            

            // 타겟 애니메이션 제거
            const targetElement = document.getElementById('target');
            targetElement.className = 'target';
        },

        checkDuplicateTouch : () => {
            console.log('중복 터치 방지 체크 : ' + gameConfig.game1.isTargetTouch);
            return gameConfig.game1.isTargetTouch;
        }

    } ,
    game2 : {
        'background-url' : "url('./assets/images/game2/game2_background.png')",  // 게임2 배경 이미지 URL
        'component-img' : {  // 게임2 컴포넌트 이미지 URL
            'section1' : "./assets/images/game2/game2-section1.png",
            'section2' : "./assets/images/game2/game2-section2.png",
            'section3' : "./assets/images/game2/game2-section3.png"
        },
        'video-url' : "./assets/video/test3.mp4",  // 게임2 비디오 URL
        'end-video-url' : "./assets/video/game3_1_end.mp4?version=1.0.3",  // 게임1 비디오 URL
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
        'maxLevel' : 3 , // 게임2 최대 레벨

        configReset : () => {
            gameConfig.game2['current-level'] = 1;
            gameConfig.game2['current-section'] = 3;
            gameConfig.game2['sectionOneTimer'] = null;
            gameConfig.game2['sectionTwoTimer'] = null;
        },

        restartGame : () => {
            gameConfig.game2.configReset();

            const furnaceImage = document.querySelectorAll('.furnace-image');
            if(furnaceImage != undefined){
                furnaceImage.forEach(el => {
                    el.style.opacity = '1';
                })
            }

            document.querySelector('.game2-container').setAttribute('current_level' , gameConfig.game2['current-level']);
            document.querySelector('.component_container').setAttribute('current_level' , gameConfig.game2['current-level']);
        }
    } ,
    game3 : {
        'background-url' : "url('./assets/images/game3/game3-background.webp')",  // 게임3 배경 이미지 URL
        'component-img' : {  // 게임3 컴포넌트 이미지 URL
            'tree' : "./assets/images/game3/game3-tree.webp",
            'fire' : "./assets/images/game3/game3-fire-section1.webp",
            'resultItem' : "./assets/images/game3/game3-result-item.webp"

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


        'is-game-complete' : false,
        'video-url' : "./assets/video/test3.mp4",  // 게임3 비디오 URL
        'current-level' : 1,  // 게임3 현재 레벨
        'maxLevel' : 3,  // 게임2 최대 레벨
        'level-check-timer' : null,
        'level-check-timer-interval' : 5000,
        'current-fire-scale' : 1,
        'tree-style' : {
            'top' : '65%',
            'left' : '27%'
        },
        downLevel : () => {
            gameConfig.game3['current-level']--;
            gameConfig.game3['current-fire-scale']--;
            document.getElementById('game_item_fire').setAttribute('scale', gameConfig.game3['current-fire-scale']);    


        },
        upLevel : () => {
            gameConfig.game3['current-level']++;
            gameConfig.game3['current-fire-scale']++;
            document.getElementById('game_item_fire').setAttribute('scale', gameConfig.game3['current-fire-scale']);    
        },

        resetLevel : () => {
            gameConfig.game3['current-level'] = 1;
            gameConfig.game3['current-fire-scale'] = 1;
            document.getElementById('game_item_fire').setAttribute('scale', gameConfig.game3['current-fire-scale']);    
        } ,

        clearLevelCheckTimer : () => {
            console.log('level-check-timer 초기화');
            clearTimeout(gameConfig.game3['level-check-timer']);
        },
        completeGame : () => {
            gameConfig.game3['is-game-complete'] = true;
        }
    }
}

// 게임 인트로 비디오 종료 콜백 함수
const gameIntroVideoEndCallback = () => {
    console.log('end callback');
    userOut.hideTimer();
    const gameObject = getGameObject();
    // 비디오 페이드 아웃 + 인게임 페이드 인
    const videoEl = gameObject.videoController.video;
    controlContainerFadeInOut('out' , videoEl ,
        () => {
            // 배경화면 사전 변경
            if(gameConfig.current_gameId != 'game3'){
                gameConfig.body.style.backgroundImage = gameObject['background-url'];
            }
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

// 게임1 완료 비디오 종료 콜백
const game1EndVideoEndCallback = () => {
    console.log('game1EndVideoEndCallback');
}



// 인게임 바디 페이드 인 시작 콜백
const inGameBodyFadeInStartCallback = () => {
    // 게임 오브젝트 관련 사전 추가
    console.log('사진 추가 하기');  

    timerController.show();

    gameConfig.body.setAttribute('current_game', gameConfig.current_gameId);

    if(gameConfig.current_gameId == 'game1'){
        gameConfig.game1.resetGameCompletion();
        game1_layout_setting(gameConfig.body);
    }

    if(gameConfig.current_gameId == 'game2'){
        game2_layout_setting(gameConfig.body);
    }

    if(gameConfig.current_gameId == 'game3'){
        game3_layout_setting(gameConfig.body);
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
    // 타이머 숨기기
    userOut.hideTimer();
}

// 인트로 스크린 페이드 아웃 완료 콜백
const introScreenFadeOutCompleteCallback = () => {
    userOut.hideTimer();
    controlContainerFadeInOut('in' , inGameScreenElement , inGameScreenFadeInStartCallback , inGameScreenFadeInCompleteCallback);
}

// 인게임 스크린 페이드 인 시작 콜백
const inGameScreenFadeInStartCallback = () => {
    const introScreenElement = document.querySelector('.intro_container');
    introScreenElement.style.display = 'none';              // 인트로 제거
    inGameScreenElement.style.display = 'block';            // 인게임 뷰

    const gameObject = gameConfig[gameConfig.current_gameId];

    console.log('선택한 게임레벨 : ' + gameConfig.current_gameId);

    if(gameObject.videoController != undefined){
        console.log(gameObject.videoController);
        // 비디오 컨트롤러 초기화
        gameObject.videoController.removeEvent();   
        gameObject.videoController = new VideoController(  // 게임2 비디오 컨트롤러
            document.getElementById('gameIntroVideo') ,
            () => {
                console.log('터치모드')
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                setTimeout(() => {
                    gameIntroVideoEndCallback();
                }, 1000);
            } , 
            'end' , 
            false
        );
    }
    
    const videoController = gameObject.videoController;
    videoController.load(gameObject['video-url']);
    console.log(videoController.video.src);

    videoController.video.src = gameObject['video-url'];
}

// 인게임 스크린 페이드 인 완료 콜백
const inGameScreenFadeInCompleteCallback = () => {
    status = 'in-game';
    userOut.currnet_time_reset(false);

    const gameObject = gameConfig[gameConfig.current_gameId];
    gameObject.videoController.play(false);
}

// 게임 화면 전환 함수
const convertGameScreen = (gameId) => {

    // 게임 화면 전환
    gameConfig.current_gameId = gameId;
    
    // 인트로 화면 페이드 아웃
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
        // box.textContent = `${letter} layout`;
        box.boxId = letter;
        return box;
    }

    // A, B, C 레이아웃 박스 생성 및 추가
    const layoutLetters = ['A', 'B', 'C'];
    layoutLetters.forEach(letter => {
        const box = createLayoutBox(letter);

        // // 터치이벤트 추가
        // box.addEventListener('touchstart' , (event) => {
        //     game1BoxTouchEvent(event.target);
        // })
        gameBox.appendChild(box);
    });

    // shadow 요소 생성
    const shadow = document.createElement('div');
    shadow.className = 'game1_shadow';
    shadow.id = 'game1_shadow';

    gameBox.appendChild(shadow);

    // 이미지 요소 생성
    const img = document.createElement('img');
    const gameObject = getGameObject();
    img.src = gameObject['main-img-url'];
    img.className = 'game1_main_img';

    // 이미지를 gameBox에 추가
    gameBox.appendChild(img);

    console.log('###');

    // 게임1 아이템 컨테이너 생성
    const game1ItemContainer = document.createElement('div');
    game1ItemContainer.className = 'game1_item_container';
    game1ItemContainer.id = 'game1_item_container';

    // 게임 큐 조회
    const gameCompletionQueue = gameObject.gameCompletionQueue;

    // 큐에서 첫번째 항목 조회만 조회
    const firstItem = gameCompletionQueue[0];

    // game1ItemContainer 속성 부여
    game1ItemContainer.setAttribute('Completion', firstItem);

    // 막대기 아이템 생성
    const magchiItem = document.createElement('div');
    magchiItem.className = 'game1_item_magchi';
    magchiItem.id = 'game1_item_magchi';

    // 타겟 아이템 생성
    const targetItem = document.createElement('div');
    targetItem.className = 'game1_item_target';

    // 아이템들을 컨테이너에 추가
    game1ItemContainer.appendChild(magchiItem);
    game1ItemContainer.appendChild(targetItem);

    // 컨테이너를 body에 추가
    // 게이지바 추가
    const gaugeBar = createGaugeBar();
    bodyElement.appendChild(gameBox);
    bodyElement.appendChild(gaugeBar);
    bodyElement.appendChild(game1ItemContainer);

}

// 게이지바 생성 함수
function createGaugeBar(){
    if(gameConfig.current_gameId == 'game1'){
        // 게이지 바 컨테이너 생성
        const gaugeBar = document.createElement('div');
        gaugeBar.className = 'progress-bar-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.id = 'progress-bar';
        
        // 하이라이트 요소 생성
        const highlight = document.createElement('div');
        highlight.className = 'game1_highlight';
        highlight.id = 'highlight'
        
        // 타겟 요소 생성
        const target = document.createElement('div');
        target.className = 'target animation';
        target.id = 'target';
        
        // 요소들을 게이지 바에 추가
        gaugeBar.appendChild(progressBar);
        gaugeBar.appendChild(highlight);
        gaugeBar.appendChild(target);

        gaugeBar.addEventListener('touchstart' , (event) => {
            if(gameConfig.game1.checkDuplicateTouch()){
                console.log('중복 터치 방지 이벤트 로그');
                return;
            }
            game1BoxTouchEvent(event.target);
        })
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

// 게이지를 흔드는 새로운 함수
function shakeGauge() {
    const gaugeBar = document.querySelector('.progress-bar-container');
    gaugeBar.classList.add('shake');
    
    // 애니메이션이 끝나면 클래스 제거
    setTimeout(() => {
        gaugeBar.classList.remove('shake');
    }, 520); // 애니메이션 지속 시간 + 약간의 여유
}

// 게임1 박스 터치 이벤트 처리 함수
function game1BoxTouchEvent(box) {
    // 중복 터치 방지
    gameConfig.game1.isTargetTouch = true;

    console.log('########## game1BoxTouchEvent ##########');
    if(!checkGauge()){
        shakeGauge();
        audioController.failSound();
        setTimeout(() => {
            // 중복 터치 방지
            gameConfig.game1.isTargetTouch = false;
        }, 300);

        return;
    }

    const gameObject = getGameObject();
    const gameCompletion = gameObject.gameCompletion;
    const gameCompletionQueue = gameObject.gameCompletionQueue;

    const clearBoxId = gameCompletionQueue.shift();
    const clearBoxElement = document.querySelector('.' + clearBoxId);
    
    gameCompletion[clearBoxId] = true;

    audioController.correctSound();

    const magchiItem = document.getElementById('game1_item_magchi');
    magchiItem.classList.add('magchi_rotate');

    // 타겟 애니메이션 중지 및 현재 위치에서 멈추기
    const targetElement = document.getElementById('target');
    let currentLeft = targetElement.offsetLeft;
    targetElement.style.animationPlayState = 'paused';
    targetElement.style.left = `${currentLeft}px`;
    // 타겟 class 변경
    targetElement.classList.remove('animation');


    gameObject.gameSetTimeout = setTimeout(() => {


        // 막대기 아이템 회전 종료
        magchiItem.classList.remove('magchi_rotate');

        if(status == 'game-timeout'){
            console.log('시간 초과되어 검증 시작 불가');
            return;
        }


        // 게임 완료 큐 업데이트
        const game1ItemContainer = document.getElementById('game1_item_container');
        if(gameCompletionQueue.length > 0){
            game1ItemContainer.setAttribute('Completion', gameCompletionQueue[0]);
        }

        // 클리어 박스 투명도 0
        clearBoxElement.style.opacity = 0;
        
        setTimeout(() => {
            clearBoxElement.style.display = 'none';
        }, 500);

        if(gameCompletion['A-box'] && gameCompletion['B-box'] && gameCompletion['C-box']){
            console.log('게임 완료');

            timerController.pause();
            audioController.gameClearSound();
            controlContainerFadeInOut('out' , document.querySelector('.game1_item_container') , 
                () => {},() => {});

            common_game_clear(game1EndVideoEndCallback);

        }else{
            // 타겟 애니메이션 재시작
            targetElement.style.animationPlayState = 'running';
            targetElement.style.left = 0;  // left 스타일 제거하여 애니메이션 재개
            targetElement.classList.add('animation');
        }
        // 중복 터치 방지
        gameConfig.game1.isTargetTouch = false;
    }, 3000);

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
    // resultImage.style.backgroundImage = `url(${componentImg['section' + level]})`;
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
        console.log(position);
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

    // furnace-container 생성
    const furnaceContainer = document.createElement('div');
    furnaceContainer.className = 'furnace-container';

    // 4번 루프
    for(let i = 0; i < 4; i++){
        const furnaceImage = document.createElement('div');
        furnaceImage.id = 'furnace-image' + (i+1);
        furnaceImage.className = 'furnace-image';
        furnaceImage.setAttribute('current_section', i+1);
        furnaceContainer.appendChild(furnaceImage);
    }

    return furnaceContainer;
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
    console.log('game2_updateResultImage', position);
    const gameObject = getGameObject();
    const componentImg = gameObject['component-img'];
    const resultImage = document.getElementById('result-image');
    const componentContainer = document.querySelector('.component_container');
    const target = document.getElementById('target');
    
    let newSection;
    if (position < 0.2) {
        newSection = 1;
    } else if (position < 0.8) {
        newSection = 2;
    } else {
        newSection = 3;
    }

    // 현재 섹션이 변경되었을 때만 이미지 업데이트
    if (newSection !== parseInt(componentContainer.getAttribute('current_section'))) {


        resultImage.style.opacity = '0';
        setTimeout(() => {
            componentContainer.setAttribute('current_section', newSection);
            gameObject['current-section'] = newSection;
            resultImage.style.opacity = '1';

            // resultImage.style.backgroundImage = `url(${componentImg['section' + newSection]})`;
            
            if (newSection === 1) {     // 실패
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
            } else if (newSection === 2) {      // 성공
                resultImage.classList.remove('tilted');
                if (gameObject.sectionOneTimer) {
                    clearTimeout(gameObject.sectionOneTimer);
                    gameObject.sectionOneTimer = null;
                }
                // 2섹션에 진입했을 때 타이머 시작
                if (gameObject.sectionTwoTimer) clearTimeout(gameObject.sectionTwoTimer);
                gameObject.sectionTwoTimer = setTimeout(() => {
                    if (gameObject['current-level'] < gameObject.maxLevel) {


                        // component_container fade out

                        controlContainerFadeInOut('out' , componentContainer , 
                            () => {
                                console.log('component_container fade out');
                            },
                            () => {
                                target.style.top = '263px';
                                const gameObject = getGameObject();
                                gameObject['current-section'] = 3;
                                const componentContainer = document.querySelector('.component_container');
                                componentContainer.setAttribute('current_section', 3);
                                game2_level_up();

                                // component_container fade in
                                controlContainerFadeInOut('in' , componentContainer , 
                                    () => {
                                        console.log('component_container fade in');
                                    },
                                    () => {
                                        console.log('component_container fade in complete');
                                    }
                                );
                            }
                        );

                        // 레벨 업 후 타겟을 초기 위치로 리셋
                        // game2_resetTargetPosition(target);
                    } else {
                        // component_container fade out
                        resultImage.style.opacity = '0';
                        game2_level_up();

                        controlContainerFadeInOut('out' , componentContainer , 
                            () => {

                                console.log('component_container fade out');
                            },
                            () => {
                                console.log('게임 클리어 5초 대기중');

                                timerController.pause();
                                common_game_clear(()=>{});
                            }
                        );
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

        }, 500);

        // console.log(`타겟이 ${newSection}번째 영역에 진입했습니다.`);
    }
}

function game2_level_up(){
    const gameObject = getGameObject();
    const componentContainer = document.querySelector('.component_container');
    const gameContainer = document.querySelector('.game2-container');
    gameObject['current-level']++;
    componentContainer.setAttribute('current_level', gameObject['current-level']);
    gameContainer.setAttribute('current_level', gameObject['current-level']);

    if(gameObject['current-level'] > 1){
        // class = furnace-image  current_section 속성이 gameObject['current-level']-1 인 요소 찾기
        const furnaceImage = document.querySelector('.furnace-image[current_section="' + (gameObject['current-level']-1) + '"]');
        furnaceImage.style.opacity = '0';
    }

    console.log(`레벨이 ${gameObject['current-level']}로 올라갔습니다.`);

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
        const duration = 300; // 애니메이션 지속 시간 (0.5초)
        
        if (elapsedTime < duration) {
            // easeOutQuad 이징 함수를 사용하여 부드러운 움직임 구현
            const progress = 1 - Math.pow(1 - elapsedTime / duration, 2);
            const newY = startY + (endY - startY) * progress;
            
            target.style.top = `${newY}px`;
            console.log('###########1')
            // game2_updateResultImage(newY / gaugeRect.height);
            
            requestAnimationFrame(animate);
        } else {
            // 애니메이션 완료
            target.style.top = `${endY}px`;
            console.log('###########2')
            game2_updateResultImage(1);
            
            // 리셋 후 current-section을 3으로 설정
            const gameObject = getGameObject();
            gameObject['current-section'] = 3;
            // const componentContainer = document.querySelector('.component_container');
            // componentContainer.setAttribute('current_section', 3);
            
            console.log('타겟이 초기 위치로 돌아갔습니다. 현재 섹션: 3');
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * game3 관련 함수
 */

// 게임3의 전체 레이아웃을 설정하는 함수
function game3_layout_setting(bodyElement) {
    game3_initializeGame();
    game3_level_check_timer();
}

// 게임3의 배경을 생성하는 함수
function game3_createGameBackground() {
    console.log('게임3 배경 생성');
    const gameBody = document.getElementById('game_body');
    
    // game_background 생성
    const gameBackground = document.createElement('div');
    gameBackground.className = 'game_background';
    gameBackground.id = 'game_background';
    
    // game_item_fire 생성
    const gameItemFire = document.createElement('div');
    gameItemFire.className = 'game_item_fire';
    gameItemFire.id = 'game_item_fire';
    gameItemFire.setAttribute('scale', gameConfig.game3['current-fire-scale']);
    gameItemFire.style.zIndex = '1'; // 불에 z-index 1 설정
    
    // game_item_tree 생성
    const gameItemTree = document.createElement('div');
    gameItemTree.className = 'game_item_tree';
    gameItemTree.id = 'game_item_tree';
    gameItemTree.style.top = gameConfig.game3['tree-style']['top'];
    gameItemTree.style.left = gameConfig.game3['tree-style']['left'];
    gameItemTree.style.zIndex = '2'; // 트리에 z-index 2 설정 (불보다 높게)
    
    // game_item_result 생성
    const gameItemResult = document.createElement('div');
    gameItemResult.className = 'game_item_result';
    gameItemResult.id = 'game_item_result';
    gameItemResult.style.zIndex = '3'; // 결과 아이템에 가장 높은 z-index 설정

    const gameDragDropBox = document.createElement('div');
    gameDragDropBox.className = 'game_drag_drop_box';
    gameDragDropBox.id = 'game_drag_drop_box';
    gameDragDropBox.innerHTML = '여기엔 나무를 넣습니다.';
    gameDragDropBox.style.fontSize = '100px';
    gameDragDropBox.style.zIndex = '4'; // 드래그 앤 드롭 박스에 z-index 4 설정
    
    // 요소들을 gameBackground에 추가
    gameBackground.appendChild(gameItemFire);
    gameBackground.appendChild(gameItemTree);
    gameBackground.appendChild(gameItemResult);
    gameBackground.appendChild(gameDragDropBox);
    // gameBackground를 game_body에 추가
    gameBody.appendChild(gameBackground);
}

// 게임3의 레벨 체크 타이머 함수
function game3_level_check_timer(){
    console.log('게임3 레벨 체크 타이머 시작');
    const gameObject = getGameObject();
    gameObject['level-check-timer'] = setTimeout(() => {
        if(gameObject['current-level'] == 1){
            console.log('게임오버');
            gameObject.resetLevel();
        }else if(gameObject['current-level'] == 2 || gameObject['current-level'] == 3){
            gameObject.downLevel();
            game3_level_check_timer();
        }
    }, gameObject['level-check-timer-interval']);
}

// 게임 초기화 함수
function game3_initializeGame() {
    console.log('게임을 초기화합니다.');
    
    const gameBody = document.getElementById('game_body');
    game3_createGameBackground(gameBody);
    
    setTimeout(() => {
        const treeElement = document.getElementById('game_item_tree');
        console.log(treeElement);
        const dropZone = document.getElementById('game_drag_drop_box');
        console.log(dropZone);
        
        if (treeElement && dropZone) {
            interact(treeElement).draggable({
                listeners: {
                    start(event) {
                        console.log('트리 드래그 시작');
                        gameConfig.game3.clearLevelCheckTimer();
                        event.preventDefault();
                    },
                    move(event) {
                        console.log('트리 드래그 중');
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    },
                    end(event) { 
                        const target = event.target;
                        // 드래그 종료 시 트리가 드롭 영역에 놓였는지 확인
                        game3_checkDropZone(target, dropZone);
                        // 드래그 종료 시 트리 위치 초기화
                        game3_resetTreePosition(target);
                        if(!gameConfig.game3['is-game-complete']){
                            game3_level_check_timer();
                        }
                    }
                },
                inertia: false, 
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
            });
            
            // 터치 이벤트 방지
            treeElement.addEventListener('touchstart', function(e) {
                e.preventDefault();
            }, { passive: false });
            
            console.log('game_item_tree에 드래그 앤 드롭 기능이 추가되었습니다.');
        } else {
            console.error('game_item_tree 또는 game_drag_drop_box 요소를 찾을 수 없습니다.');
        }
    }, 100);
}

// 게임3의 드래그 종료 체크 함수
function game3_checkDropZone(target, dropZone) {
    console.log('트리 드래그 종료');
    const dropRect = dropZone.getBoundingClientRect();
    const treeRect = target.getBoundingClientRect();
    
    // 중심점 계산
    const treeCenterX = treeRect.left + treeRect.width / 2;
    const treeCenterY = treeRect.top + treeRect.height / 2;
    
    if (
        treeCenterX >= dropRect.left &&
        treeCenterX <= dropRect.right &&
        treeCenterY >= dropRect.top &&
        treeCenterY <= dropRect.bottom
    ) {
        game3_check_Complete();
    }
}

// 게임3의 트리 위치 초기화 함수
function game3_resetTreePosition(target) {
    // 원래 위치로 애니메이션과 함께 돌아가기
    target.style.transition = 'transform 0.3s ease-out';
    target.style.transform = `translate(0px, 0px)`;
    target.setAttribute('data-x', 0);
    target.setAttribute('data-y', 0);
    
    // 애니메이션 종료 후 transition 제거
    setTimeout(() => {
        target.style.transition = '';
    }, 300);
}

// 게임3의 게임 완료 체크 함수
function game3_check_Complete(){
    const currentLevel = gameConfig.game3['current-level'];
    if(currentLevel == gameConfig.game3['maxLevel']){
        game3_complete_game();
    }else{
        game3_create_next_level();
    }
}

// 게임3의 게임 완료 함수
function game3_complete_game(){
    alert('게임3 완료');
    const gameObject = getGameObject();
    gameObject.clearLevelCheckTimer();
    gameObject.completeGame();
}

// 게임3의 다음 레벨 생성 함수
function game3_create_next_level(){
    console.log('게임3 레벨 증가');
    gameConfig.game3['current-level']++;
    gameConfig.game3['current-fire-scale']++;

    const gameItemFire = document.getElementById('game_item_fire');
    gameItemFire.setAttribute('scale', gameConfig.game3['current-fire-scale']);
}

function common_game_clear(videoEndCallback){

    const gameObject = gameConfig[gameConfig.current_gameId];
    const videoController = gameObject.videoController;


    // 비디오 컨트롤러 초기화
    videoController.updateEvent(videoEndCallback , 'end' , false);

    videoController.video.src = gameObject['end-video-url'];
    // load
    videoController.load();
    
    setTimeout(() => {
        // game_body fade out
        controlContainerFadeInOut('out' , document.querySelector('.game_body') , 
            () => {
                console.log('game_body fade out');
            },
            () => {

                videoController.show();

                //gameIntroVideo fade in
                controlContainerFadeInOut('in' , document.querySelector('#gameIntroVideo') , 
                    () => {
                        console.log('gameIntroVideo fade in');
                    },
                    () => {
                        videoController.play();
                        // 재생
                        console.log('gameIntroVideo fade in complete');
                        setTimeout(() => {
                            userOut.currnet_time_reset(true);
                            userOut.showTimer();
                            // 게임성공 팝업 띄우기
                            showGameClearPop('','',true);
                            status = 'end-game';
                        } , 4500);
                    }
                );
            }
        );
    } , 5000);
}