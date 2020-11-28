var noEntryArea = new Array();

//加入禁入区
function addNoEntryArea(x) {
	noEntryArea.push(x);
}

//清空禁入区
function emptyNoEntryArea() {
	noEntryArea = [];
}


//检测禁入区是否有坦克进入
function checkNoEntryArea() {
	for (let k=0; k<noEntryArea.length; k++) {
		if (tank1.status == 1) {
			if ((tank1.x+30)>noEntryArea[k][0] && tank1.x<(noEntryArea[k][0]+15) && tank1.y<(noEntryArea[k][1]+15) && (tank1.y+30)>noEntryArea[k][1] ) {
				// console.log(tank1.x+","+tank1.y+" ---- "+noEntryArea[k][0]+","+noEntryArea[k][1]);
				switch (tank1.direct) {
					case 0:
					tank1.y = noEntryArea[k][1]+15;
					break;
					case 1:
					tank1.x = noEntryArea[k][0]-30;
					break;
					case 2:
					tank1.y = noEntryArea[k][1]-30;
					break;
					case 3:
					tank1.x = noEntryArea[k][0]+15;
					break;
				}
			}
		}
		if (tank2.status == 1) {
			if ((tank2.x+30)>noEntryArea[k][0] && tank2.x<(noEntryArea[k][0]+15) && tank2.y<(noEntryArea[k][1]+15) && (tank2.y+30)>noEntryArea[k][1] ) {
				switch (tank2.direct) {
					case 0:
					tank2.y = noEntryArea[k][1]+15;
					break;
					case 1:
					tank2.x = noEntryArea[k][0]-30;
					break;
					case 2:
					tank2.y = noEntryArea[k][1]-30;
					break;
					case 3:
					tank2.x = noEntryArea[k][0]+15;
					break;
				}
			}
		}
		for (i=0; i<enemyCount; i++) {
	        if (enemyTankArray[i].status == 1) {
	        	if ((enemyTankArray[i].x+30)>noEntryArea[k][0] && enemyTankArray[i].x<(noEntryArea[k][0]+15) && enemyTankArray[i].y<(noEntryArea[k][1]+15) && (enemyTankArray[i].y+30)>noEntryArea[k][1] ) {
		            switch (enemyTankArray[i].direct) {
		                case 0:
						enemyTankArray[i].y = noEntryArea[k][1]+15;
						break;
						case 1:
						enemyTankArray[i].x = noEntryArea[k][0]-30;
						break;
						case 2:
						enemyTankArray[i].y = noEntryArea[k][1]-30;
						break;
						case 3:
						enemyTankArray[i].x = noEntryArea[k][0]+15;
						break;
		            }
		            enemyTankArray[i].direct = parseInt(Math.random()*4);
	        	}
	        }
	    }
	}
}