/* GLOBAL VARIABLES (FOR HTML ELEMENTS) */
const main = document.getElementsByTagName('main')[0];
const buttons = document.getElementsByTagName('button');
const peopleList = document.getElementsByTagName('ul')[0];
const notification = document.querySelectorAll('.notification')[0];

// get unratedPeople from localStorage, to display them
const data = JSON.parse(localStorage.data);
const unratedPeople = JSON.parse(localStorage.data).filter(person => {
    return person.liked == null;
});

/* ON PAGE LOAD */
// display data from localStorage (unrated people) on the page
window.onload = displayContent();

/* EVENTLISTENERS */
// register (dis)like
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', ratePerson);
}

/* FUNCTION DECLARATIONS */
function displayContent() {
    // disable html-only content if js is enabled
    peopleList.innerHTML = "";

    // display 'new matches' notification in navbar
    if (!localStorage.newMatches) {
        notification.classList.add("invisible")
    }

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
}

// function that gets executed when you press a (dis)like button
function ratePerson(e) {
    e.preventDefault();

    // update the data
    const clickedUser = data.find(person => {
        return person.firstName == this.closest('figure').dataset.id;
    });
    
    if (e.target.classList.contains("fa-heart") || e.target.classList.contains("likebutton")) {
        clickedUser.liked = true;
        if (clickedUser.likedMe === true) {
            localStorage.setItem("newMatches", true);
        }
    } else {
        clickedUser.liked = false;
    }
    
    // put the updated data in localStorage
    localStorage.setItem('data', JSON.stringify(data));
    location.reload();
}
