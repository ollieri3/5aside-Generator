//!No longer being used as response too slow

//grabs api request from nameService returns a promise
nameService.getDefaultPlayers()
.then(
  /* success */
  function(response) {



    //store array of names in $ctrl.players to be used withing ng-repeat
    $ctrl.players = response.data;

    //now merge first and last names to display in input

    $ctrl.players.forEach(function(item){

      item.fullName = item.name + " " + item.surname;

      //add scores and default to 0;
      item.score = 0;


    });

    console.log($ctrl.players);

    //Start preparing players into teams

    //cut $ctrl.players into the team size we need based on the users choice of teamsize
    var bothTeams = $ctrl.players.slice(0, ($ctrl.teamSize * 2));


    // randomize the players!
    // Shuffle the array using the Fisher Yates algorithm
    var shuffle = function (array) {
      var i = 0, j = 0, temp = null;

      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };

    shuffle(bothTeams);

    //Slice the random players into two teams

    $ctrl.teamOne = bothTeams.slice(0,$ctrl.teamSize);

    $ctrl.teamTwo = bothTeams.slice($ctrl.teamSize);



  },
  /* failure */
  function(error) {
    console.log("The request failed: " + error);
});
