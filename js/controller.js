myApp.controller("mainController", ["nameService", function(nameService) {

  $ctrl = this;

  //team size variable set to a default of 5 binded to team size select dropdown
  $ctrl.teamSize = "5";

  //names used for databind with input field.
  $ctrl.teamOneName = "Team One";
  $ctrl.teamTwoName = "Team Two";



  //grab list of players from service to show an example list of players and team
  //if there is no $ctrl.players stored locally
  $ctrl.players = nameService.premadeNames();


  //cut $ctrl.players into the total players we need based on the users choice of teamsize
  var bothTeams = $ctrl.players.slice(0, ($ctrl.teamSize * 2));


  // run shuffle on new bothTeams array to randomize, using the fisher yates shuffle
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

  //Button to shuffle player team placement or balance teams based on score
  $ctrl.calculateTeams = function() {

    //cut players array down to current team size * 2 and add to new array bothTeams
    var bothTeams = $ctrl.players.slice(0, ($ctrl.teamSize * 2));

    //if user has chosen to add player skill levels
    if($ctrl.check) {
      //run code to balance teams

      // sort out the team in order of highest number first (like back in the playground days the best kids get picked first)
      // push the players into an array to use the sort function
      var sortable =[];// temp array

      bothTeams.forEach(function(item) {
        sortable.push([item.name, item.score]);
      });

      sortable.sort(function(a, b){
        return b[1] - a[1];
      });
      var sortedPlayersArr = sortable;


      //convert array back into object
      sortedPlayersObj = [];

      sortedPlayersArr.forEach(function(item) {

        sortedPlayersObj.push( {name: item[0], score: item[1]});

      });

      //reset the teams
      $ctrl.teamOne = [];
      $ctrl.teamTwo = [];

      //function to sum all the scores in its currents array (used later)
      var totalScore = function(array) {

        if(array.length === 0) {
          return 0;
        } else {

          var total = 0;

          array.forEach(function(player) {

            total += player.score;

          });

          //return the total of the array
          return total;

        }
      };


      // Now iterate through the sorted players object and place them into balanced teams.

      sortedPlayersObj.forEach(function(item) {

        var teamOneTotal = totalScore($ctrl.teamOne);

        var teamTwoTotal = totalScore($ctrl.teamTwo);


        if(teamOneTotal > teamTwoTotal) {
          //who has the highest score place a player into opposite team.

          if($ctrl.teamTwo.length === +$ctrl.teamSize){
            //but if that team is full push it into the other
            $ctrl.teamOne.push(item);

          } else {

            $ctrl.teamTwo.push(item);
          }

        } else {

          if($ctrl.teamOne.length === +$ctrl.teamSize){
            $ctrl.teamTwo.push(item);
          }
          else {
            $ctrl.teamOne.push(item);

          }
        }
      });

      $ctrl.teamOneAverage = Math.floor(totalScore($ctrl.teamOne) /$ctrl.teamOne.length);

      console.log(totalScore($ctrl.teamOne));

      $ctrl.teamTwoAverage = Math.floor(totalScore($ctrl.teamTwo)/$ctrl.teamTwo.length);

      console.log(totalScore($ctrl.teamTwo));


    } else {
      //just shuffle existing players
      shuffle(bothTeams);

      //then split into two equal teams
      $ctrl.teamOne = bothTeams.slice(0,$ctrl.teamSize);

      $ctrl.teamTwo = bothTeams.slice($ctrl.teamSize);

    }
  };


  //Empty all the fullNames in the $ctrl.players Array
  $ctrl.clearPlayers = function() {

    $ctrl.players.forEach(function(item) {
      item.name = "";
      item.score = 0;
      $ctrl.teamOneAverage = 0;
      $ctrl.teamTwoAverage = 0;

    });

    //reset players array also
    $ctrl.teamOne = [];
    $ctrl.teamTwo = [];

  };

  //default to this style using ng-class
  $ctrl.playerStyles = "col-xs-12";

  $ctrl.generateText = "Random Teams";

  $ctrl.clearText = "Clear Names";

  $ctrl.skillCheck = function(checked) {
    //change text of button to generate teams and styles for player and score column layout
    if(checked) {
      $ctrl.generateText = "Balance Teams";
      $ctrl.clearText = "Clear Names/Scores";
      $ctrl.playerStyles = "col-xs-8";
    } else {
      $ctrl.generateText = "Random Teams";
      $ctrl.clearText = "Clear Names";
      $ctrl.playerStyles = "col-xs-12";
      $ctrl.teamOneAverage = 0;
      $ctrl.teamTwoAverage = 0;
    }
  };

  //store any changes to local storage so user can leave and come back with the same team

  // var playerStorage = JSON.stringify($ctrl.players);
  // console.log(playerStorage);


}]);
