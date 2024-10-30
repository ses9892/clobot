// 상태 변수 정의
let status = "intro"; // 초기 상태는 "인트로 화면"

// 개발 모드 변수 설정
const isDevMode = false;
const dev_video_delay = 3;

class userOutController {
    constructor(){
        this.default_out_check_time = 15;
        this.current_out_check_time = this.default_out_check_time;

        document.body.addEventListener('touchstart' , () => {
            this.current_out_check_time = this.default_out_check_time;
        });
    }
    start(){
        this.interval = setInterval(() => {
            this.current_out_check_time--;
            if(this.current_out_check_time < 0 ){
                if(status == 'intro'){
                    this.current_out_check_time = this.default_out_check_time;
                }else{

                    switch(status){
                        case 'game-description' :
                            secondVideo.reset();    // 설명 비디오 리셋
                            introVideo.reset();     // 인트로 리셋

                            subtitleController.reset();     // 자막 리셋 및 숨김
                            // gameStartButton.hide(); // 시작하기 버튼 숨김

                            introVideo.play();      // 인트로 표시 및 시작
                            break;
                        
                        case 'game-timeout' :
                            // alert('인터렉션 (현재) 10초타임아웃 발생')
                            this.currnet_time_reset();
                            sendContentMessage('end');
                    }
                    this.current_out_check_time = this.default_out_check_time;
                }
            }
            document.getElementById('user-out-timer-section').innerHTML = this.current_out_check_time;
            console.log(this.current_out_check_time + '초 남음');
        } , 1300);
    }

    stop(){
        clearInterval(this.interval);
        this.interval = undefined;
    }
    
    currnet_time_reset(){
        this.current_out_check_time = this.default_out_check_time;
        document.getElementById('user-out-timer-section').innerHTML = this.current_out_check_time;
    }
}

// 비디오 컨트롤러 클래스
class VideoController {
    constructor(videoElement, onEndedCallback) {
        this.video = videoElement;
        this.video.addEventListener('ended', onEndedCallback); // 비디오 끝 이벤트
    }

    play() {
        status = 'intro';
        this.video.style.display = 'block'; // 비디오 표시
        this.video.play();
    }

    hide() {
        this.video.style.display = 'none'; // 비디오 숨기기
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
    }
}


// 비디오 컨트롤러 클래스
class AudioController {
    constructor(audioElement, onEndedCallback) {
        this.audio = audioElement;
        this.audio.addEventListener('ended', onEndedCallback); // 오디오 끝 이벤트
    }

    play() {
        this.audio.style.display = 'none'; // 오디오 표시
        this.audio.play();
    }

    hide() {
        this.audio.style.display = 'none'; // 오디오 숨기기
    }

    pause() {
        this.audio.pause(); // 오디오 일시정지
    }

    getDuration() {
        return this.audio.duration; // 오디오 길이 반환
    }

    reset(){
        this.audio.currentTime = 0;
        this.audio.pause();
    }

    update(src_path){
        this.audio.src = src_path;
    }

    timeoutSound(){
        this.audio.src = "./assets/audio/game_timeout.mp3";
        this.play();
    }

