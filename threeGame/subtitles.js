const subtitle = {

    // 자막
    "subtitles": [
    ],

    // TTS 기본경로
    "defaultPath" : "./assets/tts/", 

    // TTS  파일 명
    "tts" : [
    ]
}

const gameMenuItem = {

    'count' : 3,

    gameItemThumnailImg : [
        './assets/images/game1_thumnail.png',
        './assets/images/game2_thumnail.png',
        './assets/images/game3_thumnail.png'
    ],

    gameItemName : [
        '1번게임 돌깍기',
        '2번게임 용주물',
        '3번게임 불지피기'
    ]
}


const assetsToPreload = [
    // Images
    "./assets/images/game1_background.png",
    "./assets/images/stone.png",
    ...gameMenuItem.gameItemThumnailImg, // Assuming gameItemThumnailImg is an array of image paths

    // Videos
    "./assets/video/test3.mp4"
];


function preloadAssets(assets) {
    assets.forEach(asset => {
        const isImage = asset.match(/\.(jpeg|jpg|gif|png)$/) != null;
        const isVideo = asset.match(/\.(mp4|webm|ogg)$/) != null;

        if (isImage) {
            const img = new Image();
            img.src = asset;
        } else if (isVideo) {
            const video = document.createElement('video');
            video.src = asset;
        }
    });
}

