// 비디오 컨트롤러 클래스
class AudioController {
    constructor(audioElement, onEndedCallback) {
        if(audioElement == null || audioElement == undefined){
            this.audio = document.createElement('audio');
        }else{
            this.audio = audioElement;
        }
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

    correctSound(){
        this.audio.src = "./assets/audio/correct.mp3";
        this.play();
    }

    failSound(){
        this.audio.src = "./assets/audio/fail.mp3";
        this.play();
    }
}

const audioController = new AudioController(undefined , () => {
    console.log('오디오 끝');
});