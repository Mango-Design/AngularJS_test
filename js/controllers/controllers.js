(function () {

    angular.module('main-controllers', [])

        .controller("RiverController", ["$http", function ($http) {

            var that;

            that = this;
            this.list = [];
            this.order = "+created_at";
            this.newPost = {};

            $http.get('json/stream-data.json').success(function (data) {

                that.list = that.add_index(data);

            });

            this.add_index = function (arr) {
                /*This function enables the vote casting by adding a custom property (post_tid) on each post object to keep track of single entities*/
                var i, len, ret;

                ret = arr["data"] || [];
                len = ret.length;

                for(i = 0; i < len; i++){
                    ret[i]["post_tid"] = i;
                }

                arr["data"] = ret;

                return arr;
            };

            this.vote = function (id){
                /*Allows vote casting
                 *
                 * TODO should insert a control over users that already voted to prevent multiple votes from the same users, since this is a simulation i'll use just a flag 'voted'
                 * */

                var data, i, len, cache;


                data = this.list;

                cache = data["data"]; //faster access to the array, useful for long iterations
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

        }])
        .controller("PostIndexController" ["$http", function ($http) {}])
        .controller("NavController", function () {

            this.page = "river";

            this.setNav = function (p){

                this.page = p;
            }

        })
        .controller("NewMessageController", ["$http", function ($http) {

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
                            "rating": 0,
                            "post_tid": list["data"].length
                        });

                        that.newPost = {};

                    });
                }

            }

        }])




})();