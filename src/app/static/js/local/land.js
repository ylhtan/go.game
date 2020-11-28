var gItem = new Array();
var pix = new Array();

var grassArray = new Array();
for (let g=0; g<20; g++) {
    gItem = [];
    gItem[0] = parseInt(Math.random()*20);
    gItem[1] = parseInt(Math.random()*16);
    grassArray.push(gItem);
}

var wallArray = new Array();
for (let g=0; g<20; g++) {
    gItem = [];
    gItem[0] = parseInt(Math.random()*20);
    gItem[1] = parseInt(Math.random()*15+1);
    wallArray.push(gItem);
}

var steelArray = new Array();
for (let g=0; g<20; g++) {
    gItem = [];
    gItem[0] = parseInt(Math.random()*20);
    gItem[1] = parseInt(Math.random()*15+1);
    steelArray.push(gItem);
}

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
        pix = [];
        pix[0] = wallArray[g][0]*30;
        pix[1] = wallArray[g][1]*30;
        addNoEntryArea(pix);
        drawOneWall(wallArray[g][0]*30, wallArray[g][1]*30+15);
        pix = [];
        pix[0] = wallArray[g][0]*30;
        pix[1] = wallArray[g][1]*30+15;
        addNoEntryArea(pix);
        drawOneWall(wallArray[g][0]*30+15, wallArray[g][1]*30);
        pix = [];
        pix[0] = wallArray[g][0]*30+15;
        pix[1] = wallArray[g][1]*30;
        addNoEntryArea(pix);
        drawOneWall(wallArray[g][0]*30+15, wallArray[g][1]*30+15);
        pix = [];
        pix[0] = wallArray[g][0]*30+15;
        pix[1] = wallArray[g][1]*30+15;
        addNoEntryArea(pix);
    }
}

//绘制钢铁
function drawSteel() {
    for (let g=0; g<steelArray.length; g++) {
        drawOneSteel(steelArray[g][0]*30, steelArray[g][1]*30);
        pix = [];
        pix[0] = steelArray[g][0]*30;
        pix[1] = steelArray[g][1]*30;
        addNoEntryArea(pix);
        drawOneSteel(steelArray[g][0]*30, steelArray[g][1]*30+15);
        pix = [];
        pix[0] = steelArray[g][0]*30;
        pix[1] = steelArray[g][1]*30+15;
        addNoEntryArea(pix);
        drawOneSteel(steelArray[g][0]*30+15, steelArray[g][1]*30);
        pix = [];
        pix[0] = steelArray[g][0]*30+15;
        pix[1] = steelArray[g][1]*30;
        addNoEntryArea(pix);
        drawOneSteel(steelArray[g][0]*30+15, steelArray[g][1]*30+15);
        pix = [];
        pix[0] = steelArray[g][0]*30+15;
        pix[1] = steelArray[g][1]*30+15;
        addNoEntryArea(pix);
    }
}


//绘制草地
// function drawGrass() {
//     for (let k=0; k<grassArray[1]; k++) {
//         drawOneGrass(k*15+g*30, grassArray[3]*15+60*g);
//         drawOneGrass(k*15+g*30, grassArray[3]*15+60*g+15);
//     }
//     for (let k=0; k<grassArray[2]; k++) {
//         drawOneGrass(grassArray[4]*15+60*g, (k+grassArray[4])*15+g*30);
//         drawOneGrass(grassArray[4]*15+60*g+15, (k+grassArray[4])*15+g*30);
//     }
// }

//绘制钢板
// function drawSteel() {
//     let pix = new Array();
//     for (let k=0; k<30; k++) {
//         drawOneSteel((k+10)*15, 120);
//         pix = [];
//         pix[0] = (k+10)*15;
//         pix[1] = 120;
//         addNoEntryArea(pix);
//         drawOneSteel((k+10)*15, 135);
//         pix = [];
//         pix[0] = (k+10)*15;
//         pix[1] = 135;
//         addNoEntryArea(pix);

//     }
//     for (let k=0; k<10; k++) {
//         drawOneSteel(150, (k+10)*15);
//         pix = [];
//         pix[0] = 150;
//         pix[1] = (k+10)*15;
//         addNoEntryArea(pix);
//         drawOneSteel(165, (k+10)*15);
//         pix = [];
//         pix[0] = 165;
//         pix[1] = (k+10)*15;
//         addNoEntryArea(pix);
//     }
// }

//绘制墙
// function drawWall() {
//     let pix = new Array();
//     for (let k=0; k<10; k++) {
//         drawOneWall(k*15, 360);
//         pix = [];
//         pix[0] = k*15;
//         pix[1] = 360;
//         addNoEntryArea(pix);
//         drawOneWall(k*15, 375);
//         pix = [];
//         pix[0] = k*15;
//         pix[1] = 375;
//         addNoEntryArea(pix);
//     }
//     // for (let k=0; k<10; k++) {
//     //     drawOneWall(180, (k+11)*15);
//     //     drawOneWall(195, (k+11)*15);
//     // }
// }