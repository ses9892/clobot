document.addEventListener('DOMContentLoaded', function () {
    // UI
    const wrong_answer = document.getElementById('wrong_answer')
    const backGroundimage = document.getElementById('backGroundimage');
    const backGroundimageLine = document.getElementById('backGroundimageLine');
    const outTroVideo = document.getElementById('outTroVideo');
    const MainVideo = document.getElementById('MainVideo');
    const mission_failed = document.getElementById('mission_failed')
    const mission_complete = document.getElementById('mission_complete')
    const game1Clear = document.getElementById('game1Clear')
    const game2Start = document.getElementById('game2Start')
    const game2Clear = document.getElementById('game2Clear')
    const game3Start = document.getElementById('game3Start')
    const game3Clear = document.getElementById('game3Clear')
    const game1Start = document.getElementById('game1Start')
    // 겜요소
    const circle = document.getElementById('circle');
    const circle2 = document.getElementById('circle2');
    const circle3 = document.getElementById('circle3');
    const circle4 = document.getElementById('circle4');
    const circle5 = document.getElementById('circle5');
    const circle6 = document.getElementById('circle6');
    const circle7 = document.getElementById('circle7');
    const circle8 = document.getElementById('circle8');
    const circle9 = document.getElementById('circle9');
    const circle10 = document.getElementById('circle10');
    const correctSound = document.getElementById('correctSound')
    const failSound = document.getElementById('failSound')
    const missionfailedSound = document.getElementById('missionfailedSound')
    const missionsuccessSound = document.getElementById('missionsuccessSound')

    const correct1 = document.getElementById('correct1');
    const correct2 = document.getElementById('correct2');
    const correct3 = document.getElementById('correct3');
    const correct4 = document.getElementById('correct4');
    const correct5 = document.getElementById('correct5');
    const correct6 = document.getElementById('correct6');
    const correct7 = document.getElementById('correct7');
    const correct8 = document.getElementById('correct8');

    //
    const timer = document.getElementById('timer');
    // game1
    const firstProblem = document.getElementById('firstProblem');
    const leftImageContainer1 = document.getElementById('leftImageContainer1');
    const leftImage = document.getElementById('leftImage');
    const box1 = document.getElementById('box1');
    // game2
    const secondProblem = document.getElementById('secondProblem');
    const leftImageContainer2 = document.getElementById('leftImageContainer2')
    const leftImage2 = document.getElementById('leftImage2')
    const box2 = document.getElementById('box2');
    // game3
    const ThridProblem = document.getElementById('ThridProblem')
    const leftImageContainer3 = document.getElementById('leftImageContainer3')
    const leftImage3 = document.getElementById('leftImage3')
    const box3 = document.getElementById('box3')
    const bottomBox = document.getElementById('bottomBox');


    // 변수 초기화
    // 타이머 시간초
    let timerInterval;
    let mainTimerCheck = false
    // 미션실패시 메인화면 보내는 시간
    let mainTimer;
    let timeLeft = 60;
    let maintimeLeft;
    let Status = "main";
    let cnt = 0;

    // 보석들의 초기 위치 저장
    const initialPositions = {
        circle: { left: circle.style.left, top: circle.style.top },
        circle2: { left: circle2.style.left, top: circle2.style.top },
        circle3: { left: circle3.style.left, top: circle3.style.top },
        circle4: { left: circle4.style.left, top: circle4.style.top },
        circle5: { left: circle5.style.left, top: circle5.style.top },
        circle6: { left: circle5.style.left, top: circle5.style.top },
        circle7: { left: circle5.style.left, top: circle5.style.top },
        circle8: { left: circle5.style.left, top: circle5.style.top },
        circle9: { left: circle5.style.left, top: circle5.style.top },
        circle10: { left: circle5.style.left, top: circle5.style.top },


    };
    disableDrag()
    // 함수 정의
    function resetUI() {
        hideMissionFailed()
        enableDrag()
    }
    function viewWronganswer(){
        wrong_answer.style.visibility="visible";
    }
    function hideWronganswer(){
        wrong_answer.style.visibility = 'hidden';
    }
    function disableDrag() {
        circle.style.pointerEvents = 'none';
        circle2.style.pointerEvents = 'none';
        circle3.style.pointerEvents = 'none';
        circle4.style.pointerEvents = 'none';
        circle5.style.pointerEvents = 'none';
        circle6.style.pointerEvents = 'none';
        circle7.style.pointerEvents = 'none';
        circle8.style.pointerEvents = 'none';
        circle9.style.pointerEvents = 'none';
        circle10.style.pointerEvents = 'none';
    }

    function enableDrag() {
        circle.style.pointerEvents = 'auto';
        circle2.style.pointerEvents = 'auto';
        circle3.style.pointerEvents = 'auto';
        circle4.style.pointerEvents = 'auto';
        circle5.style.pointerEvents = 'auto';
        circle6.style.pointerEvents = 'auto';
        circle7.style.pointerEvents = 'auto';
        circle8.style.pointerEvents = 'auto';
        circle9.style.pointerEvents = 'auto';
        circle10.style.pointerEvents = 'auto';
    }
    function viewCorrect(Status) {

        if (Status == "game1") {
            correct1.style.visibility = 'visible'
            correct1.style.opacity = '1'
            correct2.style.visibility = 'visible'
            correct2.style.opacity = '1'
            correct3.style.visibility = 'visible'
            correct3.style.opacity = '1'
            correct4.style.visibility = 'visible'
            correct4.style.opacity = '1'
            correct5.style.visibility = 'visible'
            correct5.style.opacity = '1'
            correct6.style.visibility = 'visible'
            correct6.style.opacity = '1'
            correct7.style.visibility = 'visible'
            correct7.style.opacity = '1'
            correct8.style.visibility = 'visible'
            correct8.style.opacity = '1'
        }
        if (Status == "game2") {
            correct1.style.visibility = 'visible'
            correct1.style.opacity = '1'
            correct2.style.visibility = 'visible'
            correct2.style.opacity = '1'
            correct3.style.visibility = 'visible'
            correct3.style.opacity = '1'
            correct4.style.visibility = 'visible'
            correct4.style.opacity = '1'
            correct5.style.visibility = 'visible'
            correct5.style.opacity = '1'
            correct6.style.visibility = 'visible'
            correct6.style.opacity = '1'
            correct7.style.visibility = 'visible'
            correct7.style.opacity = '1'
            correct8.style.visibility = 'visible'
            correct8.style.opacity = '1'
        }
        if (Status == "game3") {
            correct1.style.visibility = 'visible'
            correct1.style.opacity = '1'
            correct2.style.visibility = 'visible'
            correct2.style.opacity = '1'
            correct3.style.visibility = 'visible'
            correct3.style.opacity = '1'
            correct4.style.visibility = 'visible'
            correct4.style.opacity = '1'
            correct5.style.visibility = 'visible'
            correct5.style.opacity = '1'
        }

    }
    function hideCorrect() {
        correct1.style.visibility = 'hidden'
        correct1.style.opacity = '0'
        correct2.style.visibility = 'hidden'
        correct2.style.opacity = '0'
        correct3.style.visibility = 'hidden'
        correct3.style.opacity = '0'
        correct4.style.visibility = 'hidden'
        correct4.style.opacity = '0'
        correct5.style.visibility = 'hidden'
        correct5.style.opacity = '0'
        correct6.style.visibility = 'hidden'
        correct6.style.opacity = '0'
        correct7.style.visibility = 'hidden'
        correct7.style.opacity = '0'
        correct8.style.visibility = 'hidden'
        correct8.style.opacity = '0'

    }
    function viewCircles(Status) {
        for (let circleName in initialPositions) {
            if (window[circleName]) {
                window[circleName].style.left = initialPositions[circleName].left;
                window[circleName].style.top = initialPositions[circleName].top;
            }
        }
        if (Status == 'game1') {
            circle.style.visibility = "visible";
            circle.style.opacity = "1";
            circle.className = "blue"
            circle.querySelector('img').src = "assets/images/game1_blue.png"
            circle2.style.visibility = "visible";
            circle2.style.opacity = "1";
            circle2.className = "blue"
            circle2.querySelector('img').src = "assets/images/game1_blue.png"
            circle3.style.visibility = "visible";
            circle3.style.opacity = "1";
            circle3.className = "red"
            circle3.querySelector('img').src = "assets/images/game1_red.png"
            circle4.style.visibility = "visible";
            circle4.style.opacity = "1";
            circle4.className = "white"
            circle4.querySelector('img').src = "assets/images/game1_white.png"
            circle5.style.visibility = "visible";
            circle5.style.opacity = "1";
            circle5.className = "white"
            circle5.querySelector('img').src = "assets/images/game1_white.png"
            circle6.style.visibility = "visible";
            circle6.style.opacity = "1";
            circle6.className = "white"
            circle6.querySelector('img').src = "assets/images/game1_white.png"
            circle7.style.visibility = "visible";
            circle7.style.opacity = "1";
            circle7.className = "green"
            circle7.querySelector('img').src = "assets/images/game1_green.png"
            circle8.style.visibility = "visible";
            circle8.style.opacity = "1";
            circle8.className = "yellow"
            circle8.querySelector('img').src = "assets/images/game1_yellow.png"
            circle9.style.visibility = "visible";
            circle9.style.opacity = "1";
            circle9.className = "white"
            circle9.querySelector('img').src = "assets/images/game1_white.png"
            circle10.style.visibility = "visible";
            circle10.style.opacity = "1";
            circle10.className = "red"
            circle10.querySelector('img').src = "assets/images/game1_red.png"
        }
        if (Status == 'game2') {
            circle.style.visibility = "visible";
            circle.style.opacity = "1";
            circle.className = "blue"
            circle.querySelector('img').src = "assets/images/game1_blue.png"
            circle2.style.visibility = "visible";
            circle2.style.opacity = "1";
            circle2.className = "blue"
            circle2.querySelector('img').src = "assets/images/game1_blue.png"
            circle3.style.visibility = "visible";
            circle3.style.opacity = "1";
            circle3.className = "red"
            circle3.querySelector('img').src = "assets/images/game1_red.png"
            circle4.style.visibility = "visible";
            circle4.style.opacity = "1";
            circle4.className = "red"
            circle4.querySelector('img').src = "assets/images/game1_red.png"
            circle5.style.visibility = "visible";
            circle5.style.opacity = "1";
            circle5.className = "white"
            circle5.querySelector('img').src = "assets/images/game1_white.png"
            circle6.style.visibility = "visible";
            circle6.style.opacity = "1";
            circle6.className = "white"
            circle6.querySelector('img').src = "assets/images/game1_white.png"
            circle7.style.visibility = "visible";
            circle7.style.opacity = "1";
            circle7.className = "green"
            circle7.querySelector('img').src = "assets/images/game1_green.png"
            circle8.style.visibility = "visible";
            circle8.style.opacity = "1";
            circle8.className = "red"
            circle8.querySelector('img').src = "assets/images/game1_red.png"
            circle9.style.visibility = "visible";
            circle9.style.opacity = "1";
            circle9.className = "white"
            circle9.querySelector('img').src = "assets/images/game1_white.png"
            circle10.style.visibility = "visible";
            circle10.style.opacity = "1";
            circle10.className = "yellow"
            circle10.querySelector('img').src = "assets/images/game1_yellow.png"
        }
        if (Status == 'game3') {
            circle.style.visibility = "visible";
            circle.style.opacity = "1";
            circle.className = "blue"
            circle.querySelector('img').src = "assets/images/game1_blue.png"
            circle2.style.visibility = "visible";
            circle2.style.opacity = "1";
            circle2.className = "blue"
            circle2.querySelector('img').src = "assets/images/game1_blue.png"
            circle3.style.visibility = "visible";
            circle3.style.opacity = "1";
            circle3.className = "red"
            circle3.querySelector('img').src = "assets/images/game1_red.png"
            circle4.style.visibility = "visible";
            circle4.style.opacity = "1";
            circle4.className = "white"
            circle4.querySelector('img').src = "assets/images/game1_white.png"
            circle5.style.visibility = "visible";
            circle5.style.opacity = "1";
            circle5.className = "white"
            circle5.querySelector('img').src = "assets/images/game1_white.png"
            circle6.style.visibility = "visible";
            circle6.style.opacity = "1";
            circle6.className = "white"
            circle6.querySelector('img').src = "assets/images/game1_white.png"
            circle7.style.visibility = "visible";
            circle7.style.opacity = "1";
            circle7.className = "green"
            circle7.querySelector('img').src = "assets/images/game1_green.png"
            circle8.style.visibility = "visible";
            circle8.style.opacity = "1";
            circle8.className = "yellow"
            circle8.querySelector('img').src = "assets/images/game1_yellow.png"
            circle9.style.visibility = "visible";
            circle9.style.opacity = "1";
            circle9.className = "white"
            circle9.querySelector('img').src = "assets/images/game1_white.png"
            circle10.style.visibility = "visible";
            circle10.style.opacity = "1";
            circle10.className = "red"
            circle10.querySelector('img').src = "assets/images/game1_red.png"
        }



    }
    function hideCircles() {
        circle.style.visibility = "hidden";
        circle2.style.visibility = "hidden";
        circle3.style.visibility = "hidden";
        circle4.style.visibility = "hidden";
        circle5.style.visibility = "hidden";
        circle6.style.visibility = "hidden";
        circle7.style.visibility = "hidden";
        circle8.style.visibility = "hidden";
        circle9.style.visibility = "hidden";
        circle10.style.visibility = "hidden";


    }

    function viewTimer() {
        timer.style.visibility = 'visible';
        timer.style.opacity = '1';
    }
    function hideTimer() {
        timer.style.visibility = 'hidden';
        timer.style.opacity = '0';
    }

    function viewLeftimage(Status) {
        if (Status == "game1") {
            leftImageContainer1.style.visibility = 'visible';
            leftImage.style.visibility = 'visible';
            leftImage.style.opacity = '1';
        }
        if (Status == "game2") {
            leftImageContainer2.style.visibility = 'visible';
            leftImage2.style.visibility = 'visible';
            leftImage2.style.opacity = '1';
        }
        if (Status == "game3") {
            leftImageContainer3.style.visibility = 'visible';
            leftImage3.style.visibility = 'visible';
            leftImage3.style.opacity = '1';
        }
    }
    function hideLeftimage() {
        leftImageContainer1.style.visibility = 'hidden';
        leftImage.style.visibility = 'hidden';
        leftImage.style.opacity = '0';
        leftImageContainer2.style.visibility = 'visible';
        leftImage2.style.visibility = 'hidden';
        leftImage2.style.opacity = '0';
        leftImageContainer3.style.visibility = 'visible';
        leftImage3.style.visibility = 'hidden';
        leftImage3.style.opacity = '0';
    }

    function viewfirstProblem() {
        firstProblem.style.visibility = 'visible';
        firstProblem.style.opacity = '1';
        firstProblem.style.zIndex = '1';
    }
    function hidefirstProblem() {
        firstProblem.style.visibility = 'hidden';
        firstProblem.style.opacity = '0';
        firstProblem.style.zIndex = '0';
    }
    function viewSecondProblem() {
        secondProblem.style.visibility = 'visible';
        secondProblem.style.opacity = '1';
        secondProblem.style.zIndex = '1';
    }
    function hideSecondProblem() {
        secondProblem.style.visibility = 'hidden';
        secondProblem.style.opacity = '0';
        secondProblem.style.zIndex = '0';
    }
    function viewThridProblem() {
        ThridProblem.style.visibility = 'visible';
        ThridProblem.style.opacity = '1';
        ThridProblem.style.zIndex = '1';
    }
    function hideThridProblem() {
        ThridProblem.style.visibility = 'hidden';
        ThridProblem.style.opacity = '0';
        ThridProblem.style.zIndex = '0';
    }
    function playGame2Start() {
        game2Start.style.visibility = 'visible';
        game2Start.style.opacity = '1';
        Status = "game2"
        game2Start.play()
    }
    function playGame3Start() {
        game3Start.style.visibility = 'visible';
        game3Start.style.opacity = '1';
        Status = "game3"
        game3Start.play()
    }
    function viewMissionFailed() {
        mission_failed.style.visibility = 'visible';
    }
    function hideMissionFailed() {
        mission_failed.style.visibility = 'hidden';
    }
    function ViewMissionComplete() {
        mission_complete.style.visibility = 'visible';
    }
    function hidViewMissionComplete() {
        mission_complete.style.visibility = 'hidden';
    }
    function endGame() {
        missionfailedSound.play()
        mainTimerCheck = true
        clearInterval(mainTimer)
        clearInterval(timerInterval);
        const endGameButtons = document.getElementById('endGameButtons');
        disableDrag()
        viewMissionFailed()
        missionfailedSound.play()
        missionfailedSound.addEventListener('ended', () => {
            endGameButtons.style.display = 'flex';
            setTimeout(() => {
                endGameButtons.classList.add('visible');
                startMainTimer()
                }, 50);
        })
    }
    function resetGame() {
        const endGameButtons = document.getElementById('endGameButtons');
        endGameButtons.classList.remove('visible');
        setTimeout(() => {
            endGameButtons.style.display = 'none';
        }, 500);
        timeLeft = 60;
        timer.textContent = timeLeft;
        resetUI();
    }
    function viewBackGroundImage() {
        backGroundimage.style.visibility = "visible";
        backGroundimage.style.opacity = '1';
        backGroundimageLine.style.visibility = "visible";
        backGroundimageLine.style.opacity = '1';

    }
    function hideBackGroundImage() {
        backGroundimage.style.visibility = "hidden";
        backGroundimage.style.opacity = '0';
        backGroundimageLine.style.visibility = "hidden";
        backGroundimageLine.style.opacity = '0';

    }
    function viewBox(Status) {
        bottomBox.style.visibility = 'visible';
        bottomBox.style.opacity = "1";
        if (Status == "game1") {
            box1.style.visibility = 'visible';
            box1.style.opacity = '1';
        }
        if (Status == "game2") {
            console.log('dd')
            box2.style.visibility = 'visible';
            box2.style.opacity = '1';
        }
        if (Status == "game3") {
            box3.style.visibility = 'visible';
            box3.style.opacity = '1';
        }

    }
    function hideBox() {
        bottomBox.style.visibility = 'hidden';
        bottomBox.style.opacity = "0";
        box1.style.visibility = 'hidden';
        box1.style.opacity = '0';
        box2.style.visibility = 'hidden';
        box2.style.opacity = '0';
        box3.style.visibility = 'hidden';
        box3.style.opacity = '0';
    }
    // correct fade out 설정
    function correctFadeout() {
        correct1.style.transition = "opacity 0.5s ease-out";
        correct2.style.transition = "opacity 0.5s ease-out";
        correct3.style.transition = "opacity 0.5s ease-out";
        correct4.style.transition = "opacity 0.5s ease-out";
        correct5.style.transition = "opacity 0.5s ease-out";
        correct6.style.transition = "opacity 0.5s ease-out";
        correct7.style.transition = "opacity 0.5s ease-out";
        correct8.style.transition = "opacity 0.5s ease-out";


    }
    function clearCorrectFadeout() {
        correct1.style.transition = "none";
        correct2.style.transition = "none";
        correct3.style.transition = "none";
        correct4.style.transition = "none";
        correct5.style.transition = "none";
        correct6.style.transition = "none";
        correct7.style.transition = "none";
        correct8.style.transition = "none";


    }
    // 게임세팅
    function PlayGame1Clear() {
        clearGame1Setting()
        game1Clear.style.visibility = 'visible';
        game1Clear.style.opacity = '1';
        game1Clear.play()
    }
    function game1Setting() {
        game1Start.style.opacity = '0'
        // setTimeout(MainVideo.style.visibility = 'hidden',500)
        setTimeout(viewBackGroundImage, 100)
        viewBox(Status);
        viewLeftimage(Status);
        viewfirstProblem();
        viewTimer();
        viewCircles(Status);
        viewCorrect(Status);
        enableDrag();
        startTimer();
        setTimeout(startTimer, 2000)
        setTimeout(correctFadeout, 2000)
    }
    function clearGame1Setting() {
        hideBox();
        hideBackGroundImage()
        hideLeftimage();
        hidefirstProblem();
        hideTimer();
        hideCircles();
        hideCorrect(Status);
        disableDrag();
        hidViewMissionComplete();
    }
    function PlayGame2Clear() {
        console.log('game2초기화')
        clearGame2Setting()
        game2Clear.style.visibility = 'visible';
        game2Clear.style.opacity = '1';
        game2Clear.play()
    }
    function game2Setting() {
        Status == "game2"
        switchingCorrect(Status)
        hideGame2Start()
        viewBackGroundImage()
        viewSecondProblem()
        viewBox(Status)
        viewLeftimage(Status)
        viewCircles(Status)
        viewCorrect(Status)
        viewTimer()
        enableDrag()
        startTimer()
        setTimeout(startTimer, 2000)
        setTimeout(correctFadeout, 2000)
    }
    function clearGame2Setting() {
        console.log('game2초기화2')
        hideBackGroundImage()
        hideBox()
        hideLeftimage()
        hideSecondProblem()
        hideTimer()
        hideCircles()
        hideCorrect()
        hidViewMissionComplete()
        disableDrag()
        clearCorrectFadeout()
    }

    function hideGame2Start() {
        // game2Start.style.visibility = 'hidden';
        game2Start.style.opacity = '0';
    }
    function hideGame3Start() {
        // game3Start.style.visibility = 'hidden';
        game3Start.style.opacity = '0';
    }
    function PlayoutTroVideo() {
        game3Clear.style.opacity = "0"
        outTroVideo.style.visibility = 'visible';
        outTroVideo.style.opacity = '1'
        outTroVideo.play()
    }
    function PlayGame3Clear() {
        game3Clear.style.visibility = 'visible';
        game3Clear.style.opacity = "1"
        game3Clear.play()
    }
    function clearGame3Setting() {
        console.log('game3초기화3')
        hideBackGroundImage()
        hideBox()
        hideLeftimage()
        hideThridProblem()
        hideTimer()
        hideCircles()
        hideCorrect()
        hidViewMissionComplete()
        disableDrag()
        if (Status != 'game1') {
            PlayGame3Clear()
        }

    }
    clearCorrectFadeout()

    function game3Setting() {
        Status == "game3"
        switchingCorrect(Status)
        hideGame3Start()
        viewBackGroundImage()
        hideSecondProblem()
        viewThridProblem()
        viewBox(Status)
        viewLeftimage(Status)
        viewCircles(Status)
        viewCorrect(Status)
        viewTimer()
        enableDrag()
        setTimeout(startTimer, 2000)
        setTimeout(correctFadeout, 2000)
    }
    function switchingCorrect(Status) {
        if (Status == "game1") {
            correct1.style.top = "354px";
            correct1.style.left = "462px";
            correct1.style.width = "103px"; correct1.style.height = "103px";
            correct1.className = "white";
            correct2.style.top = "481px";
            correct2.style.left = "750px";
            correct2.style.width = "103px"; correct2.style.height = "103px";
            correct2.className = "white";
            correct3.style.top = "735px";
            correct3.style.left = "673px";
            correct3.style.width = "103px"; correct3.style.height = "103px";
            correct3.className = "red";
            correct4.style.top = "833px";
            correct4.style.left = "600px";
            correct4.style.width = "103px"; correct4.style.height = "103px";
            correct4.className = "blue";
            correct5.style.top = "781px";
            correct5.style.left = "438px";
            correct5.style.width = "103px"; correct5.style.height = "103px";
            correct5.className = "blue";
            correct6.style.top = "807px";
            correct6.style.left = "333px";
            correct6.style.width = "103px"; correct6.style.height = "103px";
            correct6.className = "white"
            correct7.style.top = "790px";
            correct7.style.left = "222px";
            correct7.style.width = "103px"; correct7.style.height = "103px";
            correct7.className = "red";
            correct8.style.top = "680px";
            correct8.style.left = "160px";
            correct8.style.width = "103px"; correct8.style.height = "103px";
            correct8.className = "white";
        }
        if (Status == "game2") {
            correct1.style.top = "380px";
            correct1.style.left = "362px";
            correct1.className = "red";
            correct2.style.top = "380px";
            correct2.style.left = "574px";
            correct2.className = "blue";
            correct3.style.top = "500px";
            correct3.style.left = "676px";
            correct3.className = "white";
            correct4.style.top = "690px";
            correct4.style.left = "651px";
            correct4.className = "red";
            correct5.style.top = "720px";
            correct5.style.left = "532px";
            correct5.className = "white";
            correct6.style.top = "690px";
            correct6.style.left = "374px";
            correct6.className = "blue"
            correct7.style.top = "550px";
            correct7.style.left = "313px";
            correct7.className = "white";
            correct8.style.top = "530px";
            correct8.style.left = "478px";
            correct8.className = "red";
        }
        if (Status == "game3") {
            correct1.style.top = "300px"; correct1.style.left = "323px";
            correct1.style.width = "122px"; correct1.style.height = "122px";
            correct1.className = "white";

            correct2.style.top = "330px"; correct2.style.left = "690px";
            correct2.style.width = "122px"; correct2.style.height = "122px";
            correct2.className = "white";
            // top: 601px; left: 604px; width:122px; height:122px
            correct3.style.top = "601px"; correct3.style.left = "604px";
            correct3.style.width = "121px"; correct3.style.height = "121px";
            correct3.className = "white";

            correct4.style.top = "601px"; correct4.style.left = "396px";
            correct4.style.width = "121px"; correct4.style.height = "121px";
            correct4.className = "white";

            correct5.style.top = "432px"; correct5.style.left = "509px";
            correct5.style.width = "121px"; correct5.style.height = "121px";
            correct5.className = "red";

        }

    }

    // 타이머
    function startMainTimer() {
        console.log('Timer started');
        maintimeLeft = 15;
        timer.textContent = maintimeLeft;
        mainTimer = setInterval(function () {
            maintimeLeft--;
            timer.textContent = maintimeLeft;
            if (maintimeLeft <= 0) {
                clearInterval(mainTimer); // 타이머 중지
                console.log('Timer ended');
                sendContentMessage("end"); // 페이지 새로고침
            }
        }, 1000);
    }
    function startTimer() {
        clearInterval(mainTimer)
        clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            timeLeft--;
            timer.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(mainTimer)
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 60;
        timer.textContent = timeLeft;
    }
    // 사운드 재생
    function PlayCorrectSound() {
        correctSound.play()
    }
    function PlayFailSound() {
        failSound.play()
    }

    // 보석 이동 관련 함수
    let offsetX, offsetY;
    let currentElement = null;

    function handleTouchStart(e, element) {
        e.preventDefault();
        currentElement = element;
        const touch = e.touches[0];
        console.log('게임상태 : ', Status);
        const rect = currentElement.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        console.log('offsetX = ', offsetX, 'offsetY = ', offsetY);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    }

    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);

    }

    function onTouchMove(e) {
        const moveTouch = e.touches[0];
        const newLeft = moveTouch.clientX - offsetX;
        const newTop = moveTouch.clientY - offsetY;
        currentElement.style.left = newLeft + "px";
        currentElement.style.top = newTop + "px";
    }
    function delayFunction() {
        ViewMissionComplete()
        missionsuccessSound.play()
        setTimeout(PlayGame1Clear, 700);
    }
    function delayFunction2() {
        ViewMissionComplete()
        missionsuccessSound.play()
        setTimeout(PlayGame2Clear, 700);
    }
    function delayFunction3() {
        ViewMissionComplete()
        missionsuccessSound.play()
        setTimeout(clearGame3Setting, 700);
    }
    function onTouchEnd() {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        if (Status == "game1") {
            if (currentElement) {
                const correctElements = [correct1, correct2, correct3, correct4, correct5, correct6, correct7, correct8];
                let collidedElement = null;
                for (let correctElement of correctElements) {
                    if (isColliding(currentElement, correctElement)) {
                        collidedElement = correctElement;
                        break;
                    }
                }
                if (collidedElement && currentElement.className === collidedElement.className) {
                    collidedElement.style.opacity = '0';
                    collidedElement.className = "correct!"
                    currentElement.style.transition = "opacity 1s ease;"
                    currentElement.style.opacity = "0"
                    console.log(`${collidedElement.className}이(가) 올바른 위치에 도달했습니다!`);
                    cnt += 1
                    PlayCorrectSound()
                    if (cnt == 8) {
                        cnt = 0;
                        disableDrag()
                        resetTimer()
                        hideTimer()
                        setTimeout(delayFunction,700)
                    }
                } else {
                    viewWronganswer()
                    PlayFailSound()
                    setTimeout(hideWronganswer,1000)
                    // hideWronganswer()
                    currentElement.style.left = initialPositions[currentElement.id].left;
                    currentElement.style.top = initialPositions[currentElement.id].top;
                    console.log(`${currentElement.id}이(가) 초기 위치로 돌아갔습니다.`);
                }
            }
        }
        if (Status == "game2") {
            if (currentElement) {
                const correctElements = [correct1, correct2, correct3, correct4, correct5, correct6, correct7, correct8];
                let collidedElement = null;
                for (let correctElement of correctElements) {
                    if (isColliding(currentElement, correctElement)) {
                        collidedElement = correctElement;
                        break;
                    }
                }
                if (collidedElement && currentElement.className === collidedElement.className) {
                    PlayCorrectSound()
                    collidedElement.style.opacity = '0';
                    collidedElement.className = "correct!"
                    currentElement.style.transition = "opacity 1s ease;"
                    currentElement.style.opacity = "0"
                    // console.log(`${currentElement.id}이(가) 올바른 위치에 도달했습니다!`);
                    cnt += 1
                    if (cnt == 8) {
                        cnt = 0;
                        disableDrag()
                        resetTimer()
                        hideTimer()
                        setTimeout(delayFunction2, 700)
                    }
                } else {
                    viewWronganswer()
                    PlayFailSound()
                    setTimeout(hideWronganswer,1000)
                    currentElement.style.left = initialPositions[currentElement.id].left;
                    currentElement.style.top = initialPositions[currentElement.id].top;
                    console.log(`${currentElement.id}이(가) 초기 위치로 돌아갔습니다.`);
                }
            }
        }
        if (Status == "game3") {
            if (currentElement) {
                const correctElements = [correct1, correct2, correct3, correct4, correct5];
                let collidedElement = null;
                for (let correctElement of correctElements) {
                    if (isColliding(currentElement, correctElement)) {
                        collidedElement = correctElement;
                        break;
                    }
                }
                if (collidedElement && currentElement.className === collidedElement.className) {
                    PlayCorrectSound()
                    collidedElement.style.opacity = '0';
                    collidedElement.className = "correct!"
                    currentElement.style.transition = "opacity 1s ease;"
                    currentElement.style.opacity = "0"
                    cnt += 1
                    if (cnt == 5) {
                        disableDrag()
                        resetTimer()
                        hideTimer()
                        cnt = 0;
                        setTimeout(delayFunction3,700)

                    }
                } else {
                   viewWronganswer()
                    PlayFailSound()
                    setTimeout(hideWronganswer,1000)
                    currentElement.style.left = initialPositions[currentElement.id].left;
                    currentElement.style.top = initialPositions[currentElement.id].top;
                    console.log(`${currentElement.id}이(가) 초기 위치로 돌아갔습니다.`);
                }
            }
        }
        currentElement = null;
        offsetX = null;
        offsetY = null;
    }
    function game1StartPlay() {
        game1Start.style.opacity = '1'
        game1Start.style.visibility = 'visible'
        game1Start.play()
    }
    function playGame1Start() {
        MainVideo.style.opacity = "0"
        Status = "game1"
        setTimeout(game1Setting, 100)
    }
    // ---------------------------------------------------------//
    // 커서없애기
    // Clobot 관련
    MainVideo.addEventListener('ended', function () {
        setTimeout(game1StartPlay, 100)
    });
    game1Start.addEventListener('ended', () => {
        setTimeout(playGame1Start, 100)
    })
    // body 터치 이벤트 시
    window.addEventListener('touchstart', function () {
        if (mainTimerCheck == true) {
            clearInterval(mainTimer)
            startMainTimer()
        }

    })
    //게임완성시 이벤트
    function hideGame1Clear() {
        game1Clear.style.opacity = "0";
    }
    game1Clear.addEventListener('ended', function () {
        clearCorrectFadeout()
        hideGame1Clear()
        setTimeout(playGame2Start, 100)
        // window.location.reload()
    })
    game2Start.addEventListener('ended', function () {
        game2Setting()
    })
    function hideGame2Clear() {
        game2Clear.style.opacity = "0";
    };
    game2Clear.addEventListener('ended', function () {
        clearCorrectFadeout()
        hideGame2Clear()
        playGame3Start()
    });
    game3Start.addEventListener('ended', function () {
        game3Setting()
    });
    game3Clear.addEventListener('ended', () => {
        PlayoutTroVideo()
    })
    outTroVideo.addEventListener('ended', function () {
        setTimeout(function () {
            sendContentMessage("end")
        }, 5000);
    });
    // 재도전 버튼 이벤트 리스너
    document.getElementById('retryButton').addEventListener('click', function () {
        mainTimerCheck = false
        cnt = 0;
        clearInterval(mainTimer)
        if (Status == 'game1') {
            game1Setting()
            switchingCorrect(Status)
        }
        else if (Status == 'game2') {
            Status = 'game1'
            clearGame2Setting()
            game1Setting()
            switchingCorrect(Status)
        }
        else {
            Status = 'game1'
            clearGame3Setting()
            game1Setting()
            switchingCorrect(Status)
        }
        resetGame();
    });

    // 종료 버튼 이벤트 리스너
    document.getElementById('exitButton').addEventListener('click', function () {
        clearInterval(mainTimer)
        // 게임 종료 로직 (예: 메인 화면으로 돌아가기)
        sendContentMessage("end")
        // window.location.reload(); // 페이지 새로고침
    });
    // 이벤트 리스너 설정
    circle.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle);
    });
    circle2.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle2);
    });
    circle3.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle3);
    });
    circle4.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle4);
    });
    circle5.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle5);
    });
    // 이벤트 리스너 설정
    circle6.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle6);
    });
    circle7.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle7);
    });
    circle8.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle8);
    });
    circle9.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle9);
    });
    circle10.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle10);
    });
    //클로봇 관련
    window.addEventListener("DOMContentLoaded", function () {
        this.document.body.style.cursor = 'none';
    })
    // 게임시작시 
    sendContentMessage("start")
    // sendContentMessage(value="start")
    // 게임종료 버튼을 누를 시
    // sendContentMessage(value="end")  
    function sendEventMessage(param) {
        // window.parent가 있는지 확인
        if (window.parent) {
            window.parent.postMessage(param);
        } else {
            console.log('window.parent is not exist');
        }
    }

    function sendContentMessage(param) {
        // param 은 start | end
        sendEventMessage({ type: 'content', value: param })
    }


}) // 끝


