var cardImagesPink = [
    "../Img/pink/1.jpg", "../Img/pink/2.jpg", "../Img/pink/3.jpg", "../Img/pink/4.jpg",
    "../Img/pink/5.jpg", "../Img/pink/6.jpg", "../Img/pink/7.jpg", "../Img/pink/8.jpg",
    "../Img/pink/9.jpg", "../Img/pink/10.jpg", "../Img/pink/11.jpg", "../Img/pink/12.jpg",
    "../Img/pink/13.jpg", "../Img/pink/14.jpg", "../Img/pink/15.jpg", "../Img/pink/16.jpg",
    "../Img/pink/17.jpg", "../Img/pink/18.jpg", "../Img/pink/19.jpg", "../Img/pink/20.jpg"
];

var cardImagesOrange = [
    "../Img/orange/1.jpg", "../Img/orange/2.jpg", "../Img/orange/3.jpg", "../Img/orange/4.jpg",
    "../Img/orange/5.jpg", "../Img/orange/6.jpg", "../Img/orange/7.jpg", "../Img/orange/8.jpg",
    "../Img/orange/9.jpg", "../Img/orange/10.jpg", "../Img/orange/11.jpg", "../Img/orange/12.jpg",
    "../Img/orange/13.jpg", "../Img/orange/14.jpg", "../Img/orange/15.jpg", "../Img/orange/16.jpg",
    "../Img/orange/17.jpg", "../Img/orange/18.jpg", "../Img/orange/19.jpg", "../Img/orange/20.jpg"
];

var cardImagesPurple = [
    "../Img/purple/1.jpg", "../Img/purple/2.jpg", "../Img/purple/3.jpg", "../Img/purple/4.jpg",
    "../Img/purple/5.jpg", "../Img/purple/6.jpg", "../Img/purple/7.jpg", "../Img/purple/8.jpg",
    "../Img/purple/9.jpg", "../Img/purple/10.jpg", "../Img/purple/11.jpg", "../Img/purple/12.jpg",
    "../Img/purple/13.jpg", "../Img/purple/14.jpg", "../Img/purple/15.jpg", "../Img/purple/16.jpg",
    "../Img/purple/17.jpg", "../Img/purple/18.jpg", "../Img/purple/19.jpg", "../Img/purple/20.jpg"
];

var flippedCards = [];
var matchedPairs = 0;
var isWaiting = false;
var selectedImages = []; 
var successSound = new Audio("../tuns/התאמה נכונה.mp3");
var failureSound = new Audio("../tuns/אין התאמה.mp3");
var turn;

var numPlayers = 4; 


var zeroArray = new Array(numPlayers).fill(0); 
var playersArray = []; 

for (let i = 1; i <= numPlayers; i++) {
    playersArray.push(i); 
}

var currentPlayer;    
var nextPlayerIndex;   
var playerIndex;       

var currentPlayerIndex = 1; 

function ShowDetails() {
    var flowerTheme = sessionStorage.flowerTheme;
    var difficultyLevel = sessionStorage.difficultyLevel;
    var numPlayers = sessionStorage.numPlayers;

    document.querySelector("#themeDetails").textContent = `נושא: ${flowerTheme}, רמת משחק: ${difficultyLevel}, מספר שחקנים: ${numPlayers}`;

    if (numPlayers) {
        currentPlayerIndex = Math.floor(Math.random() * numPlayers) + 1;
        updatePlayerIndex(currentPlayerIndex);
        showPlayerDetails(currentPlayerIndex);
        nextPlayerIndex = currentPlayerIndex;

        window.showNextPlayer = function () {
            nextPlayerIndex = nextPlayerIndex % numPlayers + 1;
            currentPlayerIndex = nextPlayerIndex; 
            updatePlayerIndex(nextPlayerIndex);
            showPlayerDetails(nextPlayerIndex);
        };

        displayCards(difficultyLevel, flowerTheme);
    }
}

function updatePlayerIndex(index) {
    playerIndex = index; 
}
function showPlayerDetails(playerIndex) {
    var firstName = sessionStorage.getItem("שם פרטי" + playerIndex);
    var color = sessionStorage.getItem("צבע" + playerIndex);

    var playerDiv = document.createElement("div");
    playerDiv.innerHTML = `
        <h3>שחקן ${playerIndex}</h3>
        <span>שם: ${firstName}</span><br />
        <div style="width: 50px; height: 50px; background-color: ${color};"></div><br />
    `;
    document.querySelector("#playersDetails").innerHTML = '';
    document.querySelector("#playersDetails").appendChild(playerDiv);
}

