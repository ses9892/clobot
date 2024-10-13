let current_level = 1;
let timerSecond = 3;
let loopInterval;

const max_game_level = 3;

const img_default_path = "./assets/images/";
const mpeg_default_path = "./assets/audio/";

let sub_images = [
  img_default_path + 'level1_object.png',
  img_default_path + 'level2_object.png',
  img_default_path + 'level3_object.png',

]

// 루프 이미지 배열
let images = [
  img_default_path + 'level1_loop1.png',
  img_default_path + 'level1_loop2.png',
  img_default_path + 'level1_loop3.png',
  img_default_path + 'level1_loop4.png',
  img_default_path + 'level1_loop5.png',
];

// 루프 이미지 배열
const level1_images = [
  img_default_path + 'level1_loop1.png',
  img_default_path + 'level1_loop2.png',
  img_default_path + 'level1_loop3.png',
  img_default_path + 'level1_loop4.png',
  img_default_path + 'level1_loop5.png',
]; 

const level2_images = [
  img_default_path + 'level2_loop1.png',
  img_default_path + 'level2_loop2.png',
  img_default_path + 'level2_loop3.png',
  img_default_path + 'level2_loop4.png',
  img_default_path + 'level2_loop5.png',
];

const level3_images = [
  img_default_path + 'level3_loop1.png',
  img_default_path + 'level3_loop2.png',
  img_default_path + 'level3_loop3.png',
  img_default_path + 'level3_loop4.png',
  img_default_path + 'level3_loop5.png'
];

const effect_mpeg = {
  'correct' : mpeg_default_path + 'correct.mp3',
  'fail' : mpeg_default_path + 'fail.mp3'
}



// 타이머 관련 컨트롤러
class TimerController {
  constructor(timerElement , time) {
      this.timer = timerElement;
      this.default_time = time;
      this.current_time = time;
      this.timerInterval = undefined;
      this.timerTimeout = undefined;
      this.isPause = false;
      this.timer.innerHTML = time;
  }

  start() {
    // 시간 표시  
    this.timer.innerHTML = this.current_time;
    this.isPause = false;

    // 표시
    this.show();
    clearInterval(loopInterval);
    loopInterval = setInterval(loopImages, 2000);

    this.timerTimeout = setTimeout(() => {
      timerTimeoutEvt(this);
    },1300);
  }

  show(){
    this.timer.style.display = 'block'; // 비디오 표시
  }

  hide() {
      this.timer.style.display = 'none'; // 비디오 숨기기
  }

  pause(){
    this.isPause = true;
  }

  play(){
    this.isPause = false;
  }

  reset(){
    clearTimeout(this.timerTimeout);
    clearInterval(loopInterval);
    this.current_time = this.default_time;
    this.timer.innerHTML = this.current_time;
  }
}

let currentImageIndex = 0; // 현재 루프 중인 이미지의 인덱스
const mainImage = document.getElementById('main-image');

// 정답 이미지의 인덱스 (예: 1번째 이미지가 정답)
let correctAnswerIndex = 4; // 필요에 따라 이 값을 변경하면 정답을 유동적으로 변경 가능

// 이미지 루프 함수 (2초마다 이미지 변경)
function loopImages() {
  if(!timerController.isPause){
    const nextImageIndex = (currentImageIndex + 1) % images.length;

    
    // 현재 이미지 페이드 아웃
    gsap.to(mainImage, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // 이미지 소스 및 클래스 변경
        mainImage.src = images[nextImageIndex];
        currentImageIndex = nextImageIndex;
        mainImage.className = 'main-image';
        const classArray = createMainImageClassArray(nextImageIndex, current_level);
        mainImage.classList.add(...classArray);
        // 새 이미지 페이드 인
        gsap.to(mainImage, {
          opacity: 1,
          duration: 0.3,
          onStart: () => {

          },
          onComplete: () => {
          }
        });
        
      }
    });
  }
}

// 이미지 0번째 부터 재출력
function indexResetImages() {
  currentImageIndex = 0;

  mainImage.className = 'main-image';
  mainImage.src = images[currentImageIndex];

  const classArray = createMainImageClassArray(currentImageIndex , current_level);
  mainImage.classList.add(...classArray);
}

function createMainImageClassArray(currentIndex , currentLevel){
  const classArray = [];

  classArray.push('main-image');
  classArray.push('level'+currentLevel);
  classArray.push('item'+currentImageIndex);

  return classArray;
}



