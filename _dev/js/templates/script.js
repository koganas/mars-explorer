import MarsExplorer from '../modules/_MarsExplorer';

(() => {
  const core = {
    init() {
    	this.cacheDOM();
    },

    cacheDOM() {
      const marsExplorer = new MarsExplorer(5, 5);
      marsExplorer.addRover(1, 2, 'N');
      marsExplorer.sendCommand('LMLMLMLMM', 0);
    }
  };
  core.init();
})();
