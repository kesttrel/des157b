
Parse.initialize('jZbgGvTqompDKrt8ffrLnnZD7yY4DIhkcJEiAw5W', 'LINDPSjtUUuLwQits4ZHAlOdyftsoP8oKvgyjBVp');
Parse.serverURL = 'https://parseapi.back4app.com/';
AOS.init();

(function () {
    'use strict';

    const newBtn = document.getElementById('newbtn');
    const postList = document.querySelector('main ol');
    const createPostForm = document.getElementById('create-post');
    const inputs = document.querySelectorAll('#create-post input:not([type=submit])');
    const viewPostOverlay = document.getElementById('view-post');
    const navMenu = document.querySelector('nav');

    alert("Hello, welcome to usability testing for the Virtual Compassion Bench. SCENARIO: Imagine you are a member of the Davis Community and you are at the seal in Downtown. You've just scanned the QR code to check out the digital projects corresponding to the seal with a coffee from Mishka's. You've just taken your first sip of your drink and opened the Compassion Bench project link. Try to perform the following tasks: 1) VIEW A POST AND EXIT A POST. 2) CREATE A POST. 3) OPEN AND CLOSE THE NAVIGATION. ");

    async function displayPosts() {
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

                //Creates the card in the post grid
                const theListItem = document.createElement('li');
                theListItem.className = 'post-list'
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.setAttribute('data-aos', 'fade-up');
                theListItem.setAttribute('data-aos-duration', '1500');
                theListItem.innerHTML =
                    `<div class="li-wrapper">
                    <div class="post-img"></div>
                    <h3>${title}</h2>
                    <h4>-${signature}</h4>
                    <div class="viewbtn">view post</div>
                </div>`;
                // `<h2 class="title">${title}</h2>
                // <p class="response">${response}</p>
                // <p class="signature">-${signature}</p>`;
                postList.append(theListItem);

                const postContent = document.createElement('div');
                postContent.setAttribute('id', `r-${id}`);
                postContent.innerHTML =
                    `<i class="fas fa-times-circle fa-2x"></i>
                    <div id="view-post-content">
                        <h1 style="color:red">VIEW POSTS UNDER CONSTRUCTION</h1>
                        <div class="post-img"></div>
                        <h3 >${title}</h2>
                        <p>${response}</p>
                        <p>-${signature}</p>
                    </div>
                    <div id="view-post-nav">
                        <div>
                            <i class="fa fa-caret-left fa-2x"></i>
                            previous post
                        </div>
                        <div>
                            next post
                            <i class="fa fa-caret-right fa-2x"></i>
                        </div>
                    </div>`;
                viewPostOverlay.append(postContent);
            });
        } catch (error) {
            console.error('error while fetching posts', error);
        }
    }
    displayPosts();

    newBtn.addEventListener('click', function (event) {
        event.preventDefault();
        createPostForm.className = 'create-post-onscreen';
    });

    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault();
        createPost();
    });

    async function createPost() {
        const newPost = {};

        for (let i = 0; i < inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newPost[key] = value;
        }
        if (newPost.title != '' && newPost.response != '' && newPost.signature != '') {
            // alert('added');
            const newPostData = new Parse.Object('Posts');
            newPostData.set('title', newPost.title);
            newPostData.set('response', newPost.response);
            newPostData.set('signature', newPost.signature);
            try {
                // add to B4A
                const result = await newPostData.save();
                console.log('post created', result);
                resetFormFields();
                // update the DOM 
                postList.innerHTML = '';
                displayPosts();
                // Close the form 
                createPostForm.className = 'create-post-offscreen';
            } catch (error) {
                console.error('Error while creating friend:', error);
            }
        } else {
            // createPostForm.className = 'create-post-offscreen';
            alert('one or more fields left empty');
        }
    }

    // Event Delegation 
    document.addEventListener('click', function (event) {
        if (event.target.matches('.fa-times-circle')) {
            createPostForm.className = 'create-post-offscreen';
            viewPostOverlay.className = 'hidden';
            navMenu.className = 'nav-offscreen';
        }
        if (event.target.matches('.viewbtn')) {
            console.log('view button clicked');
            viewPostOverlay.className = 'showing';
        }
        if (event.target.matches('.fa-bars')) {
            console.log('hamburger icon clicked');
            navMenu.className = 'nav-onscreen';
        }
    });

    // Helper functions
    function resetFormFields() {
        document.getElementById('title').value = '';
        document.getElementById('response').value = '';
        document.getElementById('signature').value = '';
    }
})();