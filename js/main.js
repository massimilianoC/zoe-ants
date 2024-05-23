'use strict';
    
    var camName="HD Pro";
    var offsetAnimation = 0;
    var timer;
    var counter=0;
    var i=0;

    var screenshotButton = document.querySelector('#screenshot-button');
    const img = document.querySelector('img');
    const video = document.querySelector('#main-video');
    var canvas = document.createElement('canvas');
    var currentCameraIndex = 0;
    
    var constraints= {
        audio:null,
        video:null
      };
    var videoElement = document.querySelector('video');
    var audioSelect = document.querySelector('select#audioSource');
    var videoSelect = document.querySelector('select#videoSource');

    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false }) .then((stream) => {
      video.srcObject = stream;
      video.play();
    }).catch(handleError);

    audioSelect.onchange = getStream;
    videoSelect.onchange = getStream;

    function gotDevices(deviceInfos) {
      console.log(deviceInfos);
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
          option.text = deviceInfo.label ||
            'microphone ' + (audioSelect.length + 1);
          audioSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
          option.text = deviceInfo.label || 'camera ' +
            (videoSelect.length + 1);
                videoSelect.appendChild(option);
        } else {
          console.log('Found one other kind of source/device: ', deviceInfo);
        }
      }
    }

    function getStream() {
      if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      }

     constraints = {
        audio: {
          deviceId: {exact: audioSelect.value}
        },
        video: {
          deviceId: {exact: videoSelect.value}
        }
      };

      navigator.mediaDevices.getUserMedia(constraints).
        then(gotStream).catch(handleError);
    }

    function gotStream(stream) {
      window.stream = stream; // make stream available to console
      videoElement.srcObject = stream;
    }

    function handleError(error) {
      console.log('Error: ', error);
    }

    function createNewItem(){
        //reset condition
        if (counter>=80){
            for(i=0;i<counter;i++){
                var ant = document.querySelector('.ball');
                ant.parentNode.removeChild(ant);
                //counter--;
            }
            counter=0;
        }
        
        //init new ant
        var elem = document.createElement('canvas');
        elem.setAttribute("id","new_item"+Math.random().toString());   
        switch(offsetAnimation){
            case 0:
                elem.setAttribute("class","masked ball");
                offsetAnimation=1;
                break;
            case 1:
                elem.setAttribute("class","masked ball delay1");
                offsetAnimation=2;
                break;
            case 2:
                elem.setAttribute("class","masked ball delay2");
                offsetAnimation=3;
                break;
            case 3:
                elem.setAttribute("class","masked ball delay3");
                offsetAnimation=4;
                break;
            case 4:
                elem.setAttribute("class","masked ball delay4");
                offsetAnimation=5;
                break;
            case 5:
                elem.setAttribute("class","masked ball delay5");
                offsetAnimation=6;
                break;
            case 6:
                elem.setAttribute("class","masked ball delay6");
                offsetAnimation=0;
                break;
        }
        counter++;
        document.body.appendChild(elem);
        canvas = elem;
        
    }

    screenshotButton.onclick = function() {
        createNewItem();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      img.src = canvas.toDataURL('image/webp');
    };  

    
    
    // listen for any key presses
  document.addEventListener('keydown', function (e) {
    if (e.altKey) {
      // alt is pressed
        //capture screen and create ant
        screenshotButton.click();
        e.preventDefault();
      console.log('Key: ' + e.key + '; alt pressed: ' + e.altKey + '; ctrl pressed: ' + e.ctrlKey);
    } else if (e.ctrlKey){
        //ctrl is pressed
        //switch camera
        currentCameraIndex++;
        console.log("videoSelect.length "+videoSelect.length);
        console.log("videoSelect[0] "+videoSelect.item(0).value);
        console.log(videoSelect);
        if(currentCameraIndex >= videoSelect.length){
            currentCameraIndex=0;
        };
        videoSelect.value=videoSelect.item(currentCameraIndex).value;
        videoSelect.onchange();
       
    }
  });
    
