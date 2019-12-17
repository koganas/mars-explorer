# Mars Explorer Project

## Installation + Build
This project uses Javascript, postCSS and Nunjucks as template engine.
``` bash
# install dependencies
yarn

# build html and assets
gulp
```

## Documentation

### _Rover.js
A class module that returns current rover position and orientation and also functions that could change its state. Functions: `getState()`, `rotate()` and `move()`.

### _MarsExplorer.js
A class module that controls all the mission functions. Listed by functionality:

- Position check: a group of functions that checks the availability of the position. `checkPosition()`, `positionExists()`, `getRoverByPosition()`;
- Rover: `addRover()` to add a new rover to the array and `activateRover()` to activate a specific rover.
- Commands: `execCommand()` check if rover will move or rotate, `sendCommand()` send each command in intervals, `getCurrentPosition()` get the position state and renders it;
- UI: `createPlateau()` creates the table with the form entries. `renderRover()` renders rover inside table on current positon, `printInfo()` returns position, orientation and movement inside the control area list;

### script.js
Wraps the explorer files and adds listeners to the form elements.