var grassArray = new Array();
var wallArray = new Array();
var steelArray = new Array();
var desertArray = new Array();
var riverArray = new Array();

//绘制一块草地
function drawOneGrass(x,y) {
    color1 = "#00CC00";
    color2 = "#006600";
    ctx.fillStyle = color1;
    ctx.fillRect(x,y,15,15);
    ctx.fillStyle = "#000000";
    ctx.fillRect(x,y,1,1);
    ctx.fillRect(x+14,y,1,1);
    ctx.fillRect(x,y+14,1,1);
    ctx.fillRect(x+14,y+14,1,1);
    ctx.fillStyle = color2;
    ctx.fillRect(x+1,y,12,1);
    ctx.fillRect(x,y+1,15,1);
    ctx.fillRect(x,y+2,9,1);
    ctx.fillRect(x+13,y+2,1,1);
    ctx.fillRect(x,y+3,9,1);
    ctx.fillRect(x+11,y+3,3,1);
    ctx.fillRect(x+6,y+4,3,1);
    ctx.fillRect(x,y+5,12,1);
    ctx.fillRect(x+13,y+5,2,1);
    ctx.fillRect(x+6,y+6,3,1);
    ctx.fillRect(x,y+7,3,1);
    ctx.fillRect(x+14,y+10,2,1);
    ctx.fillRect(x,y+12,3,1);
    ctx.fillRect(x+12,y+13,3,1);
}

//绘制一块墙
function drawOneWall(x,y) {
    color1 = "#808080";
    color2 = "#990000";
    color3 = "#FF9900";
    // color1 = "#cccccc";
    // color2 = "#E0FFFF";
    // color3 = "#FF9900";
    ctx.fillStyle = color1;
    ctx.fillRect(x,y,15,15);
    ctx.fillStyle = color2;
    ctx.fillRect(x+2,y,2,6);
    ctx.fillRect(x+4,y,9,2);
    ctx.fillRect(x,y+8,7,2);
    ctx.fillRect(x+8,y+8,7,2);
    ctx.fillRect(x+8,y+8,2,6);
    ctx.fillStyle = color3;
    ctx.fillRect(x+4,y+2,9,4);
    ctx.fillRect(x,y+10,7,4);
    ctx.fillRect(x+10,y+10,5,4);
}

//绘制一块钢板
function drawOneSteel(x,y) {
    color1 = "#cccccc";
    color2 = "#E0FFFF";
    color3 = "#999999";
    // color1 = "#808080";
    // color2 = "#FFD700";
    // color3 = "#E3E3E3";
    ctx.fillStyle = color1;
    ctx.fillRect(x,y,15,15);
    ctx.fillStyle = color2;
    ctx.fillRect(x+3,y+3,9,9);
    ctx.fillStyle = color3;
    ctx.fillRect(x+1,y+14,13,1);
    ctx.fillRect(x+2,y+13,12,1);
    ctx.fillRect(x+14,y+1,1,13);
    ctx.fillRect(x+13,y+2,1,12);
}

//绘制一块沙漠
function drawOneDesert(x,y) {
    color1 = "#3D7878";
    color2 = "#8CEA00";
    color3 = "#FFD306";
    ctx.fillStyle = color1;
    ctx.fillRect(x,y,15,15);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color2;
    ctx.beginPath();
    ctx.moveTo(x+7,y+13);
    ctx.lineTo(x+3,y+7);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+7,y+13);
    ctx.lineTo(x+7,y+6);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+7,y+13);
    ctx.lineTo(x+11,y+7);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = color3;
    ctx.fillRect(x+11,y+2,1,1);
    // ctx.fillRect(x+11,y+3,3,1);
    ctx.fillRect(x+6,y+4,3,1);
    // ctx.fillRect(x+13,y+5,2,1);
    // ctx.fillRect(x+6,y+6,3,1);
    ctx.fillRect(x,y+7,3,1);
    ctx.fillRect(x+12,y+10,2,1);
    // ctx.fillRect(x,y+12,3,1);
    // ctx.fillRect(x+12,y+13,3,1);
}

//绘制一块河
function drawOneRiver(x,y) {
    color1 = "#0000FF";
    color2 = "#006600";
    color3 = "#FFFFFF";
    ctx.fillStyle = color1;
    ctx.fillRect(x,y,15,15);

    ctx.fillStyle = color3;
    ctx.fillRect(x+13,y+2,1,1);
    ctx.fillRect(x+11,y+3,3,1);
    ctx.fillRect(x+7,y+4,3,2);
    ctx.fillRect(x+13,y+5,2,1);
    ctx.fillRect(x+6,y+6,3,1);
    ctx.fillRect(x,y+7,7,2);
    ctx.fillRect(x+9,y+7,3,2);
    ctx.fillRect(x+14,y+10,2,1);
    ctx.fillRect(x,y+12,3,1);
    ctx.fillRect(x+12,y+13,3,1);
}

//绘制草地
function drawGrass() {
    for (let g=0; g<grassArray.length; g++) {
        drawOneGrass(grassArray[g][0]*30, grassArray[g][1]*30);
        drawOneGrass(grassArray[g][0]*30, grassArray[g][1]*30+15);
        drawOneGrass(grassArray[g][0]*30+15, grassArray[g][1]*30);
        drawOneGrass(grassArray[g][0]*30+15, grassArray[g][1]*30+15);
    }
}

//绘制墙
function drawWall() {
    for (let g=0; g<wallArray.length; g++) {
        drawOneWall(wallArray[g][0]*30, wallArray[g][1]*30);
        drawOneWall(wallArray[g][0]*30, wallArray[g][1]*30+15);
        drawOneWall(wallArray[g][0]*30+15, wallArray[g][1]*30);
        drawOneWall(wallArray[g][0]*30+15, wallArray[g][1]*30+15);
    }
}

//绘制钢铁
function drawSteel() {
    for (let g=0; g<steelArray.length; g++) {
        drawOneSteel(steelArray[g][0]*30, steelArray[g][1]*30);
        drawOneSteel(steelArray[g][0]*30, steelArray[g][1]*30+15);
        drawOneSteel(steelArray[g][0]*30+15, steelArray[g][1]*30);
        drawOneSteel(steelArray[g][0]*30+15, steelArray[g][1]*30+15);
    }
}

//绘制沙漠
function drawDesert() {
    for (let g=0; g<desertArray.length; g++) {
        drawOneDesert(desertArray[g][0]*30, desertArray[g][1]*30);
        drawOneDesert(desertArray[g][0]*30, desertArray[g][1]*30+15);
        drawOneDesert(desertArray[g][0]*30+15, desertArray[g][1]*30);
        drawOneDesert(desertArray[g][0]*30+15, desertArray[g][1]*30+15);
    }
}

//绘制河流
function drawRiver() {
    for (let g=0; g<riverArray.length; g++) {
        drawOneRiver(riverArray[g][0]*30, riverArray[g][1]*30);
        drawOneRiver(riverArray[g][0]*30, riverArray[g][1]*30+15);
        drawOneRiver(riverArray[g][0]*30+15, riverArray[g][1]*30);
        drawOneRiver(riverArray[g][0]*30+15, riverArray[g][1]*30+15);
    }
}
