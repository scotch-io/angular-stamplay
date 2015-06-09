angular
  .module('SuggestionService', [])
  .factory('Suggestion', ['$q', '$stamplay', SuggestionService]);

function SuggestionService($q, $stamplay) {

  var suggestionModel = $stamplay.Cobject('suggestion').Model;
  var suggestionCollection = $stamplay.Cobject('suggestion').Collection;

  return {
    create: create,
    getAll: getAll,
    vote: vote
  };

  function create(id, data) {
    var deferred = $q.defer();

    // set the proper variables
    data.userId = id;
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
    suggestionCollection.fetch()
      .then(function() {
        deferred.resolve(suggestionCollection);
      });

    return deferred.promise;
  }

  // vote on a suggestion (upvote or downvote)
  function vote(id, type) {
    var deferred = $q.defer();

    // find the specific suggestion you want to vote on
    suggestionModel.fetch(id);
    console.log(suggestionModel);

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

    return deferred.promise;
  }

}