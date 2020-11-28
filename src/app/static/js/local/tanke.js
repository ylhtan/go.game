//定义坦克类
function TankClass(x,y,direct,speed,color) {
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed = speed;
    this.color = color;
    this.moveUp = function() {
        this.y -= this.speed;
        this.direct = 0;
    }
    this.moveRight = function() {
        this.x += this.speed;
        this.direct = 1;
    }
    this.moveDown = function() {
        this.y += this.speed;
        this.direct = 2;
    }
    this.moveLeft = function() {
        this.x -= this.speed;
        this.direct = 3;
    }
}

//定义玩家坦克
function HeroClass(x,y,direct,speed,color) {
    this.tank = TankClass;
    this.status = 1;
    this.heroBullet = null;
    this.tank(x,y,direct,speed,color);
    this.shot = function () {
        var bulletSpeed = 12; //子弹速度
        //为子弹初始化（html中已声明）
        switch (this.direct) {
            case 0:
            this.heroBullet = new BulletClass(this.x+14,this.y,this.direct,bulletSpeed);
            break;
            case 1:
            this.heroBullet = new BulletClass(this.x+30,this.y+14,this.direct,bulletSpeed);
            break;
            case 2:
            this.heroBullet = new BulletClass(this.x+14,this.y+30,this.direct,bulletSpeed);
            break;
            case 3:
            this.heroBullet = new BulletClass(this.x,this.y+14,this.direct,bulletSpeed);
            break;
        }
    }
}

//定义敌人坦克
function EnemyClass(x,y,direct,speed,color) {
    this.tank = TankClass;
    this.status = 1;
    this.enemyBullet = null;
    this.type = 1;
    this.tank(x,y,direct,speed,color);
    this.shot = function () {
        var bulletSpeed = 6; //子弹速度
        //敌人子弹初始化 html定时器中已声明
        switch (this.direct) {
            case 0:
            this.enemyBullet = new BulletClass(this.x+14,this.y,this.direct,bulletSpeed);
            break;
            case 1:
            this.enemyBullet = new BulletClass(this.x+30,this.y+14,this.direct,bulletSpeed);
            break;
            case 2:
            this.enemyBullet = new BulletClass(this.x+14,this.y+30,this.direct,bulletSpeed);
            break;
            case 3:
            this.enemyBullet = new BulletClass(this.x,this.y+14,this.direct,bulletSpeed);
            break;
        }
    }

}

//定义子弹类
function BulletClass(x,y,direct,speed) {
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed = speed;
}



//绘制玩家子弹
function drawHeroBullet() {
    if (tank1.heroBullet != null) {
        ctx.fillStyle = tank1.color[1];
        ctx.fillRect(tank1.heroBullet.x,tank1.heroBullet.y,3,3);
    }
    if (tank2.heroBullet != null) {
        ctx.fillStyle = tank2.color[1];
        ctx.fillRect(tank2.heroBullet.x,tank2.heroBullet.y,3,3);
    }
}

//绘制敌人子弹
function drawEnemyBullet() {
    for (i=0; i<enemyCount; i++) {
        if (enemyTankArray[i].enemyBullet != null) {
            ctx.fillStyle = enemyTankArray[i].color[1];
            if (enemyTankArray[i].type == 2) {
                switch (enemyTankArray[i].enemyBullet.direct) {
                    case 0:
                    case 2:
                    ctx.fillRect(enemyTankArray[i].enemyBullet.x,enemyTankArray[i].enemyBullet.y,1,20);
                    break;
                    case 1:
                    case 3:
                    ctx.fillRect(enemyTankArray[i].enemyBullet.x,enemyTankArray[i].enemyBullet.y,20,1);
                    break;
                }
            } else {
                ctx.fillRect(enemyTankArray[i].enemyBullet.x,enemyTankArray[i].enemyBullet.y,3,3);
            }
        }
    }
}

//绘制坦克爆炸
function drawTankBomb(x,y,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,30,30);
}

