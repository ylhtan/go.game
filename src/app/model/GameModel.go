package model

import (
	"time"
	"fmt"
	"strconv"
	"math/rand"
	"app/common"
	"app/database/redis"
	redigo "github.com/gomodule/redigo/redis"
)

//全局数据
var RoomList [100]int
var RoomStatus [100]int
var RoomData [100]Room
var RoomAudio [100][6]string
var RoomDraw [100][2]string
var UserKey [100][4]string

//用户自定义按键
var userUp = "87" //w
var userRight = "68" //d
var userDown = "83" //s
var userLeft = "65" //a
var userShot = "74" //j->74， c->67
var uBgPlay = "79" //o
var uBgStop = "80" //p


//声明地形
type LandItem [2]int

//定义房间结构体
type Room struct {
	RoomType string 
	Width int
	Height int
	GrassArray []LandItem
	WallArray []LandItem
	SteelArray []LandItem
	DesertArray []LandItem
	RiverArray []LandItem
	NoEntryArea []LandItem
	UserMap map[string]int
	HeroTankArray []Tank
	HeroTankMap []map[string]interface{}
	HeroCount int
	EnemyTankArray []Tank
	EnemyTankMap []map[string]interface{}
	EnemyCount int
}

//坦克结构体
type Tank struct {
	X int
	Y int
	Direct int
	Speed int
	Color [2]string
	Status int
	Bullet Bullet
	Type int
	Blood int
}

func (tank *Tank) moveUp() {
	tank.Direct = 0
	tank.Y -= tank.Speed
}
func (tank *Tank) moveRight() {
	tank.Direct = 1
	tank.X += tank.Speed
}
func (tank *Tank) moveDown() {
	tank.Direct = 2
	tank.Y += tank.Speed
}
func (tank *Tank) moveLeft() {
	tank.Direct = 3
	tank.X -= tank.Speed
}
func (tank *Tank) shot() {
	tank.Bullet.Status = 1
	switch tank.Direct {
		case 0:
		tank.Bullet.X = tank.X+14
		tank.Bullet.Y = tank.Y
		case 1:
		tank.Bullet.X = tank.X+30
		tank.Bullet.Y = tank.Y+14
		case 2:
		tank.Bullet.X = tank.X+14
		tank.Bullet.Y = tank.Y+30
		case 3:
		tank.Bullet.X = tank.X
		tank.Bullet.Y = tank.Y+14
	}
	tank.Bullet.Direct = tank.Direct
	tank.Bullet.Color = tank.Color[1]
}
func (tank *Tank) addBlood(x int) {
	tank.Blood += x
}
func (tank *Tank) reduceBlood(x int) {
	tank.Blood -= x
}

//定义子弹结构体
type Bullet struct {
	X int
	Y int
	Direct int
	Speed int
	Color string
	Status int
}


