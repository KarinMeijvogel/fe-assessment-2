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

    // create a li-element for every person and fill it with their details
    for (let i = 0; i < unratedPeople.length; i++) {
        const li = document.createElement("li");
        peopleList.appendChild(li);

        const fig = document.createElement("figure");
        fig.dataset.id = unratedPeople[i].firstName;
        li.appendChild(fig);

        const link = document.createElement("a");
        link.href = "profile-" + unratedPeople[i].firstName + ".html";
        fig.appendChild(link);

        const pic = document.createElement("img");
        pic.src = "images/" + unratedPeople[i].photo;
        pic.alt = "profile picture of " + unratedPeople[i].firstName;
        link.appendChild(pic);

        const figcaption = document.createElement("figcaption");
        fig.appendChild(figcaption);

        const name = document.createElement("h2");
        name.textContent = unratedPeople[i].firstName + ' ' + unratedPeople[i].lastName;
        figcaption.appendChild(name);

        const desc = document.createElement("p");
        desc.textContent = unratedPeople[i].desc;
        figcaption.appendChild(desc);

        const likeForm = document.createElement("form");
        figcaption.appendChild(likeForm);

        const likeButton = document.createElement("button");
        likeButton.classList.add("likebutton");
        likeForm.appendChild(likeButton);

        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa");
        likeIcon.classList.add("fa-heart");
        likeButton.appendChild(likeIcon);

        const dislikeForm = document.createElement("form");
        figcaption.appendChild(dislikeForm);

        const dislikeButton = document.createElement("button");
        dislikeButton.classList.add("dislikebutton");
        dislikeForm.appendChild(dislikeButton);

        const dislikeIcon = document.createElement("i");
        dislikeIcon.classList.add("fa");
        dislikeIcon.classList.add("fa-times");
        dislikeButton.appendChild(dislikeIcon);
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
