// const {Storage} = require('@google-cloud/storage'); 
// const storage = new Storage({ 
//      projectId: 'my-project-1534652034762',
//      credentials: {
//           private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//           client_email: process.env.GOOGLE_CLIENT_EMAIL
//      }
// //     credentials: JSON.parse(process.env.GCS_KEYFILE) 
// });
// // Makes an authenticated API request.
// storage
//   .getBuckets()
//   .then((results) => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });                             
// console.log(JSON.parse(process.env.GCS_KEYFILE).project_id);

// const GoogleAuth = require('google-auth-library');

// function authorize() {
//     return new Promise(resolve => {
//         const authFactory = new GoogleAuth();
//         const jwtClient = new authFactory.JWT(
//             process.env.GOOGLE_CLIENT_EMAIL, // defined in Heroku
//             process.env.GOOGLE_PRIVATE_KEY, // defined in Heroku
//             ['https://www.googleapis.com/auth/calendar']
//         );

//         jwtClient.authorize(() => resolve(jwtClient));
//     });
// }

var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var router = express();


const dialogflow = require('dialogflow');
const uuid = require('uuid');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var server = http.createServer(app);
var request = require("request");

app.get('/', (req, res) => {
    console.log(1);
    res.send("Home page. Server running okay.");
});

// Đây là đoạn code để tạo Webhook
app.get('/webhook', function(req, res) {
    console.log(2);
    if (req.query['hub.verify_token'] === 'chatbot') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

// Xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
    console.log(3);
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                // If user send text
                if (message.message.text) {
                    var text = message.message.text;
                    console.log(text); // In tin nhắn người dùng
                    console.log(entries);
                    sendMessage(senderId, "Tui là bot đây: " + text);
                    /**
                     * Send a query to the dialogflow agent, and return the query result.
                     * @param {string} projectId The project to be used
                     */
//                     async function runSample(projectId = 'my-project-1534652034762') {
//                         // A unique identifier for the given session
//                         const sessionId = uuid.v4();
                        
//                         // Create a new session
//                         const sessionClient = new dialogflow.SessionsClient();
//                         const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//                         // The text query request.
//                         const request = {
//                             session: sessionPath,
//                             queryInput: {
//                                 text: {
//                                     // The query to send to the dialogflow agent
//                                     text: text,
//                                     // The language used by the client (en-US)
//                                     languageCode: 'en-US',
//                                 },
//                             },
//                         };
// console.log('đây là:'+sessionId);
//                         // Send request and log result
//                         const responses = await sessionClient.detectIntent(request);
//                         console.log('Detected intent');
//                         const result = responses[0].queryResult;
//                         console.log('Query: ${result.queryText}');
//                         console.log('Response: ${result.fulfillmentText}');
//                         if (result.intent) {
//                             console.log('Intent: ${result.intent.displayName}');
//                         } else {
//                             console.log('No intent matched.');
//                         }
//                     }
//                     runSample();

                }
            }
        }
    }

    res.status(200).send("OK");
});

//tự động gửi tin nhắn đến user
// autoMessage();
// function autoMessage(){
//     app.get('https://graph.facebook.com/2382560798445202?fields=gender&access_token=EAAH17oX3IIIBAAIDNngmB8FSiZB5I43LswJO5gty40efd6BSV72HhqojNdpACllH1vna5JZBDVkhxxaNaZBLHQgDPdLlG7kw7KSZCLtqyI8ZBvfUd5tMSUiRt9oQNcVNNhIZCQ9U7KdOtNe8JawiiY2LJJTYl8ocfPmmqO156sILLhq1hJZAmZAZB', function(res){
//         console.log(res);
//         sendMessage(2382560798445202, "hello babe!");
//     });
// }


// Gửi thông tin tới REST API để trả lời
function sendMessage(senderId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: "EAAH17oX3IIIBAAIDNngmB8FSiZB5I43LswJO5gty40efd6BSV72HhqojNdpACllH1vna5JZBDVkhxxaNaZBLHQgDPdLlG7kw7KSZCLtqyI8ZBvfUd5tMSUiRt9oQNcVNNhIZCQ9U7KdOtNe8JawiiY2LJJTYl8ocfPmmqO156sILLhq1hJZAmZAZB",
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: message
            },
        }
    });
}

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});
// // # SimpleServer
// // A simple chat bot server
// // var logger = require('morgan');
// var http = require('http');
// var bodyParser = require('body-parser');
// var express = require('express');
// var router = express();
//
// var app = express();
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// var server = http.createServer(app);
// var request = require("request");
//
// app.get('/', (req, res) => {
//   res.send("Home page. Server running okay.");
// });
//
// // Đây là đoạn code để tạo Webhook
// app.get('/webhook', function(req, res) {
//   if (req.query['hub.verify_token'] === 'chatbot') {
//     res.send(req.query['hub.challenge']);
//   }
//   res.send('Error, wrong validation token.');
// });
//
// // Xử lý khi có người nhắn tin cho bot
// app.post('/webhook', function(req, res) {
//   var entries = req.body.entry;
//   for (var entry of entries) {
//     var messaging = entry.messaging;
//     for (var message of messaging) {
//       var senderId = message.sender.id;
//       if (message.message) {
//         // If user send text
//         if (message.message.text) {
//           var text = message.message.text;
//           console.log(text); // In tin nhắn người dùng
//           sendMessage(senderId, "Tui là bot đây: " + text);
//         }
//       }
//     }
//   }
//
//   res.status(200).send("OK");
// });
//
//
// // Gửi thông tin tới REST API để trả lời
// function sendMessage(senderId, message) {
//   request({
//     url: 'https://graph.facebook.com/v2.6/me/messages',
//     qs: {
//       access_token: "EAAH17oX3IIIBAAIDNngmB8FSiZB5I43LswJO5gty40efd6BSV72HhqojNdpACllH1vna5JZBDVkhxxaNaZBLHQgDPdLlG7kw7KSZCLtqyI8ZBvfUd5tMSUiRt9oQNcVNNhIZCQ9U7KdOtNe8JawiiY2LJJTYl8ocfPmmqO156sILLhq1hJZAmZAZB",
//     },
//     method: 'POST',
//     json: {
//       recipient: {
//         id: senderId
//       },
//       message: {
//         text: message
//       },
//     }
//   });
// }
// # SimpleServer
// A simple chat bot server