//地形初始化
func InitLand(roomIndex int, roomType string) {

	var room Room
	var grassArray []LandItem
	var wallArray []LandItem
	var steelArray []LandItem
	var desertArray []LandItem
	var riverArray []LandItem
	var grassCount,wallCount,steelCount,desertCount,riverCount int
	room.RoomType = roomType

	if roomType == "1" {
		room.Width = 600
		room.Height = 480
		grassCount,wallCount,steelCount,desertCount,riverCount = 16,16,16,0,0
	} else {
		room.Width = 330
		room.Height = 480
		grassCount,wallCount,steelCount,desertCount,riverCount = 5,5,5,5,5
	}

	//声明禁入区
	var noEntryArea []LandItem
	var item LandItem
	var pix LandItem
	
	//计算多少个区块
	xBlock := room.Width/30
	yBlock := room.Height/30
	
	//绘制草地
	for i:=0; i<grassCount; i++ {
		rand.Seed(time.Now().UnixNano())
		item[0] = int(rand.Intn(xBlock))
		item[1] = int(rand.Intn(yBlock))
		grassArray = append(grassArray, item)
	}
	room.GrassArray = grassArray

	//绘制墙
	for i:=0; i<wallCount; i++ {
		rand.Seed(time.Now().UnixNano())
		item[0] = int(rand.Intn(xBlock))
		item[1] = int(rand.Intn(yBlock-2)+1)
		wallArray = append(wallArray, item)

	    pix[0] = item[0]*30;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	}
	room.WallArray = wallArray

	//绘制钢板
	for i:=0; i<steelCount; i++ {
		rand.Seed(time.Now().UnixNano())
		item[0] = int(rand.Intn(xBlock))
		item[1] = int(rand.Intn(yBlock-2)+1)
		steelArray = append(steelArray, item)

		pix[0] = item[0]*30;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	}
	room.SteelArray = steelArray

	//绘制沙漠
	for i:=0; i<desertCount; i++ {
		rand.Seed(time.Now().UnixNano())
		item[0] = int(rand.Intn(xBlock))
		item[1] = int(rand.Intn(yBlock-2)+1)
		desertArray = append(desertArray, item)

		pix[0] = item[0]*30;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	}
	room.DesertArray = desertArray

	//绘制河流
	for i:=0; i<riverCount; i++ {
		rand.Seed(time.Now().UnixNano())
		item[0] = int(rand.Intn(xBlock))
		item[1] = int(rand.Intn(yBlock-2)+1)
		riverArray = append(riverArray, item)

		pix[0] = item[0]*30;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30;
	    noEntryArea = append(noEntryArea, pix)
	    pix[0] = item[0]*30+15;
	    pix[1] = item[1]*30+15;
	    noEntryArea = append(noEntryArea, pix)
	}
	room.RiverArray = riverArray
	room.NoEntryArea = noEntryArea


	//声明敌人坦克
	var enemyCount int
	var type2Count int
	if roomType == "1" {
		enemyCount = 5
		type2Count = 2
	} else {
		enemyCount = 3
		type2Count = 1
	}
	var enemyTankArray []Tank
	var enemyTankMap []map[string]interface{}
	var enemyTank Tank
	var enemyTankColor [2]string

	//初始化敌人坦克
	enemyTankColor[0] = "#808069"
	enemyTankColor[1] = "#B0E0E6"
	enemyTankArray = make([]Tank, enemyCount)
	for i:=0; i<enemyCount; i++ {
		enemyTank.X = i*30
		enemyTank.Y = 0
		enemyTank.Direct = 2
		if i < (enemyCount-type2Count) {
			enemyTank.Speed = 3
			enemyTank.Color = enemyTankColor
			enemyTank.Bullet.Speed = 12
			enemyTank.Type = 1
			enemyTank.Blood = 2
		} else {
			enemyTankColor[0] = "#008B8B"
			enemyTankColor[1] = "#AFEEEE"
			enemyTank.Speed = 4
			enemyTank.Color = enemyTankColor
			enemyTank.Bullet.Speed = 15
			enemyTank.Type = 2
			enemyTank.Blood = 3
		}
		enemyTank.Status = 1
		enemyTank.Bullet.Status = 0
		enemyTankArray[i] = enemyTank
	}
	enemyTankMap = make([]map[string]interface{}, enemyCount)
	room.EnemyTankArray = enemyTankArray
	room.EnemyTankMap = enemyTankMap
	room.EnemyCount = enemyCount

	//声明玩家坦克
	room = initHero(roomIndex, room)
	var heroTankArray []Tank
	var heroTankMap []map[string]interface{}
	var heroTank Tank
	var heroTankColor [2][2]string

	//初始化玩家坦克
	heroTankColor[0][0] = "#708069"
	heroTankColor[0][1] = "#E3CF57"
	heroTankColor[1][0] = "#FF60AF"
	heroTankColor[1][1] = "#FFD9EC"
	heroTankArray = make([]Tank, room.HeroCount)
	for i:=0; i<room.HeroCount; i++ {
		heroTank.X = room.Width - (i+1)*30
		heroTank.Y = room.Height - 30
		heroTank.Direct = 0
		heroTank.Speed = 3
		heroTank.Color = heroTankColor[i]
		heroTank.Status = 1
		heroTank.Bullet.Status = 0
		heroTank.Bullet.Speed = 15
		heroTank.Blood = 3
		heroTankArray[i] = heroTank
	}
	heroTankMap = make([]map[string]interface{}, room.HeroCount)
	room.HeroTankArray = heroTankArray
	room.HeroTankMap = heroTankMap

	//赋给全局变量
	RoomData[roomIndex] = room

}



