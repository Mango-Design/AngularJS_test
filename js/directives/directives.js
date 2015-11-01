(function () {

    angular.module('main-directives', [])


    .directive("navigation", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/navigation.html',
            controller: 'NavController',
            controllerAs: 'navCtrl'
        };

    })
    .directive("newMsg", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/river/new-msg.html',
            controller: 'NewMessageController',
            controllerAs: "newMsgCtrl"
        };

    })
    .directive("postRiver", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/river/post-river.html'
        };

    });


})();