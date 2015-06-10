angular
  .module('UserService', [])
  .factory('User', ['$q', '$stamplay', UserService]);

function UserService($q, $stamplay) {

  return {
    getCurrent: getCurrent,
    logout: logout
  };

  // get the current logged in user
  function getCurrent() {
    var deferred = $q.defer();

    // instantiate the user model from the sdk
    var userModel = $stamplay.User().Model;

    userModel.currentUser()
      .then(function() {
        deferred.resolve(userModel);
      });

    return deferred.promise;
  }

  // logout function to clear the token from 
  function logout() {

    // instantiate the user model from the sdk
    var userModel = $stamplay.User().Model;

    userModel.logout();
  }

}