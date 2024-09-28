// 타이머 관련 컨트롤러
const timerSecond = 999;

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
  
      this.timerTimeout = setTimeout(() => {
        this.timerTimeoutEvt(this);
      },1000);
    }
  
    show(){
      this.timer.style.display = 'block'; // 비디오 표시
      this.timer.style.opacity = 1;
    }
  
    hide() {
        this.timer.style.display = 'none'; // 비디오 숨기기
        this.timer.style.opacity = 0;
    }
  
    pause(){
      this.isPause = true;
    }
  
    play(){
      this.isPause = false;
    }
  
    reset(){
      clearTimeout(this.timerTimeout);
      this.current_time = this.default_time;
      this.timer.innerHTML = this.current_time;
    }

    timerTimeoutEvt(){
        if(this.current_time > 0){
      
          if(!this.isPause){
            this.current_time = this.current_time -1;
            this.timer.innerHTML = this.current_time;
          }
      
          this.timerTimeout = setTimeout(() => {
            this.timerTimeoutEvt();
          },1000);
      
        }else{
          // 타임아웃 일때
          status = 'game-timeout';
          userOut.currnet_time_reset();
          this.hide();
          this.isPause = true;
          showTimeoutPopup('' , '' , true);
          
          // 하드코딩...
          if(gameConfig.current_gameId == 'game1'){
            gameConfig.game1.timeoutGame();
          }


        }
      }
}

// 타임아웃 팝업 표시
function showTimeoutPopup(title, message , isTimeStop) {
    

    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popup.style.display = 'flex';
    popup.className = 'popup-overlay';

    document.getElementById('mission-img').className = 'mission-fail';

    // 재시작 버튼 보여지게하기
    document.getElementById('game-restart-button').style.display = 'block';

    if(isTimeStop){
        timerController.hide();
        timerController.pause();
        timerController.reset();
    }
}

// 게임 클리어 팝업 표시
function showGameClearPop(title, message , isTimeStop) {
    

    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popup.style.display = 'flex';

    
    // 팝업 오버레이 보이기
    popup.className = 'popup-overlay2';


    // 재시작 버튼 보여지게하기
    document.getElementById('game-restart-button').style.display = 'none';

    // 미션 이미지 보이기
    document.getElementById('mission-img').className = 'mission-complete';

    if(isTimeStop){
        timerController.hide();
        timerController.pause();
        timerController.reset();
    }
}

function addEventListenerPopButton(){

    // 재시작 버튼 이벤트 터치 이벤트 추가
    document.getElementById('game-restart-button').addEventListener('touchstart' , () => {
        // 상태 변환
        status = 'in-game';

        //팝업종료
        closePop();

        // 인터렉티브 초기화
        userOut.currnet_time_reset();
        
        // 타이머 초기화 & 시작
        timerController.reset();
        timerController.start();

          // 하드코딩...
          if(gameConfig.current_gameId == 'game1'){

            getGameObject().restartGame();
          }
        
    });

    // 메뉴선택 버튼 이벤트 터치 이벤트 추가
    document.getElementById('game-menu-select-button').addEventListener('touchstart' , () => {
      goMenu();
    });

    document.getElementById('end-button').addEventListener('touchstart' , () => {
        closePop();
        alert('클로봇에게 종료 버튼 명령어를 보냅니다. 알림창을 끌시 임시적으로 빈 페이지로 이동');
        window.location.href = "about:blank";
    });
}

function inGameBodyReset(){
  document.getElementById('game_body').innerHTML = ''
  document.getElementById('game_body').removeAttribute('style');
  document.getElementById('game_body').removeAttribute('current_game');


}


function goMenu(){
  status='game-menu-select';
  closePop();
  timerController.reset();
  getGameObject().videoController.reset();
  inGameBodyReset();


  // 하드코딩...
  if(gameConfig.current_gameId == 'game1'){
  }



  controlContainerFadeInOut('out' , inGameScreenElement ,
      () => {
;
      },
      () => {     
          
          gameConfig.body.style.backgroundImage = '';
          gameConfig.body.innerHTML = ''

          // out start callback
          controlContainerFadeInOut('in' , document.querySelector('.intro_container'),
              () => {     // in start callback
                  inGameScreenElement.style.display = 'none';
                  


                  document.querySelector('.intro_container').style.display = 'block';
              },
              () => {     // in complete callback
                  userOut.currnet_time_reset();
                  console.log('status : ' + status);
              }                    
          );
      }
  );
}

const timerController = new TimerController(document.getElementById('game-timer'),timerSecond);