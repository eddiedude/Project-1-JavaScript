var blessed = require('blessed');


// Create a screen object.
var screen = blessed.screen({
    smartCSR: true,
  });
  
  screen.title = 'my window title';
  
//Chat box
  var box = blessed.box({
    top: '0%',
    left: "0%",
    width: '70%',
    height: '84%',
    keys: true,
    mouse: true,
    alwaysScroll: true,
    scrollable: true,
    scrollbar: {
        ch: ' ',
        bg: 'red'
    },
    border: 
    {
      type: 'line'
    },
    style: 
    {
      fg: 'white',
      bg: 'magenta',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });
  
// input box
  var inputBar = blessed.textbox({
    top: '80%',
    left: "0%",
    width: '70%',
    height: '20%',
    content: 'This will be the input box.',
    keys: true,
    inputOnFocus: true,
    border: 
    {
      type: 'line'
    },
    style: 
    {
      fg: 'white',
      bg: 'green',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });
  
  screen.append(box);
  screen.append(inputBar);
  screen.render();
  inputBar.focus();

  socket.onopen = function opened(){
    box.pushLine("Connected to server");
  };

  

const log = (text) =>{
    box.pushLine(text);
    screen.render();
}

//Sends message 
inputBar.on('submit', (text) => {
    log(text);
    inputBar.focus();
    inputBar.clearValue();
    screen.render();
});

  // Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });