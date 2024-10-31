var playerNames = [];
var playerColors = [];

function GoNext() {
    var flowerTheme = document.querySelector("#flowerTheme").value;
    var difficultyLevel = document.querySelector("#difficultyLevel").value;
    var numPlayers = document.querySelector("#numPlayers").value;
    var error = document.querySelector("#error");
    error.textContent = "";

    if (!numPlayers) {
        error.textContent = "נא לבחור לפחות שחקן אחד.";
        return;
    }

    playerNames = [];
    playerColors = [];

    for (var i = 1; i <= numPlayers; i++) {
        var firstName = document.querySelector("#TxtFirst" + i).value;
        var color = document.querySelector("#myColor" + i).value;

        if (!firstName || !color) {
            error.textContent = "נא למלא את כל השדות עבור כל השחקנים.";
            return;
        }

        playerNames.push(firstName);
        playerColors.push(color);
    }

    sessionStorage.flowerTheme = flowerTheme;
    sessionStorage.difficultyLevel = difficultyLevel;
    sessionStorage.numPlayers = numPlayers;

    for (var i = 0; i < playerNames.length; i++) {
        sessionStorage.setItem("שם פרטי" + (i + 1), playerNames[i]);
        sessionStorage.setItem("צבע" + (i + 1), playerColors[i])
    }

    window.location = "game.html";
}


function showPlayerInputs() {
    var numPlayers = document.querySelector("#numPlayers").value;
    var container = document.querySelector("#playersContainer");
    container.innerHTML = "";

    for (var i = 1; i <= numPlayers; i++) {
        var playerDiv = document.createElement("div");
        playerDiv.innerHTML = `
            <h3>שחקן ${i}</h3>
            שם פרטי: <input id="TxtFirst${i}" type="text" required /><br /><br />
            צבע: <input id="myColor${i}" type="color" required /><br /><br />
        `;
        container.appendChild(playerDiv);
    }
}

document.getElementById("numPlayers").addEventListener("input", function () {
    var numPlayers = this.value;
    if (numPlayers > 4) {
        this.value = 4;
    }
    showPlayerInputs();
});