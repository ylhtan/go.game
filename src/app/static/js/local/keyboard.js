//用户自定义按键
var u1Up = "87"; //w
var u1Right = "68"; //d
var u1Down = "83"; //s
var u1Left = "65"; //a
var u1Shot = "67"; //j->74， c->67

var u2Up = "76"; //l
var u2Right = "191"; ///
var u2Down = "190"; //.
var u2Left = "188"; //,
var u2Shot = "222"; //'

var uBgPlay = "79"; //o
var uBgStop = "80"; //p


//监听键盘按键
var keyArray = new Array();
document.addEventListener("keyup",function(e){
    keyArray[e.keyCode]=false;
});
document.addEventListener("keydown",function(e){
    keyArray[e.keyCode]=true;
});

function test() {
    console.log(keyArray);
}

//默认开启一次背景音乐
var bgOpen = 0;

//50ms执行一次 用户控制
function userControl() {
    var keyValid = false;
    for (var key in keyArray) {
        if (keyArray[key]) {
            switch (key) {
                //玩家1
                case u1Up:
                if (tank1.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u1Left) && keyArray[u1Left]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u1Right) && keyArray[u1Right]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank1.moveUp();
                        movePlay();
                    }
                }
                break;
                case u1Right:
                if (tank1.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u1Up) && keyArray[u1Up]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u1Down) && keyArray[u1Down]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank1.moveRight();
                        movePlay();
                    }
                }
                break;
                case u1Down:
                if (tank1.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u1Left) && keyArray[u1Left]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u1Right) && keyArray[u1Right]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank1.moveDown();
                        movePlay();
                    }
                }
                break;
                case u1Left:
                if (tank1.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u1Up) && keyArray[u1Up]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u1Down) && keyArray[u1Down]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank1.moveLeft();
                        movePlay();
                    }
                }
                break;
                case u1Shot:
                if (tank1.status == 1) {
                    tank1.shot();
                    shotPlay();
                }
                break;

                //玩家2
                case u2Up:
                if (tank2.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u2Left) && keyArray[u2Left]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u2Right) && keyArray[u2Right]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank2.moveUp();
                        movePlay();
                    }
                }
                break;
                case u2Right:
                if (tank2.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u2Up) && keyArray[u2Up]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u2Down) && keyArray[u2Down]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank2.moveRight();
                        movePlay();
                    }
                }
                break;
                case u2Down:
                if (tank2.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u2Left) && keyArray[u2Left]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u2Right) && keyArray[u2Right]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank2.moveDown();
                        movePlay();
                    }
                }
                break;
                case u2Left:
                if (tank2.status == 1) {
                    keyValid = true;
                    if (keyArray.hasOwnProperty(u2Up) && keyArray[u2Up]) {
                        keyValid = false;
                    }
                    if (keyArray.hasOwnProperty(u2Down) && keyArray[u2Down]) {
                        keyValid = false;
                    }
                    if (keyValid) {
                        tank2.moveLeft();
                        movePlay();
                    }
                }
                break;
                case u2Shot:
                if (tank2.status == 1) {
                    tank2.shot();
                    shotPlay();
                }
                break;

                //背景音乐
                case uBgPlay:
                bgPlay();
                break;
                case uBgStop:
                bgStop();
                break;

            }

            //默认开启背景音乐（一次）
            if (bgOpen == 0) {
                bgOpen = 1;
                bgPlay();
            }
        }
    }
}