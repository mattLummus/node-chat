'use strict';

exports.connection = function(socket){
  socket.emit('online', {date: new Date()});
  socket.on('newMessage', messageReceived);
};

function messageReceived(data){
  var socket = this;
  socket.broadcast.emit('message', data);
  socket.emit('message', data);
}
