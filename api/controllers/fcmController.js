'use strict'

const util = require('util')

module.exports = {
    pushmsg: (req, res) => {
        var message = {
            topic: "/topics/news",
            android: {
                data: {    //This is only optional, you can send any data
                    score: '850',
                    time: '2:45'
                },
                priority: "high",
                ttl:0,
            }
        };
        globalFCM.send(message, function (err, response) {
            if (err) {
                console.log('error found', err);
            } else {
                console.log('response here', response);
            }
        })

        res.json({ message: 'Insert success!' })

    }
}