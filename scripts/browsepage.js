// html page elements
const main = document.getElementsByTagName('main')[0];
const people = main.getElementsByTagName('li');
const buttons = document.getElementsByTagName('button');
let peopleList = document.getElementsByTagName('ul')[0];
let peopleListItems = [];

// get unratedPeople from localStorage, to display them
let unratedPeople = JSON.parse(localStorage.data).filter(person => {
    return person.liked == null;
});

// display every unrated person on discover page
for (let i = 0; i < unratedPeople.length; i++) {

    // make a list item and put it in the 'peopleListItems' array
    peopleListItems.push(document.createElement('li'));
    peopleListItems[i].innerHTML = '<figure><a href="profile.html"><img src="" alt="profilepicture"></a><figcaption id="' + unratedPeople[i].firstName + '" ><h2>Name</h2><p>Student in New York</p><p>Indie, reggae, pop</p><button class="likebutton" type="button"><i class="fa fa-heart"></i></button><button class="dislikebutton" type="button"><i class="fa fa-times"></i></button></figcaption></figure>'
    
    // add the elements in the 'peopleListItems' array to the HTML's actual peopleList
    peopleList.appendChild(peopleListItems[i]);

    // give every chat the right details
    const photo = peopleListItems[i].getElementsByTagName('img')[0];
    const name = peopleListItems[i].getElementsByTagName('h2')[0];
    const desc = peopleListItems[i].getElementsByTagName('p')[0];
    
    photo.src = "images/" + unratedPeople[i].photo;
    name.textContent = unratedPeople[i].firstName + ' ' + unratedPeople[i].lastName;
    desc.textContent = unratedPeople[i].msg;
    
}

// function that gets executed when you press a (dis)like button
function ratePerson(e) {
    // update the currentData
    const currentData = JSON.parse(localStorage.data);
    const clickedUser = currentData.find(person => {
        return person.firstName == this.closest('figcaption').id;
    });
    
    if (e.target.classList.contains("fa-heart") || e.target.classList.contains("likebutton")) {
        clickedUser.liked = true;
    } else {
        clickedUser.liked = false;
    }
    
    // put the updated currentData in localStorage
    localStorage.setItem('data', JSON.stringify(currentData));
    location.reload();
}

// eventlisteners for (dis)like buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', ratePerson);
}