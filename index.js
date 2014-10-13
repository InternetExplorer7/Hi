var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);




app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('new user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:3000');
});

