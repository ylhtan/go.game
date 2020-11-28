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

var hitSound = new Audio();
hitSound.src = "/static/audio/hit.wav";
function hitPlay() {
    hitSound.play();    
}

var bgSound = new Audio();
bgSound.src = "/static/audio/bg.mp3";
function bgPlay() {
    bgSound.play(); 
}
function bgStop() {
    bgSound.pause();
}

var audioPlay = {};
function playAudio() {
	if (audioPlay.length>0) {
        for (i=0; i<audioPlay.length; i++) {
            if (audioPlay[i] == "movePlay") {
                movePlay();
            }
            if (audioPlay[i] == "shotPlay") {
                shotPlay();
            }
            if (audioPlay[i] == "bombPlay") {
                bombPlay();
            }
            if (audioPlay[i] == "hitPlay") {
                hitPlay();
            }
            if (audioPlay[i] == "bgPlay") {
                bgPlay();
            }
            if (audioPlay[i] == "bgStop") {
                bgStop();
            }
        }
    }
}


//播放坦克爆炸效果
var drawPlay = {};
var drawPlayItem = {};
function playDraw() {
    if (drawPlay.length>0) {
        for (i=0; i<drawPlay.length; i++) {
            drawPlayItem = drawPlay[i].split(",");
            if (drawPlayItem[0] == "bomb") {
                drawTankBomb(drawPlayItem[1],drawPlayItem[2],drawPlayItem[3]);
            }
            if (drawPlayItem[0] == "hit") {
                drawTankHit(drawPlayItem[1],drawPlayItem[2],drawPlayItem[3]);
            }
        }
    }
}
