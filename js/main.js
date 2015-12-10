// Create an object containing user's names and score
var playerScores = [];

$("#add").click(function(){
	// add validations, inputScore must be a number, inputName could be anything really
	var inputName = $('#nameInput').val();
	var inputScore = parseInt($('#scoreInput').val());
	var playerPresent = false

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

	// Order objects in playerScores by score value
	playerScores.sort(function(a, b) {return b.score - a.score} );

	setRank(playerScores);

	$("#rankings").empty();
	$("#rankings").append(createListItemHTML(playerScores));	 
});

// remove #rankings and reset playerScores
$("#clear").click(function(){
	$("#rankings").empty();
	playerScores = {};
});

// Make a function to create each li
function createListItemHTML(sortedArray) {
	var output = ""
	var highScore = sortedArray[0].score

	for (var i = 0; i < sortedArray.length; i++){
		var score = sortedArray[i].score;
		var playerName = sortedArray[i].name;
		output += "<li style='width:" + getLiWidth(highScore, score) + "'><div class='playerText'>" + sortedArray[i].rank + ". " + playerName + " " + score + " " + getPointsText(score) + "</div></li>" 
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
	var counter = 1;
  var arrayLength = sortedArray.length;
  var i = 0; 

  if (sortedArray.length > 1) {
	  while (i < arrayLength - 1) {
	    if (sortedArray[i].score > sortedArray[i + 1].score) {
	      sortedArray[i]["rank"] = counter;
	      counter++;
	      i++
	    } else {
	      sortedArray[i]["rank"] = counter;
	      i++
	    }
	  };
	  
	  // Assign a rank to the last item in the array
	  if (sortedArray[arrayLength - 1].score < sortedArray[arrayLength - 2].score) {
	  	sortedArray[arrayLength - 1].rank = counter;
	  } else {
	    sortedArray[arrayLength - 1].rank = counter; 
	  };
	 } else {
	 	sortedArray[0]["rank"] = 1;
	 };

  return sortedArray
};


