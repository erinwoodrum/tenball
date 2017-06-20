var _User = { data : {}}; 
var _Users = {}; 

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

_User.logout = function(){
    firebase.auth().signOut().then(function() {
        localStorage.user = {}; 
        _User.data = {}; 
        changeLoginStatus(); 
        router.changePage('home'); 
    }).catch(function(error) {
      // An error happened.
      alert(error.message); 
    });
}; 
_User.updateDataVal = function(key, val){
    if(val){
        if(!_User.data[key] || _User.data[key] === ''){
            _User.data[key] = val; 
        }
    }
}; 
_User.supplementLogin = function(user){
        _User.getAllUsers(); 
        if(user && user.uid){
            _User.data.email = user.email || ''; 
            _User.data.displayname = user.displayName || ''; 
            _User.data.phone = user.phoneNumber || ''; 
            _User.data.profile_picture = user.photoURL || ''; 
            firebase.database().ref('/users/' +  user.uid).once('value').then(function(snapshot) {
                var vals = snapshot.toJSON(); 
                for(var id in vals){
                    _User.updateDataVal(id, vals[id]); 
                }
            }); 
        }
        if(typeof changeLoginStatus !== undefined){
            changeLoginStatus();  
        }  else {
            console.log(typeof changeLoginStatus); 
        } 
}; 
_User.getAllUsers = function(){
    firebase.database().ref('/users').once('value').then(function(snapshot) {
        _Users = snapshot.toJSON(); 
        if(currHash === 'players'){
            displayPlayers(); 
        }
    }); 
    
}; 
