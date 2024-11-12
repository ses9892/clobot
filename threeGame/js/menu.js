// 상태 변수 정의
let status = "intro"; // 초기 상태는 "인트로 화면"
const loadingTime = 100;
const dev_video_delay = 1;
const outCheckTime = 30;

// 개발 모드 변수 설정
const isDevMode = false;
let isIntroVideoEnded = false;

let isDoubleTouch = false;




class userOutController {
    constructor() {
        this.default_out_check_time = outCheckTime;
        this.current_out_check_time = this.default_out_check_time;

        document.body.addEventListener('touchstart', (e) => {

            // 재시작,종료 버튼눌렀을때만 이벤트 제외
            if (e.target.id === 'game-restart-button' || e.target.id === 'end-button'
                || e.target.id === 'game-menu-select-button'
            ) {
                return;
            }

            if(status == 'end-game'){
                this.current_out_check_time = 15;
            }else{
                this.current_out_check_time = this.default_out_check_time;
            }

            document.getElementById('user-out-timer').textContent = this.current_out_check_time;
        });
    }
    start() {

        this.interval = setInterval(() => {
            document.getElementById('user-out-timer').textContent = this.current_out_check_time;
            this.current_out_check_time--;
            if (this.current_out_check_time < 0) {
                if (status == 'intro') {
                    this.current_out_check_time = this.default_out_check_time;
                } else {

                    switch (status) {
                        case 'game-menu-select':
                            // controlContainerFadeInOut('out' , gameMenuContainer , 
                            //     () => {
                            //         introVideo.reset();
                            //     }, 
                            //     () => {
                            //         introVideo.play(true);
                            //     }
                            //  );      // 메뉴 fade out
                            sendContentMessage('end');
                            this.current_out_check_time = 0;
                            break;
                        case 'game-timeout':
                            // this.currnet_time_reset(false);
                            sendContentMessage('end');
                            this.current_out_check_time = 0;
                            // goMenu();
                            break;
                        case 'end-game':
                            sendContentMessage('end');
                            this.current_out_check_time = 0;
                            break;
                        default:
                            this.current_out_check_time = this.default_out_check_time;
                            break;
                    }


                }
            }
            document.getElementById('user-out-timer').textContent = this.current_out_check_time;
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = undefined;
    }

    showTimer() {
        document.getElementById('user-out-timer').classList.remove('hide');
    }

    hideTimer() {
        document.getElementById('user-out-timer').classList.add('hide');
    }

    toggleTimer() {
        // 타이머 표시 여부에 따라 전환
        document.getElementById('user-out-timer').classList.toggle('hide');
    }

    currnet_time_reset(isGameEnding) {
        if (isGameEnding) {
            this.current_out_check_time = 15;
        } else {
            this.current_out_check_time = this.default_out_check_time;
        }
        document.getElementById('user-out-timer').textContent = this.current_out_check_time;
    }
}

// 비디오 컨트롤러 클래스
class VideoController {
    constructor(videoElement, onEndedCallback, devCallBack, controlStatus, isAllEvent) {
        this.video = videoElement;
        this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트


        // 비디오 컨트롤러 초기화

        if (devCallBack) {
            devCallBack();
        }
        // if(!isAllEvent){
        //     if(controlStatus == undefined){
        //         this.video.addEventListener('touchstart' , onEndedCallback);
        //     }

        //     if(controlStatus == 'end'){
        //         this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트
        //     }
        //     // this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트
        //     this.devCallBack = devCallBack;
        // }else{
        //     this.video.addEventListener('touchstart' , onEndedCallback);
        //     this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트
        // }
    }

    play(isIntro) {
        if (isIntro) {
            status = 'intro';
        }
        this.video.style.display = 'block'; // 비디오 표시
        this.video.muted = false;
        this.video.volume = 1;
        this.video.play();

        // if(this.devCallBack){
        //     this.devCallBack();
        // }

    }

    hide() {
        this.video.style.display = 'none'; // 비디오 숨기기
        this.video.style.opacity = 0;

        // z-index 최하위로 변경
        this.video.style.zIndex = -1000;
    }

    pause() {
        this.video.pause(); // 비디오 일시정지
    }

    getDuration() {
        return this.video.duration; // 비디오 길이 반환
    }

    reset() {
        this.video.currentTime = 0;
        this.video.pause();
        this.video.removeAttribute('style');
    }

    show() {
        this.video.style.display = 'block';
        this.video.style.opacity = 1;
        // z-index 최상위로 변경
        this.video.style.zIndex = 1000;
    }

    // this video의 모든 이벤트 해제
    removeEvent() {
        // 모든 이벤트 리스너 제거
        this.video.replaceWith(this.video.cloneNode(true));
        this.video = document.getElementById(this.video.id); // 새로운 요소 참조 업데이트
    }

    updateEvent(onEndedCallback) {
        this.removeEvent();
        this.video.addEventListener('touchstart', onEndedCallback);
        this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트
    }

    load(src) {
        if (src == undefined) {
            this.video.load();
        } else {
            this.video.src = src;
            this.video.load();
        }
    }
}

// 버튼 컨트롤러 클래스
class ButtonController {
    constructor(buttonElement, onClickCallback) {
        this.button = buttonElement;
        this.button.addEventListener('touchstart', onClickCallback); // 터치 이벤트
    }

    show() {
        this.button.style.display = 'block'; // 버튼 표시
    }

    hide() {
        this.button.style.display = 'none'; // 버튼 숨기기
    }
}

// 자막 컨트롤러 클래스
class SubtitleController {
    constructor(subtitleElement, audioElement, onAudioEndedCallback) {
        this.subtitleElement = subtitleElement;
        this.subtitles = [];
        this.subtitleIndex = 0;

        this.audioElement = audioElement;
        this.audioElement.addEventListener('ended', onAudioEndedCallback);
    }

    loadSubtitles(subtitles) {
        this.subtitles = subtitles;
    }

    startSubtitles() {
        this.subtitleIndex = 0;
        this.showNextSubtitle();
    }

    showNextSubtitle() {
        if (this.subtitleIndex < this.subtitles.length) {
            this.subtitleElement.textContent = this.subtitles[this.subtitleIndex];
            this.subtitleElement.style.display = 'flex'; // 자막 표시

            this.audioElement.src = subtitle.defaultPath + subtitle.tts[this.subtitleIndex];    // 현재 재생 해야할 TTS 파일 셋업
            // this.audioElement.muted = false;

            this.audioElement.play().then(() => {
                this.audioElement.muted = false;
            })

            this.subtitleIndex++;
        } else {
            this.hideSubtitle();
            gameStartButton.show();
        }
    }

    hideSubtitle() {     // 자막 숨김
        this.subtitleElement.style.display = 'none';
    }

    reset() {
        this.audioElement.currentTime = 0;
        this.audioElement.pause();
        this.subtitleIndex = 0;
        this.hideSubtitle();
    }
}


// 엘리먼트 가져오기
const introVideoElement = document.getElementById('introVideo');            // 인트로 비디오
const startButtonElement = document.getElementById('startButton');          // 시작버튼
const gameMenuContainer = document.getElementById('game-menu-container');   // 메뉴 컨테이너
const gameMenuContainerBody = document.getElementById('game-menu-body');   // 메뉴 컨테이너

// 첫 번째 비디오 종료 시 실행될 콜백 함수
const onIntroVideoEnded = () => {
    isIntroVideoEnded = true;
    showGameMenu();
};

const showGameMenu = () => {
    introVideo.pause();
    controlContainerFadeInOut('in', gameMenuContainer,
        undefined,
        () => {                           // fade-in  성공 시 콜백 실행
            status = 'game-menu-select';
            userOut.currnet_time_reset(false);
            userOut.toggleTimer();
        },
    );

    // 게임 메뉴 컨테이너 fade in
}

// "게임 시작" 버튼 클릭 시 실행될 콜백 함수
const onStartButtonClick = () => {
    // 게임 시작
};

// TTS Audio 가 끝났을때
const onAudioEnded = () => {
    subtitleController.showNextSubtitle();
}

const controlContainerFadeInOut = (faceCode, containerObject, onStartCallback, onCompleteCallback) => {

    if (faceCode == 'in') {
        gsap.to(containerObject, {
            opacity: 1, duration: 0.7,
            onStart: () => {
                if (onStartCallback) {
                    onStartCallback();
                }
            },
            onComplete: () => {
                if (onCompleteCallback) {
                    onCompleteCallback();
                }
            }
        }
        );

    }

    if (faceCode == 'out') {
        gsap.to(containerObject, {
            opacity: 0, duration: 0.7,
            onStart: () => {
                if (onStartCallback) {
                    onStartCallback();
                }
            },
            onComplete: () => {
                if (onCompleteCallback) {
                    onCompleteCallback();
                }
            }
        }
        );
    }
}

// 요소 생성 함수
const createGameMenu = () => {
    for (let i = 0; i < gameMenuItem.count; i++) {
        // 1. game-menu-button div 생성
        const gameMenuButton = document.createElement('div');
        gameMenuButton.classList.add('game-menu-button', 'flex');
        gameMenuButton.id = `game-menu-item${i + 1}`;  // ID 설정
        gameMenuButton.gameId = 'game' + (i + 1);

        // 2. 이미지 요소 생성
        const img = document.createElement('img');
        img.classList.add('game-menu-thumnail-img');
        img.src = gameMenuItem.gameItemThumnailImg[i];  // 이미지 경로 설정
        img.alt = `게임 ${i + 1} 썸네일`;  // 이미지 설명 (alt) 설정

        // 3. 게임 이름 div 생성
        const gameDescription = document.createElement('div');
        gameDescription.classList.add('game-menu-thumnail-des');
        gameDescription.textContent = gameMenuItem.gameItemName[i];  // 게임 이름 설정

        // 4. gameMenuButton에 이미지와 게임 설명을 추가
        // gameMenuButton.appendChild(img);
        // gameMenuButton.appendChild(gameDescription);

        // 5. 최종적으로 부모 컨테이너에 추가
        gameMenuContainerBody.appendChild(gameMenuButton);

        gameMenuButton.addEventListener('touchstart', (event) => {
            if (isIntroVideoEnded) {
                if (isDoubleTouch) {
                    event.preventDefault();
                    return;
                }

                isDoubleTouch = true;
                convertGameScreen(event.target.gameId);

                setTimeout(() => {
                    isDoubleTouch = false;
                }, 2000);
            }
        });



    }
}



// 인스턴스 생성
const introVideo = new VideoController(introVideoElement, onIntroVideoEnded, () => {
}, 'end', false);
const startButton = new ButtonController(startButtonElement, onStartButtonClick);
const userOut = new userOutController();

const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
};


const loadStart = () => {

    createGameMenu();  // 메뉴 생성
    addEventListenerPopButton(); //팝업 버튼 이벤트 추가

    // 애니메이션 완료 후 실행될 콜백 함수
    controlContainerFadeInOut('out', document.getElementById('progress-container'),
        () => {
        },

        () => {
            document.getElementById('progress-container').style.display = 'none';
            controlContainerFadeInOut('in', document.querySelector('.intro_container'),
                () => {
                    document.querySelector('.intro_container').style.display = 'block';
                },
                () => {
                    introVideo.play(true);
                    setTimeout(() => {
                        isIntroVideoEnded = true;
                    }, 8500);

                    userOut.start();
                }
            )
        }
    );
}


// 개발 모드에 따른 버튼 표시
window.addEventListener('load', function () {
    sendContentMessage('start');
    sendRobotMessageByEye('NORMAL');
    gameConfig.body = document.getElementById('game_body');
    initAssets();

    loadStart();

    setTimeout(() => {
        if(isDevMode){
            isIntroVideoEnded = true;
            showGameMenu();
        }
    }, 2500);
});





