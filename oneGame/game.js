let resetTimerFunction;
let hideAllExceptBackgroundFunction;
let gameComPlete1EventFunction;
export function setHideAllExceptBackgroundFounction(func) {
    hideAllExceptBackgroundFunction = func;
}
export function setResetTimerFunction(func) {
    resetTimerFunction = func;
}
export function setGameComPlete1EventFunction(func){
    gameComPlete1EventFunction = func;
}
document.addEventListener('DOMContentLoaded', function () {

    const circle = document.getElementById('circle')
    const circle2 = document.getElementById('circle2')
    const correct1 = document.getElementById('correct1')
    // 보석들의 초기값들 저장
    const initialPositions = {
        circle1: { left: circle.style.left, top: circle.style.top },
        // circle2: { left: circle2.style.left, top: circle2.style.top }
    };
    // 보석 이동

    let offsetX, offsetY;
    let currentElement = null;

    circle.addEventListener('touchstart', function (e) {
        handleTouchStart(e, circle);
    });
    // circle2.addEventListener('touchstart', function (e) {
    //     handleTouchStart(e, circle2);
    // });

    // 만지기 시작했을 떄
    function handleTouchStart(e, element) {
        e.preventDefault();
        currentElement = element;
        const touch = e.touches[0];
        console.log('보석터치시작');
        const rect = currentElement.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top; // 오타 수정
        console.log('offsetX = ', offsetX, 'offsetY = ', offsetY);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    }
    // 문제에 맞는 곳에 도달하였는지 확인하는 함수
    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);
    }
    // 움직일 때
    function onTouchMove(e) {
        const moveTouch = e.touches[0];
        const newLeft = moveTouch.clientX - offsetX;
        const newTop = moveTouch.clientY - offsetY; // 오타 수정
        currentElement.style.left = newLeft + "px";
        currentElement.style.top = newTop + "px";
    }
    // drag가 끝났을 떄
    function onTouchEnd() {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        //후에 clear시에 resetTimer call
        if (currentElement === circle) {
            // 문제의 class값과 보석의 class값을 비교하여  class값이 일치시에 보석을 지운다.
            if (isColliding(circle, correct1)) {
                //정답갯수 카운팅해서 나중에 수정
                if (hideAllExceptBackgroundFunction) hideAllExceptBackgroundFunction();
                if (resetTimerFunction) resetTimerFunction();
                if (gameComPlete1EventFunction) gameComPlete1EventFunction();
                console.log("Circle1이 올바른 위치에 도달했습니다!");
                // 성공 시 추가 동작
            } else {
                // 초기 위치로 되돌리기
                circle.style.left = initialPositions.circle1.left;
                circle.style.top = initialPositions.circle1.top;
                console.log("Circle1이 초기 위치로 돌아갔습니다.");
            }
        } else if (currentElement === circle2) {
            if (isColliding(circle2, correct1)) {
                console.log("Circle2가 올바른 위치에 도달했습니다!");
                // 성공 시 추가 동작
            } else {
                // 초기 위치로 되돌리기
                circle2.style.left = initialPositions.circle2.left;
                circle2.style.top = initialPositions.circle2.top;
                console.log("Circle2가 초기 위치로 돌아갔습니다.");
            }
        }
        // 값들을 초기화 시켜서 다양하게 쓸 수 있도록 만듬
        currentElement = null;
        offsetX = null;
        offsetY = null;
    }

});