angular
  .module('stamplayApp', ['ngStamplay'])
  .controller('MainController', MainController);
  
  
function MainController($stamplay) {
  
  var main = this;
    
  var registrationData = {
    email : 'user@provider.com',
    password: 'mySecret'
  };

  var newUser = $stamplay.User().Model;
  
  console.log(newUser); 
  
  newUser.signup(registrationData).then(function() {
    // User is now registered
    newUser.set('phoneNumber', '020 123 4567' );
    return newUser.save();
  }).then(function(){
    // User is saved successfully side
    var number = newUser.get('phoneNumber');
    console.log(number); // number value is 020 123 4567
  });

  
}