function displayCards(difficultyLevel, flowerTheme) {
    var cardsContainer = document.querySelector("#cardsContainer");
    cardsContainer.innerHTML = "";
    var numPairs = 0;
    var numRows = 0;
    var numCols = 0;

    if (difficultyLevel === "קל") {
        numPairs = 6;
        numRows = 3;
        numCols = 4;
    } else if (difficultyLevel === "בינוני") {
        numPairs = 8;
        numRows = 4;
        numCols = 4;
    } else if (difficultyLevel === "קשה") {
        numPairs = 10;
        numRows = 4;
        numCols = 5;
    }

    selectedImages = [];
    var randomIndexes = [];
    var selectedCardImages;

    if (flowerTheme === "פרחים כתומים") {
        selectedCardImages = cardImagesOrange;
    } else if (flowerTheme === "פרחים ורודים") {
        selectedCardImages = cardImagesPink;
    } else if (flowerTheme === "פרחים סגולים") {
        selectedCardImages = cardImagesPurple;
    }

    while (randomIndexes.length < numPairs) {
        var randomIndex = Math.floor(Math.random() * selectedCardImages.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
            selectedImages.push(selectedCardImages[randomIndex], selectedCardImages[randomIndex]);
        }
    }

    selectedImages.sort(() => 0.5 - Math.random());

    var hiddenImage = (flowerTheme === "פרחים כתומים") ? "../Img/orange/כתום.jpg" :
        (flowerTheme === "פרחים ורודים") ? "../Img/pink/ורוד.jpg" :
            "../Img/purple/סגול.jpg";

    selectedImages.forEach((image, index) => {
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.dataset.index = index;
        cardDiv.dataset.image = image;
        cardDiv.style.backgroundImage = `url('${hiddenImage}')`;
        cardDiv.addEventListener("click", flipCard);

        cardsContainer.style.display = "grid";
        cardsContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        cardsContainer.style.gridGap = "10px";

        cardsContainer.appendChild(cardDiv);
    });
}

var cardClickSound = new Audio("../tuns/הפיכת קלף.mp3"); 

function flipCard() {
    cardClickSound.play(); 
    if (isWaiting || flippedCards.includes(this)) return; 


    this.style.backgroundImage = `url('${this.dataset.image}')`; 
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        isWaiting = true; 
        setTimeout(checkMatch, 1000); 
    }
}
var isFirstTurn = true; 

// פונקציה לעדכון הניקוד של שחקן
function updateScore(playerIndex) {
    zeroArray[playerIndex]++;
}

function checkMatch() {
    var [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.image === secondCard.dataset.image) {

        isWaiting = false;
        successSound.play();
        displayMessage("כל הכבוד! יש לך תור נוסף.", true);
        matchedPairs++;
        flippedCards = [];
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        updateScore(currentPlayerIndex - 1); 


        if (matchedPairs === selectedImages.length / 2) {
            GOEND();
        }

  
    } else {
        failureSound.play();
        displayMessage("אוי חבל! נסה בתור הבא.", false);

        setTimeout(() => {
            var hiddenImage = (selectedImages[0].includes('orange')) ? "../Img/orange/כתום.jpg" :
                (selectedImages[0].includes('pink')) ? "../Img/pink/ורוד.jpg" :
                    "../Img/purple/סגול.jpg";
            firstCard.style.backgroundImage = `url('${hiddenImage}')`;
            secondCard.style.backgroundImage = `url('${hiddenImage}')`;
            flippedCards = [];
            isWaiting = false;

            showNextPlayer();
        }, 1000);
    }
}



function displayMessage(message, isSuccess) {
    var messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.position = "fixed";
    messageDiv.style.top = "20px";
    messageDiv.style.left = "50%";
    messageDiv.style.transform = "translateX(-50%)";
    messageDiv.style.padding = "10px";
    messageDiv.style.backgroundColor = isSuccess ? "green" : "red";
    messageDiv.style.color = "white";
    messageDiv.style.borderRadius = "5px";
    messageDiv.style.zIndex = "1000";

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 2000); 
}



window.onload = ShowDetails;


function GOEND() {
    var maxScore = 0;
    var maxPlayers = []; 

    for (var i = 0; i < numPlayers; i++) {
        if (zeroArray[i] > maxScore) {
            maxScore = zeroArray[i];
            maxPlayers = [sessionStorage.getItem("שם פרטי" + (i + 1))]; 
        } else if (zeroArray[i] === maxScore) {
            maxPlayers.push(sessionStorage.getItem("שם פרטי" + (i + 1))); 
        }
    }

    if (maxPlayers.length === 0) {
        return; 
    }

    sessionStorage.setItem("שמות המנצחים", JSON.stringify(maxPlayers)); 
    sessionStorage.setItem("maxScore", maxScore);


    window.location.href = "endGame.html";
}
