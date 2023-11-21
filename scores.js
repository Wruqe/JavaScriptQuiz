const leaderboard = document.querySelector("#leaderboard")
var localScoresJson = localStorage.getItem("localScores");
var localScores = JSON.parse(localScoresJson)
for (var i = 0; i < localScores.length; i++) {
    var submittedScore = document.createElement("li");
    
    // Adds text content to created tag
    submittedScore.textContent = localScores[i]
    
    // Appends tag as child of document body
    leaderboard.appendChild(submittedScore);
}
