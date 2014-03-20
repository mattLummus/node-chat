/* global io:true */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    initializeSocketIO();
    $('button').click(sendMessage);
  }
  var socket;

  function initializeSocketIO(){
    socket = io.connect('/app');
    socket.on('online', function(data){console.log(data);});
    socket.on('message', addMessage);
  }

  function sendMessage(){
    var data = {};
    data.text = $('textarea').val();
    data.date = new Date();
    socket.emit('newMessage', data);
  }

  function addMessage(data){
    console.log('received message from node', data);
    var $message = $('<li>');
    var date = moment(data.date).calendar();
    $message.text(date+':   '+data.text);
    $('#messages').append($message);
  }

})();
