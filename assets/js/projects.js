// Get current time
document.getElementById("get-time").onclick = function() {getTime()};
function getTime() {
  document.getElementById('time-output').innerHTML = Date();
}

// Change text colour
function changeColour(elmnt) {
  elmnt.style.color = getRandomColor();
}

// Get random colour
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Start a web worker 
var w = new Array(4);
function startWorkers() { 
  document.getElementById("worker-status").innerHTML = 'Running'  
  for (i = 0; i < w.length; i++) {
    if (typeof(Worker) !== "undefined") {
      if (typeof(w[i]) == "undefined") {
        w[i] = new Worker("/assets/js/worker.js");
        info = {'task': 'findPrimes',
                'startDigit': 1 + (100*i),
                'endDigit': 100 + (100*i), 
                'workerNum': i+1}
        w[i].postMessage(info)
      }
      w[i].onmessage = function(event) {
        console.log('event data received: ', event.data)
        switch (event.data.workerNum) {
          case 1:
            document.getElementById("w1d").innerHTML = event.data.currentDigit;
            document.getElementById("w1dr").innerHTML = event.data.currentFlag;
            document.getElementById("w1t").innerHTML = event.data.totalPrimes;
            break;
          case 2:
            document.getElementById("w2d").innerHTML = event.data.result;
            break;
          case 3:
            document.getElementById("w3d").innerHTML = event.data.result;
            break;
          case 4:
            document.getElementById("w4d").innerHTML = event.data.result;
            break;
        }
      }      
    } else {
      document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
  }
}
// Terminate a web worker
function stopWorkers() {
  document.getElementById("worker-status").innerHTML = 'Not Running'  
  for (i = 0; i < w.length; i++) {
    if (typeof(w[i]) == "undefined") {
      console.log('Nothing to terminate')
    } else {
      w[i].terminate();
      w[i] = undefined;
    }
  }
}