func GetGrass(roomIndex int) []LandItem {
	return RoomData[roomIndex].GrassArray
}

func GetWall(roomIndex int) []LandItem {
	return RoomData[roomIndex].WallArray
}

func GetSteel(roomIndex int) []LandItem {
	return RoomData[roomIndex].SteelArray
}

func GetDesert(roomIndex int) []LandItem {
	return RoomData[roomIndex].DesertArray
}

func GetRiver(roomIndex int) []LandItem {
	return RoomData[roomIndex].RiverArray
}

func GetNoEntryArea(roomIndex int) []LandItem {
	return RoomData[roomIndex].NoEntryArea
}

func GetHeroTank(roomIndex int) []map[string]interface{} {
	for i:=0; i<RoomData[roomIndex].HeroCount; i++ {
		RoomData[roomIndex].HeroTankMap[i] = common.StructToMap(RoomData[roomIndex].HeroTankArray[i])
	}
	return RoomData[roomIndex].HeroTankMap
}

func GetEnemyTank(roomIndex int) []map[string]interface{} {
	for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
		RoomData[roomIndex].EnemyTankMap[i] = common.StructToMap(RoomData[roomIndex].EnemyTankArray[i])
	}
	return RoomData[roomIndex].EnemyTankMap
}


//敌人坦克移动
func EnemyMove(roomIndex int) {
	for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
        if RoomData[roomIndex].EnemyTankArray[i].Status == 1 {
            switch RoomData[roomIndex].EnemyTankArray[i].Direct {
                case 0:
                    if RoomData[roomIndex].EnemyTankArray[i].Y <= 0 {
                        RoomData[roomIndex].EnemyTankArray[i].moveDown()
                    } else {
                        RoomData[roomIndex].EnemyTankArray[i].moveUp()
                    }
                case 1:
                    if RoomData[roomIndex].EnemyTankArray[i].X >= RoomData[roomIndex].Width-30 {
                        RoomData[roomIndex].EnemyTankArray[i].moveLeft()
                    } else {
                        RoomData[roomIndex].EnemyTankArray[i].moveRight()
                    }
                case 2:
                    if RoomData[roomIndex].EnemyTankArray[i].Y >= RoomData[roomIndex].Height-30 {
                        RoomData[roomIndex].EnemyTankArray[i].moveUp()
                    } else {
                        RoomData[roomIndex].EnemyTankArray[i].moveDown()
                    }
                case 3:
                    if RoomData[roomIndex].EnemyTankArray[i].X <= 0 {
                        RoomData[roomIndex].EnemyTankArray[i].moveRight()
                    } else {
                        RoomData[roomIndex].EnemyTankArray[i].moveLeft()
                    }
            }
        }
    }
}


//敌人坦克发子弹（定时器控制自动发射）
func EnemyShot(roomIndex int) {
    for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
        if RoomData[roomIndex].EnemyTankArray[i].Status == 1 {
            RoomData[roomIndex].EnemyTankArray[i].shot()
        }
    }
}

//敌人改变移动方向
func EnemyMoveDirect(roomIndex int) {
    for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
        if RoomData[roomIndex].EnemyTankArray[i].Status == 1 {
            RoomData[roomIndex].EnemyTankArray[i].Direct = rand.Intn(4)
        }
    }
}

