function displayResults() {
    var winnerNames = JSON.parse(sessionStorage.getItem("שמות המנצחים")); 
    var maxScore = sessionStorage.getItem("maxScore"); 
    var resultsDiv = document.getElementById("results");

    

    if (winnerNames && winnerNames.length > 0 && maxScore !== null) {
        resultsDiv.innerHTML = `שמות המנצחים: ${winnerNames.join(', ')} <br>הניקוד הגבוה ביותר: ${maxScore}`;
    } else {
        resultsDiv.innerHTML = "אין תוצאות זמינות.";
    }
}

function goBack() {
    window.location.href = "Detalis.html"; 
}
