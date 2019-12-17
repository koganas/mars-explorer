import MarsExplorer from '../modules/_MarsExplorer';

(() => {
  const core = {
    init() {
      this.cacheDOM();
    },

    cacheDOM() {
      this.controlArea = document.querySelector('.control-area');
      this.button = document.querySelector('#btnAdd');
      this.button.addEventListener('click', () => {
        const xSize = document.querySelector('input[name="xSize"]').value,
          ySize = document.querySelector('input[name="ySize"]').value,
          x = document.querySelector('input[name="xPos"]').value,
          y = document.querySelector('input[name="yPos"]').value,
          compass = document.querySelector('input[name="compass"]').value,
          command = document.querySelector('input[name="command"]').value;
        this.controlArea.innerHTML = '';
        //console.log(Number(xSize), Number(ySize), Number(x), Number(y), compass, command);
        this.addRover(Number(xSize), Number(ySize), Number(x), Number(y), compass, command);
      });
    },

    newExplorer(xSize, ySize) {
      const newExplorer = new MarsExplorer(xSize, ySize);
      return newExplorer;
    },

    addRover(xSize, ySize, x, y, compass, command) {
      const marsExplorer = this.newExplorer(xSize, ySize);
      marsExplorer.addRover(x, y, compass);
      marsExplorer.sendCommand(command);
    }
  };
  core.init();
})();
