(function(){
    'use strict';

    const newBtn = document.getElementById('newbtn');
    const createPostForm = document.getElementById('create-post');
    
    newBtn.addEventListener('click', function(event){
        event.preventDefault();
        console.log('clicked');
        createPostForm.className = 'create-post-onscreen';
        document.addEventListener('click', function(event) {
            if(event.target.matches('.times-circle')) {
                createPostForm.className = 'create-post-offscreen';
            }
        })
    });

})();