//让玩家子弹移动
func HeroBulletFly(roomIndex int) {
	for i:=0; i<RoomData[roomIndex].HeroCount; i++ {
        if RoomData[roomIndex].HeroTankArray[i].Bullet.Status == 1 {
            switch RoomData[roomIndex].HeroTankArray[i].Bullet.Direct {
                case 0:
                RoomData[roomIndex].HeroTankArray[i].Bullet.Y -= RoomData[roomIndex].HeroTankArray[i].Bullet.Speed
                case 1:
                RoomData[roomIndex].HeroTankArray[i].Bullet.X += RoomData[roomIndex].HeroTankArray[i].Bullet.Speed
                case 2:
                RoomData[roomIndex].HeroTankArray[i].Bullet.Y += RoomData[roomIndex].HeroTankArray[i].Bullet.Speed
                case 3:
                RoomData[roomIndex].HeroTankArray[i].Bullet.X -= RoomData[roomIndex].HeroTankArray[i].Bullet.Speed
            }
        }
    }
}

//让敌人子弹移动
func EnemyBulletFly(roomIndex int) {
    for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
        if RoomData[roomIndex].EnemyTankArray[i].Bullet.Status == 1 {
            switch RoomData[roomIndex].EnemyTankArray[i].Bullet.Direct {
                case 0:
                RoomData[roomIndex].EnemyTankArray[i].Bullet.Y -= RoomData[roomIndex].EnemyTankArray[i].Bullet.Speed
                case 1:
                RoomData[roomIndex].EnemyTankArray[i].Bullet.X += RoomData[roomIndex].EnemyTankArray[i].Bullet.Speed
                case 2:
                RoomData[roomIndex].EnemyTankArray[i].Bullet.Y += RoomData[roomIndex].EnemyTankArray[i].Bullet.Speed
                case 3:
                RoomData[roomIndex].EnemyTankArray[i].Bullet.X -= RoomData[roomIndex].EnemyTankArray[i].Bullet.Speed
            }
        }
    }
}


//玩家按键
func UserControl(roomIndex int, uid string)  {
	//玩家坦克下标
	p := RoomData[roomIndex].UserMap[uid]
	if (UserKey[roomIndex][p] != "") {
		keyMap, err := common.JsonToMap(UserKey[roomIndex][p])
		if err != nil {
			fmt.Printf("err : %v \n", err)
		}

		keyValid := false;
		for k, v := range keyMap {
			if k == userUp && v == "1" {
				if RoomData[roomIndex].HeroTankArray[p].Status == 1 {
					keyValid = true
					if _, ok := keyMap[userLeft]; ok {
						if keyMap[userLeft] == "1" {
							keyValid = false
						}
					}
					if _, ok := keyMap[userRight]; ok {
						if keyMap[userRight] == "1" {
							keyValid = false
						}
					}
					if keyValid {
						RoomData[roomIndex].HeroTankArray[p].moveUp()
						RoomAudio[roomIndex][0] = "movePlay"
					}
				}
			}
			if k == userRight && v == "1" {
				if RoomData[roomIndex].HeroTankArray[p].Status == 1 {
					keyValid = true
					if _, ok := keyMap[userUp]; ok {
						if keyMap[userUp] == "1" {
							keyValid = false
						}
					}
					if _, ok := keyMap[userDown]; ok {
						if keyMap[userDown] == "1" {
							keyValid = false
						}
					}
					if keyValid {
						RoomData[roomIndex].HeroTankArray[p].moveRight()
						RoomAudio[roomIndex][0] = "movePlay"
					}
				}
			}
			if k == userDown && v == "1" {
				if RoomData[roomIndex].HeroTankArray[p].Status == 1 {
					keyValid = true
					if _, ok := keyMap[userLeft]; ok {
						if keyMap[userLeft] == "1" {
							keyValid = false
						}
					}
					if _, ok := keyMap[userRight]; ok {
						if keyMap[userRight] == "1" {
							keyValid = false
						}
					}
					if keyValid {
						RoomData[roomIndex].HeroTankArray[p].moveDown()
						RoomAudio[roomIndex][0] = "movePlay"
					}
				}
			}
			if k == userLeft && v == "1" {
				if RoomData[roomIndex].HeroTankArray[p].Status == 1 {
					keyValid = true
					if _, ok := keyMap[userUp]; ok {
						if keyMap[userUp] == "1" {
							keyValid = false
						}
					}
					if _, ok := keyMap[userDown]; ok {
						if keyMap[userDown] == "1" {
							keyValid = false
						}
					}
					if keyValid {
						RoomData[roomIndex].HeroTankArray[p].moveLeft()
						RoomAudio[roomIndex][0] = "movePlay"
					}
				}
			}
			if k == userShot && v == "1" {
				RoomData[roomIndex].HeroTankArray[p].shot()
				RoomAudio[roomIndex][1] = "shotPlay"
			}
			if k == uBgPlay && v == "1" {
				RoomAudio[roomIndex][2] = "bgPlay"
			}
			if k == uBgStop && v == "1" {
				RoomAudio[roomIndex][3] = "bgStop"
			}

		}
	}
	
}


