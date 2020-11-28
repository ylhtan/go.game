var heroTankArray = {};
var heroCount = 0;
var enemyTankArray = {};
var enemyCount = 0;


//绘制玩家子弹
function drawHeroBullet() {
    for (i=0; i<heroCount; i++) {
        if (heroTankArray[i].Bullet.Status == 1) {
            ctx.fillStyle = heroTankArray[i].Bullet.Color;
            ctx.fillRect(heroTankArray[i].Bullet.X,heroTankArray[i].Bullet.Y,3,3);
        }
    }
}

//绘制敌人子弹
function drawEnemyBullet() {
    for (i=0; i<enemyCount; i++) {
        if (enemyTankArray[i].Bullet.Status == 1) {
            ctx.fillStyle = enemyTankArray[i].Bullet.Color;
            if (enemyTankArray[i].Type == 2) {
                switch (enemyTankArray[i].Bullet.Direct) {
                    case 0:
                    case 2:
                    ctx.fillRect(enemyTankArray[i].Bullet.X,enemyTankArray[i].Bullet.Y,1,20);
                    break;
                    case 1:
                    case 3:
                    ctx.fillRect(enemyTankArray[i].Bullet.X,enemyTankArray[i].Bullet.Y,20,1);
                    break;
                }
            } else {
                ctx.fillRect(enemyTankArray[i].Bullet.X,enemyTankArray[i].Bullet.Y,3,3);
            }
        }
    }
}

//绘制坦克爆炸
function drawTankBomb(x,y,color) {
    x = parseInt(x);
    y = parseInt(y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x-10,y-10);
    ctx.lineTo(x+10,y+10);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+10,y-10);
    ctx.lineTo(x-10,y+10);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x-15,y);
    ctx.lineTo(x+15,y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x,y-15);
    ctx.lineTo(x,y+15);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
}

//绘制坦克爆炸
function drawTankHit(x,y,color) {
    x = parseInt(x);
    y = parseInt(y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x-10,y-10);
    ctx.lineTo(x+10,y+10);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+10,y-10);
    ctx.lineTo(x-10,y+10);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x-15,y);
    ctx.lineTo(x+15,y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x,y-15);
    ctx.lineTo(x,y+15);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
}

//绘制坦克
function drawTank(tank) {
    switch (tank.Direct) {
        case 0:
        case 2:
            ctx.fillStyle = tank.Color[0];
            ctx.fillRect(tank.X,tank.Y,7,30);            
            ctx.fillRect(tank.X+23,tank.Y,7,30);
            ctx.fillRect(tank.X+8,tank.Y+5,14,20);

            ctx.lineWidth = 1;
            ctx.strokeStyle = tank.Color[1];
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.X+1,tank.Y+k*3);
                ctx.lineTo(tank.X+6,tank.Y+k*3);
                ctx.closePath();
                ctx.stroke();    
            }
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.X+24,tank.Y+k*3);
                ctx.lineTo(tank.X+29,tank.Y+k*3);
                ctx.closePath();
                ctx.stroke();
            }
            
            ctx.fillStyle = tank.Color[1];
            ctx.beginPath();
            ctx.arc(tank.X+15,tank.Y+15,7,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = tank.Color[1];
            ctx.moveTo(tank.X+15,tank.Y+15);
            if (tank.Direct == 0) {
                ctx.lineTo(tank.X+15,tank.Y);
            } else {
                ctx.lineTo(tank.X+15,tank.Y+30);
            }
            ctx.closePath();
            ctx.stroke();
        break;
        case 1:
        case 3:
            ctx.fillStyle = tank.Color[0];
            ctx.fillRect(tank.X,tank.Y,30,7);
            ctx.fillRect(tank.X,tank.Y+23,30,7);
            ctx.fillRect(tank.X+5,tank.Y+8,20,14);

            ctx.lineWidth = 1;
            ctx.strokeStyle = tank.Color[1];
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.X+k*3,tank.Y+1);
                ctx.lineTo(tank.X+k*3,tank.Y+6);
                ctx.closePath();
                ctx.stroke();
            }
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.X+k*3,tank.Y+24);
                ctx.lineTo(tank.X+k*3,tank.Y+29);
                ctx.closePath();
                ctx.stroke();
            }
            
            ctx.fillStyle = tank.Color[1];
            ctx.beginPath();
            ctx.arc(tank.X+15,tank.Y+15,7,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = tank.Color[1];
            ctx.moveTo(tank.X+15,tank.Y+15);
            if (tank.Direct == 1) {
                ctx.lineTo(tank.X+30,tank.Y+15);
            } else {
                ctx.lineTo(tank.X,tank.Y+15);
            }
            ctx.closePath();
            ctx.stroke();
        break;
    }
    //绘制血量
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#FF0000";
    for (k=0; k<tank.Blood; k++) {
        ctx.beginPath();
        ctx.moveTo(tank.X+30,tank.Y-10-k*3);
        ctx.lineTo(tank.X+35,tank.Y-10-k*3);
        ctx.closePath();
        ctx.stroke();    
    }
}


