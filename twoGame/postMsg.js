window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');

    document.body.style.cursor = 'none';
});

function sendEventMessage(param){

    // window.parent가 있는지 확인
    if(window.parent){
        window.parent.postMessage(param);
    }else{
        console.log('window.parent is not exist');
    }
}

function sendContentMessage(param){
    // param 은 start | end
    sendEventMessage({type: 'content', value: param})
}

function sendRobotMessage(param) {
    var arrData = param.split('/');
    if (arrData.length < 3) {
        console.log('Invalid param')
        return;
    }
    const msgForRobot = {
        p_eye: arrData[0].trim(),

        p_head: arrData[1].trim(),

        p_leg: arrData[2].trim()
    }
    sendEventMessage({ type: 'robot', value: msgForRobot })
}


function sendRobotMessageByEye(eye){
    if(eye.toUpperCase() == 'NORMAL'){
        sendRobotMessage('Normal/Front/Default');
    }else if(eye.toUpperCase() == 'FEAR'){
        sendRobotMessage('Fear/Around_Short/Default');
    }else if(eye.toUpperCase() == 'HAPPY'){
        sendRobotMessage('Happy/Left/Default');
    }else if(eye.toUpperCase() == 'SAD'){
        sendRobotMessage('Sad/Up/Default');
    }else if(eye.toUpperCase() == 'PROUD'){
        sendRobotMessage('Proud/Right/Default');
    }
}