//矫正玩家坦克是否出界
func CheckHeroTankPosition(roomIndex int) {
	for i:=0; i<RoomData[roomIndex].HeroCount; i++ {
		if RoomData[roomIndex].HeroTankArray[i].Status == 1 {
	        if RoomData[roomIndex].HeroTankArray[i].Y <= 0 {
	            RoomData[roomIndex].HeroTankArray[i].Y = 0
	        }
	        if RoomData[roomIndex].HeroTankArray[i].X >= RoomData[roomIndex].Width - 30 {
	            RoomData[roomIndex].HeroTankArray[i].X = RoomData[roomIndex].Width - 30
	        }
	        if RoomData[roomIndex].HeroTankArray[i].Y >= RoomData[roomIndex].Height - 30 {
	            RoomData[roomIndex].HeroTankArray[i].Y = RoomData[roomIndex].Height - 30
	        }
	        if RoomData[roomIndex].HeroTankArray[i].X <= 0 {
	            RoomData[roomIndex].HeroTankArray[i].X = 0
	        }
	    }
	}
}


//检测禁入区是否有坦克进入
func CheckNoEntryArea(roomIndex int) {
	noEntryArea := RoomData[roomIndex].NoEntryArea
	for k:=0; k<len(noEntryArea); k++ {
		for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
	        if RoomData[roomIndex].EnemyTankArray[i].Status == 1 {
	        	if (RoomData[roomIndex].EnemyTankArray[i].X+30)>noEntryArea[k][0] && RoomData[roomIndex].EnemyTankArray[i].X<(noEntryArea[k][0]+15) && RoomData[roomIndex].EnemyTankArray[i].Y<(noEntryArea[k][1]+15) && (RoomData[roomIndex].EnemyTankArray[i].Y+30)>noEntryArea[k][1]  {
		            switch (RoomData[roomIndex].EnemyTankArray[i].Direct) {
		                case 0:
						RoomData[roomIndex].EnemyTankArray[i].Y = noEntryArea[k][1]+15
						break;
						case 1:
						RoomData[roomIndex].EnemyTankArray[i].X = noEntryArea[k][0]-30
						break;
						case 2:
						RoomData[roomIndex].EnemyTankArray[i].Y = noEntryArea[k][1]-30
						break;
						case 3:
						RoomData[roomIndex].EnemyTankArray[i].X = noEntryArea[k][0]+15
						break;
		            }
		            RoomData[roomIndex].EnemyTankArray[i].Direct = rand.Intn(4)
	        	}
	        }
	    }
	    for i:=0; i<RoomData[roomIndex].HeroCount; i++ {
	        if RoomData[roomIndex].HeroTankArray[i].Status == 1 {
	        	if (RoomData[roomIndex].HeroTankArray[i].X+30)>noEntryArea[k][0] && RoomData[roomIndex].HeroTankArray[i].X<(noEntryArea[k][0]+15) && RoomData[roomIndex].HeroTankArray[i].Y<(noEntryArea[k][1]+15) && (RoomData[roomIndex].HeroTankArray[i].Y+30)>noEntryArea[k][1]  {
		            switch (RoomData[roomIndex].HeroTankArray[i].Direct) {
		                case 0:
						RoomData[roomIndex].HeroTankArray[i].Y = noEntryArea[k][1]+15
						break;
						case 1:
						RoomData[roomIndex].HeroTankArray[i].X = noEntryArea[k][0]-30
						break;
						case 2:
						RoomData[roomIndex].HeroTankArray[i].Y = noEntryArea[k][1]-30
						break;
						case 3:
						RoomData[roomIndex].HeroTankArray[i].X = noEntryArea[k][0]+15
						break;
		            }
	        	}
	        }
	    }
	}
}


