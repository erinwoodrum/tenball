var _User = {}; 
if(localStorage.user){
	_User.data = JSON.parse(localStorage.user); 
}

_User.addNew = function(data){
	_User.data = data; 
	localStorage.user = JSON.stringify(data); 
	//var key = firebase.database().ref().child('users').push().key;
	return database.ref('users/' + data.key).set({
    displayname: data.displayname,
    email: data.email,
    firstname: data.firstname, 
    lastname: data.lastname, 
    phone: data.phone,
    profile_picture : data.profile_picture, 
    street1: data.street1, 
    street2: data.street2,
    city: data.city, 
    state: data.state, 
    zip: data.zip, 
    country: data.country
  });
}; 