var playerScores = [];
var inputName = "";
var inputScore = 0;

$("#add").click(function(){
	var newRanking = $('#rankInput').val();

	if ( newRanking.search(/., \d/) != -1 ) {
		indexOfComma = newRanking.indexOf(",");
		inputName = newRanking.slice(0, indexOfComma);
		inputScore = newRanking.slice(indexOfComma + 2, newRanking.length);
	} else {
		alert("Please enter your score in the format: 'Name, score'");
	};

	if (validate() == true) {
		var data = createListItemHTML(addNewScore(inputName, inputScore));
		$("#rankings").empty();
		$("#rankings").append(data);
		$("#clear").css("display", "inline")
	}
	emptyInputField();
});

// remove #rankings and reset playerScores
$("#clear").click(function(){
	emptyInputField();
	$("#clear").css("display", "none")
	$("#rankings").empty();
	playerScores = [];
});

function emptyInputField() {
	$('#rankInput').val("");
};

// Create each li
function createListItemHTML(sortedArray) {
	var output = ""
	var highScore = sortedArray[0].score

	for (var i = 0; i < sortedArray.length; i++){
		var score = sortedArray[i].score;
		var playerName = sortedArray[i].name;
		output += "<li style='width: " + getLiWidth(highScore, score) + "'><div class='playerText'>" + sortedArray[i].rank + ". " + playerName + ", " + score + " " + getPointsText(score) + "</div></li>"
	}
	return output
};

function getLiWidth(highestScore, playerScore) {
    return (playerScore / highestScore) * 100 + "%"
};

function getPointsText(score) {
	if (score == 1) {
		return "Point"
	} else {
		return "Points"
	};
};

function setRank(sortedArray) {
  var score = 0;
  var i = 0;
  var prevPosition = 1

	while (i < sortedArray.length) {
      if (sortedArray[i].score == score) {
          sortedArray[i].rank = prevPosition;
      } else {
          sortedArray[i].rank = i + 1;
          score = sortedArray[i].score;
          prevPosition = i + 1;
      }
			i++;
	};
  return sortedArray;
};

function addNewScore(inputName, inputScore) {
var playerPresent = false;

	for (var i = 0; i < playerScores.length; i++) {
		if (playerScores[i].name == inputName) {
			playerScores[i].score += inputScore;
			playerPresent = true;
    	break;
		} else {
			playerPresent = false;
		}
	};

	if (playerPresent == false) {
		playerScores.push({ name: inputName, score: inputScore })
	};

	playerScores.sort(function(a, b) {return b.score - a.score} );

	return setRank(playerScores);
};


function validate() {

	function nameValidation() {
		if (inputName == " ") {
				alert("Please enter in a player name. It can be anything except for a blank space.");
				return false;
			} else {
				return true;
			}
		};

	function scoreValidation() {
		if (parseInt(inputScore) == inputScore) {
			inputScore = parseInt(inputScore); // This solves for "10.0" == 10 edge case
			return true
		} else {
			alert("Score must be a whole number");
			return false;
		}
	};

	if (scoreValidation() == true && nameValidation() == true) {
		return true
	} else {
		return false
	}
};
