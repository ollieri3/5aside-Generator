//I realise it's a bit heavy handed adding in a whole library(jQuery) just to add draggable features, Will come back and work on this to get it working with just javascript.

$(document).ready(function(){

  // var draggableClasses = $(".draggable");
  var footballPitch = $(".football-pitch img");
  var draggableClasses = $(".draggable");
  var footballContainer = $(".football-container");

  var applyDraggable = function() {

    //re apply incase of new elements
    draggableClasses = $(".draggable");

    draggableClasses.draggable({containment: ".football-container"});

  };

  //apply draggable class to team players on page load
  applyDraggable();

  //when new players are added make sure they also have the draggable class
  $("#generateTeam").on("click", function(){

    applyDraggable();

  });

  //change the border of the pitch while dragging. Function bubbling so that the event listener is persistent even when new li's are created

  footballContainer.on("mousedown", "li", function(){

    footballPitch.toggleClass("pitch-on-hover");

  });

  footballContainer.on("mouseup", "li", function(){

    footballPitch.toggleClass("pitch-on-hover");

  });




});
