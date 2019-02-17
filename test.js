var WebSocket = require('ws');
var blessed = require('blessed');

var socket;
var screen = blessed.screen({
  smartCSR: true,
});
//Creates an input bar.
var inputBar = blessed.textbox({
    top: '80%',
    left: "0%",
    width: '70%',
    height: '20%',
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

var picked_username = false;

function login(){
  inputBar.focus();  
  log("Enter a username to use");
  inputBar.on('submit', function (text){
    if(!picked_username)
    {
      var username = text;
      var WSstring = ("ws://localhost:4930/?username=");
      var newstring = WSstring + username;
      socket = new WebSocket(newstring); //socket.on('open') should be called
      Connection(socket);
      picked_username = true;
      inputBar.focus();
    }
    else
    {
      if(text == '/userlist')
      {
        var messagetosend =
        {
          from: "Edmund",
          to: "",
          kind: "userlist",
          data: ""
        }
      }
      else if(text == "/whoami")
      {
        var messagetosend =
        {
          from: "Edmund",
          to: "",
          kind: "whoami",
          data: ""
        }
      }
      else
      {
        var messagetosend =
        {
          from: "Edmund",
          to: "all",
          kind: "chat",
          data: text
        }
      }

      socket.send(JSON.stringify(messagetosend));
      inputBar.focus();
    }
  })
}
/*
login().then(async function(){
  await Connection(socket);
}).catch(error =>{
 log(error);
});
*/
login();

function Connection(socket){
  socket.onopen = function(){
    log("Connected to server");
  };
  socket.onmessage = function readmessage(messageEvent){
    var recievedmessage = JSON.parse(messageEvent.data);
    log(recievedmessage.data);
  };
};

/*
function login(){
    log("Enter username");
    inputBar.focus();
    
    promise.then(function(){
      inputBar.on('submit', function (text) {
        var username = text;
        var WSstring = ("ws://localhost:4930/?username=");
        var thestring = WSstring + username;
        log("Before return string");
        //CreateWS(thestring);
        i = thestring;
      })
    }).then(function(data){  
        log(data);
        CreateWS(thestring);
      }).catch(function(error){
        console.log(error);
      });
}

const promise = new Promise(function (resolve, reject){

  resolve(log("HEllo"));
  
});
*/



// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});