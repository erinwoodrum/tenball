function displayPlayers(){
	if(!_Users) return; 
	var pageHTML = ''; 
	for(var uid in _Users){
		var player = _Users[uid]; 
		//console.log(player); 
		var image = player.profile_picture && player.profile_picture.length ? player.profile_picture : "/img/defaultProfile.png"; 
		var displayName = player.displayname && player.displayname ? player.displayname : player.email; 
		pageHTML += '<div class="player-container" onclick="router.changePage(\'playerDetail\', \'id=' + uid +'\')">' + 
		'<div class="player-image-container">' + 
			'<img class="player-image" src="' + image + '"/>' + 
		'</div>' + 
		'<div class="player-stats">' + 
			'<div class="displayName">' + displayName + '</div>' + 
			'<div class="stat ranking">Ranking: #</div>' + 
			'<div class="stat tournamentsEntered">Tournaments entered: 0</div>' + 
		'</div>' +
	'</div>'; 
	}
	document.getElementsByClassName('page-contents')[0].innerHTML = pageHTML; 
}
displayPlayers(); 