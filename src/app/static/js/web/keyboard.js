//监听键盘按键
var keyArray = {};
document.addEventListener("keyup",function(e){
    keyArray[e.keyCode]="0";
});
document.addEventListener("keydown",function(e){
    keyArray[e.keyCode]="1";
});

function sendUserKey() {
    ws.send(JSON.stringify(keyArray));
    // console.log(keyArray);
}
