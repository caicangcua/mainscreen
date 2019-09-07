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

    socket.on('join', function (args) {

        console.log(args.id + " - Time: " + args.time + " - accuracy " + args.accuracy + " Lat:" + args.lat + " Lng:" + args.lng + " Speed:" + args.speed);

        socket.broadcast.emit('userjoinedthechat', args.id + " : has joined the chat ");

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


var fcm = require('fcm-notification');
globalFCM = new fcm('brick-d29e0-firebase-adminsdk-sd2v2-528e31d459.json');




function replyUPSTREAM(token) {
    var message = {
        token: token,
        android: {
            data: {    //This is only optional, you can send any data
                score: '850',
                time: '2:45'
            },
            priority: "high",
            ttl: 0,
        }
    };
    globalFCM.send(message, function (err, response) {
        if (err) {
            console.log('error found', err);
        } else {
            console.log('response here', response);
        }
    })
}




//var xmpp = require('node-xmpp');

////Set node-xmpp options.
////Replace with your projectID in the jid and your API key in the password
////The key settings for CCS are the last two to force SSL and Plain SASL auth.
//var options = {
//  type: 'client',
//  jid: '310577562177@fcm.googleapis.com',
//  password: 'AAAASE_dgkE:APA91bEkaAYfzNQ-YOsHEa9HgHfcNE03N4N_UOVDrfurAONv913EGsJEwsZ0I19BA91SoFFFL4hAlLfIVbdbynPR4YgCP7X9TD-_RAlF9Mj0LQp4Y1fJiV7GQpdwqubmlUCsvy02doI-',
//  port: 5235,
//  host:  "fcm-xmpp.googleapis.com",
//  legacySSL: true,
//  preferredSaslMechanism : 'PLAIN'
//};

//console.log('creating xmpp app');

//var cl = new xmpp.Client(options);
//cl.on('online',
//  function() {
//    console.log("online");
//  });

//cl.on('stanza',
//  function(stanza) {
//    if (stanza.is('message') &&
//        // Best to ignore an error
//        stanza.attrs.type !== 'error') {


      
//      //Message format as per here: https://developer.android.com/google/gcm/ccs.html#upstream
//      var messageData = JSON.parse(stanza.getChildText("gcm"));

//      console.log("Message received from: " + messageData.from);

//      if (messageData && messageData.message_type != "ack" && messageData.message_type != "nack") {

//        var ackMsg = new xmpp.Element('message').c('gcm', { xmlns: 'google:mobile:data' }).t(JSON.stringify({
//            "to": messageData.from,
//            "message_id": messageData.message_id,
//            "message_type":"ack"
//          }));
//          //send back the ack.
//        cl.send(ackMsg);
//        console.log("Sent ack");

//        //setTimeout(function () {
//        //    replyUPSTREAM(messageData.from);
//        //    console.log("Sent replyMsg");
//        //});

//        //Now do something useful here with the message
//        //e.g. awesomefunction(messageData);
//        //but let's just log it.
//        console.log(messageData);

//      } else {
//        //Need to do something more here for a nack.
//        console.log("message was an ack or nack...discarding");
//      }

//    } else {
//      console.log("error");
//      console.log(stanza)
//    }

//  });

//cl.on('error',
// function(e) {
//   console.log("Error occured:");
//   console.error(e);
//   console.error(e.children);
// });




 var https = require('https');
 function startKeepAlive() {
    setInterval(function() {
        var req = https.get("https://jshared.herokuapp.com/products", function(res){
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 5*60*1000); // load every 20 minutes
}

startKeepAlive();


server.listen(port, () => {

    console.log('Node app is running on port 3000');

});