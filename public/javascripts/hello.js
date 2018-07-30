if (window.console) {
    console.log("Welcome to your Play application's JavaScript!");
}

var introArray = ["Welcome To Statistical Bureau, as your guide, I am going to present the crimes conducted in the City of Chicago from 2012 to 2017.",
    "1/6. Total of 1456714 crimes had been conducted from the last 5 years.",
    "2/6 Among all of 30 types of crimes, Thefts are the most common type of crime, it has been conducted 329460 and contributes 22% of all crimes followed by Battery and Public Damage.",
    "3/6 Human trafficking crimes are the least common, it has been conducted 28 times from the last 5 years, followed by narcotic violation and public indecency.",
    "4/6 Number of crimes conducted in downtown and commercial areas has 231% more than the number in residence and urban areas.",
    "5/6 Overall number of crimes has been decreased with around 8% per year",
    "6/6 Criminals conducted more crimes at summer and conduct less crimes in winter.",
    "Next, please feel free to explore more from my sites! :)"
];
var introCounter = 1;

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("introBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var nextBtn = document.getElementById("nextBtn");

var aboutBtn = document.getElementById("aboutBtn");

// When the user clicks the button, open the modal
btn.onclick = function () {
    document.getElementById("title").innerHTML = "Introduction";
    document.getElementById("intro-text").innerText = introArray[0];
    document.getElementById("intro-text").style.fontSize="32px";
    modal.style.display = "block";
    nextBtn.style.visibility = "visible";
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

aboutBtn.onclick = function () {

    document.getElementById("title").innerHTML = "About the Visualization";
    document.getElementById("intro-text").style.fontSize="14px";
    document.getElementById("intro-text").innerHTML = "This visualization demonstrates crimes conducted in the City of Chicago from 2012 to 2017.\n" +
        "Theme and color has been chosen similar to newspaper style.\n" +
        "\n" +
        "Does the narrative visualization correctly follow the hybrid structure as stated by the essay?\n" +
        "I use Martini Glass Structure for my narrative visualization by showing an overview of the data and outline some highlights from data. Then a summary is given to readers and summarized some general trend and pattern based on my observation and calculation. Once introduction ends, users are able to explore the site and find more from the data.\n" +
        "\n" +
        "Does the narrative visualization effectively utilize scenes?\n" +
        "Introduction and summary can be treated as scenes and pop up windows are used to present transition of scenes.\n" +
        "\n" +
        "Does the narrative visualization effectively utilize annotations?\n" +
        "Annotation has been used to add more clarification for what the data represent. From criminal trends chart, historical max and min has been highlighted for readers and legends from the pie charts and title help explains the data.\n" +
        "\n" +
        "Does the narrative visualization effectively utilize parameters?\n" +
        "Parameters are used in trend charts to annate number of crimes conducted monthly and user can use mouse hover over trend chart to check data in specific month.\n" +
        "\n" +
        "Does the narrative visualization effectively utilize triggers?\n" +
        "Triggers is the button used to iterate through introduction slides. And hovering on trend chart showing details of data can be also treated as trigger. \n";
    modal.style.display = "block";
    nextBtn.style.visibility = "hidden";
};

nextBtn.onclick = function () {
    if (introCounter < 0) introCounter = 0;
    if (introCounter > 7) introCounter = 0;

    if (introCounter >= 0 && introCounter <=6) nextBtn.innerHTML = "Next";
    else nextBtn.innerHTML = "Replay";

    document.getElementById("intro-text").innerHTML = introArray[introCounter];
    introCounter++;
};


modal.style.display = "block";

