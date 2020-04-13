/* GLOBAL VARIABLES (FOR HTML ELEMENTS) */
const main = document.getElementsByTagName("main")[0];
const footerText = document.getElementsByTagName("footer")[0].getElementsByTagName("p")[0];
const removeButtons = document.getElementsByTagName("button");
const chatList = document.getElementsByTagName("ul")[0];
const chatListItems = document.getElementsByTagName("li");

// get data and matches from localStorage, to display them
const data = JSON.parse(localStorage.data);
const matches = JSON.parse(localStorage.data).filter(person => {
    return person.liked == true && person.likedMe == true;
});

/* ON PAGE LOAD */
// display data from localStorage (matches) on the page
window.onload = displayContent();

// after 2 seconds, simulate a match (a user liked me back)
setTimeout(newMatch, 2000);

/* EVENTLISTENERS */
// for removebuttons
for (i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", dislike)
}

// for clicking on a chat (removing 'new' notification)
for (i = 0; i < chatListItems.length; i++) {
    chatListItems[i].addEventListener("click", removeNotification)
}

/* FUNCTION DECLARATIONS */
function displayContent() {
    // disable html-only content if js is enabled
    chatList.innerHTML = "";
    
    // remove 'new matches' notification in navbar
    localStorage.removeItem("newMatches")
    
    // if liked page is empty, hide the main (background)
    if (matches.length == 0) {
        main.classList.add("invisible");
        footerText.classList.remove("invisible");
        footerText.textContent = "No people in your liked list yet.";
    }
    
    // create a li-element for every match and fill it with their details
    for (let i = 0; i < matches.length; i++) {
        const li = document.createElement("li");
        chatList.appendChild(li);

        const fig = document.createElement("figure");
        fig.dataset.id = matches[i].firstName;
        li.appendChild(fig);

        const deleteForm = document.createElement("form");
        fig.appendChild(deleteForm);

        const deleteImg = document.createElement("button");
        deleteForm.appendChild(deleteImg);

        const pic = document.createElement("img");
        pic.src = "images/" + matches[i].photo;
        pic.alt = "profile picture of " + matches[i].firstName;
        deleteImg.appendChild(pic);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteForm.appendChild(deleteButton);

        const notification = document.createElement("div");
        notification.classList.add("notification");
        fig.appendChild(notification);

        const figcaption = document.createElement("figcaption");
        fig.appendChild(figcaption);

        const name = document.createElement("h4");
        name.textContent = matches[i].firstName + ' ' + matches[i].lastName;
        figcaption.appendChild(name);

        const msg = document.createElement("p");
        msg.textContent = matches[i].msg;
        figcaption.appendChild(msg);
        
        // show only notifications of unseen matches
        if (matches[i].newMatch == false) {
            notification.classList.add("invisible");
        }
    }
}

function dislike(e) {
    e.preventDefault();
    // update the data
    const clickedUser = data.find(person => {
        return person.firstName == e.target.closest("figure").dataset.id;
    });
    
    clickedUser.liked = false;
    
    // put the updated data in localStorage
    localStorage.setItem("data", JSON.stringify(data));
    location.reload();
}

function removeNotification(e) {
    // update the data
    const clickedUser = data.find(person => {
        return person.firstName == e.target.closest("figure").dataset.id;
    });

    clickedUser.newMatch = false;

    // put the updated data in localStorage
    localStorage.setItem("data", JSON.stringify(data));
    location.reload()
}

function newMatch(){
    // update the data 
    const newMatch = data.find(person => {
        return person.liked === true && person.likedMe === null;
    });
    
    if (newMatch) {
        newMatch.likedMe = true;

        // put the updated data in localStorage
        localStorage.setItem("data", JSON.stringify(data));
        location.reload();    
    }
}