var WebSocket = require('ws');
var blessed = require('blessed');
var globalstring = "";

var screen = blessed.screen({
  smartCSR: true,
});
//Creates an input bar.
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
//Creates a chat box
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
screen.append(box);
screen.append(inputBar);
screen.render();

//Pushes line to chat box.
const log = (text) =>{
    box.pushLine(text);
    screen.render();
}

inputBar.on('submit', (text) =>{
  

})


/*
function login(){
    log("Enter username");
    inputBar.focus();
    inputBar.on('submit', (text)=>
    {
      var username = text;
      var WSstring = ("ws://localhost:4930/?username=");
      var thestring = WSstring + username;
      return thestring;
    });
}
*/
/*
async function Connection(socket){
  socket.onopen = function(){
    log("Connected to server");
  };
  socket.onmessage = function readmessage(messageEvent){
    var recievedmessage = JSON.parse(messageEvent.data);
    log(recievedmessage.data);
  };

};
*/
/*
async function afterlogin(){
  log("hello");
  inputBar.focus();
  inputBar.clearValue();
  //Sends message 
inputBar.on('submit', (text) => {

  var messagetosend={
    from: "Edmund",
    to: "all",
    kind: "chat",
    data: text
  }
  socket.send(JSON.stringify(messagetosend));
  inputBar.focus();
  inputBar.clearValue();
  screen.render();
});
}
*/


// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});