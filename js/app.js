function getSeatGeekEvents(searchInputString){
	var params = {
		"client_id": "MzgwNjI4OXwxNDU5ODk5NDc2",
		"client_secret": "bqtwc5Rd9_SmnOMfaRjyDz76x5DBa6L5jyyCI3l0",
		"q" : searchInputString
	};
	var url = "https://api.seatgeek.com/2/performers";

	$.getJSON(url,params,getPerformersEvents);

	var params = {
		"client_id": "MzgwNjI4OXwxNDU5ODk5NDc2",
		"client_secret": "bqtwc5Rd9_SmnOMfaRjyDz76x5DBa6L5jyyCI3l0",
		"q" : searchInputString
	};
	var url = "https://api.seatgeek.com/2/venues";

	$.getJSON(url,params,getVenueEvents);

}

function getPerformersEvents(data){
	for(var i =0; i<data.performers.length; i++)
	{
		var params = {
			"client_id": "MzgwNjI4OXwxNDU5ODk5NDc2",
			"client_secret": "bqtwc5Rd9_SmnOMfaRjyDz76x5DBa6L5jyyCI3l0",
			"performers.slug" : data.performers[i].slug
		};

		var url = "https://api.seatgeek.com/2/events";

		$.getJSON(url,params,showEvents);
	}
}

function getVenueEvents(data){
	// console.log(data);
	for(var i = 0; i < data.venues.length; i++){
		var params = {
			"client_id": "MzgwNjI4OXwxNDU5ODk5NDc2",
			"client_secret": "bqtwc5Rd9_SmnOMfaRjyDz76x5DBa6L5jyyCI3l0",
			"venue.id" : data.venues[i].id
		};
		var url = "https://api.seatgeek.com/2/events";

		$.getJSON(url, params, showEvents);
	}
}
function showEvents(data){
	for(var i = 0; i < data.events.length; i++){
		// console.log(data.events[i]);
		var d = new Date(data.events[i].datetime_local);
		var locale = "en-us";
    	var month = d.toLocaleString(locale, { month: "long" });
    	var hours = d.getHours();
    	var minutes = d.getMinutes();
    	var ampm = "am";
    	if (hours > 12){
    		hours -= 12;
    		var ampm = "pm";
    	}
    	if(minutes < 10){
    		minutes = "0" + minutes;
    	}
		$(".results-wrapper").append('<div class="results-listing"><div class="results-date-time"><p class="top-p">' + month + " " + d.getDate() +'</p><p>' + hours + ":" + minutes + ampm + '</p></div><div class="results-event-location"><p class="top-p">' + data.events[i].title + '</p><p>' + data.events[i].venue.name + '</p></div></div>');


		// date template";
		// var d = new Date();
		// var	locale = "en-us";
		// var month = d.toLocaleString(locale, { month: "long" });
		// var date = d.toLocaleString(locale, {date: "long"});

		//date += month + " " + date;
	}
}
function showResultsPage(){
	$(".header-open").slideUp("fast");
	$(".form-open").slideUp();
	$(".results-page").show();
}

// click listeners
$(".splash-page").on("click", ".submit-button", function(){
	if($('.form-open .search-bar').val() == ""){
		alert("Please enter a search term!");
	}
	else{
		showResultsPage();
		getSeatGeekEvents($('.form-open .search-bar').val());
	}
});
$(".form-open .search-bar").keyup(function(event){
	if(event.keyCode == 13) {
		if($('.form-open .search-bar').val() == ""){
			alert("Please enter a search term!");
		}
		else{
			showResultsPage();
			getSeatGeekEvents($('.form-open .search-bar').val());
		}
	}
});

$(".results-page").on("click", ".submit-button", function(){
	if($('.form-search .search-bar').val() == ""){
		alert("Please enter a search term!");
	}
	else{
		$(".results-wrapper").empty();
		getSeatGeekEvents($('.form-search .search-bar').val());
		$('.form-search .search-bar').val("");
	}
	
});
$(".form-search .search-bar").keyup(function(event){
	if(event.keyCode == 13) {
		if($('.form-search .search-bar').val() == ""){
			alert("Please enter a search term!");
		}
		else{
			$(".results-wrapper").empty();
			getSeatGeekEvents($('.form-search .search-bar').val());
			$('.form-search .search-bar').val("");
		}
	}
});

