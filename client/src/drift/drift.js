var socket = io();

socket.on('drift activated', function() {
  document.dispatchEvent(new CustomEvent('driftActivated'));
});

Leap.loop(function(frame) {
  debug(frame);

  window.drift = function drift() {
    socket.emit('driftJoined');
    document.dispatchEvent(new CustomEvent('driftJoined'));
  }

  if (isDrifting(frame.hands)) {
    drift();
  }
});