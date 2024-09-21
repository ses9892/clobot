
// 게임 설정 객체
let gameConfig = {
    current_gameId : 'game3',  // 현재 게임 ID
    body : document.getElementById('game_body'),  // 게임 바디 요소
    game2 : {
        'background-url' : "url('./assets/images/game2/game2_background.png')",  // 게임2 배경 이미지 URL
        'component-img' : {  // 게임2 컴포넌트 이미지 URL
            'furnace' : "./assets/images/game2/game2-furnace.png",
            'section1' : "./assets/images/game2/game2-section1.png",
            'section2' : "./assets/images/game2/game2-section2.png",
            'section3' : "./assets/images/game2/game2-section3.png"
        },
        'video-url' : "./assets/video/test3.mp4",  // 게임2 비디오 URL
        'videoController' : new VideoController(  // 게임2 비디오 컨트롤러
            document.getElementById('gameIntroVideo') ,
            () => {
                gameIntroVideoEndCallback();  // 비디오 종료 시 콜백
            },
            () => {
                if (isDevMode) {
                    setTimeout(() => gameIntroVideoEndCallback(), dev_video_delay * 1000);  // 개발 모드에서 지연 후 콜백
                }
            }
        ),
        'current-level' : 1,  // 게임2 현재 레벨
        'current-section' : 3,  // 게임2 현재 섹션
        'sectionOneTimer' : null,  // 섹션 1 타이머 추가
        'sectionTwoTimer' : null,  // 섹션 2 타이머 추가
        'maxLevel' : 3  // 게임2 최대 레벨
    },
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
        'sectionTimer' : null
    }
}       


// 게임3의 전체 레이아웃을 설정하는 함수
function game3_layout_setting(bodyElement) {
    const gameObject = getGameObject();

}

// 현재 게임 오브젝트 가져오기
function getGameObject(){
    if(gameConfig.current_gameId == undefined){
        return undefined;
    }else{
        return gameConfig[gameConfig.current_gameId];
    }
}