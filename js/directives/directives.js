(function () {

    var app = angular.module('main-directives', []);


    app.directive("navigation", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/navigation.html'
        };

    });

    app.directive("newMsg", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/river/new-msg.html'
        };

    });

    app.directive("postRiver", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/river/post-river.html'
        };

    });


})();