// html page elements
const main = document.getElementsByTagName("main")[0];
const buttons = document.getElementsByTagName("button");

// load data from localStorage
const data = JSON.parse(localStorage.data);

// function that gets executed when you press a (dis)like button
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

// eventlisteners for (dis)like buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', ratePerson);
}