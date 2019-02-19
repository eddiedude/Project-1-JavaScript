To run the code:

REQUIRED PACKAGES FOR "main.js":
-Blessed -> npm install blessed
-WebSocket -> npm install ws

REQUIRED PACKAGES FOR "index.js":
-Websocket -> npm install ws
-Express -> npm install express
-Http -> npm install http
-Url -> npm install url

1) Have all files in the same directory. (index.js, main.js, folder node_modules)
2) index.js must be run FIRST.
3) While index.js is running, you then run main.js
4) If you are connecting to an actual ip address, you must replace localhost with the
ip address. Otherwise leave it as "localhost:4930". This is located at line 84 of "main.js".
5) Once the chat box is up, enter your username, please wait until you are connected
to the server. If rejected you are prompted again to enter a different username.
6) Once connected to the server, you can freely chat with people.
7) Entering "/commands" will tell you all commands available.

Commands:
/whoami - Tells the user their username.

/userlist - Gives the list all users currently connected to the chat server.

/sans - ASCII art of sans.(Additional feature)

/commands - Gives list of commands.

/w>"username">"message" - whispers to a specific user
Ex: /w>Nate>hello this is my message