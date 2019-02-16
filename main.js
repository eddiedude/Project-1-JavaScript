var WebSocket = require('ws');
const readline = require('readline');
var blessed = require('blessed');

const socket = new WebSocket("ws://localhost:4930/?username=NotMe");


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

  var messagetosend =
  {
      from: "NotMe",
      to: "all",
      kind: "chat",
      data: text
  }

  socket.send(JSON.stringify(messagetosend));
  inputBar.focus();
  inputBar.clearValue();
  screen.render();
});

//When the user receives a message
socket.onmessage = function readmessage(messageEvent){
  var recievedmessage = JSON.parse(messageEvent.data);
  log(recievedmessage.data);
};

  // Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

//When user loses connection.
socket.onclose = function closedmessage(){
  log("disconnected");
};

//Upon opened connection fires this.
socket.onopen = function opened(){
  box.pushLine("Connected to server");
};


//Allows the user to input messages and send to server.


/*
rl.on('line', (input) => {
    
    if(input == "userlist")
    {
        var messagetosend =
        {
            from: "NotMe",
            to: "",
            kind: "userlist",
            data: ""
        }

        socket.send(JSON.stringify(messagetosend));
    }
    else
    {
        var messagetosend =
        {
            from: "NotMe",
            to: "all",
            kind: "chat",
            data: input
        }
        socket.send(JSON.stringify(messagetosend));
    }
});
*/


