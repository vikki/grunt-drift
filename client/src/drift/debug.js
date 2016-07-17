function debug(frame) {
  var output = document.getElementById('output'),
      driftChecker = document.getElementById('driftChecker'),
      progress0 = document.getElementById('progress0'),
      progress1 = document.getElementById('progress1'),
      handCount = document.getElementById('handCount');

      handCount.innerHTML = frame.hands.length;

  if (frame.hands.length >=1){
    handCount.innerHTML += '</br> 1st hand pitch == ' + radToDeg(frame.hands[0].pitch());
  }

  frame.hands.forEach(function(hand, index) {
    output.innerHTML = hand.grabStrength.toPrecision(2);
    window['progress' + index].style.width = hand.grabStrength * 100 + '%';

    //handCount.innerHTML += 'hand ' + index + ' ' + hand.palmPosition + '</br>';
  });
}