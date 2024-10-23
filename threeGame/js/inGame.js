// const introVideoElement = document.getElementById('introVideo');            // 인트로 비디오
// const startButtonElement = document.getElementById('startButton');          // 시작버튼
// const gameMenuContainer = document.getElementById('game-menu-container');   // 메뉴 컨테이너
// const gameMenuContainerBody = document.getElementById('game-menu-body');   // 메뉴 컨테이너

const inGameScreenElement = document.querySelector('.in-game-container');

const game1_default_completion_count = 30;

let gameFailedCheckTimeout = null;
// 게임 설정 객체
let gameConfig = {
    current_gameId: undefined,  // 현재 게임 ID
    body: undefined,  // 게임 바디 요소
    game1: {
        'background-url': "url('./assets/images/game1_background.png')",  // 게임1 배경 이미지 URL
        'main-img-url': "./assets/images/stone.png",  // 게임1 메인 이미지 URL
        'video-url': "./assets/video/game3_1_des.mp4",  // 게임1 비디오 URL
        'end-video-url': "./assets/video/game3_1_end.mp4",  // 게임1 비디오 URL
        'videoController': new VideoController(  // 게임1 비디오 컨트롤러
            document.getElementById('gameIntroVideo'),
            () => {
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    // setTimeout(() => gameIntroVideoEndCallback(), dev_video_delay * 1000);  // 개발 모드에서 지연 후 콜백
                }
            }
        ),
        gameCompletionQueue: ['B-box', 'C-box', 'A-box'],
        gameCompletionCount: game1_default_completion_count,
        gameCompletion: {  // 게임1 완료 상태
            'A-box': false,
            'B-box ': false,
            'C-box': false
        },

        gameSetTimeout: undefined,

        isTargetTouch: false,

        resetGameCompletion: () => {
            gameConfig.game1.gameCompletion = {
                'A-box': false,
                'B-box ': false,
                'C-box': false
            };
            gameConfig.game1.gameCompletionQueue = ['B-box', 'A-box', 'C-box'];

            gameConfig.game1.isTargetTouch = false;

            gameConfig.game1.gameCompletionCount = game1_default_completion_count;
        },

        restartGame: () => {
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
            // console.log(gameConfig.game1.gameCompletionQueue[0])
            game1ItemContainer.setAttribute('Completion', gameConfig.game1.gameCompletionQueue[0]);

            // 타켓 opacity 초기화
            document.querySelectorAll('.fade-animation').forEach(el => {
                el.style.opacity = '1';
            });
        },

        timeoutGame: () => {
            // console.log('시간 초과되어 검증 시작 불가');

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

        checkDuplicateTouch: () => {
            // console.log('중복 터치 방지 체크 : ' + gameConfig.game1.isTargetTouch);
            return gameConfig.game1.isTargetTouch;
        }

    },
    game2: {
        'isGaugeTouchYN': true,
        'isGaugeStop': true,
        'background-url': "url('./assets/images/game2/game2_background.png')",  // 게임2 배경 이미지 URL
        'component-img': {  // 게임2 컴포넌트 이미지 URL
            'section1': "./assets/images/game2/game2-section1.png",
            'section2': "./assets/images/game2/game2-section2.png",
            'section3': "./assets/images/game2/game2-section3.png"
        },
        'video-url': "./assets/video/game3_2_des.mp4",  // 게임2 비디오 URL
        'end-video-url': "./assets/video/game3_2_end.mp4",  // 게임1 비디오 URL
        'videoController': new VideoController(  // 게임2 비디오 컨트롤러
            document.getElementById('gameIntroVideo'),
            () => {
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    setTimeout(() => gameIntroVideoEndCallback(), dev_video_delay * 1000);  // 개발 모드에서 지연 후 콜백
                }
            }
        ),
        'current-level': 1,  // 게임2 현재 레벨
        'current-section': 3,  // 게임2 현재 섹션
        'sectionOneTimer': null,  // 섹션 1 타이머 추가
        'sectionTwoTimer': null,  // 섹션 2 타이머 추가
        'maxLevel': 3, // 게임2 최대 레벨

        configReset: () => {
            gameConfig.game2['current-level'] = 1;
            gameConfig.game2['current-section'] = 3;
            gameConfig.game2['sectionOneTimer'] = null;
            gameConfig.game2['sectionTwoTimer'] = null;

            gameConfig.game2.isGaugeTouchYN = true;
            gameConfig.game2.isGaugeStop = true;


            game2_position_audio_play_count = 0;

            if (game2_target_position_check_timeout != null) {
                clearTimeout(game2_target_position_check_timeout);
                game2_target_position_check_timeout = null;
            }

            if (gameFailedCheckTimeout != null) {
                clearTimeout(gameFailedCheckTimeout);
                gameFailedCheckTimeout = null;
            }
        },

        restartGame: () => {
            gameConfig.game2.configReset();

            game2_gauge_target_move_toggle();
            game2_target_animation_reset();
            game2_result_image_reset();

            const furnaceImage = document.querySelectorAll('.furnace-image');
            if (furnaceImage != undefined) {
                furnaceImage.forEach(el => {
                    el.style.opacity = '1';
                })
            }
            document.querySelector('.game2-container').setAttribute('current_level', gameConfig.game2['current-level']);
            document.querySelector('.component_container').setAttribute('current_level', gameConfig.game2['current-level']);
        }
    },
    game3: {
        'background-url': "url('./assets/images/game3/game3-background.webp')",  // 게임3 배경 이미지 URL
        'video-url': "./assets/video/game3_3_des.mp4",  // 게임3 비디오 URL
        'end-video-url': "./assets/video/game3_3_end.mp4",  // 게임3 비디오 URL
        'videoController': new VideoController(  // 게임2 비디오 컨트롤러
            document.getElementById('gameIntroVideo'),
            () => {
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    setTimeout(() => gameIntroVideoEndCallback(), dev_video_delay * 1000);  // 개발 모드에서 지연 후 콜백
                }
            }
        ),
        'fire-burn-audio-controller': new AudioController(
            document.getElementById('fire-burn-audio'),
            () => {
                // console.log('fire burn audio play');
            }
        ),
        'is-game-complete': false,
        'current-level': 1,  // 게임3 현재 레벨
        'maxLevel': 3,  // 게임2 최대 레벨
        'bonus-level': 1,  // 초월한 레벨
        'level-check-timer': null,
        'level-check-timer-interval': 5000,
        'current-fire-scale': 1,
        'fire-animation-timeline': null,
        downLevel: () => {


            const gameItemFire = document.getElementById('game_item_fire');
            gameItemFire.style.opacity = '0';

            gameConfig.game3['current-level']--;
            gameConfig.game3['current-fire-scale']--;
            gameConfig.game3['bonus-level'] = 1;

            setTimeout(() => {
                gameItemFire.setAttribute('scale', gameConfig.game3['current-fire-scale']);
                gameItemFire.style.opacity = '1';
            }, 500);
        },
        upLevel: () => {
            gameConfig.game3['current-level']++;
            gameConfig.game3['current-fire-scale']++;
            document.getElementById('game_item_fire').setAttribute('scale', gameConfig.game3['current-fire-scale']);
        },

        restartGame: () => {
            gameConfig.game3['is-game-complete'] = false;
            gameConfig.game3['current-level'] = 1;
            gameConfig.game3['current-fire-scale'] = 1;
            gameConfig.game3['bonus-level'] = 1;
            document.getElementById('game_item_fire').setAttribute('scale', gameConfig.game3['current-fire-scale']);

            // 게임 결과 아이템 투명도 초기화
            game3_result_item_opacity_controller();

            // 트리 애니메이션 추가
            game3_add_tree_animation();

            // 파이어 애니메이션 초기화
            game3_fire_resetAnimation();

            // 파이어 번 오디오 재생
            const fireBurnAudioController = gameConfig.game3['fire-burn-audio-controller'];
            fireBurnAudioController.fireBurnSound();

            game3_level_check_timer();
        },

        failGame: () => {
            timerController.pause();

            timerController.current_time = 0;
            timerController.timerTimeoutEvt();
        },

        failGameEvt: () => {
            gameConfig.game3.clearLevelCheckTimer();

            game3_remove_tree_animation();
            game3_fire_stopAnimation();

            const fireBurnAudioController = gameConfig.game3['fire-burn-audio-controller'];
            if (fireBurnAudioController) {
                fireBurnAudioController.reset();
            }
        },

        clearLevelCheckTimer: () => {
            // console.log('level-check-timer 초기화');
            clearTimeout(gameConfig.game3['level-check-timer']);
            gameConfig.game3['level-check-timer'] = null;
        },
        completeGame: () => {
            gameConfig.game3['is-game-complete'] = true;
        },

        configReset: () => {
            // console.log('game3 config reset');
            gameConfig.game3['is-game-complete'] = false;
            gameConfig.game3['current-level'] = 1;
            gameConfig.game3['current-fire-scale'] = 1;
            gameConfig.game3['bonus-level'] = 1;
            gameConfig.game3.clearLevelCheckTimer();

            const fireAnimationTimeline = gameConfig.game3['fire-animation-timeline'];
            if (fireAnimationTimeline) {
                fireAnimationTimeline.kill();
                gameConfig.game3['fire-animation-timeline'] = null;
            }

            const fireBurnAudioController = gameConfig.game3['fire-burn-audio-controller'];
            if (fireBurnAudioController) {
                fireBurnAudioController.reset();
            }

            game3_fire_stopAnimation();

        }
    }
}

