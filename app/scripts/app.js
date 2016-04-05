var app = angular.module('app', ['ui.router', 'ngSanitize', 'angularMoment']);

// Set up
app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'homeController',
    templateUrl: 'templates/home.html'
  });

  $stateProvider.state('comments', {
    url: '/comments',
    controller: 'commentsController',
    templateUrl: 'templates/comments.html'
  });

}]);

// Pull in newsfeed data
app.factory('newsFeed', function($http){
  var json;

  function getJSON(callback) {
    return $http.get('https://s3-eu-west-1.amazonaws.com/streetlife-coding-challenge/newsfeed.json')
    .success(function(data) {
      json = data;
      callback(data);
    })
    .error(function(data) {
      console.log("Looks like something's gone wrong...")
    });
  }

  return {
    getNewsfeed: function(callback) {
      if (json) {
        return json;
      } else {
        getJSON(callback);
      }
    }
  };
})

// Pull in comment feed data
app.factory('commentFeed', function($http){
  var json;

  function getJSON(callback) {
    return $http.get('https://s3-eu-west-1.amazonaws.com/streetlife-coding-challenge/comments.json')
    .success(function(data) {
      json = data;
      callback(data);
    })
    .error(function(data) {
      console.log("Looks like something's gone wrong...")
    });
  }

  return {
    getCommentFeed: function(callback) {
      if (json) {
        return json;
      } else {
        getJSON(callback);
      }
    }
  };
})

// Homepage controller
app.controller('homeController', function($scope, newsFeed) {

  newsFeed.getNewsfeed(function(json) {
    $scope.feed = json.messages;
  });
})
  .directive('messageBody', function() {
    return {
        template: '<p class="message-body" ng-bind-html="newsitem.body"></p>'
      };
  })
  .directive('commentBody', function() {
    return {
      template: '<p class="comment-body" ng-bind-html="comment.body"></p>'
    };
});

// Comment feed controller
app.controller('commentsController', function($scope, commentFeed) {
  commentFeed.getCommentFeed(function(json) {
    $scope.feed = json.comments;
  });
})
  .directive('commentText', function() {
    if (comment.hasOwnProperty("body")) {
      return {
        template: '<p class="comment-text" ng-bind-html="comment.body"></p>'
      };
    } else {
      return "";
    }
});

