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
            // Play sound
            var sound;
            let soundFile = Math.floor((Math.random() * 5) + 1);
            sound = new Audio("sound/explosion" + soundFile + ".wav");
            sound.play();
        
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
        let health = document.getElementById("axisHealth");
        health.value--;
    }else if (allies.includes(flag)) {
        let health = document.getElementById("allyHealth");
        health.value--;
    }else if(flag == "russia") {
        let decideSide = Math.floor((Math.random() * 2) + 1);
        if (decideSide == 1) {
            let health = document.getElementById("axisHealth");
            health.value--;
        }else {
            let health = document.getElementById("allyHealth");
            health.value--;
        }
    }
}

canvas.addEventListener("mousedown", function() {
    if (!gameEnd) {
        var scream = new Audio("sound/scream.m4a");
        scream.play();
        let health = document.getElementById("civilianHealth");
	    health.value--;
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

function endGameMessage(deathMessage) {
    var rect = canvas.getBoundingClientRect();
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    var tag = document.createElement('img');
    tag.src = 'img/' + deathMessage + '.png';
    tag.style.position = 'absolute';
    tag.style.height = (50 * img.height / img.width) + '%';
    tag.style.width = '50%';
    tag.id = "tempFlag";
    tag.style.top = rect.top + 100 + 'px';
    tag.style.left = rect.left + 200 + 'px';
    document.body.appendChild(tag);
}

function restartGame() {
    location.reload();
}

// Check if game ends
setInterval(function() {
    let axisHealth = document.getElementById("axisHealth").value;
    let allyHealth = document.getElementById("allyHealth").value;
    let civilianHealth = document.getElementById("civilianHealth").value;
    if (axisHealth <= 0) {
        endGame();
        endGameMessage("youwin");
    }else if (allyHealth <= 0) {
        endGame();
        endGameMessage("axiswin");
    }else if (civilianHealth <= 0) {
        endGame();
        endGameMessage("civiliansdead");
    }
}, 100);