// 게임 인트로 비디오 종료 콜백 함수
const gameIntroVideoEndCallback = () => {
    // console.log('end callback');
    userOut.hideTimer();
    const gameObject = getGameObject();
    // 비디오 페이드 아웃 + 인게임 페이드 인
    const videoEl = gameObject.videoController.video;
    controlContainerFadeInOut('out', videoEl,
        () => {
            // 배경화면 사전 변경
            if (gameConfig.current_gameId != 'game3') {
                gameConfig.body.style.backgroundImage = gameObject['background-url'];
            }
        },
        () => {
            // 비디오 초기화 
            gameObject.videoController.reset();
            gameObject.videoController.hide();

            // 게임 body fade in
            controlContainerFadeInOut('in', inGameScreenElement,
                inGameBodyFadeInStartCallback, inGameBodyFadeInCompleteCallback);
        }
    )
}

// 게임1 완료 비디오 종료 콜백
const game1EndVideoEndCallback = () => {
    // console.log('game1EndVideoEndCallback');
}



// 인게임 바디 페이드 인 시작 콜백
const inGameBodyFadeInStartCallback = () => {
    // 게임 오브젝트 관련 사전 추가
    // console.log('사진 추가 하기');

    timerController.show();

    gameConfig.body.setAttribute('current_game', gameConfig.current_gameId);

    if (gameConfig.current_gameId == 'game1') {
        gameConfig.game1.resetGameCompletion();
        game1_layout_setting(gameConfig.body);
    }

    if (gameConfig.current_gameId == 'game2') {
        game2_layout_setting(gameConfig.body);
    }

    if (gameConfig.current_gameId == 'game3') {
        game3_layout_setting(gameConfig.body);
    }
}

// 인게임 바디 페이드 인 완료 콜백
const inGameBodyFadeInCompleteCallback = () => {
    // 게임시작관련 함수
    // console.log('in game body fade in complete');
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
    controlContainerFadeInOut('in', inGameScreenElement, inGameScreenFadeInStartCallback, inGameScreenFadeInCompleteCallback);
}

