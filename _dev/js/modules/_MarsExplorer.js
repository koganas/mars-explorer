import Rover from './_Rover';

class MarsExplorer {

  constructor(xSize, ySize) {
    this.size = {
      x: xSize,
      y: ySize
    };
    
    this.rovers = [];
    this.activeRover = null;

    this.checkPosition = this.checkPosition.bind(this);
    this.execCommand = this.execCommand.bind(this);
  }

  /* Check for borders and rover collisions. */
  checkPosition(nextPos) {
    return (
      this.positionExists(nextPos) &&
      !this.getRoverByPosition(nextPos)
    );
  }

  /* Check if given coordinates exist on the defined area. */
  positionExists({ x, y }) {
    return (
      x > -1 && y > -1 &&
      x <= this.size.x &&
      y <= this.size.y
    );
  }

  /* Get rover on given position. */
  getRoverByPosition({ x, y }) {
    return this.rovers.find(rover => {
      const state = rover.getState();
      return state.pos.x === x && state.pos.y === y;  
    });
  }

  /* Add and activate rover. */ 
  addRover(x, y, compass) {
    this.activeRover = null;

    // Prevent collision / adding rover over another one.
    if (!this.checkPosition({ x, y })) return false;

    // Create rover.
    const rover = new Rover(x, y, compass);
    this.rovers.push(rover);
    this.activeRover = rover;

    // Index number acts as the Rover ID.
    return this.rovers.length - 1;
  }
  
  /* Execute command. */
  execCommand(command) {
      if (!this.activeRover)
        return false;

      if (command === 'M') {
        return this.activeRover.move(this.checkPosition);
      }
      
      if (command === 'L' || command === 'R') {
        return this.activeRover.rotate(command);
      }
  }

  /* Convert command string to array and send each command to active rover. */
  sendCommand(commandList) {
    let cmd = [...commandList],
        run = setInterval(()=>{
                this.getCurrentPosition()
                console.log(cmd[0])
                this.execCommand(cmd.shift())
                if (cmd.length === 0) {                  
                  clearInterval(run)
                  setTimeout(()=>this.getCurrentPosition(), 800)
                }
              }, 800);
  }
  
  /* Return array of rover final positions. */
  getCurrentPosition() {
    return this.rovers.map(rover => {
      const state = rover.getState();
      let xPos = (state.pos.x===0) ? 1 : state.pos.x,
          yPos = (state.pos.y===0) ? 1 : state.pos.y;
      console.log(xPos, yPos, state.compass);
      return `${xPos} ${yPos} ${state.compass}`;
    });
  }

};

export default MarsExplorer;