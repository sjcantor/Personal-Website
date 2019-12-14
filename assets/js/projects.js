document.getElementById("get-time").onclick = function() {testFunction()};

function testFunction() {
  document.getElementById('time-output').innerHTML = Date();
}
