const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/test', function(req, res){
    res.json({test: 'test message'});
});

app.post('/api/addMessage', function(req, res){
    //console.log('post');
    console.log(req.body.messageText);
});

//process.env.PORT

const listener = app.listen(51000, function(){
    console.log('Server are listening on port ' + listener.address().port);
})