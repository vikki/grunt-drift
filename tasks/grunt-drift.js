var extendGruntPlugin = require('extend-grunt-plugin'),
    socketio = require('socket.io');

module.exports = function (grunt) {
  grunt.registerMultiTask('drift', function () {
    var options =  {
        options: {
          port: 3000,
          keepalive: true,
          hostname: '*',
          onCreateServer: function(server, connect, options, done) {
            var REQUIRED_DRIFTERS = 2;

            var io,
                drifters = [];

            console.log('To join the drift, head to ' + 'http://localhost:' +options.port + '/client')

            io = socketio.listen(server);

            io.sockets.on('connection', function(socket) {
              console.log('new connection from ' + socket.conn.id);

              // TODO only send the drift on status change from the client
              socket.on('driftJoined', function(msg){
                if (drifters.indexOf(socket.conn.id) === -1) {
                  drifters.push(socket.conn.id);  
                  console.log('new drifter: ' + socket.conn.id);
                }
                
                console.log(drifters.length + ' drifters');

                if (drifters.length >= REQUIRED_DRIFTERS) {
                  io.sockets.emit('drift activated', { for: 'everyone' });
                  done();
                }
              });

              socket.on('disconnect', function(){
                console.log('user disconnected');
              });

            });
          }
        }
    };

    // Creates a "connect:drift" target on grunt, that can be run later
    extendGruntPlugin(grunt, require('grunt-contrib-connect/tasks/connect'), {
      'connect.drift' : options
    });

    // Runs the "connect:" subtask :)
    grunt.task.run('connect:drift');
  });
};