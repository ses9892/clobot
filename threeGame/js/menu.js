// 상태 변수 정의
let status = "intro"; // 초기 상태는 "인트로 화면"
const loadingTime = 100;
const dev_video_delay = 1;
const outCheckTime = 30;

// 개발 모드 변수 설정
const isDevMode = true;
let isIntroVideoEnded = false;




class userOutController {
    constructor(){
        this.default_out_check_time = outCheckTime;
        this.current_out_check_time = this.default_out_check_time;

        document.body.addEventListener('touchstart' , () => {
            this.current_out_check_time = this.default_out_check_time;
            // console.log('체크 햇더니 다시 돌아왓넹?? ==> ' + this.current_out_check_time);
        });
    }
    start(){
        
        this.interval = setInterval(() => {
            document.getElementById('user-out-timer').textContent = this.current_out_check_time;
            this.current_out_check_time--;
            if(this.current_out_check_time < 0 ){
                if(status == 'intro'){
                    console.log('인트로에서는 무반응 + 시간초돌리기');
                    this.current_out_check_time = this.default_out_check_time;
                }else{

                    switch(status){
                        case 'game-menu-select' :
                            // controlContainerFadeInOut('out' , gameMenuContainer , 
                            //     () => {
                            //         introVideo.reset();
                            //     }, 
                            //     () => {
                            //         introVideo.play(true);
                            //     }
                            //  );      // 메뉴 fade out
                            sendContentMessage('end');
                            break;
                        case 'game-timeout' :
                            this.currnet_time_reset(false);
                            sendContentMessage('end');
                            // goMenu();
                            break;
                        case 'end-game' :
                            sendContentMessage('end');
                            break;
                    }


                    this.current_out_check_time = this.default_out_check_time;
                }
            }
            document.getElementById('user-out-timer').textContent = this.current_out_check_time;
            // console.log(this.current_out_check_time + '초 남음');
        } , 1000);
    }

    stop(){
        clearInterval(this.interval);
        this.interval = undefined;
    }

    showTimer(){
        document.getElementById('user-out-timer').classList.remove('hide');
    }

    hideTimer(){
        document.getElementById('user-out-timer').classList.add('hide');
    }

    toggleTimer(){
        // 타이머 표시 여부에 따라 전환
        document.getElementById('user-out-timer').classList.toggle('hide');
    }

    currnet_time_reset(isGameEnding){
        // console.log('user out reset');
        if(isGameEnding){
            this.current_out_check_time = 15;
        }else{
            this.current_out_check_time = this.default_out_check_time;
        }
        document.getElementById('user-out-timer').textContent = this.current_out_check_time;
    }
}

