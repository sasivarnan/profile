angular.module('angularApp', ['ngRoute', 'ui.bootstrap'])
  .filter('repoFilter', function () {
    return function (repos, activeRepoSet) {
      var filteredItems = [];
      switch (activeRepoSet) {
        case 0: filteredItems = repos;
          break;
        case 1: filteredItems = repos.filter(function(repo) { return !repo.fork });
          break;
        case 2 : filteredItems = repos.filter(function(repo) { return repo.fork });;
          break;
      }
      console.log(filteredItems);
      return filteredItems;
    }
  })
  .controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (currentLocation) {
      return currentLocation === $location.path();
    };
  })
  .controller('UserController', function ($scope, $location, $http) {
    $scope.user = {};
    $scope.repos = [];
    $http({
      method: 'GET',
      url: 'https://api.github.com/users/sasivarnan'
    }).then(function successCallback(response) {
      $scope.user = response.data;
    }, function errorCallback(response) {
      console.log(error)
    });

    $http({
      method: 'GET',
      url: 'https://api.github.com/users/sasivarnan/repos'
    }).then(function successCallback(response) {
      $scope.repos = response.data;
    }, function errorCallback(response) {
      console.log(error)
    });

  })
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'UserController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({ redirectTo: '/' });

  }]);
