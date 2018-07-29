if (window.console) {
    console.log("Welcome to your Play application's JavaScript!");
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("introBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var nextBtn = document.getElementById("nextBtn")

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

nextBtn.onclick = function () {
    if (introCounter < 0) introCounter = 0;
    if (introCounter > 4) introCounter = 4;

    document.getElementById("intro-text").innerHTML = introArray[introCounter];
    introCounter++;
};

var introArray = ["p1","p2","p3","p4","p5"];
var introCounter = 1;


