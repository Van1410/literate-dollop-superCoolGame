// Array of player data 
const players = [
  { name: 'Luke Skywalker', score: 12, house: 'Jedi' },
  { name: 'Darth Vader', score: 15, house: 'Sith' },
  { name: 'Yoda', score: 20, house: 'Jedi' }
];


// Omitting the Easter Egg feature for this project 




// Omitting console hint for Easter Egg for project 


let playerName = '';
let winningTarget = '';
let playerScore = 0;
let darthTargets; // holds the game target elements

document.addEventListener('DOMContentLoaded', () => {
  console.log('Game script loaded');

  initializeGame();

  document.getElementById("submitNameBtn").addEventListener("click", greetPlayer);

  $('#playAgain').on('click', () => {
    $('#gamePiece').css({ left: 0, top: 0 });
    setDarthVadar();
    $(darthTargets).text('');
    $('#playAgain').hide();
    $("#gamePiece").draggable({ disabled: false });
  });

  $('#resetGame').on('click', () => {
    initializeGame();
  });

  $("#gamePiece").draggable({
    containment: "#gameBoard",
    scroll: true,
    snap: ".gameTargets",
    snapMode: "inner",
    snapTolerance: 60,
    disabled: true
  });

  $('.gameTargets').droppable({
    accept: '#gamePiece',
    drop: function () {
      const droppedId = $(this).attr('id');
      const correctId = $(darthTargets[winningTarget]).attr('id');

      if (droppedId === correctId) {
        playerScore++;
        $(this).text('LOSER!');
      } else {
        playerScore--;
        $(this).text('YOU WIN!');
      }

      $('#scoreDisplay').text(playerScore);
      $('#playAgain').show();
      $("#gamePiece").draggable({ disabled: true });
    }
  });
});

function initializeGame() {
  playerScore = 0;
  $('#scoreDisplay').text(playerScore);

  playerName = '';
  $('#playerNameInput').val('').prop('disabled', false);
  $('#submitNameBtn').show().prop('disabled', false);

  $('#gamePiece').hide().css({ left: 0, top: 0 });
  $('#playAgain').hide();

  darthTargets = document.getElementsByClassName('gameTargets');
  $(darthTargets).text('');

  setDarthVadar();

  $("#gamePiece").draggable({ disabled: true });
}

function setDarthVadar() {
  winningTarget = Math.floor(Math.random() * darthTargets.length);
  console.log('Winning target:', $(darthTargets[winningTarget]).attr('id'));
}

function greetPlayer() {
  const enteredPlayerName = $('#playerNameInput').val().trim();
  if (enteredPlayerName) {
    playerName = enteredPlayerName;
    alert(`Welcome to the dark side!!, ${playerName}!`);
    $('#gamePiece').show();
    $("#gamePiece").draggable({ disabled: false });
    $('#playerNameInput').prop('disabled', true);
    $('#submitNameBtn').hide();
  } else {
    alert("Please enter your name!");
  }
}

