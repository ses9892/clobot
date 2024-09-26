// 플래그 변수 설정
let called30 = false;
let called60 = false;
let called90 = false;

var bar = new ProgressBar.Circle('#progress-container', {
    color: '#FFEA82',
    trailColor: '#eee',
    easing: 'easeInOut',
    trailWidth: 1,
    duration: 1400,
    strokeWidth: 7,
    from: {color: '#ED6A5A', a:0},
    to: {color: '#ED6A5A', a:1},
    // Set default step function for all animate calls
    step: function(state, circle) {
      console.log('1')
      circle.path.setAttribute('stroke', state.color);
    },


    text: {
        value: '0%', // 초기 값
        style: {
            // 중앙에 텍스트가 위치하도록 설정
            color: '#000',
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 0,
            margin: 0,
            transform: {
                prefix: true,
                value: 'translate(-50%, -50%)' // 가운데 정렬
            },
            fontSize: '24px'
        }
    }
  });