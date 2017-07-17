function signupWithGoogle() {
	var googleProvider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(googleProvider).then(function(result) {
  		// This gives you a Google Access Token. You can use it to access the Google API.
  		var token = result.credential.accessToken;
  		var userData = result.user;
  		var createProfile = _User.addNew({
			key: userData.uid,
			displayname: userData.displayName,
	    	email: userData.email,
	    	firstname: '', 
	    	lastname: '', 
	    	phone: '',
	    	profile_picture : userData.photoURL, 
	    	street1: '', 
	    	street2: '',
	    	city: '', 
	    	state: '', 
	    	zip: '', 
	    	country: ''
		}).then(function(data){
			changeLoginStatus(); 
			router.changePage('currentUser'); 
		}); 
  			// ...
}).catch(function(error) {
  var errorMessage = error.message;
  alert(errorMessage); 
});	
}

function signupWithFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {

  		var token = result.credential.accessToken;
  		// The signed-in user info.
  		var userData = result.user;
  		var createProfile = _User.addNew({
			key: userData.uid,
			displayname: userData.displayName,
	    	email: userData.email,
	    	firstname: '', 
	    	lastname: '', 
	    	phone: '',
	    	profile_picture : userData.photoURL, 
	    	street1: '', 
	    	street2: '',
	    	city: '', 
	    	state: '', 
	    	zip: '', 
	    	country: ''
		}).then(function(data){
			changeLoginStatus(); 
			router.changePage('currentUser'); 
		}); 
}).catch(function(error) {
  var errorMessage = error.message;
  alert(errorMessage); 
});
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log(response); 
  });
}


function signUpUser() {
	//remove any errors first. 
	clearErrors(); 	

	//get each piece of data and validate it.  
	var displayName = helper.getData('displayname'); 
	if(displayName.length === 0){
		setError('displayname', 'Must be at least one character long.'); 
		return;
	}

	//".", "#", "$", "[", or "]"

	//TODO:  check for other occurances. 
	var email = helper.getData('email'); 
	if (email.length === 0){
		setError('email', "Please enter an email address."); 
		return;
	}
	//TODO:  check for other occurances. 
	var atSymbol = email.indexOf('@'); 
	var dotPlace = email.lastIndexOf('.'); 
	if(atSymbol === -1 || dotPlace === -1 || atSymbol === 0 || dotPlace > email.length + 1 || dotPlace < atSymbol){
		setError('email', "Please correct the email format."); 
		return;
	}
	
	var password = helper.getData('password'); 
	if(password.length === 0){
		setError('password', "Please enter a password."); 
		return; 
	}
	if(password.length < 8) {
		setError('password', "Passwords must be at least 8 characters."); 
		return;
	}
	if(!hasNumbers(password)){
		setError('password', "Passwords must contain a number."); 
		return;
	}
	if(!hasLowerCase(password)){
		setError('password', "Passwords must contain lowercase letters."); 
		return;
	}
	if(!hasUpperCase(password)){
		setError('password', "Passwords must contain uppercase letters."); 
		return;
	}
	if(!hasSpecialChars(password)){
		setError('password', "Passwords must contain a special character."); 
		return;
	}
	//password += salt;
	//password = md5(password);  

	var phoneNum = helper.getData('phone'); 
	if(phoneNum.length > 0 && (hasUpperCase(phoneNum) || hasLowerCase(phoneNum))){
		setError("phone", "Phone Numbers must not have letters."); 
	}
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){
		var createProfile = _User.addNew({
			key: result.uid,
			displayname: displayName,
	    	email: email,
	    	firstname: helper.getData('firstname'), 
	    	lastname: helper.getData('lastname'), 
	    	password: password,
	    	phone: phoneNum,
	    	profile_picture : '', 
	    	street1: helper.getData('street1'), 
	    	street2: helper.getData('street2'),
	    	city: helper.getData('city'), 
	    	state: helper.getData('state'), 
	    	zip: helper.getData('zip'), 
	    	country: helper.getData('country')
		}).then(function(data){
			changeLoginStatus(); 
			router.changePage('currentUser'); 
		}); 
	}).catch(function(error) {
  		alert(error.message);   
	});
	


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

function setError(id, message){
	var inputElm = document.getElementById(id);
	inputElm.classList.add('error');
	inputElm.focus(); 
	document.getElementById(id + '-error').innerHTML = message; 
}

function hasNumbers(t) {
	var regex = /\d/g;
	return regex.test(t);
} 
function hasLowerCase(str) {
    return (/[a-z]/.test(str));
}

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}
function hasSpecialChars(str) {
	return (/[~`!@#$%^&*()-_+={};:'"?/<>,.]/.test(str)); 
}

 window.fbAsyncInit = function() {
    FB.init({
      appId      : '480053009001891',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
