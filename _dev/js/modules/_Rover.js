class Rover {
  constructor(x, y, compass) {
    this.pos = {
      x, y
    };
    
    this.compass = compass;
  }
  
  /* Get current state. */
  getState() {
    return {
      pos: this.pos,
      compass: this.compass
    }
  }

  /* Rotate 90º to given direction. L or R. */
  rotate(to) {
    this.compass = Rover.rotateMap[this.compass][to];
  }
  
  /* Move 1 step forward. */
  move(direction) {
    const moveBy = Rover.moveMap[this.compass],
          nextPos = { x: this.pos.x, y: this.pos.y };
    nextPos[moveBy.axis] += moveBy.count; // Set next position
    const canMove = direction(nextPos); // Check if move is possible.    
    if (canMove) { // Update position if move is possible.
      this.pos = nextPos;
    }
  }

}

/* Rotate map by directions. */
Rover.rotateMap = {
  N: { L: 'W', R: 'E' },
  S: { L: 'E', R: 'W' },
  E: { L: 'N', R: 'S' },
  W: { L: 'S', R: 'N' }
};

/* Move map by directions. */
Rover.moveMap = {
  N: { axis: 'y', count: +1 },
  S: { axis: 'y', count: -1 },
  E: { axis: 'x', count: +1 },
  W: { axis: 'x', count: -1 }
};

export default Rover;