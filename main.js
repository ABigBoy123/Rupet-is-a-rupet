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
var gameEnd = false;

document.addEventListener('mousedown', function(e) {
    if (!gameEnd) {
        var rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        canvasWidth = canvas.offsetWidth;
        canvasHeight = canvas.offsetHeight;

        
        
        // Create an explosion
        if(x < 0 || y < 0 || x > canvasWidth || y > canvasHeight){

        } else {
            e = e || window.event;
            var tag = document.createElement('img');
            console.log(e);
            tag.src = img.src;
            tag.style.position = 'absolute';
            tag.style.height = '50px';
            tag.style.width = '50px';
            tag.style.pointerEvents = "none";
            tag.id = "temp";
            tag.style.top = (e.pageY || e.clientY) - 30 + 'px';
            tag.style.left = (e.pageX || e.clientX) - 25 + 'px';
            this.body.appendChild(tag);
        
        }
        var element = document.getElementById("temp");
        if (element != 'undefined' && element != null) {
            setTimeout(function() {
                document.getElementById("temp").remove();
            }, 500);
        }
    }
}, false)

// Points
let allies = ["america", "britain", "france"];
let axis = ["germany", "italy", "japan"];

function updatePoints(flag){
    let sliceStart = flag.indexOf("img/") + 4;
    flag = flag.slice(sliceStart, -4);
    console.log(flag);
    if (axis.includes(flag)) {
        let health = parseInt(document.getElementById("axisHealth").innerHTML);
        health--;
        document.getElementById("axisHealth").innerHTML = health;
    }else if (allies.includes(flag)) {
        let health = parseInt(document.getElementById("allyHealth").innerHTML);
        health--;
        document.getElementById("allyHealth").innerHTML = health;
    }
}

canvas.addEventListener("mousedown", function() {
    if (!gameEnd) {
        let health = parseInt(document.getElementById("civilianHealth").innerHTML);
	    health--;
        document.getElementById("civilianHealth").innerHTML = health;
    }
})

// Make flags appear
var countries = ["america", "britain", "france", "germany", "italy", "japan", "russia"]

function createFlag() {
    var rect = canvas.getBoundingClientRect();
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    var tag = document.createElement('img');
    tag.src = 'img/' + countries[Math.floor(Math.random() * countries.length)] + '.png';
    tag.style.position = 'absolute';
    tag.style.height = (60 * img.height / img.width) + 'px';
    tag.style.width = '60px';
    tag.id = "tempFlag";
    tag.style.top = rect.top + Math.floor(Math.random() * (canvasHeight - 80)) + 'px';
    tag.style.left = rect.left + Math.floor(Math.random() * (canvasWidth - 80)) + 'px';
    document.body.appendChild(tag);
    
	//Check if the flag is clicked
	tag.addEventListener("mousedown", function() {
		updatePoints(tag.src);	
	})
	
    setTimeout(function() {
        document.getElementById("tempFlag").remove()
    }, (1000 + Math.floor(Math.random() * 500)));
}

const interval = setInterval(function() {
    if (!gameEnd) {
        createFlag();
    }
}, (1500 + Math.floor(Math.random() * 1000)));

function endGame() {
    canvas.style.opacity = 0.25;
    gameEnd = true
}

// Check if game ends
setInterval(function() {
    let axisHealth = parseInt(document.getElementById("axisHealth").innerHTML);
    let allyHealth = parseInt(document.getElementById("allyHealth").innerHTML);
    let civilianHealth = parseInt(document.getElementById("civilianHealth").innerHTML);
    if (axisHealth <= 0) {
        endGame();
    }else if (allyHealth <= 0) {
        endGame();
    }else if (civilianHealth <= 0) {
        endGame();
    }
}, 100);