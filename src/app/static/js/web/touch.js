//手机按键
function load (){
    var touchArray = new Array("up","right","down","left","shot","bgPlay","bgStop");
    var touchKey = new Array("87","68","83","65","74","79","80");
    var touchObj = new Array();
    for (var i=0; i<touchArray.length; i++) {
        touchObj[i] = document.getElementById(touchArray[i]);
    }
    touchObj[0].addEventListener('touchstart',function(event,key){ touch(event,touchKey[0]); }, false);
    touchObj[0].addEventListener('touchmove',function(event,key){ touch(event,touchKey[0]); }, false);
    touchObj[0].addEventListener('touchend',function(event,key){ touch(event,touchKey[0]); }, false);
    touchObj[1].addEventListener('touchstart',function(event,key){ touch(event,touchKey[1]); }, false);
    touchObj[1].addEventListener('touchmove',function(event,key){ touch(event,touchKey[1]); }, false);
    touchObj[1].addEventListener('touchend',function(event,key){ touch(event,touchKey[1]); }, false);
    touchObj[2].addEventListener('touchstart',function(event,key){ touch(event,touchKey[2]); }, false);
    touchObj[2].addEventListener('touchmove',function(event,key){ touch(event,touchKey[2]); }, false);
    touchObj[2].addEventListener('touchend',function(event,key){ touch(event,touchKey[2]); }, false);
    touchObj[3].addEventListener('touchstart',function(event,key){ touch(event,touchKey[3]); }, false);
    touchObj[3].addEventListener('touchmove',function(event,key){ touch(event,touchKey[3]); }, false);
    touchObj[3].addEventListener('touchend',function(event,key){ touch(event,touchKey[3]); }, false);
    touchObj[4].addEventListener('touchstart',function(event,key){ touch(event,touchKey[4]); }, false);
    touchObj[4].addEventListener('touchmove',function(event,key){ touch(event,touchKey[4]); }, false);
    touchObj[4].addEventListener('touchend',function(event,key){ touch(event,touchKey[4]); }, false);
    touchObj[5].addEventListener('touchstart',function(event,key){ touch(event,touchKey[5]); }, false);
    touchObj[5].addEventListener('touchmove',function(event,key){ touch(event,touchKey[5]); }, false);
    touchObj[5].addEventListener('touchend',function(event,key){ touch(event,touchKey[5]); }, false);
    touchObj[6].addEventListener('touchstart',function(event,key){ touch(event,touchKey[6]); }, false);
    touchObj[6].addEventListener('touchmove',function(event,key){ touch(event,touchKey[6]); }, false);
    touchObj[6].addEventListener('touchend',function(event,key){ touch(event,touchKey[6]); }, false);

    function touch (event,key){
        // console.log("key:"+key);
        event.stopPropagation();
        var event = event || window.event; 
        switch(event.type){
            case "touchstart":
                keyArray[key] = "1";
                break;
            case "touchend":
                keyArray[key] = "0";
                break;
            case "touchmove":
                // event.preventDefault();
                keyArray[key] = "1";
                break;
        }
    }
}



