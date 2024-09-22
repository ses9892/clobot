// 게임 설정 객체
let gameConfig = {
    current_gameId : 'game3',  // 현재 게임 ID
    body : document.getElementById('game_body'),  // 게임 바디 요소
    game3 : {
        'background-url' : "url('./assets/images/game3/game3_background.png')",  // 게임3 배경 이미지 URL
        'component-img' : {  // 게임3 컴포넌트 이미지 URL
            'tree' : "./assets/images/game3/game3-tree.webp",
            'fire' : "./assets/images/game3/game3-fire-section1.webp",
            'resultItem' : "./assets/images/game3/game3-result-item.webp"

        },
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

// 게임3의 전체 레이아웃을 설정하는 함수
function game3_layout_setting(bodyElement) {
    const gameObject = game3_getGameObject();
    game3_createGameBackground();
}


// 현재 게임 오브젝트 가져오기
function game3_getGameObject(){
    if(gameConfig.current_gameId == undefined){
        return undefined;
    }else{
        return gameConfig[gameConfig.current_gameId];
    }
}

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

// 문서 로드 시 실행될 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    console.log('문서가 완전히 로드되었습니다.');
    
    // 게임 초기화 함수 호출
    game3_initializeGame();

    game3_level_check_timer();
});

function game3_level_check_timer(){
    console.log('게임3 레벨 체크 타이머 시작');
    const gameObject = game3_getGameObject();
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
    game3_createGameBackground();
    
    setTimeout(() => {
        const treeElement = document.getElementById('game_item_tree');
        const dropZone = document.getElementById('game_drag_drop_box');
        
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

function game3_check_Complete(){
    const currentLevel = gameConfig.game3['current-level'];
    if(currentLevel == gameConfig.game3['maxLevel']){
        game3_complete_game();
    }else{
        game3_create_next_level();
    }
}

function game3_complete_game(){
    alert('게임3 완료');
    const gameObject = game3_getGameObject();
    gameObject.clearLevelCheckTimer();
    gameObject.completeGame();
}

function game3_create_next_level(){
    console.log('게임3 레벨 증가');
    gameConfig.game3['current-level']++;
    gameConfig.game3['current-fire-scale']++;

    const gameItemFire = document.getElementById('game_item_fire');
    gameItemFire.setAttribute('scale', gameConfig.game3['current-fire-scale']);
}
