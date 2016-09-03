angular.module('angularApp', ['ngRoute'])
  .controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (currentLocation) {
      return currentLocation === $location.path();
    };
  })
  .controller('UserController', function ($scope) {
    $scope.user = 'sasivarnan';

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
