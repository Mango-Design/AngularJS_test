(function () {

    angular.module('Main', ['ngRoute', 'main-directives', 'main-controllers'])

        .config(function ($routeProvider) {

            $routeProvider
                .when("/", {
                    templateUrl: "templates/river/index.html",
                    controller: 'RiverController',
                    controllerAs: "riverCtrl"
                })
                .when('/single', {
                    templateUrl: 'templates/single/index.html',
                    controller: 'PostIndexController',
                    controllerAs: "postIndexCtrl"
                })
                .when('/username', {
                    templateUrl: 'templates/username/index.html'
                })
                .when("/river", {
                    redirectTo: "/"
                });
        });


})();
