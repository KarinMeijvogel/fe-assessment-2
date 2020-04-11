// html page elements
const main = document.getElementsByTagName('main')[0];
const buttons = document.getElementsByTagName('button');
let peopleList = document.getElementsByTagName('ul')[0];

// disable html-only content if js is enabled
peopleList.innerHTML = "";

// get unratedPeople from localStorage, to display them
let unratedPeople = JSON.parse(localStorage.data).filter(person => {
    return person.liked == null;
});

// display every unrated person on discover page
for (let i = 0; i < unratedPeople.length; i++) {
    // make li-elements for every likedPerson
    peopleList.innerHTML += '<li><figure><a><img alt="profilepicture"></a><figcaption><h2></h2><p></p><form action="" method="post"><button class="likebutton"><i class="fa fa-heart"></i></button></form><form action="" method="post"><button class="dislikebutton"><i class="fa fa-times"></i></button></form></figcaption></figure></li>'

    // give every chat the right details
    const figure = peopleList.getElementsByTagName('figure')[i];
    const linkToProfile = peopleList.getElementsByTagName('a')[i];
    const photo = peopleList.getElementsByTagName('img')[i];
    const name = peopleList.getElementsByTagName('h2')[i];
    const desc = peopleList.getElementsByTagName('p')[i];
    
    figure.dataset.id = unratedPeople[i].firstName;
    linkToProfile.href = 'profile-' + unratedPeople[i].firstName.toLowerCase() + '.html';
    photo.src = "images/" + unratedPeople[i].photo;
    name.textContent = unratedPeople[i].firstName + ' ' + unratedPeople[i].lastName + ', ' + unratedPeople[i].age;
    desc.textContent = unratedPeople[i].desc;
}

// function that gets executed when you press a (dis)like button
function ratePerson(e) {
    e.preventDefault();

    // update the currentData
    const currentData = JSON.parse(localStorage.data);
    const clickedUser = currentData.find(person => {
        return person.firstName == this.closest('figure').dataset.id;
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