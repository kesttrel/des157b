(function () {
    'use strict'

    Parse.initialize("eSlTO7IgT5AqREWzeeWtswCe7wB2m2gD74dgXe5S", "yyb8wQvGDh2ziP2CVSHr6bjPs3vaRedAUtNcz6rY");
    Parse.serverURL = 'https://parseapi.back4app.com/'

    const newBtn = document.getElementById('newbtn');
    const editBtns = document.querySelectorAll('.fa-edit');
    const addFriendForm = document.getElementById('add-friend');
    const editFriendForm = document.getElementById('edit-friend');
    const friendList = document.querySelector('main ol');

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends')
        const query = new Parse.Query(friends);
        try {
            const results = await query.ascending('lastname').find();
            // console.log(results);
            results.forEach(function (eachFriend) {
                const id = eachFriend.id;
                const lastname = eachFriend.get('lastname');
                const firstname = eachFriend.get('firstname');
                const email = eachFriend.get('email');
                const facebook = eachFriend.get('facebook');
                const twitter = eachFriend.get('twitter');
                const instagram = eachFriend.get('instagram');
                const linkedin = eachFriend.get('linkedin');

                const theListItem = document.createElement('li');
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.innerHTML =
                `<div class="name">${firstname} ${lastname}</div>
                <div class="email">
                    <i class="fas fa-envelope-square"></i> ${email}
                </div>
                <div class="social">
                    <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                    <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                    <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                </div>
                <i class="fas fa-edit" id="e-${id}"></i>
                <i class="fas fa-times-circle" id="d-${id}"></i>`;
                
                friendList.append(theListItem);
            });
        }
        catch (error) {
            console.error('error while fetching friends', error);
        }
    }

    displayFriends();

    newBtn.addEventListener('click', function (event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
    })

    addFriendForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-offscreen';
    })

    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', function (event) {
            event.preventDefault();
            editFriendForm.className = 'edit-friend-onscreen';
        })
    }
    editFriendForm.addEventListener('submit', function (event) {
        event.preventDefault();
        editFriendForm.className = 'edit-friend-offscreen';
    });

})();