    gameClearSound(){
        this.audio.src = "./assets/audio/game_clear.mp3";
        this.play();
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
                console.log('audio play');
            })

            this.subtitleIndex++;
        } else {
            this.hideSubtitle();
            // gameStartButton.show();
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



// 엘리먼트 가져오기
const introVideoElement = document.getElementById('introVideo');
const secondVideoElement = document.getElementById('secondVideo');
const gameClearVideoElement = document.getElementById('gameClearVideo');
const startButtonElement = document.getElementById('startButton');
const gameStartButtonElement = document.getElementById('gameStartButton');
const subtitleElement = document.getElementById('subtitle');
const audioElement = document.querySelector('#ttsAudio');

// 첫 번째 비디오 종료 시 실행될 콜백 함수
const onIntroVideoEnded = () => {
    onGameStartButtonClick();
    // startButton.show();
    status = "intro"; // 상태: 인트로 화면
    console.log("현재 상태:", status);
};

// 두 번째 비디오 종료 시 실행될 콜백 함수 (시작하기 버튼 표시)
const onSecondVideoEnded = () => {

        
    // 인게임 세팅
    inGameInitStart();
    
    // 화면 전환
    inGameScreenConvert();
    
    // 상태 변환
    status = "in-game"; // 상태: 게임 중

    // 비디오 오디오 자막초기화
    // introVideo.reset();
    secondVideo.reset();
    subtitleController.reset();
};

// 두 번째 비디오 시작 시 자막 로드 및 재생 콜백
const onSecondVideoStart = () => {
    console.log(subtitle.subtitles)
    subtitleController.loadSubtitles(subtitle.subtitles);
    // const duration = secondVideo.getDuration();
    subtitleController.startSubtitles(); // 비디오 길이에 맞춰 자막 시작
    status = "game-description"; // 상태 변경: 게임 설명 화면
    console.log("현재 상태:", status);
};

// "게임 시작" 버튼 클릭 시 실행될 콜백 함수
const onStartButtonClick = () => {
    startButton.hide();

    //Dev
    // gameStartButton.show();


    introVideo.pause();
    introVideo.hide();
    secondVideo.play();
    setTimeout(() => {
        onSecondVideoStart();
    },50);
};

// "시작하기" 버튼 클릭 시 실행될 콜백 함수 (빈 배경으로 전환)
const onGameStartButtonClick = () => {
    
    // 버튼 숨김
    // gameStartButton.hide();

    // 인트로 비디오 fade out
    controlContainerFadeInOut('out' , introVideoElement , 
        () => {
        },
        () => {
            // 인트로 비디오 숨김
            introVideoElement.style.display = 'none';
            secondVideoElement.style.display = 'block';
            // secondVideo fade in
            controlContainerFadeInOut('in' , secondVideoElement , 
                () => {
                    sendRobotMessageByEye('NORMAL');
                },
                () => {
                    secondVideoElement.play();
                }
            );
        }
    );
};


// TTS Audio 가 끝났을때
const onAudioEnded = () => {
    subtitleController.showNextSubtitle();
}



// 인스턴스 생성
const introVideo = new VideoController(introVideoElement, onIntroVideoEnded);
const secondVideo = new VideoController(secondVideoElement, onSecondVideoEnded); // 두 번째 비디오 끝났을 때 "시작하기" 버튼 표시
const gameClearVideo = new VideoController(gameClearVideoElement, ()=>{}); // 두 번째 비디오 끝났을 때 "시작하기" 버튼 표시
// const subtitleController = new SubtitleController(subtitleElement , audioElement , onAudioEnded);
const timerController = new TimerController(document.getElementById('game-timer'),timerSecond);
const effectAudioController = new AudioController(document.getElementById('effectAudio' , () => {}));
const userOutObejct = new userOutController();


const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };
// 개발 모드에 따른 버튼 표시
window.addEventListener('load', function () {
    sendContentMessage('start');
    sendRobotMessageByEye('NORMAL');
    audioElement.muted = true;
    audioElement.play();

    setTimeout(() => {
        sendRobotMessageByEye('FEAR');
    }, 7000);

    level1_images.forEach(image => {
        preloadImage(image);
    });

    level2_images.forEach(image => {
        preloadImage(image);
    });

    level3_images.forEach(image => {
        preloadImage(image);
    }); 

    preloadImage(img_default_path + 'level3_object.png');
    preloadImage(img_default_path + 'level2_object.png');
    preloadImage(img_default_path + 'level1_object.png');

    userOutObejct.start();

});

/**
 * 인게임 스크린 전환
 */
function inGameScreenConvert(){
    // 인트로 컨테이너 fade out
    gsap.to('#intro_container', { opacity: 0, duration: 0.7,
        onComplete: () => {
            // 완료 시 인트로 컨테이너 숨김
            document.querySelector('#intro_container').style.display = 'none';
    
            // 인게임 컨테이너 fade in
            gsap.to('.ingame-container', { opacity: 1, duration: 0.7, onStart: () => {
                // fade in 시작 시 컨테이너 표시
                document.querySelector('.ingame-container').style.display = 'block';
              }});
    
        }
                                   
      });
}

/**
 * 인트로 스크린 전환
 */
function introScreenConvert(onStartCallback , onCompleteCallback){

    const introContainer = document.querySelector('#intro_container');
    const inGameContainer = document.querySelector('.ingame-container');


    // 인게임 컨테이너 fade out
    gsap.to(inGameContainer, { opacity: 0, duration: 0.7,
        onComplete: () => {
            // 완료 시 인트로 컨테이너 숨김
            inGameContainer.style.display = 'none';
    
            // 인트로 컨테이너 fade in
            gsap.to(introContainer, { opacity: 1, duration: 0.7, 
                onStart: () => {
                    // fade in 시작 시 컨테이너 표시
                    introContainer.style.display = 'block';
                    if(onStartCallback){
                       onStartCallback(); 
                    }
                },
                onComplete: () => {
                    if(onCompleteCallback){
                        onCompleteCallback();
                    }


                }
            });
        }
      });
}

function gameClearAnimationHide(){
    // 인게임 컨테이너 fade in
    gsap.to('#game-complete', { opacity: 0, duration: 0});
}


