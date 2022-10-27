// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  const inputForm = document.querySelector('textarea');
  var language_list = document.getElementById('voice-select');
  const synth = window.speechSynthesis;
  let voices = [];
  function populateVoiceList() {
    // let voices = [];
    voices = synth.getVoices();

    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.setAttribute('data-name', voices[i].name);
      // option.setAttribute('data-name', voices[i].name);
      option.textContent = voices[i].name;
      language_list.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function talk(){
    const inputTxt = inputForm.value;
    // onclick = (event) => {
      // event.preventDefault();
      const utterThis = new SpeechSynthesisUtterance(inputTxt);

      const selectedOption = language_list.selectedOptions[0].getAttribute('data-name');

      for (let i = 0; i < voices.length ; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      // utterThis.pitch = pitch.value;
      // utterThis.rate = rate.value;
      let smile = document.getElementsByTagName('img');
      synth.speak(utterThis);
      let isSpeaking = synth.speaking;
      while(isSpeaking){
        smile[0].src = "./assets/images/smiling-open.png";
        // isSpeaking = synth.speaking;
        console.log(isSpeaking);
        // setTimeout(() => {smile[0].src = "./assets/images/smiling-open.png"; }, 1000);
        // setTimeout(() => {smile[0].src = "./assets/images/smiling.png"; }, 1000);
      }
      smile[0].src = "./assets/images/smiling.png";

      utterThis.onpause = (event) => {
        const char = event.utterance.text.charAt(event.charIndex);
        console.log(`Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`);
      // }

      inputTxt.blur();
    }
  }
  
  var press_to_talk = document.querySelector('button');
  press_to_talk.addEventListener('click', talk);
}

