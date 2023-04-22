(function () {
    'use strict'
    console.log('reading js');

    const myVideo = document.querySelector('#myVideo');

    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');

    const poem = {
        start: [0, 5, 10, 15],
        stop: [4, 9, 13, 17],
        line: [line1, line2, line3, line4]
    }

    const loading = document.querySelector('.fa-frog');

    myVideo.addEventListener('playing', function () {
        loading.style.display = 'none';
    })

    const intervalID = setInterval(checkTime, 1000);

    function checkTime() {
        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                poem.line[i].className = 'showing'
            } else {
                poem.line[i].className = 'hidden'
            }
        }
    }

    const myInput = document.querySelector('#myInput');

    myInput.addEventListener('change', function () {
        if (myInput.checked) {
            overlay.className = 'showing';
            overlay.className.remove('hidden');
        } else {
            overlay.className = 'hidden';
            overlay.className.remove('showing');
        }
    })
})();