//绘制坦克
function drawTank(tank) {
    switch (tank.direct) {
        case 0:
        case 2:
            ctx.fillStyle = tank.color[0];
            ctx.fillRect(tank.x,tank.y,7,30);            
            ctx.fillRect(tank.x+23,tank.y,7,30);
            ctx.fillRect(tank.x+8,tank.y+5,14,20);

            ctx.lineWidth = 1;
            ctx.strokeStyle = tank.color[2];
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.x+1,tank.y+k*3);
                ctx.lineTo(tank.x+6,tank.y+k*3);
                ctx.closePath();
                ctx.stroke();    
            }
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.x+24,tank.y+k*3);
                ctx.lineTo(tank.x+29,tank.y+k*3);
                ctx.closePath();
                ctx.stroke();
            }
            
            ctx.fillStyle = tank.color[1];
            ctx.beginPath();
            ctx.arc(tank.x+15,tank.y+15,7,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = tank.color[1];
            ctx.moveTo(tank.x+15,tank.y+15);
            if (tank.direct == 0) {
                ctx.lineTo(tank.x+15,tank.y);
            } else {
                ctx.lineTo(tank.x+15,tank.y+30);
            }
            ctx.closePath();
            ctx.stroke();
        break;
        case 1:
        case 3:
            ctx.fillStyle = tank.color[0];
            ctx.fillRect(tank.x,tank.y,30,7);
            ctx.fillRect(tank.x,tank.y+23,30,7);
            ctx.fillRect(tank.x+5,tank.y+8,20,14);

            ctx.lineWidth = 1;
            ctx.strokeStyle = tank.color[2];
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.x+k*3,tank.y+1);
                ctx.lineTo(tank.x+k*3,tank.y+6);
                ctx.closePath();
                ctx.stroke();
            }
            for (k=1; k<10; k++) {
                ctx.beginPath();
                ctx.moveTo(tank.x+k*3,tank.y+24);
                ctx.lineTo(tank.x+k*3,tank.y+29);
                ctx.closePath();
                ctx.stroke();
            }
            
            ctx.fillStyle = tank.color[1];
            ctx.beginPath();
            ctx.arc(tank.x+15,tank.y+15,7,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = tank.color[1];
            ctx.moveTo(tank.x+15,tank.y+15);
            if (tank.direct == 1) {
                ctx.lineTo(tank.x+30,tank.y+15);
            } else {
                ctx.lineTo(tank.x,tank.y+15);
            }
            ctx.closePath();
            ctx.stroke();
        break;
    }
}


//敌人坦克改变方向
function enemyMoveDirect() {
    for (i=0; i<enemyCount; i++) {
        if (enemyTankArray[i].status == 1) {
            enemyTankArray[i].direct = parseInt(Math.random()*4);
        }
    }
}

//敌人坦克移动
function enemyMove() {
    for (i=0; i<enemyCount; i++) {
        if (enemyTankArray[i].status == 1) {
            direct = enemyTankArray[i].direct;
            switch (direct) {
                case 0:
                    if (enemyTankArray[i].y <= 0) {
                        enemyTankArray[i].moveDown();
                    } else {
                        enemyTankArray[i].moveUp();
                    }
                    break;
                case 1:
                    if (enemyTankArray[i].x >= canvasRect.width-30) {
                        enemyTankArray[i].moveLeft();
                    } else {
                        enemyTankArray[i].moveRight();
                    }
                    break;
                case 2:
                    if (enemyTankArray[i].y >= canvasRect.height-30) {
                        enemyTankArray[i].moveUp();
                    } else {
                        enemyTankArray[i].moveDown();
                    }
                    break;
                case 3:
                    if (enemyTankArray[i].x <= 0) {
                        enemyTankArray[i].moveRight();
                    } else {
                        enemyTankArray[i].moveLeft();
                    }
                    break;
            }
        }
    }
}

//让玩家子弹移动
function heroBulletFly() {
    if (tank1.heroBullet != null) {
        switch (tank1.heroBullet.direct) {
            case 0:
            tank1.heroBullet.y -= tank1.heroBullet.speed;
            break;
            case 1:
            tank1.heroBullet.x += tank1.heroBullet.speed;
            break;
            case 2:
            tank1.heroBullet.y += tank1.heroBullet.speed;
            break;
            case 3:
            tank1.heroBullet.x -= tank1.heroBullet.speed;
            break;
        }
    }
    if (tank2.heroBullet != null) {
        switch (tank2.heroBullet.direct) {
            case 0:
            tank2.heroBullet.y -= tank2.heroBullet.speed;
            break;
            case 1:
            tank2.heroBullet.x += tank2.heroBullet.speed;
            break;
            case 2:
            tank2.heroBullet.y += tank2.heroBullet.speed;
            break;
            case 3:
            tank2.heroBullet.x -= tank2.heroBullet.speed;
            break;
        }
    }
}

//敌人坦克发子弹（定时器控制自动发射）
function enemyShot() {
    for (i=0; i<enemyCount; i++) {
        if (enemyTankArray[i].status == 1) {
            enemyTankArray[i].shot();
            if (enemyTankArray[i].type == 2) {
                enemyTankArray[i].enemyBullet.speed = 9;
            }
        }
    }
    // console.log(enemyTankArray[0].enemyBullet);
}

//让敌人子弹移动
function enemyBulletFly() {
    for (i=0; i<enemyCount; i++) {
        if (enemyTankArray[i].enemyBullet != null) {
            switch (enemyTankArray[i].enemyBullet.direct) {
                case 0:
                enemyTankArray[i].enemyBullet.y -= enemyTankArray[i].enemyBullet.speed;
                break;
                case 1:
                enemyTankArray[i].enemyBullet.x += enemyTankArray[i].enemyBullet.speed;
                break;
                case 2:
                enemyTankArray[i].enemyBullet.y += enemyTankArray[i].enemyBullet.speed;
                break;
                case 3:
                enemyTankArray[i].enemyBullet.x -= enemyTankArray[i].enemyBullet.speed;
                break;
            }
        }
    }
}


