var getElement = function(id){
	return document.getElementById(id); 
}; 

//On Load
var fields = ['email', 'firstname', 'lastname', 'phone'];

getElement('displayname').innerHTML = _User.data.displayname;
for(var x=0; x < fields.length; x++){
	getElement(fields[x]).value = _User.data[fields[x]]; 
} 

var profilePic = _User.data.profile_picture && _User.data.profile_picture.length > 3 ? _User.data.profile_picture : "/img/defaultProfile.png"; 
document.getElementById('profile-picture').src = profilePic; 