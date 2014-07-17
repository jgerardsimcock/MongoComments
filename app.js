var restify = require('restify'); //ROUTE HANDLING
// var fs = require('fs');//FILE HANDLING
var mongoose = require('mongoose'); //THIS ACCESSES THE MONGOOSE MODULE
//THIS POINTS TO OUR DATABASE ON MONGOLABS.COM 
// GO TO YOUR MONGOLABS, ADD USER AND YOU WILL SEE THIS INFORMATION. 
//YOU WILL SEE A USER NAME AND PASSWORD SECTION RIGHT AFTER //. ADD YOUR THE USERS INFO THERE 
mongoose.connect('mongodb://user1:1234@ds027719.mongolab.com:27719/mongocomments')

//CREATES SCHEMA
//THE VAR NAME IS FLEXIBLE BUT THE MONGOOSE.SCHEMA IS REQUIRED
//SINCE EVERYTHING IS DERIVED FROM A SCHEMA WE CAN SET THE MONGOOSE SCHEMA TO A VARIABLE AND CALL IT LATER 
var Schema = mongoose.Schema;



//DEFINE SCHEMA
//WE ARE REDASSIGNING OUR SCHEMA TO A VARIABLE CALLED COMMENTSCHEMA
//THE SCHEMA HAS A PROPERTY COMMENT THAT TAKES A STRING.
var commentSchema = new Schema({
  comment:  String,
  created_at: Date
  
  });


//VAR NAME IS FLEXIBLE BUT MONGOOSE.MODEL IS REQUIRED. 
//WE COMPILE OUR SCHEMA INTO A MODEL.
//MODEL IS A CLASS IN WHICH WE CONSTRUCT DOCUMENTS
var Comment = mongoose.model('poops', commentSchema);

var server = restify.createServer({
    name: 'app',
    version: '0.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', function(req,res){
  var body = " ";


  Comment.find(function(err, things){
    for(i in things){
      console.log(things[i].comment);
      body += things[i].comment;
      
    }

    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    });

    res.write(body);
    res.send();
  });
});

server.post('/post_comment', function (req, res){
  var comment = new Comment({ //THIS IS PART OF MONGOOSE MODULE
    comment: req.body.comment //THE COMMENT: PART GETS ITS INITIALIZATION FROM LINE 20.
    , created_at: Date.now() 
  });
            //PARAMETER COMMENT WILL BE READING FIELF "COMMENT" FROM CLIENT 
  comment.save(function(err){
  
    res.send("Your comments have been saved");

  });

});


server.listen(1337, function(){
  console.log('%s listening at %s', server.name, server.url);
});