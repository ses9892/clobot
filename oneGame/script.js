document.addEventListener('DOMContentLoaded', function () {
    // UI
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
    // 겜요소
    const circle = document.getElementById('circle');
    const circle2 = document.getElementById('circle2');
    const circle3 = document.getElementById('circle3');
    const circle4 = document.getElementById('circle4');
    const circle5 = document.getElementById('circle5');


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
        circle5: { left: circle5.style.left, top: circle5.style.top }

    };
    // 함수 정의
    function resetUI() {
        viewCorrect(Status)
        startTimer()
        hideMissionFailed()
        enableDrag()
    }
    function disableDrag() {
        circle.style.pointerEvents = 'none';
        circle2.style.pointerEvents = 'none';
        circle3.style.pointerEvents = 'none';
        circle4.style.pointerEvents = 'none';
        circle5.style.pointerEvents = 'none';
    }

    function enableDrag() {
        circle.style.pointerEvents = 'auto';
        circle2.style.pointerEvents = 'auto';
        circle3.style.pointerEvents = 'auto';
        circle4.style.pointerEvents = 'auto';
        circle5.style.pointerEvents = 'auto';
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
        correct1.style.visibility = 'visible'
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
    function viewCircles() {
        circle.style.visibility = "visible";
        circle2.style.visibility = "visible";
        circle3.style.visibility = "visible";
        circle4.style.visibility = "visible";
        circle5.style.visibility = "visible";


    }
    function hideCircles() {
        circle.style.visibility = "hidden";
        circle2.style.visibility = "hidden";
        circle3.style.visibility = "hidden";
        circle4.style.visibility = "hidden";
        circle5.style.visibility = "hidden";

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
        clearInterval(timerInterval);
        const endGameButtons = document.getElementById('endGameButtons');
        endGameButtons.style.display = 'flex';
        setTimeout(() => {
            endGameButtons.classList.add('visible');
            startMainTimer()
        }, 50);
        disableDrag()
        viewMissionFailed()


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

    // 게임세팅
    function PlayGame1Clear() {
        clearGame1Setting()
        game1Clear.style.visibility = 'visible';
        game1Clear.style.opacity = '1';
        game1Clear.play()
    }
    function game1Setting() {
        MainVideo.style.visibility = 'hidden';
        MainVideo.style.opacity = '0';
        viewBackGroundImage();
        viewBox(Status);
        viewLeftimage(Status);
        viewfirstProblem();
        viewTimer();
        viewCircles();
        viewCorrect(Status);
        enableDrag();
        startTimer();
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
        viewCircles()
        viewCorrect(Status)
        viewTimer()
        enableDrag()
        startTimer()
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
    }

    function hideGame2Start() {
        game2Start.style.visibility = 'hidden';
        game2Start.style.opacity = '0';
    }
    function hideGame3Start() {
        game3Start.style.visibility = 'hidden';
        game3Start.style.opacity = '0';
    }
    function PlayoutTroVideo() {
        outTroVideo.style.visibility = 'visible';
        outTroVideo.style.opacity = '1'
        outTroVideo.play()
    }
    function clearGame3Setting() {
        console.log('game3초기화2')
        hideBackGroundImage()
        hideBox()
        hideLeftimage()
        hideThridProblem()
        hideTimer()
        hideCircles()
        hideCorrect()
        hidViewMissionComplete()
        disableDrag()
        PlayoutTroVideo()
    }
    function PlayGame3Clear() {
        clearGame3Setting()
    }
    function game3Setting() {
        Status == "game3"
        switchingCorrect(Status)
        hideGame3Start()
        viewBackGroundImage()
        hideSecondProblem()
        viewThridProblem()
        viewBox(Status)
        viewLeftimage(Status)
        viewCircles()
        viewCorrect(Status)
        viewTimer()
        enableDrag()
        startTimer()
    }
    function switchingCorrect(Status) {
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
        maintimeLeft = 60;
        mainTimer = setInterval(function () {
            maintimeLeft--;
            console.log(maintimeLeft); // 콘솔에 현재 시간 출력
            if (maintimeLeft <= 0) {
                clearInterval(mainTimer); // 타이머 중지
                console.log('Timer ended');
                window.location.reload(); // 페이지 새로고침
            }
        }, 1000);
    }
    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            timeLeft--;
            timer.textContent = timeLeft;
            if (timeLeft <= 0) {
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
    function correctSound(){
        src
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
                    collidedElement.style.transition = "opacity 0.5s ease-out";
                    collidedElement.style.visibility = 'hidden';
                    collidedElement.style.opacity = '0';
                    currentElement.style.left = initialPositions[currentElement.id].left;
                    currentElement.style.top = initialPositions[currentElement.id].top;
                    // console.log(`${currentElement.id}이(가) 올바른 위치에 도달했습니다!`);
                    cnt += 1
                    if (cnt == 8) {
                        console.log("미션성공")
                        resetTimer()
                        hideTimer()
                        ViewMissionComplete()
                        disableDrag()
                        setTimeout(PlayGame1Clear, 1000);
                        cnt = 0;
                    }
                } else {
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
                    collidedElement.style.transition = "opacity 0.5s ease-out";
                    collidedElement.style.opacity = '0';
                    setTimeout(() => {
                        collidedElement.style.visibility = 'hidden';
                    }, 500);

                    currentElement.style.left = initialPositions[currentElement.id].left;
                    currentElement.style.top = initialPositions[currentElement.id].top;
                    // console.log(`${currentElement.id}이(가) 올바른 위치에 도달했습니다!`);
                    cnt += 1
                    if (cnt == 8) {
                        console.log("미션성공")
                        resetTimer()
                        hideTimer()
                        ViewMissionComplete()
                        disableDrag()
                        cnt = 0;
                        console.log(cnt)
                        setTimeout(PlayGame2Clear, 1000);
                    }
                } else {

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
                    collidedElement.style.transition = "opacity 0.5s ease-out";
                    collidedElement.style.visibility = 'hidden';
                    collidedElement.style.opacity = '0';
                    currentElement.style.left = initialPositions[currentElement.id].left;
                    currentElement.style.top = initialPositions[currentElement.id].top;
                    // console.log(`${currentElement.id}이(가) 올바른 위치에 도달했습니다!`);
                    cnt += 1
                    if (cnt == 5) {
                        console.log("미션성공")
                        resetTimer()
                        hideTimer()
                        ViewMissionComplete()
                        disableDrag()
                        cnt = 0;
                        console.log(cnt)
                        setTimeout(PlayGame3Clear, 1000);
                    }
                } else {

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
    // ---------------------------------------------------------//
    MainVideo.addEventListener('ended', function () {
        Status = "game1"
        game1Setting()

    });
    // body 터치 이벤트 시
    window.addEventListener('touchstart', function () {
        this.clearInterval(mainTimer)
    })
    //게임완성시 이벤트
    function hideGame1Clear() {
        game1Clear.style.visibility = "hidden";
        game1Clear.style.opacity = "0";
    }
    game1Clear.addEventListener('ended', function () {
        hideGame1Clear()
        playGame2Start()
        // window.location.reload()
    })
    game2Start.addEventListener('ended', function () {
        game2Setting()
    })
    function hideGame2Clear() {
        game2Clear.style.visibility = "hidden";
        game2Clear.style.opacity = "0";
    };
    game2Clear.addEventListener('ended', function () {
        hideGame2Clear()
        playGame3Start()
    });
    game3Start.addEventListener('ended', function () {
        game3Setting()
    });

    outTroVideo.addEventListener('ended', function () {
        setTimeout(function () {
            window.location.reload();
        }, 5000);
    });
    // 재도전 버튼 이벤트 리스너
    document.getElementById('retryButton').addEventListener('click', function () {
        clearInterval(mainTimer)
        resetGame();
    });

    // 종료 버튼 이벤트 리스너
    document.getElementById('exitButton').addEventListener('click', function () {
        // 게임 종료 로직 (예: 메인 화면으로 돌아가기)
        window.location.reload(); // 페이지 새로고침
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

}) // 끝


