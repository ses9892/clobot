const version = '1.0.5';

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

const game2_key_img = [
    './assets/images/game2/section/key1.png',
    './assets/images/game2/section/key2.png',
    './assets/images/game2/section/key3.png',
    './assets/images/game2/section/key4.png',
    './assets/images/game2/section/key5.png',
    './assets/images/game2/section/key6.png',
    './assets/images/game2/section/key7.png',
    './assets/images/game2/section/key8.png',
    './assets/images/game2/section/key9.png',
    './assets/images/game2/section/key10.png',
    './assets/images/game2/section/key11.png',
    './assets/images/game2/section/key12.png',
    './assets/images/game2/section/key13.png',
    './assets/images/game2/section/key14.png',
    './assets/images/game2/section/key15.png',
    './assets/images/game2/section/key16.png',
    './assets/images/game2/section/key17.png',
    './assets/images/game2/section/key18.png',
]


const assetsToPreload = [
    // Images
    "./assets/images/game1_background.png",
    "./assets/images/stone.png",
    ...gameMenuItem.gameItemThumnailImg, // Assuming gameItemThumnailImg is an array of image paths
    "./assets/images/component/close_button.png",
    "./assets/images/component/game_select_button.png",
    "./assets/images/component/guideCursor.png",
    "./assets/images/component/mission_complete.png",
    "./assets/images/component/mission_fail.png",
    "./assets/images/component/restart_button.png",

    "./assets/images/A_stone.png",
    "./assets/images/B_stone.png",
    "./assets/images/C_stone.png",
    "./assets/images/game1/game1_item_magchi.png",
    "./assets/images/game1/game1_item_target",
    "./assets/images/game1/game1_progress.png",
    "./assets/images/game1/game1_target.png",

    "./assets/images/game2/game2_background.png",
    "./assets/images/game2/game2-furnace-0.png",
    "./assets/images/game2/game2-furnace-1.png",
    "./assets/images/game2/game2-furnace-2.png",
    "./assets/images/game2/game2-furnace-3.png",

    "./assets/images/game2/game2-guage.png",
    "./assets/images/game2/game2-section1.png",
    "./assets/images/game2/game2-section2.png",
    "./assets/images/game2/game2-section3.png",
    "./assets/images/game2/game2-target.png",
    // Videos
    "./assets/video/game3_1_des.mp4",
    "./assets/video/game3_1_end.mp4",
    "./assets/video/game3_2_des.mp4",
    "./assets/video/game3_2_end.mp4",
    "./assets/video/game2_complete.mp4",


    // Audio
    "./assets/audio/correct.mp3",
    "./assets/audio/game1_stone_crash.wav",
    "./assets/audio/fail.mp3",
    "./assets/audio/game_clear.mp3"
];

async function preloadAssets(assets) {
    const loadPromises = assets.map(asset => {
        return new Promise((resolve, reject) => {
            const isImage = asset.match(/\.(jpeg|jpg|gif|png)$/) != null;
            const isVideo = asset.match(/\.(mp4|webm|ogg)$/) != null;
            const isAudio = asset.match(/\.(mp3|wav|ogg)$/) != null;

            if (isImage) {
                const img = new Image();
                img.onload = () => resolve(asset);
                img.onerror = () => reject(new Error(`이미지 로드 실패: ${asset}`));
                img.src = asset;
            } else if (isVideo) {
                const video = document.createElement('video');
                video.onloadeddata = () => resolve(asset);
                video.onerror = () => reject(new Error(`비디오 로드 실패: ${asset}`));
                video.src = asset;
                video.load();
            } else if (isAudio) {
                const audio = document.createElement('audio');
                audio.oncanplaythrough = () => resolve(asset);
                audio.onerror = () => reject(new Error(`오디오 로드 실패: ${asset}`));
                audio.src = asset;
                audio.load();
            } else {
                resolve(asset); // 알 수 없는 자산 유형은 즉시 해결
            }
        });
    });

    try {
        const loadedAssets = await Promise.all(loadPromises);
        console.log('모든 자산이 성공적으로 로드되었습니다:', loadedAssets);
    } catch (error) {
        console.error('자산 로드 중 오류 발생:', error);
    }
}

// initAssets 함수 수정
function initAssets() {
    preloadAssets(assetsToPreload);
}
