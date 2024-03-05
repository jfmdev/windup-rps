import { factorial, permut, Round, Throw } from './misc.js';

// --- Utilities --- //

const THROWS = [Throw.ROCK, Throw.PAPER, Throw.SCISSORS];

interface AlgorithmSettings {
  depth?: number;
  duration?: number;
  easy?: boolean;
  length?: number;
  mask?: number;
  seed?: number;
  value?: number;
}

// --- Algorithms --- //

export abstract class ThrowAlgorithm {
  protected history: Array<Round> = [];

  abstract next(): Throw;

  setHistory(history: Array<Round>) {
    this.history = history;
  }

  random() {
    return THROWS[Math.round(Math.random() * THROWS.length)];
  }
}

export class RandomThrow extends ThrowAlgorithm {
  next() {
    return this.random();
  }
}

export class ConstantThrow extends ThrowAlgorithm {
  private value: Throw;

  constructor(value: Throw) {
    super();
    this.value = value;
  }

  next() {
    return this.value;
  }
}

export class LoopThrow extends ThrowAlgorithm {
  private easy: boolean;
  private iteration: number;
  private length: number;
  private loopValues: Array<number>;

  constructor(seed: number, length: number|null, easy: boolean|null) {
    super();

    // Validate parameters
    this.length = length? length : 3;
    this.easy = easy === true;
    seed = !isNaN(seed)? seed : Math.random();
    
    // Initialize values.
    this.loopValues = (this.length <= 3)? [0, 1, 2] : [0, 1, 2, 0, 1, 2];
    permut(this.loopValues, Math.floor(seed * factorial(this.loopValues.length)));  
    this.iteration = 0;
  }
  
  next() {
    // Calculate the position of the next value and increase interation.
    const next = (this.easy)? Math.floor(this.iteration/2) : this.iteration;
    this.iteration = (this.iteration + 1) % this.length;
        
    // Return value.
    return this.loopValues[next];
  }
}

export class CopyThrow extends ThrowAlgorithm {
  private mask: number;
  private depth: number;
  
  constructor(mask: number, depth: number|null) {
    super();
    this.mask = !isNaN(mask)? mask : Math.floor(Math.random()*3);
    this.depth = depth? depth : 1;
  }
  
  next() {
    let res = 0;
  
    if(this.history.length < this.depth) {
      // In the first round, throw a random value.
      res = this.random();
    } else {
      // Calculate next throw based on the previous player's throw.
      const playerLastThrow = this.history[this.history.length - this.depth].player;
      res = (playerLastThrow + this.mask)%3;
    }
    
    return res;
  }
}

export class MixedThrow extends ThrowAlgorithm {
  private algorithms: Array<ThrowAlgorithm>;
  private duration: number;
  private iteration: number;
  
  constructor(algorithms: Array<ThrowAlgorithm>, duration = 0) {
    super();
    this.algorithms = algorithms;
    this.duration = duration > 0? duration : 3;
    this.iteration = 0;
  }
  
  next() {
    const next = Math.floor(this.iteration/this.duration);
    this.iteration = (this.iteration + 1) % (this.duration * this.algorithms.length);
    return this.algorithms[next].next();
  }

  setHistory(history: Round[]) {
    for(let i=0; i<this.algorithms.length; i++) {
      this.algorithms[i].setHistory(history);
    }      
  }
}

// --- Factory class --- //

export class GameAI {
  static create(type: string|number, settings: AlgorithmSettings) {
    // Initialize parameters.
    settings = settings || {};
    if(!settings.seed) settings.seed = Math.random();
    if(!settings.value) settings.value = Math.floor(settings.seed*3);
    if(!settings.mask) settings.mask = Math.floor(settings.seed*3);
    if(!settings.duration) settings.duration = 3;

    // Initialize algorithm.
    let algorithm;
    if(type == 'constant' || type == 0) {
      algorithm = new ConstantThrow(settings.value);
    } else if(type == 'loop' || type == 1) {
      algorithm = new LoopThrow(settings.seed, settings.length ?? null, settings.easy ?? null);
    } else if(type == 'copy' || type == 2) {
      algorithm = new CopyThrow(settings.mask, settings.depth ?? null);
    } else if(type == 'mixed' || type == 3) {
      const algorithms: ThrowAlgorithm[] = [
        GameAI.create('loop', settings),
        GameAI.create('copy', settings)
      ];
      permut(algorithms, Math.floor(settings.seed * factorial(algorithms.length)));  
      algorithm = new MixedThrow(algorithms, settings.duration);
    } else {
      algorithm = new RandomThrow();
    }
    
    return algorithm;
  }

  static getLevel(number: number) {
    if(number <= 0) {
      return GameAI.random();
    } else {
      if(number == 1) {
        return GameAI.create('constant', {seed: 0});
      
      } else if(number == 2) {
        return GameAI.create('loop', {seed: 0, easy: true, length: 6});
      } else if(number == 3) {
        return GameAI.create('loop', {seed: 0.66, easy: true, length: 5});
            
      } else if(number == 4) {
        return GameAI.create('loop', {seed: 0.4});
      } else if(number == 5) {
        return GameAI.create('loop', {seed: 0.2});
      } else if(number == 7) {
        return GameAI.create('loop', {seed: 0.3, length: 4});
      } else if(number == 9) {
        return GameAI.create('loop', {seed: 0.5, length: 5});
      } else if(number == 11) {
        return GameAI.create('loop', {seed: 0.7, length: 6});
            
      } else if(number == 6) {
        return GameAI.create('copy', {seed: 0});
      } else if(number == 8) {
        return GameAI.create('copy', {seed: 0.4});
      } else if(number == 10) {
        return GameAI.create('copy', {seed: 0.7});
      } else if(number == 12) {
        return GameAI.create('copy', {seed: 0, depth: 2});
            
      } else if(number == 13) {
        return GameAI.create('mixed', {seed: 0});
      } else if(number == 14) {
        return GameAI.create('mixed', {seed: 0.33});
      } else { // number == 15
        return GameAI.create('mixed', {seed: 0.69});
      }
    }
  }

  static random() {
    let res = null;
    const method = Math.floor(Math.random()*27);
    const seed = Math.random();
    const length = Math.round(Math.random()*2) + 4;
    const duration = Math.round(Math.random()*4) + 2;
    
    // Select method.
    if(method < 1) { // p = 1/26
      res = GameAI.create('constant', {'seed': seed});
    } else if(method < 3) { // p = 2/26
      res = GameAI.create('loop', {'seed': seed, 'easy': true, 'length': length});
    } else if(method < 7) { // p = 4/26
      res = GameAI.create('loop', {'seed': seed});
    } else if(method < 11) { // p = 4/26
      res = GameAI.create('loop', {'seed': seed, 'length': length});
    } else if(method < 19) { // p = 8/26
      res = GameAI.create('copy', {'seed': seed});
    } else if(method < 21) { // p = 2/26
      res = GameAI.create('copy', {'seed': seed, 'depth': 2});
    } else { // p = 5/26
      res = GameAI.create('mixed', {'seed': seed, 'duration': duration});
    } 
    
    return res;
  }
}

// // Testing.
// for(var i=1; i<=15; i++) {
    // var res = "";
    // var game = GameAI.getLevel(i);
    // var historical = [];
    // game.setHistory(historical);
    // for(var k=0; k<6; k++) {
        // historical.push({'player': (k%3)});
        // res += game.next() + " ";
    // }
    // console.log(i + ": " + res);
// }