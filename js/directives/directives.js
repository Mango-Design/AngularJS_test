(function () {

    var app = angular.module('main-directives', []);


    app.directive("navigation", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/navigation.html',
            controller: function () {
                this.page = "river";

                this.setNav = function (p){

                    this.page = p;
                }
            },
            controllerAs: 'navCtrl'
        };

    });

    app.directive("newMsg", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/river/new-msg.html',
            controller: ["$http", function ($http) {
                var that;

                that = this;
                this.newPost = {};

                this.submit = function (list) {

                    if(this.newPost.text.length > 0){
                        $http.get('json/who-am-i.json').success(function (data) {

                            list["data"].push({
                                "created_at": Date.now(),
                                "author": data["data"],
                                "message": that.newPost.text,
                                "rating": 0
                            });

                            that.newPost = {};

                        });
                    }

                }

            }],
            controllerAs: "newMsgCtrl"
        };

    });

    app.directive("postRiver", function () {

        return {
            restriction: 'E',
            templateUrl: 'templates/river/post-river.html'
        };

    });


})();