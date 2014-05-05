var express = require('express');
var redis = require("redis"),
        client = redis.createClient(6379,'10.5.24.219');

var server = express();

server.configure(function () {
    server.use(express.logger('dev'));
});

client.on("error", function (err) {
  console.log("Error " + err);
});


server.get('/service/phonewhere/:phonenumber',function(req,res){
  var num = req.param("phonenumber").substring(0,7);
  client.hget("phonewhere",num, function (err, reply) {
        //console.log(reply.toString()); // Will print `OK`
        res.end(reply.toString());
    });
});


var server = server.listen(process.env.PORT || 3000,function(){
  console.log("Listening on port %d",server.address().port)
});

