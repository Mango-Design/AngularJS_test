(function () {

    var app = angular.module('main', []);


    app.controller("RiverController", function(){

        this.list = $lib.requestData();
        this.order = "+created_at";

        this.vote = function (id){
            /*Allows vote casting
            *
            * TODO should a control over users that already voted to prevent multiple votes from the same users, since this is a simulation i'll use just a flag 'voted'
            * */

            var data, i, len, cache;


            data = this.list;

            cache = data["data"];
            len = cache.length;
            i = 0;

            while(i < len && cache[i].post_tid != id){
                i++;
            }

            //found!
            if(i < len){
                //This block prevents multiple voting, see notes section above for more details
                if(this.list["data"][i]["flag_voted"] === true){

                    this.list["data"][i]["rating"]--;
                    this.list["data"][i]["flag_voted"] = false;

                } else {

                    this.list["data"][i]["rating"]++;
                    this.list["data"][i]["flag_voted"] = true;
                }

            }
        };

    });

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


    /*Custom var that contains personal functions and data enclosed in a private closure to prevent conflicts*/
    var $lib = (function () {

        "use strict"; /*Just to be sure we are future ready*/

        /***********************PRIVATE FUNCTIONS AND DATA************************/
        function requestData () {

            /*Query an API through an ajax call on the server 'someserver' to obtain the JSON string, and return parsed data*/
            var args, i, len, cache;

                args = JSON.parse('{"data": [{"created_at": "2014-10-22T19:59Z","author": {"id": 1,"username": "Mario Rossi"},"message": "Hello world","rating": 1},{"created_at": "2014-02-22T19:59Z","author": {"id": 2,"username": "Tarquinio Bianchi"},"message": "The quick brown fox jumps over the lazy dog","rating": 10},{"created_at": "2000-02-22T20:57Z","author": {"id": 3,"username": "Marco Tullio Cicerone"},"message": "Il saggio stesso formula spesso opinioni su ciò che non conosce, non di rado è in preda alla collera, cede alle preghiere e si calma, corregge talora - se così è meglio - le sue affermazioni e talora cambia parere; tutte le virtù sono temperate dal giusto mezzo","rating": 15},{"created_at": "2013-02-22T19:59Z","author": {"id": 2,"username": "Tarquinio Bianchi"},"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","rating": 13},{"created_at": "2014-09-22T19:59Z","author": {"id": 1,"username": "Mario Rossi"},"message": "Ma la volpe col suo balzo ha raggiunto il quieto Fido. Quel vituperabile xenofobo zelante assaggia il whisky ed esclama: alleluja! Aquel vituperable xenófobo apasionado prueba su güisqui y exclama: ¡Aleluya! Ma la volpe col suo balzo ha raggiunto il quieto Fido. Quel vituperabile xenofobo zelante as","rating": 5}]}');
                cache = args["data"]; //caching this array to avoid object access iteration, slower than index access.
                len = cache.length;

                //I'm augumenting the object with an integer id to allow vote casting and other operations.
                for(i = 0; i < len; i = i + 1){

                    cache[i]["post_tid"] = i;

                }

                args["data"] = cache;

            return args;
        }

        function requestLoggedUser () {
            /*Query an API through an ajax call on the server 'someserver' to obtain the JSON string, and return parsed data*/

            return JSON.parse('{"data": {"id": 1,"username": "Mario Rossi"}}');

        }

        /***********************END PRIVATE FUNCTIONS AND DATA************************/


        return {
            /*This way the resulting var will contain an object with some public functions, that share a common closure with access to private functions*/
            init: function () {},
            requestData: requestData,
            requestLoggedUser: requestLoggedUser

        }

    })();


})();
