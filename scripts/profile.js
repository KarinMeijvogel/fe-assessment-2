/* GLOBAL VARIABLES (FOR HTML ELEMENTS) */
const main = document.getElementsByTagName("main")[0];
const buttons = document.getElementsByTagName("button");

// load data from localStorage
const data = JSON.parse(localStorage.data);

/* EVENTLISTENERS */
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', ratePerson);
}

/* FUNCTION DECLARATIONS */
function ratePerson(e) {
    // update the data
    const clickedUser = data.find(person => {
        return person.firstName == main.id;
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
    window.location = "index.html";
}