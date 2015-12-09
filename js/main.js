// Create an object containing user's names and score
var playerScores = { "Tobias": 5, "Rob": 10, "Jon": 20, "Sansa": 35};

$("#add").click(function(){
	var newRanking = $('#rankInput').val();

	// parse the input and check if the user's name is already present.
	// Using a regexp is silly I should just make two separate text fields!
	if ( newRanking.search(/., \d/) != -1 ) {

		// assign everything before the , to name and everything after the comma to score
		// Once again, two text fields will simplify this
		indexOfComma = newRanking.indexOf(",");
		var inputName = newRanking.slice(0, indexOfComma);
		var inputScore = parseInt(newRanking.slice(indexOfComma + 2, newRanking.length));
		var playerPresent = false

		// check if the player is already in the collection
		for (player in playerScores ) {
				if (player == inputName) {
		    	playerScores[player] += inputScore;
		    	playerPresent = true;
		    	break;
				} else {
					playerPresent = false;
				}
			};
			
		if (playerPresent == false) {
			playerScores[inputName] = inputScore;
		};


		// Order objects in playerScores by score value
		// I'm creating an array here, maybe I should just use an array to begin with?
		var sortable = [];
			for (player in playerScores){
				sortable.push([player, playerScores[player]])
				sortable.sort(function(a, b) {return b[1] - a[1]});
		}


		$("#rankings").empty();
		$("#rankings").append(createListItemHTML(sortable));
	
	} else {
		alert("Please input your score in the format: 'Name, score'" )
	};
});

// This needs to actually remove the data from playerScores 
$("#clear").click(function(){
	$("#rankings").empty();
})

// Make a function to create each li
// Can I refactor this to avoid creating var output?
function createListItemHTML(sortedArray) {
	var output = ""
	for (var i = 0; i < sortedArray.length; i++){
		output += "<li>" + sortedArray[i][0] + " " + sortedArray[i][1] + "</li>" 
	}
	return output
};


