angular
  .module('UserService', [])
  .factory('User', ['$q', '$stamplay', UserService]);

function UserService($q, $stamplay) {

  var userModel = $stamplay.User().Model;

  return {
    getCurrent: getCurrent
  };

  function getCurrent() {
    var deferred = $q.defer();

    userModel.currentUser()
      .then(function() {
        deferred.resolve(userModel);
      })
      .catch(function(err) {
        deferred.reject(err);
      });

    return deferred.promise;
  }

}