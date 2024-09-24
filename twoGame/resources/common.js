
/**
 * 공통함수 정의
 */

// _dev 관련 변수 및 함수 정의
let _dev_mode;

class DevMode {

    constructor() {
        this._is_end_pop_test = true;
        this.btn_create_tag = 'body';
    }

    // initalizer
    _init(){
        if(this._is_end_pop_test){
            this.createEndingCallButton(this.btn_create_tag);
        }
    }

    // dev btn 생성
    createEndingCallButton(createTag){
        const endCallBtn = document.createElement('button');
        endCallBtn.className = 'test-button';
        endCallBtn.id = 'end-call-button';
        endCallBtn.innerText = 'Open Pop';

        let parentTag = document.querySelector(createTag);
        parentTag.appendChild(endCallBtn);

        // 이벤트 정의
        endCallBtn.addEventListener('touchstart', function() {
            showPopup('게임종료', '테스트 중', ()=> {
            });
            
        });

    }
}

// document.addEventListener('DOMContentLoaded', function () {
//     _dev_mode = new DevMode();
//     _dev_mode._init();
// });


// 팝업 표시 함수
function showPopup(title, message, callback, restartTimer = false) {

    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popup.style.display = 'flex';
    
    const restartButton = document.getElementById('restart-button');
    const menuButton = document.getElementById('menu-button');
    
    //ADD Event
    restartButton.addEventListener('touchstart', () => restartButtonCallBack(popup));
    menuButton.addEventListener('touchstart', () => menuButtonCallBack(popup));
}

function closePop(){
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}


// 재시작 콜백
function restartButtonCallBack(popup){
    popup.style.display ='none';

    let currentGameId = gameScreen.id;
    console.log('gameId : ' + currentGameId);

    if(currentGameId != undefined){
        alert(currentGameId + "를 재시작 합니다.(구현중)");
    }else{
        alert('게임을 아직 실행 하지 않았습니다.');
    }
}

// 메뉴 이동 콜백
function menuButtonCallBack(popup){
    popup.style.display ='none';

    gsap.to(sliderContainer, { opacity: 1, duration: 0.5 });
    gsap.to(gameScreen, { opacity: 0, duration: 0.5, pointerEvents: 'auto' });


    if(gameScreen == undefined){
        alert('현재 메뉴에 위치하고 있습니다.');
    }else{
        gameReset();
    }
}

// 게임 리셋
function gameReset(){
    gameScreen = undefined;
}


// 팝업 표시 함수
function showPopupGame(title, message) {

    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