const imageTouchStart = () => {
  if (currentImageIndex === correctAnswerIndex) {
    document.getElementById('overlay').style.display = 'block';
    effectAudioController.update(effect_mpeg.correct);
    effectAudioController.play();


    timerController.pause();    // 잠시 중지
    timerController.reset();
    clearInterval(loopInterval);

    setTimeout(() => {
      gameCompleteVideoPlay();
    }, 2000);

    // if(current_level < max_game_level){
    //   timerController.pause();    // 잠시 중지
    //   timerController.reset();
    //   clearInterval(loopInterval);
    //   gameCompleteVideoPlay();
    // }else if(current_level === max_game_level){
    //   triggerGameClear();
    // }



  } else {
    effectAudioController.update(effect_mpeg.fail);
    effectAudioController.play();
  }
}

// 루프 이미지 에 대한 터치 이벤트 (정답 확인)
mainImage.addEventListener('touchstart', imageTouchStart);
document.getElementById('wing-image').addEventListener('touchstart', imageTouchStart);


const restartButton = document.getElementById('restart-button');
// 재시작 버튼 터치 이벤트
restartButton.addEventListener('touchstart', () => {

  // 상태 변환
  status = "in-game"; // 상태: 게임 중

  // 레벨 1로 변경
  current_level = 1;
  initGameLevel();

  timerController.reset();
  timerController.start();
  indexResetImages();
  closePop();
});

const endButton = document.getElementById('end-button');
// 종료 버튼 터치이벤트
endButton.addEventListener('touchstart', () => {
  closePop();
  resetInGame();
  sendContentMessage('end');
  // introScreenConvert( undefined , () => {
  //   introVideo.play();

  //   if (isDevMode) {
  //     setTimeout(() => startButton.show(), dev_video_delay * 1000);
  //   }
  // });
});

const completeVideoEnded = () => {
  document.getElementById('overlay').style.display = 'none';
  if(current_level < max_game_level){
    inGameCompleteVideoConvert();
  }else{
    sendContentMessage('end');
  }
};

document.getElementById('game1-complete-video').addEventListener('ended', completeVideoEnded);
document.getElementById('game2-complete-video').addEventListener('ended', completeVideoEnded);
document.getElementById('game3-complete-video').addEventListener('ended', completeVideoEnded);




function timerTimeoutEvt(controller){
  if(controller.current_time > 0){

    if(!controller.isPause){
      controller.current_time = controller.current_time -1;
      controller.timer.innerHTML = controller.current_time;
    }

    controller.timerTimeout = setTimeout(() => {
      timerTimeoutEvt(controller);
    },1000);

  }else{
    // 타임아웃 일때
    status = 'game-timeout';
    effectAudioController.timeoutSound();
    userOutObejct.currnet_time_reset();
    showPopupGame('', '');
    controller.hide();
    controller.isPause = true;
  }
}

function initGameLevel(){
  /**
   * 정답 하이라이트 이미지초기화
   */

  document.getElementById('result-item-image').setAttribute('current-level', current_level);

  /**
   * Loop이미지 변경
   */
  if(current_level == 1) {
    images = level1_images;
  }

  if(current_level == 2) {
    images = level2_images;
  }

  if(current_level == 3) {
    images = level3_images;
  }

  const mImage = document.querySelector('.main-image');
  const wingImage = document.getElementById('wing-image');
  const sImages = document.getElementById('sub-image');

  currentImageIndex = 0;
  mainImage.className = 'main-image' + ' ' + 'level' 
                        + current_level + ' ' + 'item' + currentImageIndex + ' ' 
                        + ' ' + 'image-hidden';

  indexResetImages();
  mainImage.classList.remove('image-hidden');

  // 서브 이미지 변경
  sImages.className = 'sub-image level' + current_level + ' image-hidden';
  sImages.src = sub_images[current_level - 1];
  
  // 변경 후 다시 보여주기 (페이드 인 효과)
  sImages.classList.remove('image-hidden');

  if(current_level == 2){
    wingImage.classList.remove('image-hidden');
  }else{
    wingImage.classList.add('image-hidden');  
  }

  // // 이미지가 사라지는 시간에 맞춰서 이미지를 변경
  // setTimeout(() => {



  //   /**
  //  * 애니메이션 요소 추가
  //   */
  //   // removeClickAnimation();
  //   // addClickAnimation();
    
  // }, 1); // transition 시간과 동일하게 맞추기 (0.5s)

  // setTimeout(() => {

  // }, 1)
}

