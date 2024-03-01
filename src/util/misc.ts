// --- Constants and Enumerations --- //

export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 480;

export const Styles = {
  mainTitle: { font: '32px Arial', fontWeight: 'bold', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  subtitle: { font: '26px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  commonLabel: { font: '23px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  boldLabel: { font: '22px Arial', fontWeight: 'bold', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  
  menuLabel: { font: '46px Arial', fontWeight: 'bold', fill: "#ffffff", stroke: "#000000", strokeThickness: 6, boundsAlignH: "center", boundsAlignV: "middle"},
  helpText: { font: '20px Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "top", wordWrap: { width: (GAME_WIDTH - 20), useAdvancedWrap: true } },
  historyTitle: { font: '18px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  historyText: { font: '14px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  levelLabel: { font: '18px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "left", boundsAlignV: "middle" },
};

export enum Throw {
  ROCK = 0,
  PAPER = 1,
  SCISSORS = 2
}

// --- Functions --- //

// Method for calculate the result of a round.
export function matchResult(playerThrow: Throw, robotThrow: Throw) {
  if(playerThrow != robotThrow) {
    // Verify if player wins (true) or if robot wins (false).
    return (playerThrow === Throw.ROCK && robotThrow === Throw.SCISSORS) ||
           (playerThrow === Throw.PAPER && robotThrow === Throw.ROCK) ||
           (playerThrow === Throw.SCISSORS && robotThrow === Throw.PAPER);
    }

  // Draw.
  return null;
}

export function throwToString(value: Throw) {
  return value == Throw.ROCK 
    ? 'Rock'
    : value == Throw.PAPER
    ? 'Paper'
    : 'Scissors';
}

// Method for calculate the current score of a match.
// TODO: Shouldn't use 'any'.
export function getScore(matchHistory: Array<any>) {
  let score = 0;
  for(let i=matchHistory.length-1; i>=0; i--) {
    if(matchHistory[i].result === true && score >= 0) {
      score++;
    } else if(matchHistory[i].result === false && score <= 0) {
      score--;
    } else {
      i = -1;
    }
  }
  return score;
}

// Define event handlers for change the cursor with the over events.
export const changeCursor = {
  onInputOver: function(scene: Phaser.Scene) { 
    scene.game.canvas.style.cursor = "pointer";
  },
  onInputOut: function(scene: Phaser.Scene) { 
    scene.game.canvas.style.cursor = "default"; 
  }
};

// Get max level.
export function getMaxLevel() {
  let maxLevel = 1;
  
  try {
    maxLevel = parseInt(localStorage.getItem('maxLevel') ?? '1', 10);
  }catch(err) {
    // Do nothing.
  }

  if(isNaN(maxLevel) || maxLevel === null || maxLevel <= 0) {
    maxLevel = 1
  }

  return maxLevel;
}

// Update max level.
export function updateMaxLevel(newMax: number) {
  const maxLevel = getMaxLevel();
  if(newMax > maxLevel) {
    localStorage.setItem("maxLevel", newMax + '');
  }
}

// Permut the elements of an array.
export function permut<Type>(array: Type[], number: number, pos: number|null) {
    if(!pos) {
      pos = 0;
    }
    
    swap(array, pos, pos + (number%(array.length-pos)));
    
    if((array.length - pos) > 1) {
      permut(array, Math.floor(number/(array.length-pos)), pos+1);
    }
}

// Swap the elements of an array.
export function swap<Type>(array: Type[], first: number, second: number) {
  const temp = array[first];
  array[first] = array[second];
  array[second] = temp;
}

// Calculate the factorial of a number.
export function factorial(n: number): number {
  return n === 0
    ? 1
    : n * factorial(n - 1);
}
