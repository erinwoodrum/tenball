function signupWithGoogle() {
	var googleProvider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(googleProvider).then(function(result) {
  		// This gives you a Google Access Token. You can use it to access the Google API.
  		var token = result.credential.accessToken;
  		// The signed-in user info.
  		var userData = result.user;
  		console.log('the user: ', user); 
  		user.data.displayname = userData.displayName; 
  		user.data.email = userData.email; 
  		localStorage.user = JSON.stringify(user.data); 
  		router.changePage('currentUser'); 
  			// ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
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
	var displayName = getData('displayname'); 
	if(displayName.length === 0){
		setError('displayname', 'Must be at least one character long.'); 
		return;
	}

	//".", "#", "$", "[", or "]"

	//TODO:  check for other occurances. 
	var email = getData('email'); 
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
	
	var password = getData('password'); 
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
	password += salt;
	password = md5(password);  

	var phoneNum = getData('phone'); 
	if(phoneNum.length > 0 && (hasUpperCase(phoneNum) || hasLowerCase(phoneNum))){
		setError("phone", "Phone Numbers must not have letters."); 
	}
	var result = user.addNew({
		displayname: displayName,
    	email: email,
    	firstname: getData('firstname'), 
    	lastname: getData('lastname'), 
    	password: password,
    	phone: phoneNum,
    	profile_picture : '', 
    	street1: getData('street1'), 
    	street2: getData('street2'),
    	city: getData('city'), 
    	state: getData('state'), 
    	zip: getData('zip'), 
    	country: getData('country')
	}).then(function(data){
		router.changePage('currentUser'); 
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

function getData(id){
	return document.getElementById(id).value; 
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
