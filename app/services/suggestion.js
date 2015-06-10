angular
  .module('SuggestionService', [])
  .factory('Suggestion', ['$q', '$stamplay', SuggestionService]);

function SuggestionService($q, $stamplay) {

  return {
    create: create,
    getAll: getAll,
    vote: vote
  };

  function create(id, data) {
    var deferred = $q.defer();

    // instantiate the suggestion from the sdk
    var suggestionModel = $stamplay.Cobject('suggestion').Model;

    // set the proper variables
    suggestionModel.set('owner', id);
    suggestionModel.set('text', data.text);

    // save the suggestion
    suggestionModel.save()
      .then(function() {
        deferred.resolve(suggestionModel);
      });

    return deferred.promise;
  }

  // get all the suggestions
  function getAll() {
    var deferred = $q.defer();

    // use collection instead of model to grab all
    var suggestionCollection = $stamplay.Cobject('suggestion').Collection;
    
    suggestionCollection.fetch()
      .then(function() {
        deferred.resolve(suggestionCollection);
      });

    return deferred.promise;
  }

  // vote on a suggestion (upvote or downvote)
  function vote(id, type) {
    var deferred = $q.defer();

    var suggestionModel = $stamplay.Cobject('suggestion').Model;

    // find the specific suggestion you want to vote on
    suggestionModel.fetch(id).then(function() {
      
      // handle the upvote and the downvote
      if (type == 'upvote') {
        suggestionModel.upVote()
          .then(function() {
            deferred.resolve(suggestionModel);
          });
      } else if (type == 'downvote') {
        suggestionModel.downVote()
          .then(function() {
            deferred.resolve(suggestionModel);
          });
      }
      
    });

    return deferred.promise;
  }

}