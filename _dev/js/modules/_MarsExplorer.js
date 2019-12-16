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

    this.map = document.querySelector('.map'); 
    this.createPlateau();
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
    this.paintBlock(x, y, compass, this.rovers.length);

    // Index number acts as the Rover ID.
    return this.rovers.length - 1;
  }

  /* Activate rover by ID. */
  activateRover(index) {
    return !!(this.activeRover = this.rovers[index]);
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
  sendCommand(commandList, id) {    
    let cmd = [...commandList],
        run = setInterval(()=>{
                this.getCurrentPosition(id)
                console.log(cmd[0])
                this.execCommand(cmd.shift())
                if (cmd.length === 0) {                  
                  clearInterval(run)
                  setTimeout(()=>this.getCurrentPosition(id), 800)
                }
              }, 800);

/*
    [...commandList].map((cmd, i, array)=>{
      const arraySize = array.length - 1;
      let run;

      this.execCommand(cmd)
      if(i === 0) {
        this.getCurrentPosition()
      } else if(i < arraySize && i != 0) {
        run = setInterval(()=>{
          this.getCurrentPosition()
        }, 1000);
      } else {
        clearInterval(run);
      }
      
    })
*/

  }
  
  /* Return array of rover final positions. */
  getCurrentPosition(id) {
    return this.rovers.map(rover => {
      const state = rover.getState();
      let xPos = (state.pos.x===0) ? 1 : state.pos.x,
          yPos = (state.pos.y===0) ? 1 : state.pos.y;
      this.paintBlock(xPos, yPos, state.compass, id);
      return `${xPos} ${yPos} ${state.compass}`;
    });
  }

  /* UI - Create plateau grid */
  createPlateau() {
    let x = this.size.x,
        y = this.size.y;    
    this.map.innerHTML = '';
    for (let i = x; i > 0; i--) {
      let tr = document.createElement('tr');
      for (let _i = y; _i > 0; _i--) {
        tr.insertAdjacentHTML('afterbegin', '<td class="map__block"></td>');
      }
      this.map.insertAdjacentElement('afterbegin', tr);
    }
  }

  /* UI - Paint position */
  paintBlock(x, y, compass, rover) {
    let xLength = this.size.x,
        yLength = this.size.y;
    console.log(rover);
    this.activateRover(rover);
    this.map.querySelectorAll('.R'+rover).forEach( e=>e.className = 'map__block' );
    this.map.querySelectorAll('.map tr').forEach((e, i)=>{
      let yPos = this.size.y - i;
      if(y==yPos) {
        e.querySelectorAll('td').forEach((elm,i)=>{
          let xPos = i + 1;
          if(x==xPos) {
            console.log(xPos, yPos, compass);
            elm.className = '';
            switch (compass) {
              case 'N':
                elm.classList.add('R'+rover, 'rover', 'north')
                break;
              case 'S':
                elm.classList.add('R'+rover, 'rover', 'south')
                break;
              case 'W':
                elm.classList.add('R'+rover, 'rover', 'west')
                break;
              case 'E':
                elm.classList.add('R'+rover, 'rover', 'east')
                break;
            }
          }
        });
      }      
    });
  }

};

export default MarsExplorer;