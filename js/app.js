(function () {

    var app = angular.module('main', ['main-directives']);


    app.controller("RiverController", ['$http', function($http){

        var that;

        that = this;
        this.list = [];

        $http.get('json/stream-data.json').success(function (data) {

            that.list = data;

        });

        this.order = "+created_at";

        this.vote = function (id){
            /*Allows vote casting
            *
            * TODO should insert a control over users that already voted to prevent multiple votes from the same users, since this is a simulation i'll use just a flag 'voted'
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

    }]);


})();
