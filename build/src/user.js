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
            _User.data.uid = user.uid; 
            firebase.database().ref('/users/' +  user.uid).once('value').then(function(snapshot) {
                console.log('snapshot', snapshot); 
                var vals = snapshot.toJSON(); 
                for(var id in vals){
                    _User.updateDataVal(id, vals[id]); 
                }
                changeLoginStatus(); 
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
        var currHash = window.location.hash; 
        if(currHash.indexOf('players') > -1){
            displayPlayers(); 
        }
        if(currHash.indexOf('playerDetail') > -1){
            displayPlayer(); 
        }
        if(currHash.indexOf('admin') > -1){
            displayPlayers(); 
        }
    }); 
    _Tournaments = {}; 
    firebase.database().ref('/tournaments').once('value').then(function(snapshot) {
        _Tournaments = snapshot.toJSON(); 
        //now call other functions. 
        if(currHash.indexOf('admin') > -1){
            fillOutTourneys();
        }
        if(currHash.indexOf('tournaments') > -1){
            getTourneys(); 
        }
        if(currHash.indexOf('entry') > -1){
            fillOutTourney(); 
        }
    }); 
    
}; 
_User.addTicket = function(userid){
    if(!_Users[userid].tickets){
        _Users[userid].tickets = 0; 
    }
    _Users[userid].tickets ++; 
    database.ref('users/' + userid).set(_Users[userid]).then(function(result){
        alert('success!'); 
    }, function(fail){
        alert('failure:  ', fail); 
    }); 
}; 
_User.removeTicket = function(userid){
    if(!_Users[userid].tickets){
        _Users[userid].tickets = 0; 
    }
    _Users[userid].tickets --; 
    _User.data.tickets == _Users[userid].ticket; 
    database.ref('users/' + userid).set(_Users[userid]).then(function(result){
        alert('success!'); 
    }, function(fail){
        alert('failure:  ', fail); 
    }); 
}; 