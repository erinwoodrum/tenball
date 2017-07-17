//Onload check the url in order to change the page. 
var pages = ['home', 'tournaments', 'players', 'rules', 'handicap', 'payout']; 
var currHash = document.location.hash.replace("#", ""); 
if(currHash && currHash.length > 0 && pages.indexOf(currHash) > -1){
	router.changePage(currHash); 
} else {
	document.getElementById('nav-home').classList.add('active'); //home by default. 
}

var loginContainer = document.getElementsByClassName('login-container')[0]; 
var loggedInContainer = document.getElementsByClassName('logged-in-container')[0]; 
var loggedInContainer2 = document.getElementsByClassName('logged-in-container')[1]; 
var enterTournament = document.getElementsByClassName('enter-tournament-container')[0]; 
var changeLoginStatus = function(){ //User IS logged in. 
  	if(_User && _User.data && _User.data.email){
  		var userName = _User.data.displayname && _User.data.displayname.length > 1 ? _User.data.displayname : _User.data.email; 
		document.getElementById('displayname-header').innerHTML = userName;
		if (_User.data.tickets && _User.data.tickets > 0){ 
			loginContainer.style.display = 'none'; 
			enterTournament.style.display = 'inline-block'; 
			loggedInContainer.style.display = 'inline-block'; 
			loggedInContainer2.style.display = 'none'; 
		} else {
			loginContainer.style.display = 'none'; 
			enterTournament.style.display = 'none'; 
			loggedInContainer.style.display = 'inline-block'; 
			loggedInContainer2.style.display = 'inline-block'; 
		}
	} else {
		loginContainer.style.display = 'inline-block'; 
		enterTournament.style.display = 'none'; 
		loggedInContainer.style.display = 'none'; 
		loggedInContainer2.style.display = 'none'; 
	}
};
changeLoginStatus(); 

