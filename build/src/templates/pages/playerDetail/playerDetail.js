var hash = window.location.hash; 
var locOfQuest = hash ? hash.indexOf('=') : -1; 
var userId = hash && locOfQuest !== -1 ? hash.substr(locOfQuest +1) : -1; 
if(_Users && _Users[userId]){
	displayPlayer(); 
}
var displayPlayer = function() {
	var thisPlayer = _Users[userId]; 
	document.getElementById('displayName').innerHTML = thisPlayer.displayname || thisPlayer.email; 
	console.log(thisPlayer); 
	var playerImage = thisPlayer.profile_picture || "/img/defaultProfile.png";
	document.getElementById('playerImage').innerHTML = '<img src="' + playerImage + '" />'; 
}