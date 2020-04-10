// default userdata
class Person{
    constructor(firstName, lastName, age, id, photo, msg, liked, likedMe) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.id = id;
        this.photo = photo;
        this.msg = msg;
        this.liked = liked;
        this.likedMe = likedMe; // true, false or null (not liked or disliked yet)
    }
}

let Olivia = new Person('Olivia', 'Delroy', '24', '001', 'girl.jpeg', `I love all of the bands in your...`, null, null);
let Kayla = new Person('Kayla', 'Solomon', '25', '002', 'girl1.jpeg', `What's up :-)`, null, null);
let Nadia = new Person('Nadia', 'Williams', '23', '003', 'girl2.jpeg', `lol ikr`, null, null);
let Eve = new Person('Eve', 'Johnson', '24', '004', 'girl3.jpeg', `Are you going to DLDK this year?`, null, null);
let Abby = new Person('Abby', 'Watts', '25', '005', 'girl4.jpeg', `Yeah, saw them live 3 weeks ago.`, null, null);
let defaultData = [Olivia, Kayla, Nadia, Eve, Abby];

// (re)store default userdata in localStorage:
// localStorage.setItem('data', JSON.stringify(defaultData));

// get myLikes from localStorage, divide them in matching and pending
let data = JSON.parse(localStorage.data);

let myLikes = JSON.parse(localStorage.data).filter(person => {
    return person.liked == true && person.likedMe !== false;
});

let matches = JSON.parse(localStorage.data).filter(person => {
    return person.liked == true && person.likedMe == true;
});

let pending = JSON.parse(localStorage.data).filter(person => {
    return person.liked == true && person.likedMe == null;
});

// html page elements
const main = document.getElementsByTagName('main')[0];
const footerText = document.getElementsByTagName('footer')[0].getElementsByTagName('p')[0];
const chatList = document.getElementsByTagName('ul')[0];
const clItems = [];

// when user clicks on someone's photo, this person gets deleted from the liked list
function disLike(e) {
    // update the currentData
    const currentData = JSON.parse(localStorage.data);
    const clickedUser = currentData.find(person => {
        return person.firstName == e.target.id;
    });
    
    clickedUser.liked = false;

    // put the updated currentData in localStorage
    localStorage.setItem('data', JSON.stringify(currentData));
    location.reload();
}

// for every liked person...
for (let i = 0; i < myLikes.length; i++) {

// make a list item and put it in the 'clItems' array
    clItems.push(document.createElement('li'));
    clItems[i].innerHTML = '<figure><img id="' + myLikes[i].firstName + '" src="" alt="profilepicture"><figcaption><h4>Username</h4><p>Message</p></figcaption></figure>'
   
// add the elements in the 'clItems' array to the HTML's actual chatlist
    chatList.appendChild(clItems[i]);

// give every chat the right details
    const photo = clItems[i].getElementsByTagName('img')[0];
    const name = clItems[i].getElementsByTagName('h4')[0];
    const msg = clItems[i].getElementsByTagName('p')[0];
    
    photo.src = "images/" + myLikes[i].photo;
    name.textContent = myLikes[i].firstName + ' ' + myLikes[i].lastName;
    msg.textContent = myLikes[i].msg;

// make every profile picture clickable (it removes the person from the liked list)
    photo.addEventListener('click', disLike)
}