var router = {}; 

router.changePage = function(pageName){
	helper.loadTemplate('page-content', 'pages', pageName); 
	var activeLink = document.querySelector(".nav-link.active"); 
	if(activeLink) {
		activeLink.classList.remove('active'); 
	}
	document.getElementById('nav-' + pageName).classList.add('active'); 
	document.location.hash = pageName;
}


//Onload check the url in order to change the page. 
var pages = ['home', 'tournaments', 'players', 'rules', 'handicap', 'payout']; 
var currHash = document.location.hash.replace("#", ""); 
console.log(currHash); 
if(currHash && currHash.length > 0 && pages.indexOf(currHash) > -1){
	router.changePage(currHash); 
} else {
	document.getElementById('nav-home').classList.add('active'); //home by default. 
}

