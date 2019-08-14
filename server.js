const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').load()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let routes = require('./api/routes') //importing route
routes(app)

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

global.myNumber; //Delclaration of the global variable - undefined
global.myNumber = 5; //Global variable initialized to value 5. 



const http = require('http'),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {
    res.send('Chat Server is running on port 3000')
});
io.on('connection', (socket) => {

    console.log('user connected')

    socket.on('join', function (userNickname) {

        console.log(userNickname + " : has joined the chat ");

        socket.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");
    }).on("Client-sent-data", function (data) {
        //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
        socket.emit("Server-sent-data", data);
    });


    socket.on('messagedetection', (senderNickname, messageContent) => {

        //log the message in console 

        console.log(senderNickname + " :" + messageContent)
        //create a message object 
        let message = { "message": messageContent, "senderNickname": senderNickname }
        // send the message to the client side  
        io.emit('message', message);

    });

    socket.on('disconnect', function () {
        console.log(' user has left ')
        socket.broadcast.emit("userdisconnect", " user has left ")

    });


});



server.listen(port, () => {

    console.log('Node app is running on port 3000');

});