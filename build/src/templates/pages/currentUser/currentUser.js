var getElement = function(id){
	return document.getElementById(id); 
}; 

//On Load
var fields = ['email', 'firstname', 'lastname', 'phone'];

getElement('displayname').innerHTML = user.data.displayname;
for(var x=0; x < fields.length; x++){
	getElement(fields[x]).value = user.data[fields[x]]; 
} 