// 인게임 스크린 페이드 인 시작 콜백
const inGameScreenFadeInStartCallback = () => {
    const introScreenElement = document.querySelector('.intro_container');
    introScreenElement.style.display = 'none';              // 인트로 제거
    inGameScreenElement.style.display = 'block';            // 인게임 뷰

    const gameObject = gameConfig[gameConfig.current_gameId];

    if (gameConfig.current_gameId == 'game1') {
        preloadAssets(game1_assets);
    }

    if (gameConfig.current_gameId == 'game2') {
        preloadAssets(game2_assets);
    }

    if (gameConfig.current_gameId == 'game3') {
        preloadAssets(game3_assets);
    }
    // console.log('선택한 게임레벨 : ' + gameConfig.current_gameId);

    if (gameObject.videoController != undefined) {
        // 비디오 컨트롤러 초기화
        gameObject.videoController.removeEvent();

        gameObject.videoController = new VideoController(  // 게임2 비디오 컨트롤러
            document.getElementById('gameIntroVideo'),
            () => {
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    setTimeout(() => {
                        gameIntroVideoEndCallback();
                    }, 1000);
                }
            },
            'end',
            false
        );
    }

    const videoController = gameObject.videoController;
    videoController.load(gameObject['video-url']);
    videoController.show();


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
    controlContainerFadeInOut('out', document.querySelector('.intro_container'), introScreenFadeOutStartCallback, introScreenFadeOutCompleteCallback);
};

// 현재 게임 오브젝트 가져오기
function getGameObject() {
    if (gameConfig.current_gameId == undefined) {
        return undefined;
    } else {
        return gameConfig[gameConfig.current_gameId];
    }
}

// 게임1 레이아웃 설정 함수
function game1_layout_setting(bodyElement) {
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

        // 박스 태그 내부에 1번,2번,3번 div생성

        const div1 = document.createElement('div');
        div1.className = 'game1_box_comp_1 fade-animation';
        box.appendChild(div1);

        const div2 = document.createElement('div');
        div2.className = 'game1_box_comp_2 fade-animation';
        box.appendChild(div2);

        const div3 = document.createElement('div');
        div3.className = 'game1_box_comp_3 fade-animation';
        box.appendChild(div3);
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

    game1_mangchi_touch_event(magchiItem);

    // 컨테이너를 body에 추가
    // 게이지바 추가
    const gaugeBar = createGaugeBar();
    bodyElement.appendChild(gameBox);
    bodyElement.appendChild(gaugeBar);
    bodyElement.appendChild(game1ItemContainer);

}

function game1_mangchi_touch_event(magchiItem) {
    magchiItem.addEventListener('touchstart', (event) => {
        // console.log('막대기 터치');

        if (gameConfig.game1.checkDuplicateTouch()) {
            return;
        }
        game1BoxTouchEvent_2(event.target);
    });
}

// 게이지바 생성 함수
function createGaugeBar() {
    if (gameConfig.current_gameId == 'game1') {
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

        gaugeBar.addEventListener('touchstart', (event) => {
            if (gameConfig.game1.checkDuplicateTouch()) {
                return;
            }
            game1BoxTouchEvent(event.target);
        })
        return gaugeBar;
    }

    if (gameConfig.current_gameId == 'game2') {
        // game2 게이지 바 생성 로직
    }
}

// 게이지 체크 함수
function checkGauge() {
    let isCorrect = false;

    function game1_check() {
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
        } else {
        }
        return isCorrect;
    }

    function game2_check() {
        // game2 체크 로직 (game1과 동일)
    }

    function game3_check() {
        // game3 체크 로직 (game1과 동일)
    }

    switch (gameConfig.current_gameId) {
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

    if (!checkGauge()) {
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

        if (status == 'game-timeout') {
            return;
        }


        // 게임 완료 큐 업데이트
        const game1ItemContainer = document.getElementById('game1_item_container');
        if (gameCompletionQueue.length > 0) {
            game1ItemContainer.setAttribute('Completion', gameCompletionQueue[0]);
        }

        // 클리어 박스 투명도 0
        clearBoxElement.style.opacity = 0;

        setTimeout(() => {
            clearBoxElement.style.display = 'none';
        }, 500);

        if (gameCompletion['A-box'] && gameCompletion['B-box'] && gameCompletion['C-box']) {
            timerController.pause();
            timerController.hide();

            audioController.gameClearSound();
            controlContainerFadeInOut('out', document.querySelector('.game1_item_container'),
                () => { }, () => { });

            common_game_clear(game1EndVideoEndCallback);

        } else {
            // 타겟 애니메이션 재시작
            targetElement.style.animationPlayState = 'running';
            targetElement.style.left = 0;  // left 스타일 제거하여 애니메이션 재개
            targetElement.classList.add('animation');
        }
        // 중복 터치 방지
        gameConfig.game1.isTargetTouch = false;
    }, 3000);

}

