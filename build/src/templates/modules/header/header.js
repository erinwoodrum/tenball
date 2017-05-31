//Onload check the url in order to change the page. 
var pages = ['home', 'tournaments', 'players', 'rules', 'handicap', 'payout']; 
var currHash = document.location.hash.replace("#", ""); 
if(currHash && currHash.length > 0 && pages.indexOf(currHash) > -1){
	router.changePage(currHash); 
} else {
	document.getElementById('nav-home').classList.add('active'); //home by default. 
}


