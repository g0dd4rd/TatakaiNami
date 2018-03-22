var rowLength = 8;
var fields = [];
function createGameBoard() {
  for(var i = 0; i < rowLength; i++) {
    fields[i] = document.createElement('div');
    fields[i].id = 'unchecked';
    fields[i].setAttribute('onclick', 'placeTroops(event)');
    document.body.appendChild(fields[i]);
  }
}

function placeTroops(event) {
  var eventSource = event.target || event.srcElement;
  if(eventSource.id == 'unchecked') {
    eventSource.id = 'checked';
    eventSource.style.backgroundColor = 'blue';
  } else {
    eventSource.id = 'unchecked';
    eventSource.style.backgroundColor = 'white';
  }
}

var troops = [];
function getTroops() {
  for(var i = 0; i < fields.length; i++) {
    if(fields[i].id == 'checked') {
      troops.push(i);
    }
  }
  console.log('troops at: '+ troops);
}

var bombs = [];
function placeBombs() {
  // generate random number from 0 to row length / 2 = # of bombs per row
  for(var i = 0; i < rowLength / 2; i++) {
    // location of bombs
    bombs[i] = Math.floor(Math.random() * rowLength); 
  }
  console.log('bombs at: '+ bombs);
  evaluateFight();
}

var fightResult = [];
function evaluateFight() {
  fightResult = troops.concat(bombs);
  fightResult.sort(function(a, b) {
    return a - b;
  });
  for(var i = 0; i < fightResult.length; i++) {
    if(fightResult[i + 1] == fightResult[i]) {
      console.log('fight result: '+ fightResult[i]);
      fields[i].style.backgroundColor = 'black';
    }
  }
}


