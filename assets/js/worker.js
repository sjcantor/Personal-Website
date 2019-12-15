onmessage = async function(event) {
  var info = event.data.task;
  switch (info) {
    case "findPrimes":
      var startDigit = event.data.startDigit;
      var endDigit = event.data.endDigit;
      var currentDigit = startDigit;
      var totalPrimes = 0;
      while (currentDigit <= endDigit) {
        var currentFlag = false;
        currentFlag = await isPrime(currentDigit)
        if (currentFlag) {
          totalPrimes++;
        }
        var message = {'status': 'inProgress', 
                      'currentNum': currentDigit, 
                      'currentNumFlag': currentFlag,
                      'totalPrimes': totalPrimes, 
                      'workerNum': event.data.workerNum}
        postMessage(message);
        currentDigit++;
      }
      break;
  }
  // var suffix = 'Worker' + event.data.workerNum
  // var results = {'result': info + suffix, 'workerNum': event.data.workerNum}
  // postMessage(results);
}

async function isPrime(num)
{
  setTimeout(() => {
    var flag = true;
    if (num == 0 || num == 1) {return false}
    else if (num == 2) {return true}
    for(var i=2; i<=Math.ceil(num/2); i++)
    {
        if((num%i)==0)
        {
            flag = false;
            break;
        }
    }
    return flag; 
  }, 3000);
     
}
