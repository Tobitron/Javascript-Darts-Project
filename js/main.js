$("#add").click(function(){
	var newRanking = $('#rankInput').val();
	$("#rankings").append("<li>" + newRanking + "</li>")
});

$("#clear").click(function(){
	$("#rankings").empty();
})