
Parse.initialize('fz7b9Y6ui2JdvGpf6YT3w4sC7kxRH34QDbsHYLcD', 'KKiTuov8NXlbuJ7pLQqM4dLexabodZZGOjVZ76Jc');
Parse.serverURL = 'https://parseapi.back4app.com/';
AOS.init();

(function(){
    'use strict';

    const newBtn = document.getElementById('newbtn');
    const postList = document.querySelector('main ol');
    const createPostForm = document.getElementById('create-post');
    const inputs = document.querySelectorAll('#create-post input:not([type=submit])');


    async function displayPosts(){
        const posts = Parse.Object.extend('Posts');
        const query = new Parse.Query(posts);
        try {
            const results = await query.ascending('createdAt').find();
            console.log(results);
            results.forEach(function (eachPost) {
                const id = eachPost.id;
                const title = eachPost.get('title');
                const response = eachPost.get('response');
                const signature = eachPost.get('signature');

                const theListItem = document.createElement('li');
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.setAttribute('data-aos', 'fade-up');
                theListItem.setAttribute('data-aos-duration', '1500');
                // data-aos-duration="1500"
                theListItem.innerHTML =
                `<h2 class="title">${title}</h2>
                <p class="response">${response}</p>
                <p class="signature">-${signature}</p>`;
                postList.append(theListItem);
            });
        } catch(error) {
            console.error('error while fetching posts', error);
        }
    }
    displayPosts();
    
    newBtn.addEventListener('click', function(event){
        event.preventDefault();
        createPostForm.className = 'create-post-onscreen';
    });

    createPostForm.addEventListener('submit', function(event){
        event.preventDefault();
        createPost();
    });

    async function createPost(){
        const newPost = {};

        for(let i=0; i<inputs.length; i++){
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newPost[key] = value;
        }
        if(newPost.title !='' && newPost.response !='' && newPost.signature !=''){
            // alert('added');
            const newPostData = new Parse.Object('Posts');
            newPostData.set('title', newPost.title);
            newPostData.set('response', newPost.response);
            newPostData.set('signature', newPost.signature);
            try{
                // add to B4A
                const result = await newPostData.save();
                console.log('post created', result);
                resetFormFields();
                // update the DOM 
                postList.innerHTML = '';
                displayPosts();
                // Close the form 
                createPostForm.className = 'create-post-offscreen';
            } catch(error) {
                console.error('Error while creating friend:', error);
            } 
        } else {
            // createPostForm.className = 'create-post-offscreen';
            alert('one or more fields left empty');
        }
    }

    // Event Delegation 
    document.addEventListener('click', function(event) {
        if(event.target.matches('.fa-times-circle')) {
            createPostForm.className = 'create-post-offscreen';
        }
    });

    // Helper functions
    function resetFormFields(){
        document.getElementById('title').value = '';
        document.getElementById('response').value = '';
        document.getElementById('signature').value = '';
    }
})();