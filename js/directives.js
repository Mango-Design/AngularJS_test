(function () {

    var app = angular.module('main-directives', []);


    app.directive("navigation", function () {

        return {
            restriction: 'E',
            templateUrl: 'navigation.html'
        };

    });

    app.directive("newMsg", function () {

        return {
            restriction: 'E',
            templateUrl: 'new-msg.html'
        };

    });

    app.directive("postRiver", function () {

        return {
            restriction: 'E',
            templateUrl: 'post-river.html'
        };

    });


})();