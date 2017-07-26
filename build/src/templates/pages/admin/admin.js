function displayPlayers(){
	//This waits until after we've loaded all users from the db. 
	var ticketUserSelect = document.getElementById("ticket-user");
	for(key in _Users){
		var user = _Users[key]; 
		var option = document.createElement("option");
    	option.text = user.displayname ? user.displayname + ' ' + user.email : user.email;
    	option.value = key; 
    	ticketUserSelect.add(option);
	}   
}
function giveATicket(){
	var userid = document.getElementById('ticket-user').value; 
	if(!userid){
		alert('no user id.  Can not provide ticket.'); 
		return;
	}
	if(!_Users[userid]){
		alert('this user doesnt exist.'); 
		return; 
	}
	_User.addTicket(userid); 
}
function newTourney(){
	var tourneyKey = firebase.database().ref().child('tournaments').push().key;
	var tableSize = getData('tourneyTableSize'); 
	var openDate = getRadioAnswer('openImmediately') == 'yes' ? new Date().getTime() : new Date(getData('openingDate')).getTime(); 
	if(!openDate || openDate < 1){
		alert('Open date failed.  try again.  Is there an answer for open date? '); 
		return; 
	}
	var closeDate = new Date(getData('closingDate')).getTime(); 
	if(!closeDate || closeDate < 1){
		alert('Closing Date failed.  Did you put anything in?'); 
	}
	database.ref('tournaments/' + tourneyKey).set({
		tableSize: tableSize, 
		openDate : openDate, 
		closeDate : closeDate
	}).then(function(success){
		alert('success!');
		console.log(success); 
		fillOutTourneys(); 
	}, function(fail){
		console.log(fail); 
		alert('firebase database failure.'); 
	}); 
	
}
function getData(id){
	return document.getElementById(id).value; 
}
function getRadioAnswer(name){
	var options = document.getElementsByName(name); 
	for(k in options){
		if(options[k].checked){
			return options[k].value; 
		}
	}
}
function formatDate(ms){
	var date = new Date(ms); 
	var m = date.getMonth(); 
	var d = date.getDate(); 
	var y = date.getFullYear(); 
	return m + '/' + d + '/' + y; 
}
function fillOutTourneys(){
	var allTourneys = document.getElementById('allTourneys'); 
	allTourneys.innerHTML = '...get new table.'; 
	var html = '<table class="tournamentTable"><tr><th>ID</th><th>start date</th><th>Close Date</th><th>Entries</th></tr>'; 
	
   for(key in _Tournaments){
   		var t = _Tournaments[key]; 
   		var entries = t.entries || 0;  
   		html += '<tr><td>' + key + '</td><td>' + formatDate(t.openDate) + '</td><td>' + formatDate(t.closeDate) + 
   			'</td><td>' + entries + '</td></tr>'; 
   	console.log(_Tournaments[key]); 
   }
   html += '</table>'; 
   allTourneys.innerHTML = html; 
     
}

