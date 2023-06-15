Parse.initialize('jZbgGvTqompDKrt8ffrLnnZD7yY4DIhkcJEiAw5W', 'LINDPSjtUUuLwQits4ZHAlOdyftsoP8oKvgyjBVp');
Parse.serverURL = 'https://parseapi.back4app.com/';
AOS.init();

(function () {
    'use strict';

    const createPostForm = document.getElementById('create-post');
    const communityPostList = document.querySelector('.community-post-list');
    const overlay = document.getElementById('overlay');
    const navMenu = document.querySelector('nav');

    const header = document.querySelector('header');
    const communityLogoImg = document.querySelector('#community-logo');
    const main = document.querySelector('main');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;

        if (scrollPosition >= main.offsetTop) {
            header.classList.add('scrolled');
            communityLogoImg.classList.remove('hidden');

        } else {
            header.classList.remove('scrolled');
            communityLogoImg.classList.add('hidden');
        }
    });

    async function displayCommunityPosts() {
        const posts = Parse.Object.extend('Posts');
        const query = new Parse.Query(posts);
        try {
            const results = await query.descending('createdAt').find();
            console.log(results);
            results.forEach(function (eachPost) {
                const id = eachPost.id;
                const title = eachPost.get('title');
                const response = eachPost.get('response');
                const signature = eachPost.get('signature');
                const imgSrc = eachPost.get('selectedImage');

                //Creates the card in the post grid
                const theListItem = document.createElement('li');
                theListItem.className = 'community-post-list'
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.setAttribute('data-aos', 'fade-up');
                theListItem.setAttribute('data-aos-duration', '1500');
                theListItem.innerHTML =
                    `<div class="li-wrapper">
                    <div class="post-img">
                        <img src="images/${imgSrc}.png" alt="${imgSrc}" height="250" width="250" class="images">
                        <svg id="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="m5.33,200C4.58,93.19,92.78,3.41,200,4.36c91.8-.35,173.86,67.59,191.37,157.57,24.91,120.04-68.71,234.66-191.37,233.98-107.19.69-195.46-89.06-194.67-195.91h0Zm.27,0c-.62,105.96,88.79,193.89,194.41,193.17,105.76.53,194.03-87.36,193.81-193.17,1.02-106.56-87.36-194.45-193.81-193.44C94.42,6.1,4.93,94,5.59,200h0Z"/></svg>
                    </div>
                    <h3>${title}</h2>
                    <p class="response">${response}</p>
                    <h4>-${signature}</h4>
                </div>`;
                communityPostList.append(theListItem);
            });
        } catch (error) {
            console.error('error while fetching posts', error);
        }
    }
    displayCommunityPosts();

    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault();
        createCommunityPost();
    });

    async function createCommunityPost() {
        const newPost = {};

        let radioButtons = document.querySelectorAll('input[name="selectedImage"]');
        let selectedImage;
        // loops through image selection and gets selected value 
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                selectedImage = radioButtons[i].value;
            }
        }

        // Evaluates if the form can be submitted or not
        if (newPost.title != '' && newPost.response != '' && newPost.signature != '' && newPost.selectedImage != '') {
            const newPostData = new Parse.Object('Posts');
            newPostData.set('title', document.getElementById('title').value);
            newPostData.set('response', document.getElementById('response').value);
            newPostData.set('signature', document.getElementById('signature').value);
            newPostData.set('selectedImage', selectedImage);
            try {
                // add to B4A
                const result = await newPostData.save();
                // console.log('post created', result);
                resetFormFields();
                // update the DOM 
                communityPostList.innerHTML = '';
                displayCommunityPosts();
                // Close the form 
                overlay.classList.add('hidden');
                createPostForm.className = 'create-post-offscreen';
            } catch (error) {
                console.error('Error while creating post:', error);
            }
        } else {
            const alert = document.getElementById('alert');
            alert.innerHTML = '';
            alert.innerHTML = 'Oh no! One or more fields are empty.';
            alert.style.color = 'red';
        }
    }


    // Event Delegation 
    document.addEventListener('click', function (event) {
        if (event.target.matches('.fa-times')) {
            createPostForm.className = 'create-post-offscreen';
            overlay.classList.add('hidden');
            navMenu.className = 'nav-offscreen';
        }
        if (event.target.matches('.fa-bars')) {
            console.log('hamburger icon clicked');
            navMenu.className = 'nav-onscreen';
        }
        if (event.target.matches('#newbtn')) {
            overlay.classList.remove('hidden');
            createPostForm.className = 'create-post-onscreen';
        }
    });

    // Helper functions
    function resetFormFields() {
        document.getElementById('title').value = '';
        document.getElementById('response').value = '';
        document.getElementById('signature').value = '';
    }
})();