// Register Code
let registerSubmit = () => {
    const fname = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (fname.length == 0 || email.length == 0 || password.length == 0) {
        alert("Please fill in all fields");
    }else if (email.includes("@") == false) {
        alert("Please enter a valid email");
    }    
    else {
        alert("This is what would be saved in a text file if we could use node.js:\n" + email + ", " + fname + ", " + password);
    }
}

// Game code
let canvas = document.getElementById("canvas");

// Drop bombs
var img = new Image;
img.src = 'img/explosion.png';

document.addEventListener('mousedown', function(e) {
    var rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;

    if(x < 0 || y < 0 || x > canvasWidth || y > canvasHeight){

    } else {
        e = e || window.event;
        var tag = document.createElement('img');
        console.log(e);
        tag.src = img.src;
        tag.style.position = 'absolute';
        tag.style.height = '50px';
        tag.style.width = '50px';
        tag.id = "temp"
        tag.style.top = (e.pageY || e.clientY) - 30 + 'px';
        tag.style.left = (e.pageX || e.clientX) - 25 + 'px';
        this.body.appendChild(tag);
       
    }
    setTimeout(function() {
        document.getElementById("temp").remove()
    }, 500);
}, false)

// Make flags appear
var countries = ["america", "britain", "france", "germany", "italy", "japan", "russia"]
// var intervalID = window.setInterval(createFlag, 500);

/*function createFlag() {
    var country = countries[Math.floor(Math.random() * countries.length)]
    var img = new Image;
    img.src = 'img/' + country + '.png';
    img.id = "tempFlag"
    let ctx = canvas.getContext("2d");
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    let x = Math.floor(Math.random() * canvasWidth);
    let y = Math.floor(Math.random() * canvasHeight);
    ctx.drawImage(img, x, y, 15, 15 * img.height / img.width)
    console.log(x)
    console.log(y)
    
}*/

function updatePoints() {
    console.log("You hit a flag")
}


function createFlag() {
    var rect = canvas.getBoundingClientRect();
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    let x = Math.floor(Math.random() * canvasWidth);
    let y = Math.floor(Math.random() * canvasHeight);
    

    if(x < 0 || y < 0 || x > canvasWidth || y > canvasHeight){

    } else {
        var tag = document.createElement('img');
        tag.src = 'img/' + countries[Math.floor(Math.random() * countries.length)] + '.png';
        tag.style.position = 'absolute';
        tag.style.height = (60 * img.height / img.width) + 'px';
        tag.style.width = '60px';
        tag.id = "temp"
        tag.onclick = "updatePoints()";
        tag.style.top = rect.top + Math.floor(Math.random() * (canvasHeight - 80)) + 'px';
        tag.style.left = rect.left + Math.floor(Math.random() * (canvasWidth - 80)) + 'px';
        document.body.appendChild(tag);
       
    }
    setTimeout(function() {
        document.getElementById("temp").remove()
    }, (1000 + Math.floor(Math.random() * 1000)));
}

const interval = setInterval(function() {
    createFlag();
}, (500 + Math.floor(Math.random() * 1000)));