var tourney, tourneyKey;  
function fillOutTourney(){
	//but also the user's ticket info. 
	//get the search value so we know which tourney their trying to enter. 
	var hash = document.location.hash; 
	var questMarkIndex = hash.indexOf('?'); 
	tourneyKey = hash.substr(questMarkIndex +1); 
	tourney = _Tournaments[tourneyKey]; 
	fillData('tableSize', tourney.tableSize); 
	var pot = tourney.pot || 10; 
	pot = '$' + pot; 
	fillData('prizePot', pot); 
	fillData('currentTickets', _User.data.tickets || 0); 
}
function fillData(id, data){
	document.getElementById(id).innerHTML = data;  
}
function createEntry(){
	var entryKey = firebase.database().ref().child('entries').push().key;
	var entryData = {
		tourneyKey : tourneyKey, 
		tableSize: tourney.tableSize, 
		user: _User.data.uid
	}; 
	database.ref('entries/' + entryKey).set(entryData).then(function(){
		_User.removeTicket(); 
		fillData(currentTickets, _User.data.tickets); 
		document.getElementById('createEntryBtn').addClass('disabled'); 
	}); 
}