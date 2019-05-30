//Server-Sent Events implementation

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.options('*', cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const uuidv4 = require('uuid/v4');

/* #redion data */
const messages = [];
const clients = [];
/* #endredion data */

app.get('/api/test', function(req, res){
    res.json({test: 'test message'});
});


app.post('/api/addMessage', function(req, res){
    let newMessage = {timestamp: (new Date()).getTime(), text: req.body.messageText};
    console.log('Added message: %o', newMessage);
    messages.push(newMessage);
    res.end();
});



app.get('/listenMessages', function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    let timestamp = (new Date()).getTime();
    clients.push(req);
    const checkInterval = setInterval(() => {
        let newMessages = messages.filter(m => m.timestamp > timestamp);
        if (newMessages.length > 0){
            timestamp = newMessages[newMessages.length - 1].timestamp;
            newMessages.forEach(msg => res.write(`data: ${msg.text}\n\n`));
        }
    }, 1000);

    req.on('close', () => {
        clearInterval(checkInterval);
        clients.splice(clients.indexOf(req), 1);
        res.end();
        console.log('Request closed');
    });
  });
  
 

//process.env.PORT

const listener = app.listen(51000, function(){
    console.log('Server are listening on port ' + listener.address().port);
})