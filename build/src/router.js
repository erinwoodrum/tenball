var router = {}; 

router.changePage = function(pageName){
	helper.loadTemplate('page-content', 'pages', pageName); 
	var activeLink = document.querySelector(".nav-link.active"); 
	if(activeLink) {
		activeLink.classList.remove('active'); 
	}
	var newActiveLink = document.getElementById('nav-' + pageName); 
	if(newActiveLink) {
		newActiveLink.classList.add('active'); 
	}
	document.location.hash = pageName;
}


//Onload check the url in order to change the page. 
var pages = ['home', 'tournaments', 'players', 'rules', 'handicap', 'payout', 'signup', 'currentUser']; 
var currHash = document.location.hash.replace("#", ""); 
if(currHash && currHash.length > 0 && pages.indexOf(currHash) > -1){
	router.changePage(currHash); 
} else { 
	document.getElementById('nav-home').classList.add('active'); //home by default. 
}

