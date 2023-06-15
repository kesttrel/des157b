Parse.initialize('jZbgGvTqompDKrt8ffrLnnZD7yY4DIhkcJEiAw5W', 'LINDPSjtUUuLwQits4ZHAlOdyftsoP8oKvgyjBVp');
Parse.serverURL = 'https://parseapi.back4app.com/';
AOS.init();

(function () {
    'use strict';

    const createMemorialPostForm = document.getElementById('create-memorial-post');
    const memorialPostList = document.querySelector('.memorial-post-list');
    const overlay = document.getElementById('overlay');
    const navMenu = document.querySelector('nav');

    const header = document.querySelector('header');
    const main = document.querySelector('main');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;

        if (scrollPosition >= main.offsetTop) {
            header.classList.add('scrolled');

        } else {
            header.classList.remove('scrolled');
        }
    });

    async function displayMemorialPosts() {
    const posts = Parse.Object.extend('MemorialPosts');
    const query = new Parse.Query(posts);
    try {
        const results = await query.descending('createdAt').find();
        console.log(results);
        results.forEach(function (eachPost) {
            const id = eachPost.id;
            const keyword = eachPost.get('keyword');
            const response = eachPost.get('response');
            const name = eachPost.get('name');
            const imgSrc = eachPost.get('selectedImage');

            //Creates the card in the post grid
            const theListItem = document.createElement('li');
            theListItem.className = 'memorial-post-list'
            theListItem.setAttribute('id', `r-${id}`);
            theListItem.setAttribute('data-aos', 'fade-up');
            theListItem.setAttribute('data-aos-duration', '1500');
            theListItem.innerHTML =
                `<div class="li-wrapper">
                <div class="post-img">
                    <img src="images/${imgSrc}.png" alt="${imgSrc}" height="250" width="250" class="images">
                    <svg id="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="m5.33,200C4.58,93.19,92.78,3.41,200,4.36c91.8-.35,173.86,67.59,191.37,157.57,24.91,120.04-68.71,234.66-191.37,233.98-107.19.69-195.46-89.06-194.67-195.91h0Zm.27,0c-.62,105.96,88.79,193.89,194.41,193.17,105.76.53,194.03-87.36,193.81-193.17,1.02-106.56-87.36-194.45-193.81-193.44C94.42,6.1,4.93,94,5.59,200h0Z"/></svg>
                </div>
                <h3>${keyword}</h2>
                <p class="response">${response}</p>
                <h4>-${name}</h4>
            </div>`;
            memorialPostList.append(theListItem);
        });
    } catch (error) {
        console.error('error while fetching posts', error);
    }
    }
    displayMemorialPosts();

    createMemorialPostForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('clicked')
        createMemorialPost();
    });

    async function createMemorialPost() {
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
        if (newPost.keyword != '' && newPost.response != '' && newPost.name != '' && newPost.selectedImage != '') {
            const newPostData = new Parse.Object('MemorialPosts');
            newPostData.set('keyword', document.getElementById('keyword').value);
            newPostData.set('response', document.getElementById('response').value);
            newPostData.set('name', document.getElementById('name').value);
            newPostData.set('selectedImage', selectedImage);
            try {
                // add to B4A
                const result = await newPostData.save();
                // console.log('post created', result);
                resetFormFields();
                // update the DOM 
                memorialPostList.innerHTML = '';
                displayMemorialPosts();
                // Close the form 
                overlay.classList.add('hidden');
                createMemorialPostForm.className = 'create-post-offscreen';
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
            createMemorialPostForm.className = 'create-post-offscreen';
            overlay.classList.add('hidden');
            navMenu.className = 'nav-offscreen';
        }
        if (event.target.matches('.fa-bars')) {
            console.log('hamburger icon clicked');
            navMenu.className = 'nav-onscreen';
        }
        if (event.target.matches('#newMemorialBtn')) {
            overlay.classList.remove('hidden');
            createMemorialPostForm.className = 'create-post-onscreen';
        }
    });

    // Helper functions
    function resetFormFields() {
        document.getElementById('keyword').value = '';
        document.getElementById('response').value = '';
        document.getElementById('name').value = '';
    }
})();