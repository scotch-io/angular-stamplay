angular
  .module('stamplayApp', ['ngStamplay'])
  .controller('MainController', MainController);
  
  
function MainController($stamplay, $http) {
  
  var main = this;
  main.suggestionData = {};   // blank object to hold data from suggestion form

  // get the stamplay user instance
  var user = $stamplay.User().Model;

  // get current user
  user.currentUser()
    .then(function() {
      main.userId = user.get('_id');
    });

  // submit a suggestion
  main.submitSuggestion = function(formData) {
    console.log('submitting');

    // check if the user is logged in
    if (main.userId) {
      formData.userId = main.userId;

      $http.post('/api/form/v0/forms/suggestions/entries', formData)
        .then(function(data) {
          console.log(data);
        });
    }
  };
  
}