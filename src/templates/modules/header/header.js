function changePage(pageName){
	alert('changing page... ' + pageName); 
	helper.loadTemplate('page-content', 'pages', pageName); 
}