//计算子弹是否击中敌人
func CheckKillEnemy(roomIndex int) {
    for k:=0; k<RoomData[roomIndex].HeroCount; k++ {
    	if RoomData[roomIndex].HeroTankArray[k].Bullet.Status ==1 {
	        for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
	            if RoomData[roomIndex].EnemyTankArray[i].Status == 1 {
	                if RoomData[roomIndex].HeroTankArray[k].Bullet.Y >= RoomData[roomIndex].EnemyTankArray[i].Y && RoomData[roomIndex].HeroTankArray[k].Bullet.Y <= RoomData[roomIndex].EnemyTankArray[i].Y+30 && RoomData[roomIndex].HeroTankArray[k].Bullet.X >= RoomData[roomIndex].EnemyTankArray[i].X && RoomData[roomIndex].HeroTankArray[k].Bullet.X <= RoomData[roomIndex].EnemyTankArray[i].X+30 {
						RoomData[roomIndex].EnemyTankArray[i].reduceBlood(1)
						RoomData[roomIndex].HeroTankArray[k].Bullet.Status = 0
						//1滴血变色
						if RoomData[roomIndex].EnemyTankArray[i].Blood == 1 {
							RoomData[roomIndex].EnemyTankArray[i].Color[0] = "#750000"
							RoomData[roomIndex].EnemyTankArray[i].Color[1] = "#FF0000"
						}
						if RoomData[roomIndex].EnemyTankArray[i].Blood <= 0 {
							bombStr := "bomb," 
		                    strX := strconv.Itoa(RoomData[roomIndex].EnemyTankArray[i].X+15)
		                    strY := strconv.Itoa(RoomData[roomIndex].EnemyTankArray[i].Y+15)
		                    strColor := RoomData[roomIndex].EnemyTankArray[i].Color[1]
		                    bombStr += strX+","+strY+","+strColor
		                    RoomDraw[roomIndex][0] = bombStr
		                    RoomData[roomIndex].EnemyTankArray[i].Status = 0 //状态设置为消失（enemyTank die）
		                    RoomData[roomIndex].EnemyTankArray[i].X = -100
		                    RoomData[roomIndex].EnemyTankArray[i].Y = -100
		                    RoomAudio[roomIndex][4] = "bombPlay"
						} else {
							hitStr := "hit," 
		                    strX := strconv.Itoa(RoomData[roomIndex].EnemyTankArray[i].X+15)
		                    strY := strconv.Itoa(RoomData[roomIndex].EnemyTankArray[i].Y+15)
		                    strColor := RoomData[roomIndex].HeroTankArray[k].Bullet.Color
		                    hitStr += strX+","+strY+","+strColor
		                    RoomDraw[roomIndex][1] = hitStr
		                    RoomAudio[roomIndex][5] = "hitPlay"
						}
	                }
	            }
	        }
	    }
    }
}


