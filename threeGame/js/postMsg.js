window.addEventListener('DOMContentLoaded', () => {
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

