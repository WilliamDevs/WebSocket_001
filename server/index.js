// const express = require('express')
// const app = express()
// const server = require('http'.createServer(app))

// const WebSocket = require("ws")
const { createServer } = require("http");
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:5173/'
    }
});

let playerScores = [];

io.on("connection", (socket) => {
    // console.log(socket);


    // socket.on('message',(data) =>{
    //     console.log(data);
    // });

    // socket.emit("message","Hello");

    socket.on("scores",(scores) => {

        playerScores.push({...scores, id:socket.id});
        console.log(playerScores);

        socket.emit("playerScores",playerScores); 


        
     setInterval(() => {
        socket.emit("playerScores",playerScores); 
        
     }, 10000);
     });



    
});


httpServer.listen(3000, () =>{

})
// const websocketServer = new WebSocket({server})


// app.get("/",(req,res) => res.send("Hello World"))


// server.listen(3000,()=> console.log("Server running at port 3000"))