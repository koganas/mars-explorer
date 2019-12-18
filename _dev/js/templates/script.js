import MarsExplorer from '../modules/_MarsExplorer';

(() => {
  const core = {
    init() {
      this.cacheDOM();
    },

    cacheDOM() {
      this.controlArea = document.querySelector('.control-area');
      this.btnCreate = document.querySelector('#newPlateau');
      this.btnAddRover = document.querySelector('#addRover');

      this.btnCreate.addEventListener('click', () => {
        const xSize = document.querySelector('input[name="xSize"]').value,
          ySize = document.querySelector('input[name="ySize"]').value;
        this.marsExplorer = this.newExplorer(Number(xSize), Number(ySize));
      });

      this.btnAddRover.addEventListener('click', () => {
        const x = document.querySelector('input[name="xPos"]').value,
          y = document.querySelector('input[name="yPos"]').value,
          compass = document.querySelector('input[name="compass"]').value,
          command = document.querySelector('input[name="command"]').value;
        this.controlArea.innerHTML = '';
        this.addRover(Number(x), Number(y), compass, command);
      });
    },

    newExplorer(xSize, ySize) {
      return new MarsExplorer(xSize, ySize);
    },

    addRover(x, y, compass, command) {
      this.marsExplorer.addRover(x, y, compass);
      this.marsExplorer.sendCommand(command);
    }
  };
  core.init();
})();
