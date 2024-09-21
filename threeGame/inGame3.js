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
        'video-url' : "./assets/video/test3.mp4",  // 게임3 비디오 URL
        'current-level' : 1,  // 게임3 현재 레벨
        'maxLevel' : 3,  // 게임2 최대 레벨
        'sectionTimer' : null,
        'current-fire-scale' : 1,
        'tree-style' : {
            'top' : '70%',
            'left' : '30%'
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
    
    // 요소들을 gameBackground에 추가
    gameBackground.appendChild(gameItemFire);
    gameBackground.appendChild(gameItemTree);
    gameBackground.appendChild(gameItemResult);
    
    // gameBackground를 game_body에 추가
    gameBody.appendChild(gameBackground);
}

// 문서 로드 시 실행될 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    console.log('문서가 완전히 로드되었습니다.');
    
    // 게임 초기화 함수 호출
    game3_initializeGame();
});


// 게임 초기화 함수
function game3_initializeGame() {
    console.log('게임을 초기화합니다.');
    
    const gameBody = document.getElementById('game_body');
    game3_layout_setting(gameBody);
    
    setTimeout(() => {
        const treeElement = document.getElementById('game_item_tree');
        if (treeElement) {
            let originalPosition = {
                x: parseFloat(gameConfig.game3['tree-style']['left']),
                y: parseFloat(gameConfig.game3['tree-style']['top'])
            };
            
            interact(treeElement).draggable({
                listeners: {
                    start(event) {
                        console.log('트리 드래그 시작');
                        event.preventDefault();
                    },
                    move(event) {
                        console.log('트리 드래그 중');
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        console.log(x, y);
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    },
                    end(event) {
                        console.log('트리 드래그 종료');
                        const target = event.target;
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
            console.error('game_item_tree 요소를 찾을 수 없습니다.');
        }
    }, 100);
}

console.log('gameItemFire에 드래그 앤 드롭 기능이 추가되었습니다.');

