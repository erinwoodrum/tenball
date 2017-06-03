var user = {}; 
if(localStorage.user){
	user.data = JSON.parse(localStorage.user); 
}

user.addNew = function(data){
	user.data = data; 
	localStorage.user = JSON.stringify(data); 
	var key = firebase.database().ref().child('users').push().key;
    user.data.key = key; 
	return database.ref('users/' + key).set({
    displayname: data.displayname,
    email: data.email,
    firstname: data.firstname, 
    lastname: data.lastname, 
    password: data.password,
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