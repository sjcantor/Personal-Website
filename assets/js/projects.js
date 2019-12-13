// import * as tf from '@tensorflow/tfjs';

async function qmusic() {
  console.log('Starting QMusic Demo...');
  console.log('Loading model...');

  // Load the model.
  const model = await tf.loadLayersModel('https://samcantor.tech/assets/models/qmusic/model.json');
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  // const imgEl = document.getElementById('img');
  // const result = await net.classify(imgEl);
  // console.log(result);
}
window.qmusic = qmusic;

async function mnist() {
  console.log('Starting the MNIST demo...');
  import {MnistData} from '../data/mnistdata.js';

  async function showExamples(data) {
    // Create a container in the visor
    const surface =
      tfvis.visor().surface({ name: 'Input Data Examples', tab: 'Input Data'});  
  
    // Get the examples
    const examples = data.nextTestBatch(20);
    const numExamples = examples.xs.shape[0];
    
    // Create a canvas element to render each example
    for (let i = 0; i < numExamples; i++) {
      const imageTensor = tf.tidy(() => {
        // Reshape the image to 28x28 px
        return examples.xs
          .slice([i, 0], [1, examples.xs.shape[1]])
          .reshape([28, 28, 1]);
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = 28;
      canvas.height = 28;
      canvas.style = 'margin: 4px;';
      await tf.browser.toPixels(imageTensor, canvas);
      surface.drawArea.appendChild(canvas);
  
      imageTensor.dispose();
    }
  }
  
  async function run() {  
    const data = new MnistData();
    await data.load();
    await showExamples(data);
    console.log('made it to the end of mnist')
  }
  
  document.addEventListener('DOMContentLoaded', run);

  
}
window.mnist = mnist;