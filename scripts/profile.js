/* GLOBAL VARIABLES (FOR HTML ELEMENTS) */
const main = document.getElementsByTagName("main")[0];
const likeButtons = document.querySelectorAll(".likebutton");
const dislikeButtons = document.querySelectorAll(".dislikebutton");

// load data from localStorage
const data = JSON.parse(localStorage.data);
const rate = rating();

/* EVENTLISTENERS */
for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', rate.like);
    dislikeButtons[i].addEventListener('click', rate.dislike);
}

/* FUNCTION DECLARATIONS */
function rating() {
    const ratedUser = data.find(person => {
        return person.firstName == main.id;
    });
    
    return {
        like: function(e) {
            e.preventDefault();
            ratedUser.liked = true;
            updateStorage();
        },
        dislike: function(e) {
            e.preventDefault();
            ratedUser.liked = false;
            updateStorage();
        }
    };
}

function updateStorage() {
    localStorage.setItem('data', JSON.stringify(data));
    window.location = "index.html";
}