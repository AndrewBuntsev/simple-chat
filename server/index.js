const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const uuidv4 = require('uuid/v4');

/* #redion data */
const messages = [];
/* #endredion data */

app.get('/api/test', function(req, res){
    res.json({test: 'test message'});
});


app.post('/api/addMessage', function(req, res){
    console.log('Added message: ' + req.body.messageText);
    messages.push({id: uuidv4(), text: req.body.messageText});
});



app.get('/listenMessages', function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const checkInterval = setInterval(() => {
        while(messages.length > 0){
            let msg = messages.shift();
            res.write(`data: ${msg.text}\nid: ${msg.id}\n\n`);
        }
    }, 1000);

    req.on('close', () => {
        clearInterval(checkInterval);
        res.end();
        console.log('Request closed');
    });
  });
  
 

//process.env.PORT

const listener = app.listen(51000, function(){
    console.log('Server are listening on port ' + listener.address().port);
})