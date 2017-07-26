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
	//new folder called entries
	//create new key for this entry. 
	//THEN! Allow the user to start adding to the entry. 
	var entryKey = firebase.database().ref().child('entries').push().key;
	//get the user ID. 
	// and add the tourney
	//Remove One ticket from user if successful. 
	
}