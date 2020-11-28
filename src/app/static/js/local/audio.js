//添加游戏音效
var moveSound = new Audio();
moveSound.src = "/static/audio/move.wav";
function movePlay() {
    moveSound.play();    
}

var shotSound = new Audio();
shotSound.src = "/static/audio/shot.wav";
function shotPlay() {
    shotSound.play();    
}

var bombSound = new Audio();
bombSound.src = "/static/audio/bomb.wav";
function bombPlay() {
    bombSound.play();    
}

var bgSound = new Audio();
bgSound.src = "/static/audio/bg.mp3";
function bgPlay() {
    bgSound.play(); 
}
function bgStop() {
    bgSound.pause();
}