//计算子弹是否击中玩家
func CheckShotHero(roomIndex int) {
    for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
        if RoomData[roomIndex].EnemyTankArray[i].Bullet.Status == 1 {
        	for k:=0; k<RoomData[roomIndex].HeroCount; k++ {
        		if RoomData[roomIndex].EnemyTankArray[i].Bullet.Y >= RoomData[roomIndex].HeroTankArray[k].Y && RoomData[roomIndex].EnemyTankArray[i].Bullet.Y <= RoomData[roomIndex].HeroTankArray[k].Y+30 && RoomData[roomIndex].EnemyTankArray[i].Bullet.X >= RoomData[roomIndex].HeroTankArray[k].X && RoomData[roomIndex].EnemyTankArray[i].Bullet.X <= RoomData[roomIndex].HeroTankArray[k].X+30 {
	                //玩家K被打中
	                RoomData[roomIndex].HeroTankArray[k].reduceBlood(1)
	                RoomData[roomIndex].EnemyTankArray[i].Bullet.Status = 0
	                //1滴血变色
					if RoomData[roomIndex].HeroTankArray[k].Blood == 1 {
						RoomData[roomIndex].HeroTankArray[k].Color[0] = "#750000"
						RoomData[roomIndex].HeroTankArray[k].Color[1] = "#FF0000"
					}
	                if RoomData[roomIndex].HeroTankArray[k].Blood <= 0 {
	                	bombStr := "bomb," 
		                strX := strconv.Itoa(RoomData[roomIndex].HeroTankArray[k].X+15)
		                strY := strconv.Itoa(RoomData[roomIndex].HeroTankArray[k].Y+15)
		                strColor := RoomData[roomIndex].HeroTankArray[k].Color[1]
		                bombStr += strX+","+strY+","+strColor
		                RoomDraw[roomIndex][0] = bombStr
		                RoomData[roomIndex].HeroTankArray[k].X = -100
		                RoomData[roomIndex].HeroTankArray[k].Y = -100
		                RoomData[roomIndex].HeroTankArray[k].Status = 0
		                RoomAudio[roomIndex][4] = "bombPlay"
	                } else {
	                	hitStr := "hit," 
		                strX := strconv.Itoa(RoomData[roomIndex].HeroTankArray[k].X+15)
		                strY := strconv.Itoa(RoomData[roomIndex].HeroTankArray[k].Y+15)
		                strColor := RoomData[roomIndex].EnemyTankArray[i].Bullet.Color
		                hitStr += strX+","+strY+","+strColor
		                RoomDraw[roomIndex][1] = hitStr
		                RoomAudio[roomIndex][5] = "hitPlay"
	                }
	            }
        	}
        }
    }
}

//检测过关
func CheckPass(roomIndex int) {
    pass := true
    for i:=0; i<RoomData[roomIndex].EnemyCount; i++ {
        if RoomData[roomIndex].EnemyTankArray[i].Status == 1 {
            pass = false
        }
    }
    if pass {
    	RoomAudio[roomIndex][3] = "bgStop"
    	time.Sleep(time.Millisecond * 500)
        RoomStatus[roomIndex] = 2
    }
}

//检测失败
func CheckFail(roomIndex int) {
	fail := true
    for i:=0; i<RoomData[roomIndex].HeroCount; i++ {
        if RoomData[roomIndex].HeroTankArray[i].Status == 1 {
            fail = false
        }
    }
    if fail {
    	RoomAudio[roomIndex][3] = "bgStop"
    	time.Sleep(time.Millisecond * 500)
        RoomStatus[roomIndex] = 3
    }
}

//初始化本房间玩家
func initHero(roomIndex int, room Room) Room {
	r := redis.Pool.Get()
	data := make(map[string]int)
	roomId := strconv.Itoa(roomIndex+1)
	key := "room"+roomId
	count, err := redigo.Int(r.Do("HLEN", key))
	if err != nil {
		fmt.Println("initHero redis hlen error :", err)
	} else {
		room.HeroCount = count
	}
	result, err := redigo.Values(r.Do("HKEYS", key))
	if err != nil {
	    fmt.Println("initHero hgetall failed", err.Error())
	} else {
	    for _, v := range result {
	    	vv, ok := v.([]byte)
	    	if !ok {
			    fmt.Println("It's not ok for type []byte")
			    return room
			}
	    	uid := string(vv[:])
	    	userSort, err := redigo.String(r.Do("HGET", key, uid))
	    	if err != nil {
	    		fmt.Println("initHero hget error :", err.Error())
	    	} else {
	    		tankIndex,_ := strconv.Atoi(userSort)
	        	data[uid] = tankIndex-1
	    	}
	    }
	}
	r.Close()
	room.UserMap = data
	return room
}