//矫正玩家坦克是否出界
function checkHeroTankPosition() {
    if (tank1.status == 1) {
        if (tank1.y <= 0) {
            tank1.y = 0;
        }
        if (tank1.x >= canvasRect.width - 30) {
            tank1.x = canvasRect.width - 30;
        }
        if (tank1.y >= canvasRect.height - 30) {
            tank1.y = canvasRect.height - 30;
        }
        if (tank1.x <= 0) {
            tank1.x = 0;
        }
    }
    if (tank2.status == 1) {
        if (tank2.y <= 0) {
            tank2.y = 0;
        }
        if (tank2.x >= canvasRect.width - 30) {
            tank2.x = canvasRect.width - 30;
        }
        if (tank2.y >= canvasRect.height - 30) {
            tank2.y = canvasRect.height - 30;
        }
        if (tank2.x <= 0) {
            tank2.x = 0;
        }
    }
}


//计算子弹是否击中玩家
function checkShotHero() {
    var isShot1 = false;
    var isShot2 = false;
    for (i=0; i<enemyCount; i++) {
        if (enemyTankArray[i].enemyBullet != null) {
            if (enemyTankArray[i].enemyBullet.y >= tank1.y && enemyTankArray[i].enemyBullet.y <= tank1.y+30 && enemyTankArray[i].enemyBullet.x >= tank1.x && enemyTankArray[i].enemyBullet.x <= tank1.x+30) {
                // console.log("玩家1被打中");
                drawTankBomb(tank1.x, tank1.y, tank1.color[1]); //绘制坦克爆炸效果
                tank1.x = -100;
                tank1.y = -100;
                isShot1 = true;
                enemyTankArray[i].enemyBullet = null;
            }
        }
        if (enemyTankArray[i].enemyBullet != null) {
            if (enemyTankArray[i].enemyBullet.y >= tank2.y && enemyTankArray[i].enemyBullet.y <= tank2.y+30 && enemyTankArray[i].enemyBullet.x >= tank2.x && enemyTankArray[i].enemyBullet.x <= tank2.x+30) {
                // console.log("玩家2被打中");
                drawTankBomb(tank2.x, tank2.y, tank2.color[1]); //绘制坦克爆炸效果
                tank2.x = -100;
                tank2.y = -100;
                isShot2 = true;
                enemyTankArray[i].enemyBullet = null;
            }
        }
    }
    
    if (isShot1) {
        tank1.status = 0;
    }
    if (isShot2) {
        tank2.status = 0;
    }
}


//计算子弹是否击中敌人
function checkKillEnemy() {
    var isKill1 = false;
    var isKill2 = false;
    if (tank1.heroBullet != null) {
        for (i=0; i<enemyCount; i++) {
            if (enemyTankArray[i].status == 1) {
                if (tank1.heroBullet.y >= enemyTankArray[i].y && tank1.heroBullet.y <= enemyTankArray[i].y+30 && tank1.heroBullet.x >= enemyTankArray[i].x && tank1.heroBullet.x <= enemyTankArray[i].x+30) {
                    // console.log("打中了");
                    drawTankBomb(enemyTankArray[i].x, enemyTankArray[i].y, enemyTankArray[i].color[1]); //绘制坦克爆炸效果
                    enemyTankArray[i].status = 0; //状态设置为消失（enemyTank die）
                    enemyTankArray[i].x = -100;
                    enemyTankArray[i].y = -100;
                    isKill1 = true;
                    bombPlay();
                }
            }
        }
    }
    if (tank2.heroBullet != null) {
        for (i=0; i<enemyCount; i++) {
            if (enemyTankArray[i].status == 1) {
                if (tank2.heroBullet.y >= enemyTankArray[i].y && tank2.heroBullet.y <= enemyTankArray[i].y+30 && tank2.heroBullet.x >= enemyTankArray[i].x && tank2.heroBullet.x <= enemyTankArray[i].x+30) {
                    // console.log("打中了");
                    drawTankBomb(enemyTankArray[i].x, enemyTankArray[i].y, enemyTankArray[i].color[1]); //绘制坦克爆炸效果
                    enemyTankArray[i].status = 0; //状态设置为消失（enemyTank die）
                    enemyTankArray[i].x = -100;
                    enemyTankArray[i].y = -100;
                    isKill2 = true;
                    bombPlay();
                }
            }
        }
    }
    if (isKill1) {
        tank1.heroBullet = null;
    }
    if (isKill2) {
        tank2.heroBullet = null;
    }
}