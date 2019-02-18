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
    mouse: true,
    vi: true,
    alwaysScroll: true,
    clickable: true,
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
    var array = text.split(">");
    if(!picked_username)
    {
      var username = text;
      var WSstring = ("ws://localhost:4930/?username=");
      var newstring = WSstring + username;
      socket = new WebSocket(newstring); 
      Connection(socket);
      inputBar.focus();
      inputBar.clearValue();
      inputBar.render();
    }
    else
    {
      if(text == '/userlist') //If command is /userlist
      {
        var messagetosend =
        {
          from: username,
          to: "",
          kind: "userlist",
          data: ""
        }
        socket.send(JSON.stringify(messagetosend));
        inputBar.focus();
        inputBar.clearValue();
        screen.render();
      }
      else if(text == "/whoami") //if command is /whoami
      {
        var messagetosend =
        {
          from: username,
          to: "",
          kind: "whoami",
          data: ""
        }
        socket.send(JSON.stringify(messagetosend));
        inputBar.focus();
        inputBar.clearValue();
        screen.render();
      }
      else if(text == "/commands")
      {
        log("'/whoami' - Tells your username.\n'/userlist' - Gives the userlist of connected users in chat server.\n'/w>'username'>'message' - allows you to whisper to a sepcific user'");
        box.setScrollPerc(100);
        inputBar.focus();
        inputBar.clearValue();
        screen.render();
      }
      else if(array[0] == "/w")
      {
        var messagetosend =
        {
          from: username,
          to: array[1],
          kind: "direct",
          data: array[2]
        }
        socket.send(JSON.stringify(messagetosend));
        inputBar.focus();
        inputBar.clearValue();
        screen.render();
      }
      else //Sends message to entire server
      {
        var messagetosend =
        {
          from: username,
          to: "all",
          kind: "chat",
          data: text
        }
        socket.send(JSON.stringify(messagetosend));
        inputBar.focus();
        inputBar.clearValue();
        screen.render();
      }
    }
  })
}

login();

function Connection(socket){
  socket.onopen = function(){
    log("Connected to server");
  };
  socket.onmessage = function readmessage(messageEvent){
    var recievedmessage = JSON.parse(messageEvent.data);
    if(recievedmessage.from == "GABServer")
    {
      log(recievedmessage.data);
    }
    else
    {
      log(recievedmessage.from + ": " + recievedmessage.data);
    }

    if(recievedmessage.data == 'Your username is invalid, please try again with the GET parameter "username". Usernames must '
    + 'be alphanumeric between 3 and 10 characters. Terminating Connection.' || recievedmessage.data == 'Your username is taken, please try again with a different name. Terminating Connection.')
    {
      picked_username = false;
    }
    else
    {
      picked_username = true;
    }
    box.setScrollPerc(100);
    screen.render();
  };
};

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});