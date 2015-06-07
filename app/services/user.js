angular
  .module('UserService', [])
  .factory('User', ['$q', '$stamplay', UserService]);

function UserService($q, $stamplay) {

  var userModel = $stamplay.User().Model;

  return {
    isLogged: isLogged,
    getCurrent: getCurrent
  };

  function isLogged() {
    return userModel.isLogged;
  }

  function getCurrent() {
    var deferred = $q.defer();

    userModel.currentUser()
      .then(function() {
        deferred.resolve(userModel);
      });

    return deferred.promise;

  }

}