function gameCompleteVideoPlay(){
  let video;
  let topSection = document.getElementById('top-section');

  if(current_level == 1){
    video = document.getElementById('game1-complete-video');
  }

  if(current_level == 2){
    video = document.getElementById('game2-complete-video');
  }

  if(current_level == 3){
    video = document.getElementById('game3-complete-video');
  }

  // 비디오 초기화
  video.style.display = 'none';
  video.currentTime = 0;

  // 비디오 표시
  gsap.to(topSection, { opacity: 0, duration: 0.7,
    onComplete: () => {
        // 인게임 컨테이너 fade in
        topSection.style.display = 'none';
        gsap.to(video, { opacity: 1, duration: 0.7, onStart: () => {
          video.style.display = 'block';
        },
        onComplete: () => {
          video.play();
        }
      });
    }
  });
}

function gameLevelUp(){
  current_level++;            // 게임 단계 업
  currentImageIndex = 0;
  timerController.start();
  initGameLevel();            // 게임 단계에 맞게 이미지들 변경
  
} 

function inGameInitStart(){
  initGameLevel();
  timerController.start();
}


function resetInGame(){
  current_level = 1;        // 게임 레벨 초기화
  timerController.reset();  // 타이머 요소 초기화
}

/**
 * 애니매이션 요소 추가
 */
function addClickAnimation() {
  // 1. 새로운 div 요소를 생성합니다.
  const animationDiv = document.createElement('div');
  animationDiv.id = 'click-animation';
  animationDiv.className = 'click-animation game' + current_level;

  // 2. 이미지 태그를 생성합니다.
  const handImage = document.createElement('img');
  handImage.src = './assets/images/component/guideCursor.png';
  handImage.id = 'hand';
  handImage.alt = 'Hand';

  // 3. 이미지 태그를 div 안에 넣습니다.
  animationDiv.appendChild(handImage);

  // 4. 이 div를 원하는 위치에 추가합니다.
  // 예를 들어, body 끝에 추가
  document.getElementById('ingame_container').appendChild(animationDiv);
}

/**
 * 애니메이션 요소 지우기
 */
function removeClickAnimation(){
  const aniDiv = document.getElementById('click-animation')
  if(aniDiv){
    aniDiv.remove();
  }
}

function triggerGameClear(){

  gsap.fromTo("#game-complete", 
    { opacity: 0, scale: 0.5, rotation: -45 },  // 시작 상태
    { 
      opacity: 1, 
      scale: 1.5, 
      rotation: 0, 
      duration: 2, 
      ease: "bounce.out",
      onStart: () => {
      },
      onComplete: function() {
        // 콜백: 첫 번째 애니메이션이 끝난 후 반짝이는 효과 추가
        gsap.to("#game-complete", { 
          scale: 1.3, 
          repeat: -1, 
          yoyo: true, 
          duration: 0.8 
        });

        setTimeout( () => {
          introScreenConvert( 
            // onStart Callback
            () => {
              // 게임 리셋
              gameClearAnimationHide();
              resetInGame();

              gameClearVideo.reset();
              introVideo.hide();
              secondVideo.hide();
            } ,
            // onComplete Callback 
            () => {
              gameClearVideo.play();

              if (isDevMode) {
                setTimeout(() => {
                  gameClearVideo.reset();
                  introVideo.play();
                  if (isDevMode) {
                    setTimeout(() => startButton.show(), dev_video_delay * 1000);
                }
                }, 3000);
              }

            }
        )



        } , 2000);
      }
    }

  );
}


/**
 * 인게임 스크린 전환
 */
function inGameCompleteVideoConvert(){
  // 인트로 컨테이너 fade out
  let videoContainer;
  if(current_level == 1){
    videoContainer = document.getElementById('game1-complete-video');
  }

  if(current_level == 2){
    videoContainer = document.getElementById('game2-complete-video');
  }
  
  if(current_level == 3){
    videoContainer = document.getElementById('game3-complete-video');
  }

  const topSection = document.getElementById('top-section');

  gsap.to(videoContainer, { opacity: 0, duration: 0.7,
      onComplete: () => {

        videoContainer.style.display = 'none';
        videoContainer.currentTime = 0;
        videoContainer.pause();
  
          // 인게임 컨테이너 fade in
          gsap.to(topSection, { opacity: 1, duration: 0.7, onStart: () => {
            gameLevelUp();
            topSection.style.display = 'block';
            },
            onComplete: () => {
              
            }
          });
  
      }
                                 
    });
}