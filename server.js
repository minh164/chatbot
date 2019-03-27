var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var router = express();

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var server = http.createServer(app);
var request = require("request");

app.get('/', (req, res) => {
    
    res.send("Home page. Server running okay.");
});

// Đây là đoạn code để tạo Webhook
app.get('/webhook', function(req, res) {
    
    if (req.query['hub.verify_token'] === 'chatbot') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

// Xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
    
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
                    sendMessage(senderId, "Tui là bot đây: " + text);
                }
            }
        }
    }

    res.status(200).send("OK");
});

// //tự động gửi tin nhắn đến user
// sendMessage(2382560798445202, "hello babe!");

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
app.set('ip', process.env.IP || "127.0.0.1");

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});
