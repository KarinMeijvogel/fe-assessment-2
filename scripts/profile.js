// html page elements
const main = document.getElementsByTagName("main")[0];
const buttons = document.getElementsByTagName("button");

// function that gets executed when you press a (dis)like button
function ratePerson(e) {
    console.log(e)
    // update the currentData
    const currentData = JSON.parse(localStorage.data);
    const clickedUser = currentData.find(person => {
        return person.firstName == main.id;
    });
    
    if (e.target.classList.contains("fa-heart") || e.target.classList.contains("likebutton")) {
        clickedUser.liked = true;
    } else {
        clickedUser.liked = false;
    }
    
    // put the updated currentData in localStorage
    localStorage.setItem('data', JSON.stringify(currentData));

    window.location = "index.html";
}

// eventlisteners for (dis)like buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', ratePerson);
}