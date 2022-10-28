// expose.js

window.addEventListener('DOMContentLoaded', init);
const jsConfetti = new JSConfetti();
function init() {
    function horn_sel(){
        const select_horn = document.getElementById('horn-select');
        // var new_img = document.getElementById('expose'); //.find('img').attr('src');
        var new_img = document.getElementById('expose').getElementsByTagName('img');
        if(select_horn.value==="air-horn"){
            new_img[0].src = "./assets/images/air-horn.svg";
        }
        else if(select_horn.value==="car-horn"){
            new_img[0].src = "./assets/images/car-horn.svg";
        }
        else{
            new_img[0].src = "./assets/images/party-horn.svg";
        }
    
    }
    const el = document.getElementById("horn-select");
    el.addEventListener('change', horn_sel);
    
    function playaudio(){
        var horn_audio = document.querySelector('audio');
        const select_horn = document.getElementById('horn-select');
        if(select_horn.value==='air-horn'){
            horn_audio.src = "./assets/audio/air-horn.mp3";
        }else if(select_horn.value === 'car-horn'){
            horn_audio.src = "./assets/audio/car-horn.mp3";
        }else if(select_horn.value === 'party-horn'){
            horn_audio.src = "./assets/audio/party-horn.mp3";
            
            jsConfetti.addConfetti();
        }
        horn_audio.volume= volume_a.value/100;
        horn_audio.play();
        
    }
    const sound = document.querySelector('button');
    sound.addEventListener('click', playaudio); 
    
    
    function volume_adj(){
        // const volume_a = document.querySelector("volume");
        var new_img = document.getElementsByTagName('img');
        if(volume_a.value==0){
            console.log(volume_a.value);
            new_img[1].src = "assets/icons/volume-level-0.svg";
        }
        else if (volume_a.value < 33 && volume_a.value >= 1){
            new_img[1].src = "assets/icons/volume-level-1.svg";
        } else if(volume_a.value < 67 && volume_a.value >=33) {
            new_img[1].src = "assets/icons/volume-level-2.svg";
        } else{
            new_img[1].src = "assets/icons/volume-level-3.svg";
        }
    
    }
    const volume_a = document.getElementById('volume');
    volume_a.addEventListener('input', volume_adj);
}