// 비디오 컨트롤러 클래스
class VideoController {
    constructor(videoElement, onEndedCallback , devCallBack , controlStatus , isAllEvent) {
        this.video = videoElement;
        // console.log(isAllEvent);
        this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트


        // 비디오 컨트롤러 초기화

        if(devCallBack){
            // console.log('헤이헤이');
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
        if(isIntro){
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

    reset(){
        this.video.currentTime = 0;
        this.video.pause();
        this.video.removeAttribute('style');
    }

    show(){
        this.video.style.display = 'block';
        // z-index 최상위로 변경
        this.video.style.zIndex = 1000;
    }

    // this video의 모든 이벤트 해제
    removeEvent(){
        // 모든 이벤트 리스너 제거
        this.video.replaceWith(this.video.cloneNode(true));
        this.video = document.getElementById(this.video.id); // 새로운 요소 참조 업데이트
    }

    updateEvent(onEndedCallback){
        this.removeEvent();
        this.video.addEventListener('touchstart' , onEndedCallback);
        this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트
    }

    load(src){
        if(src == undefined){
            this.video.load();
        }else{
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
        this.audioElement.addEventListener('ended' , onAudioEndedCallback);
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
                // console.log('audio play');
            })

            this.subtitleIndex++;
        } else {
            this.hideSubtitle();
            gameStartButton.show();
        }
    }

    hideSubtitle(){     // 자막 숨김
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
    // console.log("현재 상태:", status);
};

const showGameMenu = () => {
    introVideo.pause();
    controlContainerFadeInOut('in' , gameMenuContainer , 
        undefined,
        ()=>{                           // fade-in  성공 시 콜백 실행
            status = 'game-menu-select';
            userOut.currnet_time_reset(false);
            userOut.toggleTimer();
        }, 
    );
    // console.log('1111');

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

const controlContainerFadeInOut = ( faceCode , containerObject , onStartCallback , onCompleteCallback) => {

    if(faceCode == 'in'){
        gsap.to(containerObject, { opacity: 1, duration: 0.7, 
            onStart: () => {
                if(onStartCallback){
                   onStartCallback(); 
                }
            },
            onComplete: () => {
                if(onCompleteCallback){
                    onCompleteCallback();
                }
            }
        }
    ); 

    }

    if(faceCode == 'out'){
        gsap.to(containerObject, { opacity: 0, duration: 0.7, 
            onStart: () => {
                if(onStartCallback){
                   onStartCallback(); 
                }
            },
            onComplete: () => {
                if(onCompleteCallback){
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
        gameMenuButton.gameId = 'game'+(i+1);

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

        gameMenuButton.addEventListener('touchstart' , (event) => {
            if(isIntroVideoEnded){
                convertGameScreen(event.target.gameId);
            }
        });



    }
}



// 인스턴스 생성
const introVideo = new VideoController(introVideoElement, onIntroVideoEnded , () => {
} , 'end' , false);
const startButton = new ButtonController(startButtonElement, onStartButtonClick);
const userOut = new userOutController();

const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };


const loadStart = () => {
    // 진행률 애니메이션
    bar.animate(1.0, {
        duration: loadingTime, // 3초 동안 0%에서 100%로 진행
        step: function(state, circle) {
            // 애니메이션 진행에 따라 텍스트 업데이트
            var value = Math.round(circle.value() * 100);
            circle.setText(value + '%');


            // 30%일 때 한 번만 함수 호출
            if (value >= 30 && !called30) {
                // console.log("30%에 도달!");
                called30 = true;  // 플래그를 true로 변경하여 다시 호출되지 않도록 설정
                createGameMenu();  // 메뉴 생성
                addEventListenerPopButton(); //팝업 버튼 이벤트 추가

            }

            // 60%일 때 한 번만 함수 호출
            if (value >= 60 && !called60) {
                // console.log("60%에 도달!");
                called60 = true;
            }

            // 90%일 때 한 번만 함수 호출
            if (value >= 90 && !called90) {
                // console.log("90%에 도달!");
                called90 = true;
            }


        }
    }, function() {
        // 애니메이션 완료 후 실행될 콜백 함수
        controlContainerFadeInOut('out' ,document.getElementById('progress-container') , 
            () => {
                // console.log('프로그래스 사라지기 시작')
            },

            () => {
                document.getElementById('progress-container').style.display = 'none';
                // console.log('프로그래스 사라짐!')
                controlContainerFadeInOut('in' , document.querySelector('.intro_container'),
                    () => {
                        document.querySelector('.intro_container').style.display = 'block';
                    },
                    () => {
                        // console.log('인트로 컨테이너 fade in 완료');
                        introVideo.play(true);
                        setTimeout(() => {
                            isIntroVideoEnded = true;
                        }, 8500);

                        userOut.start();
                    }
                )
            }
        );
    });
}


// 개발 모드에 따른 버튼 표시
window.addEventListener('load', function () {
    sendContentMessage('start');
    gameConfig.body = document.getElementById('game_body');
    initAssets();

    loadStart();

    console.log('메뉴 로드 완료');

    // setTimeout(() => {
    //     isIntroVideoEnded = true;
    //     showGameMenu();
    // }, 2500);
});





