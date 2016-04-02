var app = angular.module('app', ['ui.router', 'ngSanitize']);

// Set up
app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'homeController',
    templateUrl: 'templates/home.html'
  });
}]);

// Pull in the data
app.factory('newsFeed', function($http){
  var json;

  function getJSON(callback) {
    // var url = '';
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

// Homepage controller
app.controller('homeController', function($scope, newsFeed) {

  newsFeed.getNewsfeed(function(json) {
    $scope.feed = json.messages;
  })
})
.directive('messageBody', function() {
  return {
      template: '<p class="message-body" ng-bind-html="\'{{ newsitem.body }}\'"></p>'
    };
});