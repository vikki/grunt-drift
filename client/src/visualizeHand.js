visualizeHand = function(controller){
  var overlay, 
      camera;

  controller.use('playback', {
      recording: '/grab-bones-7-54fps.json.lz', // pre-recorded frame data
      timeBetweenLoops: 1000,
      pauseOnHand: true
  }).on('riggedHand.meshAdded', function(handMesh, leapHand){
      handMesh.material.opacity = 1;
  });

  overlay = controller.plugins.playback.player.overlay;
  overlay.style.right = 0;
  overlay.style.left = 'auto';
  overlay.style.top = 'auto';
  overlay.style.padding = 0;
  overlay.style.bottom = '13px';
  overlay.style.width = '180px';

  controller.use('riggedHand', {
      scale: 1.3,
      boneColors: function (boneMesh, leapHand){
        return {
          hue: 0.1,
          saturation: 1,
          lightness: 0.5
        };
      }
  });

  document.addEventListener('driftActivated', function displayDriftActivated() {
    var driftText = new THREEx.Text('DRIFT ACTIVATED');
    driftText.position.y = 1.5;
    driftText.position.z = 5;
    driftText.material.color.setHex(0xbaf2ef);
    driftText.scale.multiplyScalar(2)
    controller.plugins.riggedHand.scene.add(driftText);
  });

  document.addEventListener('driftJoined', function highlightHandForDrifting() {
    controller.plugins.riggedHand.boneColors = function (boneMesh, leapHand) {
      return { 
        hue: 0.564, 
        saturation: 1, 
        lightness: 0.5
      };
    };
  });

  camera = controller.plugins.riggedHand.camera;
  //camera.position.set(0,20,-25);
  camera.lookAt(new THREE.Vector3(0,3,0));
};