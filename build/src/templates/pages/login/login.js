function loggedIn(userData){
		_User.supplementLogin(); 
		router.changePage('ticket');
}
function loginWithGoogle() {
	var googleProvider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(googleProvider).then(function(result) {
  		// This gives you a Google Access Token. You can use it to access the Google API.
  		var token = result.credential.accessToken;
  		loggedIn(result.user);
  		
}).catch(function(error) {
  var errorMessage = error.message;
  alert(errorMessage); 
});	
}

function loginWithFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {

  		var token = result.credential.accessToken;
  		// The signed-in user info.
  		var userData = result.user;
  		loggedIn(userData); 
}).catch(function(error) { 
  var errorMessage = error.message;
  alert(errorMessage); 
});
}

function setError(id, message){
	var inputElm = document.getElementById(id);
	inputElm.classList.add('error');
	inputElm.focus(); 
	document.getElementById(id + '-error').innerHTML = message; 
}

function clearErrors(){
	var errorInputs = document.querySelector("input.error"); 
	if(errorInputs){
		errorInputs.classList.remove('error'); 
	}
	var errorMessages = document.querySelector(".error-message"); 
	if(errorMessages){
		errorMessages.innerHTML = ''; 
	}
}

function logIn(){
	clearErrors(); 
	var email = helper.getData('email'); 
	if(email.length < 1){
		setError('email', "Please enter your email."); 
		return;
	}
	var password = helper.getData('password'); 
	if(password.length < 1){
		setError('password', "Please enter your password."); 
		return;
	}
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
		var userData = result;
  		loggedIn(userData); 
	}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage); 
  // ...
});
}

function sendResetEmail(){
	clearErrors(); 
	var email = helper.getData('email'); 
	if(email.length < 1){
		setError('email', "Please enter your email."); 
		return;
	}
	firebase.auth().sendPasswordResetEmail(email).then(function() {
	  alert('An reset email has been sent to ' + email);
	  router.changePage('home');  
	}, function(error) {
	  alert(error.message); 
	});
}