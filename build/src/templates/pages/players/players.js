function displayPlayers(){
	console.log(_Users); 
	var pageHTML = ''; 
	for(var uid in _Users){
		var player = _Users[uid]; 
		console.log(player); 
		var image = player.profile_picture && player.profile_picture.length ? player.profile_picture : "/img/defaultProfile.png"; 
		var displayName = player.displayname && player.displayname ? player.displayname : player.email; 
		pageHTML += '<div class="player-container">' + 
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
/*
<div class="player-container">
		<div class="player-image-container">
			<img class="player-image" src="https://scontent.xx.fbcdn.net/v/t1.0-1/s100x100/11008495_1419380975041582_7169379772225451735_n.jpg?oh=7d7046821000ec7d9cc04d1b1caa5653&oe=59B328D2"/>
		</div>
		<div class="player-stats">
			<div class="displayName">Erin Cook</div>
			<div class="stat ranking">Ranking: #1</div>
			<div class="stat tournamentsEntered">Tournaments Entered: 0</div>
		</div>
	</div> */