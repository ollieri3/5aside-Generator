myApp.factory("nameService", [ "$q", "$http", function($q, $http) {
	return {


    //Api call to grab 22(max number of players) from a name generator api to use as list defaults. Set the cache to cache list of names. !no longer used as response is too slow!
    getDefaultPlayers: function() {

      return $http.get("https://uinames.com/api/?amount=22?&region=England", { cache: true} );

    },

		premadeNames: function() {

			var names = [

			{
				name: "Marty Grimes",
				score: 50,
			},
			{
				name: "John Smith",
				score: 33,
			},
			{
				name: "Graham Tet",
				score: 32,
			},
			{
				name: "Felix Rugh",
				score: 3,
			},
			{
				name: "Ellie Random",
				score: 15,
			},
			{
				name: "Hugh Knows",
				score: 2,
			},
			{
				name: "Juan More",
				score: 19,
			},
			{
				name: "Ben Smalls",
				score: 5,
			},
			{
				name: "Texas Ranger",
				score: 28,
			},
			{
				name: "Buzz Cuticle",
				score: 36,
			},
			{
				name: "Jame Cameraon",
				score: 43,
			},
			{
				name: "John Jam",
				score: 32,
			},
			{
				name:"Mary May",
				score: 5,
			},
			{
				name: "William Sails",
				score: 18,
			},
			{
				name: "Johnny Smash",
				score: 9,
			},
			{
				name: "Derek Zoolander",
				score:4,
			},
			{
				name: "Pyllis Bruce",
				score: 18,
			},
			{
				name: "Link Hyrule",
				score: 21,
			},
			{
				name: "Arnold Choppa",
				score: 44,
			},
			{
				name: "Mike Will",
				score: 35,
			},
			{
				name: "Mia Sands",
				score: 32,
			},
			{
				name: "Joseph Rains",
				score: 9,
			}
		];

			return names;
		}

  };

}]);
