var router = {}; 

router.changePage = function(pageName, queryString){
	helper.loadTemplate('page-content', 'pages', pageName); 
	var activeLink = document.querySelector(".nav-link.active"); 
	if(activeLink) {
		activeLink.classList.remove('active'); 
	}
	var newActiveLink = document.getElementById('nav-' + pageName); 
	if(newActiveLink) {
		newActiveLink.classList.add('active'); 
	}
	if(queryString){
		document.location.hash = pageName + '?' + queryString; 
	} else {
		document.location.hash = pageName;
	}
}

var stripQueryString = function(currHash){
	var locOfQuest = currHash.indexOf('?'); 
	var hash = currHash; 
	var queryString = ''; 
	if(locOfQuest > -1){
		hash = currHash.substr(0, locOfQuest); 
		queryString = currHash.substr(locOfQuest + 1); 
	}
	return {hash:hash, queryString:queryString}; 
}; 

//Onload check the url in order to change the page. 
var pages = ['home', 'tournaments', 'players', 'rules', 'handicap', 'payout', 'signup', 
	'currentUser', 'ticket', 'login', 'playerDetail', 'admin', 'entry']; 
var urlComp = stripQueryString(document.location.hash.replace("#", "")); 
if(urlComp.hash && urlComp.hash.length > 0 && pages.indexOf(urlComp.hash) > -1){
	router.changePage(urlComp.hash, urlComp.queryString); 
} else { 
	
}

