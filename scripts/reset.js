// default userdata
class Person{
    constructor(firstName, lastName, age, desc, photo, msg, liked, likedMe, newMatch) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.desc = desc;
        this.photo = photo;
        this.msg = msg;
        this.liked = liked;
        this.likedMe = likedMe; // true, false or null (not liked or disliked yet)
        this.newMatch = newMatch
    }
}

let Olivia = new Person("Olivia", "Delroy", "24", "Hi, my name is Olivia. I'm a 24 year old student from London. Let's talk!", "girl.jpeg", `I love all of the bands in your...`, null, null, true);
let Kayla = new Person("Kayla", "Solomon", "25", "Hi, my name is Kayla. I'm a 25 year old student from London. Let's talk!", "girl1.jpeg", `What's up :-)`, null, true, true);
let Nadia = new Person("Nadia", "Williams", "23", "Hi, my name is Nadia. I'm a 23 year old student from London. Let's talk!", "girl2.jpeg", `lol ikr`, null, null, true);
let Eve = new Person("Eve", "Johnson", "24", "Hi, my name is Eve. I'm a 24 year old student from London. Let's talk!", "girl3.jpeg", `Are you going to DLDK this year?`, null, null, true);
let Abby = new Person("Abby", "Watts", "25", "Hi, my name is Abby. I'm a 25 year old student from London. Let's talk!", "girl4.jpeg", `Yeah, saw them live 3 weeks ago.`, null, true, true);
let defaultData = [Olivia, Kayla, Nadia, Eve, Abby];

// (re)store default userdata in localStorage:
localStorage.setItem("data", JSON.stringify(defaultData));