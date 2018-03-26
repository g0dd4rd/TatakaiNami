var bombsScore = 0;
var bombsScoreLabel = null;
var troopsScore = 0;
var troopsScoreLabel = null;
function gameStatus() {
  bombsScoreLabel = document.createElement('p');
  bombsScoreLabel.innerHTML = 'Bombs: '+ bombsScore;
  troopsScoreLabel = document.createElement('p');
  troopsScoreLabel.style.color = 'blue';
  troopsScoreLabel.innerHTML = 'Troops: '+ troopsScore;
  var statusDiv = document.getElementById('status');
  statusDiv.appendChild(bombsScoreLabel);
  statusDiv.appendChild(troopsScoreLabel);
}

var turnCount = 0;
var fields = [];
function createGameBoard(rowLength) {
  ++turnCount;
  //console.log('turnCount: '+ turnCount);
  //console.log('rowLength: '+ rowLength);
  var gameBoardDiv = document.getElementById('gameBoard');
  for(var i = 0; i < rowLength; i++) {
    fields[i] = document.createElement('div');
    fields[i].id = 'unchecked';
    fields[i].className = 'field';
    fields[i].setAttribute('onclick', 'placeTroops(event)');
    fields[i].style.border = '1px solid green';
    fields[i].style.width = 50;
    fields[i].style.height = 50;
    fields[i].style.position = 'absolute';
    fields[i].style.left = (turnCount * 25) + (i * 50);
    fields[i].style.top = rowLength * 50;
    if(gameBoardDiv.firstChild) {
      gameBoardDiv.insertBefore(fields[i], gameBoardDiv.firstChild);
    } else {
      gameBoardDiv.appendChild(fields[i]);
    }
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

  if(troops.length == 0) {
    alert('Please place your troops!');
    throw new Error('Please reload the page and place your troops');
  }
  //console.log('troops at: '+ troops);
}

var bombs = [];
function placeBombs() {
  // generate random number from 0 to row length / 2 = # of bombs per row
  for(var i = 0; i < fields.length / 2; i++) {
    // location of bombs
    bombs[i] = Math.floor(Math.random() * fields.length); 
  }

  // ascending sort
  bombs.sort(function(a, b) {
    return a - b;
  });
  //console.log('bombs sorted: '+ bombs);

  // a set cannot contain dupes
  bombs = new Set(bombs);
  bombs = [... bombs];
  //console.log('bombs unique: '+ bombs);
  for(var k = 0; k < bombs.length; k++) {
    fields[bombs[k]].style.backgroundColor = 'black';
  }

  //console.log('bombs at: '+ bombs);
  evaluateFight();
}

var fightResult = [];
function evaluateFight() {
  fightResult = troops.concat(bombs);
  // ascending sort
  fightResult.sort(function(a, b) {
    return a - b;
  });
  //console.log('fightResult sorted: '+ fightResult);

  var dead = [];
  for(var i = 0; i < fightResult.length; i++) {
    if(fightResult[i + 1] === fightResult[i]) {
      //console.log('fight result: '+ fightResult[i]);
      dead.push(fightResult[i]);
    }
  }

  if(dead.length > 0) {
    for(var j = 0; j < dead.length; j++) {
      fields[dead[j]].style.backgroundColor = 'red';
    }
    //console.log('dead: '+ dead);
    bombsScore += dead.length;
    bombsScoreLabel.innerHTML = 'Bombs: '+ bombsScore;
  }
  
  troopsScore += troops.length - dead.length;
  troopsScoreLabel.innerHTML = 'Troops: '+ troopsScore;
  
  var previousFields = fields;
  for(var k = 0; k < previousFields.length; k++) {
    previousFields[k].removeAttribute('onclick');
  }
  
  if(fields.length == 3) {
    if(troopsScore > bombsScore) {
      troopsScoreLabel.innerHTML = "You WON!";
      bombsScoreLabel.innerHTML = "You lost";
    } else {
      bombsScoreLabel.innerHTML = "You WON!";
      troopsScoreLabel.innerHTML = "You lost";
    }
    
    var fightBtn = document.getElementById('fight');
    fightBtn.setAttribute('disabled');
    return 0;
  }

  createGameBoard(--fields.length);
}


