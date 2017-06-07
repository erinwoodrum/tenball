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
var changeLoginStatus = function(){
  	if(_User && _User.data && _User.data.displayname){
	//User IS logged in. 
	document.getElementById('displayname-header').innerHTML = _User.data.displayname;
		loginContainer.style.display = 'none'; 
		loggedInContainer.style.display = 'inline-block'; 
		loggedInContainer2.style.display = 'inline-block'; 
	} else {
		loginContainer.style.display = 'inline-block'; 
		loggedInContainer.style.display = 'none'; 
		loggedInContainer2.style.display = 'none'; 
	}
};
changeLoginStatus(); //initialize. 

