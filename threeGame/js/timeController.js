// 타이머 관련 컨트롤러
const timerSecond = 60;

let isButtonTouch = false;

const customGameTime = {
  game1: 40,
  game2: 60,
  game3: 40
}

class TimerController {
  constructor(timerElement, time) {
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
    }, 1000);
  }

  show() {
    this.timer.style.display = 'block'; // 비디오 표시
    this.timer.style.opacity = 1;
  }

  hide() {
    this.timer.style.display = 'none'; // 비디오 숨기기
    this.timer.style.opacity = 0;
  }

  pause() {
    this.isPause = true;
  }

  play() {
    this.isPause = false;
  }

  reset() {
    clearTimeout(this.timerTimeout);
    this.current_time = this.default_time;
    this.timer.innerHTML = this.current_time;
  }

  setTimeOut(time) {
    this.default_time = time;
    this.current_time = time;
    this.timer.innerHTML = this.current_time;
  }

  timerTimeoutEvt() {
    if (this.current_time > 0) {

      if (!this.isPause) {
        this.current_time = this.current_time - 1;
        this.timer.innerHTML = this.current_time;
      }

      this.timerTimeout = setTimeout(() => {
        this.timerTimeoutEvt();
      }, 1000);

    } else {
      // 타임아웃 일때
      status = 'game-timeout';

      sendRobotMessageByEye('SAD');

      audioController.reset();

      this.hide();
      this.isPause = true;

      userOut.currnet_time_reset();
      userOut.showTimer();

      audioController.timeoutSound();

      showTimeoutPopup('', '', true);

      // 하드코딩...
      if (gameConfig.current_gameId == 'game1') {
        gameConfig.game1.timeoutGame();
      }

      if (gameConfig.current_gameId == 'game2') {
        if (game2_target_position_check_timeout != null) {
          clearTimeout(game2_target_position_check_timeout);
          game2_target_position_check_timeout = null;
        }

        if (gameFailedCheckTimeout != null) {
          clearTimeout(gameFailedCheckTimeout);
          gameFailedCheckTimeout = null;
        }
      }

      if (gameConfig.current_gameId == 'game3') {
        gameConfig.game3.failGameEvt();
      }
    }
  }
}

// 타임아웃 팝업 표시
function showTimeoutPopup(title, message, isTimeStop) {


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

  if (isTimeStop) {
    timerController.hide();
    timerController.pause();
    timerController.reset();
  }
}

// 게임 클리어 팝업 표시
function showGameClearPop(title, message, isTimeStop) {


  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupMessage = document.getElementById('popup-message');

  // 팝업 오버레이 보이기
  popup.className = 'popup-overlay2';

  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.style.display = 'flex';


  // 재시작 버튼 보여지게하기
  document.getElementById('game-restart-button').style.display = 'none';

  // 미션 이미지 보이기
  document.getElementById('mission-img').className = 'mission-complete';

  if (isTimeStop) {
    timerController.hide();
    timerController.pause();
    timerController.reset();
  }
}

function addEventListenerPopButton() {

  // 재시작 버튼 이벤트 터치 이벤트 추가
  document.getElementById('game-restart-button').addEventListener('touchstart', () => {

    if (isButtonTouch) {
      return;
    }

    isButtonTouch = true;

    console.log('touchstart');

    setTimeout(() => {

      sendRobotMessageByEye('NORMAL');

      // 상태 변환
      status = 'in-game';

      gameCountReset();

      //팝업종료
      closePop();

      // 인터렉티브 초기화
      userOut.currnet_time_reset();
      userOut.hideTimer();

      // 타이머 초기화 & 시작
      timerController.reset();
      timerController.start();

      // 하드코딩...
      if (gameConfig.current_gameId == 'game1') {
        gameConfig.game1.restartGame();
      } else if (gameConfig.current_gameId == 'game2') {
        gameConfig.game2.restartGame();
      } else if (gameConfig.current_gameId == 'game3') {
        gameConfig.game3.restartGame();
      }

      isButtonTouch = false;


    }, 1000);

  });

  // 메뉴선택 버튼 이벤트 터치 이벤트 추가
  document.getElementById('game-menu-select-button').addEventListener('touchstart', () => {
    if (isButtonTouch) {
      return;
    }
    isButtonTouch = true;
    setTimeout(() => {

      sendRobotMessageByEye('NORMAL');
      
      gameCountContainerHide();
      gameCountReset();
      goMenu();
    }, 1000);
  });

  document.getElementById('end-button').addEventListener('touchstart', () => {
    if (isButtonTouch) {
      return;
    }

    isButtonTouch = true;
    setTimeout(() => {

      sendRobotMessageByEye('NORMAL');
      
      closePop();
      sendContentMessage('end');
      isButtonTouch = false;

      setTimeout(() => {
        sendContentMessage('end');
      }, 100);
      
    }, 1000);
  });
}

function inGameBodyReset() {
  document.getElementById('game_body').innerHTML = ''
  document.getElementById('game_body').removeAttribute('style');
  document.getElementById('game_body').removeAttribute('current_game');


}


function goMenu() {
  status = 'game-menu-select';

  // 비디오 컨트롤러 초기화
  const gameObject = getGameObject();
  const videoController = gameObject.videoController;
  videoController.pause();

  // 타이머 초기화
  userOut.currnet_time_reset();
  userOut.hideTimer();
  closePop();
  inGameBodyReset();


  // 하드코딩...
  if (gameConfig.current_gameId == 'game1') {
  } else if (gameConfig.current_gameId == 'game2') {
    gameConfig.game2.configReset();
  } else if (gameConfig.current_gameId == 'game3') {
    gameConfig.game3.configReset();
  }

  controlContainerFadeInOut('out', inGameScreenElement,
    () => {
    },
    () => {

      isButtonTouch = false;

      gameConfig.body.style.backgroundImage = '';
      gameConfig.body.innerHTML = ''

      // out start callback
      controlContainerFadeInOut('in', document.querySelector('.intro_container'),
        () => {     // in start callback
          inGameScreenElement.style.display = 'none';
          gameMenuContainer.style.opacity = 1;
          document.querySelector('.intro_container').style.display = 'block';
        },
        () => {     // in complete callback
          userOut.currnet_time_reset();
          userOut.showTimer();
        }
      );
    }
  );
}

const timerController = new TimerController(document.getElementById('game-timer'), timerSecond);