// 게임1 박스 터치 이벤트 처리 함수
function game1BoxTouchEvent_2(box) {
    // 중복 터치 방지
    gameConfig.game1.isTargetTouch = true;

    const gameObject = getGameObject();

    gameObject.gameCompletionCount--;

    let isClear = false;
    if (gameObject.gameCompletionCount <= 0) {    // 클리어
        isClear = true;
        gameObject.gameCompletionCount = game1_default_completion_count;
    } else {                                      // 횟수만 줄인 상태로 타임아웃만 실행
        isClear = false;
    }

    audioController.correctSound();

    if (isClear) {
        game1_clear(gameObject, gameObject.gameCompletionCount);
    } else {
        game1_non_clear(gameObject, gameObject.gameCompletionCount);
    }

    function game1_clear(gameObject, currentCount) {
        const gameCompletion = gameObject.gameCompletion;
        const gameCompletionQueue = gameObject.gameCompletionQueue;

        const clearBoxId = gameCompletionQueue.shift();
        const clearBoxElement = document.querySelector('.' + clearBoxId);

        gameCompletion[clearBoxId] = true;

        audioController.correctSound2();

        const magchiItem = document.getElementById('game1_item_magchi');
        magchiItem.classList.add('magchi_rotate');

        gameObject.gameSetTimeout = setTimeout(() => {

            game1_each_stone_opacity(clearBoxId, currentCount);

            // 막대기 아이템 회전 종료
            magchiItem.classList.remove('magchi_rotate');

            if (status == 'game-timeout') {
                return;
            }


            // 게임 완료 큐 업데이트
            const game1ItemContainer = document.getElementById('game1_item_container');
            if (gameCompletionQueue.length > 0) {
                game1ItemContainer.setAttribute('Completion', gameCompletionQueue[0]);
            }

            // 클리어 박스 투명도 0
            clearBoxElement.style.opacity = 0;

            setTimeout(() => {
                clearBoxElement.style.display = 'none';
            }, 500);

            if (gameCompletion['A-box'] && gameCompletion['B-box'] && gameCompletion['C-box']) {
                timerController.pause();
                timerController.hide();

                audioController.gameClearSound();
                controlContainerFadeInOut('out', document.querySelector('.game1_item_container'),
                    () => { }, () => { });

                common_game_clear(game1EndVideoEndCallback);

            }
            // 중복 터치 방지
            gameConfig.game1.isTargetTouch = false;
        }, 1000);
    }

    function game1_non_clear(gameObject, currentCount) {
        // audioController.correctSound();

        const magchiItem = document.getElementById('game1_item_magchi');
        magchiItem.classList.add('magchi_rotate');

        gameObject.gameSetTimeout = setTimeout(() => {
            const gameCompletionQueue = gameObject.gameCompletionQueue;

            const currentBoxId = gameCompletionQueue[0];
            game1_each_stone_opacity(currentBoxId, currentCount);

            // 막대기 아이템 회전 종료
            magchiItem.classList.remove('magchi_rotate');

            if (status == 'game-timeout') {
                return;
            }
            // 중복 터치 방지
            gameConfig.game1.isTargetTouch = false;
        }, 200);
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
    resultImage.className = 'animation_paused';
    const componentImg = gameObject['component-img'];
    const level = gameObject['current-section'];
    // resultImage.style.backgroundImage = `url(${componentImg['section' + level]})`;
    return resultImage;
}

let game2_target_position_check_timeout = null;

function game2_resultImageAddEventListeners(resultImage) {
    let touchStartTime;
    let isLongPress = false;
    const longPressThreshold = 500; // 0.5초

    function handleStart(e) {
        e.preventDefault();
        touchStartTime = Date.now();
        isLongPress = false;

        if (!gameConfig.game2.isGaugeTouchYN) {
            return;
        }

        if (game2_target_position_check_timeout != null) {
            clearTimeout(game2_target_position_check_timeout);
            game2_target_position_check_timeout = null;
        }

        if (document.querySelector('.component_container').getAttribute('current_section') == '3') {
            document.querySelector('.component_container').setAttribute('current_section', '2');
        }

        const target = document.getElementById('target');
        target.style.top = '';

        if (target.classList.contains('animation_paused')) {
            target.classList.remove('animation_paused');
        }

        if (resultImage.classList.contains('animation_paused')) {
            resultImage.classList.remove('animation_paused');
        }

        trackTargetPosition();
    }

    function handleEnd(e) {
        e.preventDefault();
        const touchEndTime = Date.now();
        isLongPress = (touchEndTime - touchStartTime) >= longPressThreshold;

        if (!gameConfig.game2.isGaugeTouchYN) {
            return;
        } else {
            gameConfig.game2.isGaugeTouchYN = false;
        }

        const target = document.getElementById('target');
        if (!target.classList.contains('animation_paused')) {
            target.classList.add('animation_paused');
        }

        if (!resultImage.classList.contains('animation_paused')) {
            if ('Y' != game2_target_position_check) {
                resultImage.classList.add('animation_paused');
            }
        }

        game2_target_position_check_timeout = setTimeout(() => {
            if (game2_target_position_check == 'N') {
                game2_fail_event(resultImage, target);
            } else if (game2_target_position_check == 'F') {
                game2_fail_event(resultImage, target);
            } else if (game2_target_position_check == 'Y') {
                const gameObject = getGameObject();
                const componentContainer = document.querySelector('.component_container');
                resultImage.classList.remove('tilted');
                game2_position_audio_play_count = 0;
                gameObject.sectionTwoTimer = setTimeout(() => {

                    if (gameObject['current-level'] < gameObject.maxLevel) {
                        audioController.correctSound2();
                        // component_container fade out

                        controlContainerFadeInOut('out', componentContainer,
                            () => {
                                game2_target_animation_reset();
                            },
                            () => {
                                const gameObject = getGameObject();
                                gameObject['current-section'] = 3;
                                const componentContainer = document.querySelector('.component_container');
                                componentContainer.setAttribute('current_section', 3);
                                game2_level_up();

                                // component_container fade in
                                controlContainerFadeInOut('in', componentContainer,
                                    () => {
                                        gameConfig.game2.isGaugeTouchYN = true;
                                        game2_target_position_check = 'N';
                                    },
                                    () => {

                                    }
                                );
                            }
                        );

                        // 레벨 업 후 타겟을 초기 위치로 리셋
                        // game2_resetTargetPosition(target);
                    } else {
                        // component_container fade out
                        console.log('############ game clear')
                        audioController.gameClearSound();
                        resultImage.style.opacity = '0';

                        const resultTarget = document.getElementById('result_target');
                        controlContainerFadeInOut('in', resultTarget,
                            () => {
                                const furnaceImage = document.querySelectorAll('.furnace-image');
                                if (furnaceImage != undefined) {
                                    furnaceImage.forEach(el => {
                                        el.style.opacity = '1';
                                    })
                                }
                            },
                            () => {

                                resultTarget.classList.add('move_up');
                            }
                        );
                        timerController.hide();
                        game2_level_up();

                        controlContainerFadeInOut('out', componentContainer,
                            () => {

                            },
                            () => {

                                timerController.pause();
                                common_game_clear(() => { });
                            }
                        );
                    }
                }, 1);

            }
        }, 1000);
    }

    // 터치 이벤트
    resultImage.addEventListener('touchstart', handleStart);
    resultImage.addEventListener('touchend', handleEnd);

    // 마우스 이벤트
    resultImage.addEventListener('mousedown', handleStart);
    resultImage.addEventListener('mouseup', handleEnd);

    // 포인터 이벤트 (옵션)
    resultImage.addEventListener('pointerdown', handleStart);
    resultImage.addEventListener('pointerup', handleEnd);
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
    target.className = 'move_up_target animation_paused';
    target.draggable = true;

    // 초기 위치 설정을 지연
    setTimeout(() => {
        const gaugeContainer = document.querySelector('.gauge-container');
        if (gaugeContainer) {
            target.style.top = '354px';
        } else {
            console.error('Gauge container not found');
        }
    }, 0);

    // game2_addTargetEventListeners(target);
    return target;
}

// 게임2의 타겟에 이벤트 리스너를 추가하는 함수
function game2_addTargetEventListeners(target) {
    let startY, initialTop;

    target.addEventListener('touchstart', function (e) {
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

    target.addEventListener('touchmove', function (e) {
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

    target.addEventListener('touchend', function () {
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
    for (let i = 0; i < 4; i++) {
        const furnaceImage = document.createElement('div');
        furnaceImage.id = 'furnace-image' + (i + 1);
        furnaceImage.className = 'furnace-image';
        furnaceImage.setAttribute('current_section', i + 1);
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
    game2_resultImageAddEventListeners(resultImage);
    const gaugeContainer = game2_createGaugeContainer();
    const gauge = game2_createGauge();
    const target = game2_createTarget();
    const furnaceImage = game2_createFurnaceImage(gameObject);
    const resultTarget = game2_createResultTarget();

    furnaceImage.appendChild(resultTarget);

    preloadAssets(game2_key_img);

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
            target.style.top = '354px';
        }
    }, 0);

    // 초기 결과 이미지 설정 (섹션 3)
    game2_updateResultImage(1);
}

let test = undefined

// 게임2의 결과 이미지를 업데이트하는 함수
function game2_updateResultImage(position) {
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
        clearTimeout(test);
        // resultImage.style.opacity = '0';
        test = setTimeout(() => {
            componentContainer.setAttribute('current_section', newSection);
            gameObject['current-section'] = newSection;
            resultImage.style.opacity = '1';

            // resultImage.style.backgroundImage = `url(${componentImg['section' + newSection]})`;

            if (newSection === 1) {     // 실패
                resultImage.classList.add('tilted');
                if (gameObject.sectionOneTimer) clearTimeout(gameObject.sectionOneTimer);
                gameObject.sectionOneTimer = setTimeout(() => {
                    resultImage.style.opacity = '0';
                    game2_resetTargetPosition(target);
                    audioController.failSound();
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
                        audioController.correctSound2();
                        // component_container fade out

                        controlContainerFadeInOut('out', componentContainer,
                            () => {
                            },
                            () => {
                                target.style.top = '265px';
                                const gameObject = getGameObject();
                                gameObject['current-section'] = 3;
                                const componentContainer = document.querySelector('.component_container');
                                componentContainer.setAttribute('current_section', 3);
                                game2_level_up();

                                // component_container fade in
                                controlContainerFadeInOut('in', componentContainer,
                                    () => {
                                    },
                                    () => {
                                    }
                                );
                            }
                        );

                        // 레벨 업 후 타겟을 초기 위치로 리셋
                        // game2_resetTargetPosition(target);
                    } else {
                        // component_container fade out
                        console.log('############ game clear')
                        audioController.gameClearSound();
                        resultImage.style.opacity = '0';

                        const resultTarget = document.getElementById('result_target');
                        controlContainerFadeInOut('in', resultTarget,
                            () => {
                                const furnaceImage = document.querySelectorAll('.furnace-image');
                                if (furnaceImage != undefined) {
                                    furnaceImage.forEach(el => {
                                        el.style.opacity = '1';
                                    })
                                }
                            },
                            () => {

                                resultTarget.classList.add('move_up');
                            }
                        );
                        timerController.hide();
                        game2_level_up();

                        controlContainerFadeInOut('out', componentContainer,
                            () => {

                            },
                            () => {

                                timerController.pause();
                                common_game_clear(() => { });
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

        }, 100);
    }
}

function game2_level_up() {
    const gameObject = getGameObject();
    const componentContainer = document.querySelector('.component_container');
    const gameContainer = document.querySelector('.game2-container');
    gameObject['current-level']++;
    componentContainer.setAttribute('current_level', gameObject['current-level']);
    gameContainer.setAttribute('current_level', gameObject['current-level']);

    if (gameObject['current-level'] > 1) {
        // class = furnace-image  current_section 속성이 gameObject['current-level']-1 인 요소 찾기
        const furnaceImage = document.querySelector('.furnace-image[current_section="' + (gameObject['current-level'] - 1) + '"]');
        furnaceImage.style.opacity = '0';
    }

    // console.log(`레벨이 ${gameObject['current-level']}로 올라갔습니다.`);

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
            // game2_updateResultImage(newY / gaugeRect.height);

            requestAnimationFrame(animate);
        } else {
            // 애니메이션 완료
            target.style.top = `${endY}px`;
            game2_updateResultImage(1);

            // 리셋 후 current-section을 3으로 설정
            const gameObject = getGameObject();
            gameObject['current-section'] = 3;
            // const componentContainer = document.querySelector('.component_container');
            // componentContainer.setAttribute('current_section', 3);
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

    // gameConfig 에서 불 오디오 무한재생
    game3_set_fire_sound();
    getGameObject()['fire-burn-audio-controller'].fireBurnSound();


}

// 게임3의 배경을 생성하는 함수
function game3_createGameBackground() {
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


    const fireBurn1 = document.createElement('div');
    fireBurn1.className = 'fire-burn fire-burn-1';
    fireBurn1.id = 'fire-burn-1';
    fireBurn1.style.zIndex = '1'; // 불에 z-index 1 설정

    const fireBurn2 = document.createElement('div');
    fireBurn2.className = 'fire-burn fire-burn-2';
    fireBurn2.id = 'fire-burn-2';
    fireBurn2.style.zIndex = '1'; // 불에 z-index 1 설정


    gameItemFire.appendChild(fireBurn1);
    gameItemFire.appendChild(fireBurn2);


    game3_fire_startAnimation(fireBurn1, fireBurn2);

    // game_item_tree 생성
    const gameItemTree = document.createElement('div');
    gameItemTree.className = 'game_item_tree heartbeat';
    gameItemTree.id = 'game_item_tree';
    gameItemTree.style.zIndex = '2'; // 트리에 z-index 2 설정 (불보다 높게)

    const gameItemTreeShadow = document.createElement('div');
    gameItemTreeShadow.className = 'game_item_tree_shadow heartbeat';
    gameItemTreeShadow.id = 'game_item_tree_shadow';
    gameItemTreeShadow.style.zIndex = '1'; // 트리에 z-index 2 설정 (불보다 높게)

    // game_item_result 생성
    const gameItemResult = document.createElement('div');
    gameItemResult.className = 'game_item_result';
    gameItemResult.id = 'game_item_result';
    gameItemResult.style.zIndex = '3'; // 결과 아이템에 가장 높은 z-index 설정

    const gameDragDropBox = document.createElement('div');
    gameDragDropBox.className = 'game_drag_drop_box';
    gameDragDropBox.id = 'game_drag_drop_box';
    // gameDragDropBox.innerHTML = '여기엔 나무를 넣습니다.';
    // gameDragDropBox.style.fontSize = '100px';
    gameDragDropBox.style.zIndex = '4'; // 드래그 앤 드롭 박스에 z-index 4 설정


    let zIndex = 5 + 4;
    for (let i = 0; i < 4; i++) {
        const gameResultItem = document.createElement('div');
        gameResultItem.className = 'game_result_item trans_opacity_ease';
        gameResultItem.id = 'game_result_item_' + i;
        gameResultItem.style.zIndex = --zIndex;
        gameItemResult.appendChild(gameResultItem);
    }

    // 요소들을 gameBackground에 추가
    gameBackground.appendChild(gameItemFire);
    gameBackground.appendChild(gameItemTree);
    gameBackground.appendChild(gameItemTreeShadow);
    gameBackground.appendChild(gameItemResult);
    gameBackground.appendChild(gameDragDropBox);
    // gameBackground를 game_body에 추가
    gameBody.appendChild(gameBackground);
}

// 게임3의 레벨 체크 타이머 함수
function game3_level_check_timer() {
    // console.log('게임3 레벨 체크 타이머 시작');
    const gameObject = getGameObject();

    if (gameObject['level-check-timer'] != null) {
        clearTimeout(gameObject['level-check-timer']);
        gameObject['level-check-timer'] = null;
    }

    gameObject['level-check-timer'] = setTimeout(() => {
        if (gameObject['current-level'] == 1) {
            gameObject.failGame();
        } else if (gameObject['current-level'] == 2 || gameObject['current-level'] == 3) {
            game3_no_answer_popup_show();
            gameObject.downLevel();
            audioController.failSound();
            game3_result_item_opacity_controller();
            game3_level_check_timer();
        }
        game3_set_fire_sound();
    }, gameObject['level-check-timer-interval']);
}


let isTreeAnimation = false;
// 게임 초기화 함수
function game3_initializeGame() {

    const gameBody = document.getElementById('game_body');
    game3_createGameBackground(gameBody);

    setTimeout(() => {
        const treeElement = document.getElementById('game_item_tree');
        const dropZone = document.getElementById('game_drag_drop_box');
        if (treeElement && dropZone) {
            // interact(treeElement).draggable({
            //     listeners: {
            //         start(event) {
            //             gameConfig.game3.clearLevelCheckTimer();
            //             // tree 애니메이션 정지
            //             game3_remove_tree_animation();
            //             event.preventDefault();
            //         },
            //         move(event) {
            //             const target = event.target;
            //             const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            //             const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            //             target.style.transform = `translate(${x}px, ${y}px)`;
            //             target.setAttribute('data-x', x);
            //             target.setAttribute('data-y', y);
            //         },
            //         end(event) {
            //             const target = event.target;
            //             // 드래그 종료 시 트리가 드롭 영역에 놓였는지 확인
            //             game3_checkDropZone(target, dropZone);
            //             // 드래그 종료 시 트리 위치 초기화
            //             game3_resetTreePosition(target);
            //             // tree 애니메이션 추가
            //             setTimeout(() => {
            //                 game3_add_tree_animation(treeElement);
            //             }, 500);
            //             if (!gameConfig.game3['is-game-complete']) {
            //                 game3_level_check_timer();
            //             }
            //         }
            //     },
            //     inertia: false,
            //     modifiers: [
            //         interact.modifiers.restrictRect({
            //             restriction: 'parent',
            //             endOnly: true
            //         })
            //     ],
            // });

            // 터치 이벤트 방지
            treeElement.addEventListener('touchend', function (e) {
                e.preventDefault();

                if (isTreeAnimation) {
                    return;
                }

                const gameItemTreeShadow = document.getElementById('game_item_tree_shadow');

                isTreeAnimation = true;
                treeElement.classList.add('treeAnimation');
                gameItemTreeShadow.style.display = 'none';

                setTimeout(() => {
                    treeElement.classList.remove('treeAnimation');
                    gameItemTreeShadow.style.display = null;

                    game3_check_Complete();

                    if (!gameConfig.game3['is-game-complete']) {
                        game3_level_check_timer();
                    }

                    isTreeAnimation = false;


                }, 320);
            }, { passive: false });
        } else {
            console.error('game_item_tree 또는 game_drag_drop_box 요소를 찾을 수 없습니다.');
        }
    }, 100);
}

// 게임3의 드래그 종료 체크 함수
function game3_checkDropZone(target, dropZone) {
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
function game3_check_Complete() {
    const currentLevel = gameConfig.game3['current-level'];
    if (currentLevel == gameConfig.game3['maxLevel']) {
        if (gameConfig.game3['bonus-level'] >= 3) {
            game3_complete_game();
        } else {
            console.log('게임3 보너스 레벨 생성 ===> ' + gameConfig.game3['bonus-level']);
            game3_create_next_bonus_level();
        }
    } else {
        game3_create_next_level();
    }
}

// 게임3의 게임 완료 함수
function game3_complete_game() {
    const gameObject = getGameObject();
    gameObject.clearLevelCheckTimer();
    gameObject.completeGame();

    // burn 사운드 종료
    gameObject['fire-burn-audio-controller'].reset();

    // 트리 애니메이션 정지
    game3_remove_tree_animation();

    timerController.pause();
    timerController.hide();
    audioController.gameClearSound();

    // game_item_fire , game_item_tree fadeout
    setTimeout(() => {
        controlContainerFadeInOut('out', document.querySelector('.game_item_fire'),
            () => {
                // 게임3의 레벨이 3 이하일 때 모든 결과 아이템 투명도 0으로 설정
                setTimeout(() => {
                    document.querySelectorAll('.game_result_item').forEach(item => {
                        item.style.opacity = '1';
                    });
                }, 200);
            }
        );
        controlContainerFadeInOut('out', document.querySelector('.game_item_tree'));
        controlContainerFadeInOut('out', document.querySelector('.game_item_tree_shadow'));
    }, 100);

    common_game_clear();
}

// 게임3의 다음 레벨 생성 함수
function game3_create_next_level() {
    gameConfig.game3['current-level']++;
    gameConfig.game3['current-fire-scale']++;

    game3_result_item_opacity_controller();

    const gameItemFire = document.getElementById('game_item_fire');
    gameItemFire.style.opacity = '0';
    setTimeout(() => {
        gameItemFire.setAttribute('scale', gameConfig.game3['current-fire-scale']);
        gameItemFire.style.opacity = '1';
    }, 500);
    audioController.correctSound2();
    // current-level 에 따라 burn 사운드 조절 
    game3_set_fire_sound();
}

// 게임3의 다음 레벨 생성 함수
function game3_create_next_bonus_level() {
    gameConfig.game3['bonus-level']++;

    game3_result_item_opacity_controller();
    audioController.correctSound2();
    // current-level 에 따라 burn 사운드 조절 
    game3_set_fire_sound();
}

function game3_set_fire_sound() {
    const gameObject = getGameObject();
    const fireBurnAudio = gameObject['fire-burn-audio-controller'];
    const currentLevel = gameConfig.game3['current-level'];
    if (currentLevel == 1) {
        fireBurnAudio.setAudioSound(0.3);
    } else if (currentLevel == 2) {
        fireBurnAudio.setAudioSound(0.6);
    } else if (currentLevel == 3) {
        fireBurnAudio.setAudioSound(1);
    }
}



function game3_set_fire_sound() {
    const gameObject = getGameObject();
    const fireBurnAudio = gameObject['fire-burn-audio-controller'];
    const currentLevel = gameConfig.game3['current-level'];
    if (currentLevel == 1) {
        fireBurnAudio.setAudioSound(0.3);
    } else if (currentLevel == 2) {
        fireBurnAudio.setAudioSound(0.6);
    } else if (currentLevel == 3) {
        fireBurnAudio.setAudioSound(1);
    }
}

function common_game_clear(videoEndCallback) {

    let sec = 0;
    let fadeOutSec = 4500;

    switch (gameConfig.current_gameId) {
        case 'game1':
            sec = 4500;
            break;
        case 'game2':
            sec = 3500;
            break;
        case 'game3':
            sec = 4500;
            fadeOutSec = 2000;
            break;
    }

    const gameObject = gameConfig[gameConfig.current_gameId];
    const videoController = gameObject.videoController;


    // 비디오 컨트롤러 초기화
    videoController.updateEvent(videoEndCallback, 'end', false);

    videoController.video.src = gameObject['end-video-url'];
    // load
    videoController.load();

    setTimeout(() => {
        // game_body fade out
        controlContainerFadeInOut('out', document.querySelector('.game_body'),
            () => {
                console.log('game_body fade out');
            },
            () => {

                videoController.show();

                //gameIntroVideo fade in
                controlContainerFadeInOut('in', document.querySelector('#gameIntroVideo'),
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
                            showGameClearPop('', '', true);
                            status = 'end-game';
                        }, sec);
                    }
                );
            }
        );
    }, fadeOutSec);
}

let game3_fire_animation_interval = null;
function game3_fire_startAnimation(fire1, fire2) {

    game3_fire_animation_interval = setInterval(() => {
        if (fire1.style.display == 'block') {
            fire1.style.display = 'none';
            fire2.style.display = 'block';
        } else {
            fire1.style.display = 'block';
            fire2.style.display = 'none';
        }
    }, 100);
}

function game3_fire_stopAnimation() {
    clearInterval(game3_fire_animation_interval);
    game3_fire_animation_interval = null;

    const fire1 = document.getElementById('fire-burn-1');
    const fire2 = document.getElementById('fire-burn-2');

    // undefined 체크   
    if (fire1) {
        fire1.style.display = 'none';
    }
    if (fire2) {
        fire2.style.display = 'none';
    }
}

function game3_fire_resetAnimation() {
    if (game3_fire_animation_interval != null) {
        clearInterval(game3_fire_animation_interval);
        game3_fire_animation_interval = null;
    }

    const fire1 = document.getElementById('fire-burn-1');
    const fire2 = document.getElementById('fire-burn-2');

    // undefined 체크
    if (fire1) {
        fire1.style.display = 'block';
    }
    if (fire2) {
        fire2.style.display = 'none';
    }

    if (fire1 && fire2) {
        game3_fire_animation_interval = setInterval(() => {
            if (fire1.style.display == 'block') {
                fire1.style.display = 'none';
                fire2.style.display = 'block';
            } else {
                fire1.style.display = 'block';
                fire2.style.display = 'none';
            }
        }, 100);
    }
}

function game3_add_tree_animation() {
    const treeElement = document.getElementById('game_item_tree');
    treeElement.classList.add('heartbeat');

    const treeShadowElement = document.getElementById('game_item_tree_shadow');
    treeShadowElement.classList.add('heartbeat');
}

function game3_remove_tree_animation() {
    const treeElement = document.getElementById('game_item_tree');
    treeElement.classList.remove('heartbeat');

    const treeShadowElement = document.getElementById('game_item_tree_shadow');
    treeShadowElement.classList.remove('heartbeat');
}

function game3_result_item_opacity_controller() {
    if (gameConfig.game3['current-level'] == 3) {
        if (gameConfig.game3['bonus-level'] == 1) {
            const gameResultItem = document.getElementById('game_result_item_0');
            gameResultItem.style.opacity = '0';
        } else if (gameConfig.game3['bonus-level'] == 2) {
            const gameResultItem = document.getElementById('game_result_item_1');
            gameResultItem.style.opacity = '0';
        } else if (gameConfig.game3['bonus-level'] == 3) {
            const gameResultItem = document.getElementById('game_result_item_2');
            gameResultItem.style.opacity = '0';
        }
    } else {
        // 게임3의 레벨이 3 이하일 때 모든 결과 아이템 투명도 0으로 설정
        document.querySelectorAll('.game_result_item').forEach(item => {
            item.style.opacity = '1';
        });
    }
}

function game2_createResultTarget() {
    const resultTarget = document.createElement('div');
    resultTarget.className = 'result_target';
    resultTarget.id = 'result_target';
    return resultTarget;
}

function game1_each_stone_opacity(currentBoxId, currentCount) {
    const calcCount = Math.floor(currentCount / 10);
    const cal = currentCount % 10;



    // console.log(calcCount, cal);

    let opacityTarget;
    if (calcCount == 2 && cal == 0) {
        opacityTarget = document.querySelector('.' + currentBoxId + ' .game1_box_comp_1');
    } else if (calcCount == 1 && cal == 0) {
        opacityTarget = document.querySelector('.' + currentBoxId + ' .game1_box_comp_2');
    } else if (calcCount == 0 && cal == 0) {
        opacityTarget = document.querySelector('.' + currentBoxId + ' .game1_box_comp_3');
    }

    // console.log(opacityTarget);
    if (opacityTarget) {
        opacityTarget.style.opacity = 0;
        stoneDeleteAudioController.stoneDelete();
    }
}


let animationFrameId;
// N : 파랑 , Y : 클리어 , F : 넘침
let game2_target_position_check = 'N';
let game2_position_audio_play_count = 0;

function trackTargetPosition() {
    const target = document.getElementById('target');


    function updatePosition() {
        const computedStyle = window.getComputedStyle(target);
        const topValue = computedStyle.getPropertyValue('top');

        let topValueInt = parseInt(topValue);

        if (topValueInt <= 354 && topValueInt >= 120) {
            game2_target_position_check = 'N';
        } else if (topValueInt < 120 && topValueInt > 50) {
            game2_target_position_check = 'Y';
        } else if (topValueInt <= 50) {
            game2_target_position_check = 'F';
        }

        if (game2_target_position_check == 'F') {
            // .component_container 속성 current_section="3"  으로 변경
            document.querySelector('.component_container').setAttribute('current_section', '1');
        }

        if (game2_target_position_check == 'Y') {
            game2_position_audio_play_count++;
            if (game2_position_audio_play_count == 1) {
                throwWaterAudioController.throwWater();
            }
        }

        // 애니메이션이 끝났거나 일시정지되었는지 확인
        if (topValueInt === 10 || target.classList.contains('animation_paused')) {
            // console.log('애니메이션 완료 또는 일시정지');
            cancelAnimationFrame(animationFrameId);
            return;
        }

        // 다음 프레임에서 다시 실행
        animationFrameId = requestAnimationFrame(updatePosition);
    }

    // 애니메이션 시작 시 호출
    animationFrameId = requestAnimationFrame(updatePosition);
}

function game2_target_animation_reset() {
    const target = document.getElementById('target');
    // 애니메이션 재시작
    target.style.animation = 'none';
    target.offsetHeight; // 리플로우 강제 실행
    target.style.animation = null;

}

function game2_result_image_reset() {
    document.querySelector('.component_container').setAttribute('current_section', '3');
}

function game2_fail_event(resultImage, target) {
    resultImage.style.opacity = '0';
    target.style.opacity = '0';

    setTimeout(() => {
        if (gameConfig.game2.isGaugeStop) {
            resultImage.style.opacity = '1';
            target.style.opacity = '1';

            game2_target_animation_reset();

            audioController.failSound();

            document.querySelector('.component_container').setAttribute('current_section', '3');

            game2_position_audio_play_count = 0;
        } else {
            // console.log('게이지가 움직이고 있어 실패이벤트를 실행 하지 않음')
        }
        gameConfig.game2.isGaugeTouchYN = true;
    }, 500);
}

function game2_gauge_target_move_toggle() {

    const target = document.getElementById('target');
    const resultImage = document.getElementById('result-image');

    if (gameConfig.game2.isGaugeStop) {       // 게이지가 멈추기

        target.classList.add('animation_paused');

        if ('Y' != game2_target_position_check) {
            resultImage.classList.add('animation_paused');
        }
    } else {                                  // 게이지 멈춤 해제
        resultImage.classList.remove('animation_paused');
        target.classList.remove('animation_paused');
    }
}

function game3_no_answer_show() {
    const noAnswerContainer = document.getElementById('no-answer-container');
    noAnswerContainer.classList.remove('hide');
}

function game3_no_answer_hide() {
    const noAnswerContainer = document.getElementById('no-answer-container');
    noAnswerContainer.classList.add('hide');
}

function game3_no_answer_popup_show() {
    game3_no_answer_show();

    setTimeout(() => {
        game3_no_answer_hide();
    }, 1000);
}

