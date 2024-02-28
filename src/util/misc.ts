
// // Declare namespace.
// export const Shared = {
//   resolution: {
//     height: 0,
//     width: 0
//   },
//   scale: 1,
//   world: {
//     centerX: 0,
//     centerY: 0,
//     height: 0,
//     width: 0
//   },
// };

// const GAME_WIDTH = 640;
// const GAME_HEIGHT = 480;

// // Define resolution and scales (so it fits the screen when resolution is small).
// if(window.innerWidth < GAME_WIDTH || window.innerHeight < GAME_HEIGHT) {
//   const scaleX = window.innerWidth / GAME_WIDTH;
//   const scaleY = window.innerHeight / GAME_HEIGHT;
//   Shared.scale = scaleX < scaleY? scaleX : scaleY;   
// }

// Shared.resolution.width = Math.floor(Shared.scale * GAME_WIDTH);
// Shared.resolution.height = Math.floor(Shared.scale * GAME_HEIGHT);

// // Define virtual width and height.
// Shared.world.width = 640;
// Shared.world.height = 480;
// Shared.world.centerX = Shared.world.width / 2;
// Shared.world.centerY = Shared.world.height / 2;

export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 480;

export const Styles = {
  mainTitle: { font: '32px Arial', fontWeight: 'bold', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  subtitle: { font: '26px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  commonLabel: { font: '23px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  boldLabel: { font: '22px Arial', fontWeight: 'bold', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  
  menuLabel: { font: '46px Arial', fontWeight: 'bold', fill: "#ffffff", stroke: "#000000", strokeThickness: 6, boundsAlignH: "center", boundsAlignV: "middle"},
  helpText: { font: '20px Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "top", wordWrap: true, wordWrapWidth: 620 },
  historyTitle: { font: '18px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  historyText: { font: '14px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "center", boundsAlignV: "middle" },
  levelLabel: { font: '18px Verdana', fill: '#ffffff', stroke: "#000000", strokeThickness: 2, boundsAlignH: "left", boundsAlignV: "middle" },
};

export enum Throw {
  ROCK = 'Rock',
  PAPER = 'Paper',
  SCISSORS = 'Scissors'
}

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

// TODO: This function isn't need if using the 'Throw' enum.
export function throwToString(number: number) {
  if(number == 0) return Throw.ROCK.toString();
  if(number == 1) return Throw.PAPER.toString();
  return Throw.SCISSORS.toString();
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
// TODO: Shouldn't use 'any'.
export const changeCursor = {
  onInputOver: function(game: any) { 
    game.canvas.style.cursor = "pointer";
  },
  onInputOut: function(game: any) { 
    game.canvas.style.cursor = "default"; 
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
