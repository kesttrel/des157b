
Parse.initialize('eSlTO7IgT5AqREWzeeWtswCe7wB2m2gD74dgXe5S', 'yyb8wQvGDh2ziP2CVSHr6bjPs3vaRedAUtNcz6rY');
Parse.serverURL = 'https://parseapi.back4app.com/';

(function () {
    'use strict';

    const newBtn = document.getElementById('newbtn');
    const addFriendForm = document.getElementById('add-friend');
    const editFriendForm = document.getElementById('edit-friend');
    const friendList = document.querySelector('main ol');
    const inputs = document.querySelectorAll('#add-friend input:not([type=submit])');
    let thisRecord;

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends')
        const query = new Parse.Query(friends);
        try {
            const results = await query.ascending('lname').find();
            // console.log(results);
            results.forEach(function (eachFriend) {
                const id = eachFriend.id;
                const lname = eachFriend.get('lname');
                const fname = eachFriend.get('fname');
                const email = eachFriend.get('email');
                const facebook = eachFriend.get('facebook');
                const twitter = eachFriend.get('twitter');
                const instagram = eachFriend.get('instagram');
                const linkedin = eachFriend.get('linkedin');

                const theListItem = document.createElement('li');
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.innerHTML =
                `<div class="name">${fname} ${lname}</div>
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

    newBtn.addEventListener('click', function(event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
    });

    addFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addFriend();
    });

    async function addFriend(){
        const newFriend = {}; 

        for(let i=0; i<inputs.length; i++){
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newFriend[key] = value;
        }
        if(newFriend.fname !='' && newFriend.fname !='' && newFriend.email !=''){
            alert('added');
            const newFriendData = new Parse.Object('Friends');
            newFriendData.set('fname', newFriend.fname);
            newFriendData.set('lname', newFriend.lname);
            newFriendData.set('email', newFriend.email);
            newFriendData.set('facebook', newFriend.facebook);
            newFriendData.set('twitter', newFriend.twitter);
            newFriendData.set('instagram', newFriend.instagram);
            newFriendData.set('linkedin', newFriend.linkedin);
            try{
                // add to B4A
                const result = await newFriendData.save();
                console.log('friend created', result);
                resetFormFields();
                // update the DOM 
                friendList.innerHTML = '';
                displayFriends();
                // Close the form 
                addFriendForm.className = 'add-friend-offscreen';
            } catch(error) {
                console.error('Error while creating friend:', error);
            } 
        } else {
            addFriendForm.className = 'add-friend-offscreen';
        }
    }

    // event delegation
    document.addEventListener('click', function(event){

        if(event.target.matches('.fa-edit')) {
            thisRecord = event.target.getAttribute('id').slice(2);
            console.log(thisRecord);
            setForm(thisRecord);
        }

        if(event.target.matches('.fa-times-circle')) {
            thisRecord = event.target.getAttribute('id').slice(2);
            deleteRecord(thisRecord);
        }

    }, false);

    editFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        updateRecord(thisRecord);
    });

    async function setForm(recordId){
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        query.equalTo('objectId', recordId);
        try {
            const results = await query.find();

            results.forEach(function(thisFriend){
                document.getElementById('fname-edit').value = thisFriend.get('fname');
                document.getElementById('lname-edit').value = thisFriend.get('lname');;
                document.getElementById('email-edit').value = thisFriend.get('email');
                document.getElementById('fbook-edit').value = thisFriend.get('facebook');
                document.getElementById('twitter-edit').value = thisFriend.get('twitter');
                document.getElementById('insta-edit').value = thisFriend.get('instagram');
                document.getElementById('linkedin-edit').value = thisFriend.get('linkedin');
            });

            editFriendForm.className = 'edit-friend-onscreen';
        } catch(error) {
            console.error('Error while fetching Friends', error);
        }  
    }

    async function updateRecord(recordId){
        const theFields = document.querySelectorAll('#edit-friend input:not([type="submit"])');
        const editedRecord = {};
        let key;
        let value;
        for(let i=0; i<theFields.length; i++){
            key = theFields[i].getAttribute('name');
            value = theFields[i].value;
            editedRecord[key] = value;
        }
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            // Object Id wanted to update 
            const object = await query.get(recordId);
            //update each field
            object.set('fname', editedRecord.fname);
            object.set('lname', editedRecord.lname);
            object.set('email', editedRecord.email);
            object.set('facebook', editedRecord.facebook);
            object.set('twitter', editedRecord.twitter);
            object.set('instagram', editedRecord.instagram);
            object.set('linkedin', editedRecord.linkedin);
            try {
                //save the update to the DB
                await object.save();
                //close the edit friend form
                editFriendForm.className = 'edit-friend-offscreen';
                //clear out the ordered list
                friendList.innerHTML = '';
                //display the list of friends
                displayFriends();
            } catch(error) {
                console.error('Error while updating friends', error);
            }
        } catch(error) {
            console.error('Error while retrieving object friends', error);
        }
    }

    async function deleteRecord(recordId) {
        const youAreSure = confirm(
            'Are you sure you want to delete this friend?'
        );
        if(youAreSure){
            const query = new Parse.Query('Friends');
            try {
                const object = await query.get(recordId);
                try {
                    await object.destroy();
                    const elem = document.getElementById(`r-${recordId}`);
                    elem.className = 'remove';
                    setTimeout(function(){
                        elem.parentNode.removeChild(elem);
                    })
                } catch(error) {
                    console.error('Error deleting object', error);
                }
            } catch(error) {
                console.error('Error retrieving ParseObject', error);
            }
        }

    }

    // Helper functions
    function resetFormFields(){
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('fbook').value = 'https://facebook.com';
        document.getElementById('twitter').value = 'https://twitter.com';
        document.getElementById('insta').value = 'https://instagram.com';
        document.getElementById('linkedin').value = 'https://linkedin.com';
    }
    
})();