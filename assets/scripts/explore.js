// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  const inputForm = document.querySelector('textarea');
  var language_list = document.getElementById('voice-select');
  const synth = window.speechSynthesis;
  let voices = [];
  function populateVoiceList() {

    voices = synth.getVoices();

    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.setAttribute('data-name', voices[i].name);
      option.setAttribute('data-lang', voices[i].lang);
      option.textContent = voices[i].name + " (" + voices[i].lang + ')';
      language_list.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function talk(){
    const inputTxt = inputForm.value;
      const utterThis = new SpeechSynthesisUtterance(inputTxt);

      const selectedOption = language_list.selectedOptions[0].getAttribute('data-name');
      
      for (let i = 0; i < voices.length ; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      let smile = document.getElementsByTagName('img');
      synth.speak(utterThis);
      let isSpeaking = synth.speaking;
      if(isSpeaking){
        smile[0].src = "./assets/images/smiling-open.png";
      }
      utterThis.onend = (event) => {
        smile[0].src = "./assets/images/smiling.png";
      }
      

      utterThis.onpause = (event) => {
        const char = event.utterance.text.charAt(event.charIndex);
        console.log(`Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`);

      inputTxt.blur();
    }
  }
  
  var press_to_talk = document.querySelector('button');
  press_to_talk.addEventListener('click', talk);
}

