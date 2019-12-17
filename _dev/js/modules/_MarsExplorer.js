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
    this.controlArea = document.querySelector('.control-area');    
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
    this.renderRover(x, y, compass, this.rovers.length);

    // Index number acts as the Rover ID.
    return this.rovers.length - 1;
  }

  /* Activate rover by ID. */
  activateRover(index) {
    return !!(this.activeRover = this.rovers[index]);
  }
  
  /* Execute command. */
  execCommand(command) {
      setTimeout(()=>this.printInfo(command), 800)

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
                this.execCommand(cmd.shift())
                if (cmd.length === 0) {                  
                  clearInterval(run)
                  setTimeout(()=>this.getCurrentPosition(), 800)
                }
              }, 800);
  }
  
  /* Return rover positions. */
  getCurrentPosition() {
    return this.rovers.map((rover, i) => {
      const state = rover.getState();
      let xPos = state.pos.x,
          yPos = state.pos.y;
      this.renderRover(xPos, yPos, state.compass, i);
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

  /* UI - Render rover on current position */
  renderRover(x, y, compass, roverId) {
    let xLength = this.size.x,
        yLength = this.size.y;
    this.map.querySelectorAll('.rover-'+roverId).forEach( e=>e.className = 'map__block' );
    this.map.querySelectorAll('.map tr').forEach((elm, idx)=>{
      let yPos = this.size.y - idx;
      if(y==yPos) {
        elm.querySelectorAll('td').forEach((e, i)=>{
          let xPos = i + 1;
          if(x==xPos) {
            this.printInfo(xPos+' '+yPos+' - '+compass)              
            e.className = '';
            switch (compass) {
              case 'N':
                e.classList.add('rover', 'rover-'+roverId, 'north')
                break;
              case 'S':
                e.classList.add('rover', 'rover-'+roverId, 'south')
                break;
              case 'W':
                e.classList.add('rover', 'rover-'+roverId, 'west')
                break;
              case 'E':
                e.classList.add('rover', 'rover-'+roverId, 'east')
                break;
            }
          }
        });
      }      
    });
  }

  /* UI - Print information */
  printInfo(info) {
    const infoItem = document.createElement('li')
    infoItem.appendChild( document.createTextNode(info) )
    this.controlArea.appendChild(infoItem)
  }

};

export default MarsExplorer;