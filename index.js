var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicknames = [];




app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var updatenicknames = function(){
		io.emit('username', nicknames);
	}
	console.log('new user connected');
	socket.on('new user', function(data,callback){
if(nicknames.indexOf(data) != -1){
	callback(false);
} else{
	callback(true);
	socket.nickname = data;
	nicknames.push(socket.nickname);
	console.log('bout to emit');
	console.log(socket.nickname);
	updatenicknames();
}
	});
  socket.on('chat message', function(msg){
  	console.log(msg);
    io.emit('chat message', msg, socket.nickname);
  });
  socket.on('disconnect' , function(msg){
  	console.log(socket.nickname + " Has disconnected");
  	 if(!socket.nickname) return;
  	 nicknames.splice(nicknames.indexOf(socket.nickname), 1);
  	 updatenicknames();
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on port' + process.env.PORT);
});
