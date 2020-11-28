package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
	"app/config"
	"app/model"
	"app/database/redis"
	redigo "github.com/gomodule/redigo/redis"
	"github.com/gorilla/websocket"
)

//运行初始化
func initRoom() {
	for i := 0; i < len(model.RoomList); i++ {
		model.RoomList[i] = i + 1
		model.RoomStatus[i] = 0
	}
}

//游戏开始
func GameStart(c *gin.Context) {
	c.Redirect(http.StatusMovedPermanently, "/game/room?uid=1")
}

//房间列表
func GameRoom(c *gin.Context) {
	data := make(map[string]interface{})
	data["title"] = "坦克大战房间列表"
	data["ws"] = config.Web["ws"]
	data["roomList"] = model.RoomList
	c.HTML(http.StatusOK, "GameRoom.html", data)
}

//房间列表socket
func GameRoomSocket(c *gin.Context) {
	data := make(map[string]interface{})
	uid := c.Query("uid")
	//升级get请求为webSocket协议
	ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Printf("socker error : %v\n", err)
		return
	}
	defer ws.Close()

	//下发数据
	go sendRoomMessage(ws, uid)

	//读取ws中的数据
	for {
		_, wsdata, err := ws.ReadMessage()
		if err != nil {
			fmt.Printf("socker 已断开 : %v\n", err)
			break
		}

		roomId := string(wsdata) //房间ID
		roomIdInt, _ := strconv.Atoi(roomId)
		roomIndex := roomIdInt - 1
		if model.RoomStatus[roomIndex] == 0 {
			r := redis.Pool.Get()
			roomKey := "room" + roomId
			count, err := redigo.Int(r.Do("hlen", roomKey))
			if err != nil {
				fmt.Println("redis get failed:", err)
			}
			if count >= 2 {
				data["message"] = "房间人数已满"
				data["code"] = 1001
			} else {
				//判断自己是否已加入
				exist, _ := redigo.Int(r.Do("HEXISTS", roomKey, uid))
				if exist == 1 {
					data["message"] = "你已加入"
					data["code"] = 1002
				} else {
					//加入房间
					_, err = r.Do("HSET", roomKey, uid, count+1)
					if err != nil {
						fmt.Println("redis set failed:", err)
					}
					data["message"] = "加入成功"
					data["code"] = 0
				}
			}
			r.Close()
		} else {
			roomStatus := strconv.Itoa(model.RoomStatus[roomIndex])
			data["message"] = "当前状态不能加入[status:" + roomStatus + "]"
			data["code"] = 1003
		}

		if data["code"] != 0 {
			fmt.Printf("Join room error : %v\n", data)
		}
	}
}

//下发房间数据
func sendRoomMessage(ws *websocket.Conn, uid string) {
	r := redis.Pool.Get()
	defer r.Close()
	var data [][3]int
	var roomData [3]int
	for {
		time.Sleep(time.Second)
		data = [][3]int{}
		for k, v := range model.RoomList {
			roomData = [3]int{}
			sv := strconv.Itoa(v)
			key := "room" + sv
			count, err := redigo.Int(r.Do("HLEN", key))
			if err != nil {
				fmt.Println("redis get failed:", err)
			}

			userSort := 0
			if count > 0 {
				//自己在该房间，则下发排序
				exist, _ := redigo.Int(r.Do("HEXISTS", key, uid))
				if exist == 1 {
					userSort, err = redigo.Int(r.Do("HGET", key, uid))
					if err != nil {
						fmt.Println("redis get failed:", err)
					}
				}
			}

			roomData[0] = count
			roomData[1] = userSort
			roomData[2] = model.RoomStatus[k]
			data = append(data, roomData)
		}

		err = ws.WriteJSON(data)
		if err != nil {
			break
		}
	}
}

//房主点击开始游戏（修改游戏状态，启动游戏计算goroutine）
func GameRoomStart(c *gin.Context) {
	uid := c.Query("uid")
	roomId := c.Query("roomid")
	roomType := c.Query("roomtype")
	if roomType == "" {
		roomType = "1"
	}
	roomIdInt, _ := strconv.Atoi(roomId)
	roomIndex := roomIdInt - 1

	data := make(map[string]interface{})

	//判断该用户是否为房主
	r := redis.Pool.Get()
	key := "room" + roomId
	userSort, err := redigo.Int(r.Do("HGET", key, uid))
	if err != nil {
		fmt.Println("GameRoomStart redis get error :", err)
	}
	r.Close()
	if userSort != 1 {
		data["message"] = "没有权限"
	} else {
		if model.RoomStatus[roomIndex] == 0 {
			model.RoomStatus[roomIndex] = 1
			model.InitLand(roomIndex, roomType) //初始化地图

			//本房间相关数据计算
			go enemyMove(roomIndex)
			go enemyShot(roomIndex)
			go enemyMoveDirect(roomIndex)
			go bulletCountAll(roomIndex)
			go checkGameOver(roomIndex)
			data["message"] = "ok"
		} else {
			data["message"] = "该房间状态不支持"
		}

	}

	c.JSON(200, data)
}

//坦克作战区
func GameTanke(c *gin.Context) {
	uid := c.Query("uid")
	roomId := c.Query("roomid")
	if checkUser(uid, roomId) {
		roomIdInt, _ := strconv.Atoi(roomId)
		roomIndex := roomIdInt - 1
		data := make(map[string]interface{})
		data["title"] = "坦克大战作战区"
		if model.RoomStatus[roomIndex] != 1 {
			data["message"] = "游戏已结束"
			c.JSON(200, data)
		} else {
			data["ws"] = config.Web["ws"]
			data["canvasWidth"] = model.RoomData[roomIndex].Width
			data["canvasHeight"] = model.RoomData[roomIndex].Height
			data["uid"] = uid
			data["roomid"] = roomId
			data["roomType"] = model.RoomData[roomIndex].RoomType
			c.HTML(http.StatusOK, "GameTanke.html", data)
		}
	} else {
		data := make(map[string]interface{})
		data["message"] = "你不在该房间"
		c.JSON(200, data)
	}
}

//坦克socket
func GameTankeSocket(c *gin.Context) {

	uid := c.Query("uid")
	roomId := c.Query("roomid")
	if checkUser(uid, roomId) {
		roomIdInt, _ := strconv.Atoi(roomId)
		roomIndex := roomIdInt - 1
		//升级get请求为webSocket协议
		ws, err := upGrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			fmt.Printf("socker error : %v\n", err)
			return
		}
		defer ws.Close()

		//下发房间作战数据 -> FlushMap()
		go sendTankeMessage(ws, uid, roomIndex)
		// 执行用户操作行为
		go userControl(roomIndex, uid)

		//玩家坦克下标（!注意，不存在的uid会得到0值）
		p := model.RoomData[roomIndex].UserMap[uid]

		for {
			//读取ws中的数据
			_, wsdata, err := ws.ReadMessage()
			if err != nil {
				fmt.Printf("socket read err %v \n", err)

				//客户端断开，从房间中减人
				r := redis.Pool.Get()
				key := "room" + roomId
				_, err = r.Do("HDEL", key, uid)
				if err != nil {
					fmt.Println("redis hdel err :", err)
				}
				r.Close()
				break
			}

			//如果玩家已被灭，不能操作
			if model.RoomData[roomIndex].HeroTankArray[p].Status == 1 {
				readData := string(wsdata)
				model.UserKey[roomIndex][p] = readData //键盘按键
			}

		}
	} else {
		data := make(map[string]interface{})
		data["message"] = "你不在该房间"
		c.JSON(200, data)
	}

}

//下发作战区数据（客户端FlushMap）
func sendTankeMessage(ws *websocket.Conn, uid string, roomIndex int) {
	data := make(map[string]interface{})
	bgPlaySetOn := true
	for {
		if model.RoomStatus[roomIndex] != 1 {
			break
		}

		for i := 0; i < len(model.RoomAudio[roomIndex]); i++ {
			model.RoomAudio[roomIndex][i] = ""
		}
		for i := 0; i < len(model.RoomDraw[roomIndex]); i++ {
			model.RoomDraw[roomIndex][i] = ""
		}
		if bgPlaySetOn {
			model.RoomAudio[roomIndex][2] = "bgPlay"
			bgPlaySetOn = false
		}

		time.Sleep(time.Millisecond * 75)

		data["grassArray"] = model.GetGrass(roomIndex)
		data["wallArray"] = model.GetWall(roomIndex)
		data["steelArray"] = model.GetSteel(roomIndex)
		data["desertArray"] = model.GetDesert(roomIndex)
		data["riverArray"] = model.GetRiver(roomIndex)
		data["noEntryArea"] = model.GetNoEntryArea(roomIndex)
		data["heroTank"] = model.GetHeroTank(roomIndex)
		data["enemyTank"] = model.GetEnemyTank(roomIndex)
		data["roomStatus"] = model.RoomStatus[roomIndex]
		data["audioPlay"] = model.RoomAudio[roomIndex]
		data["drawPlay"] = model.RoomDraw[roomIndex]

		err = ws.WriteJSON(data)
		if err != nil {
			break
		}

	}
}

//敌人坦克移动
func enemyMove(roomIndex int) {
	for {
		if model.RoomStatus[roomIndex] != 1 {
			break
		}
		time.Sleep(time.Millisecond * 50)
		model.EnemyMove(roomIndex)
		model.CheckHeroTankPosition(roomIndex)
		model.CheckNoEntryArea(roomIndex)
	}
}

func enemyShot(roomIndex int) {
	for {
		if model.RoomStatus[roomIndex] != 1 {
			break
		}
		time.Sleep(time.Second * 2)
		model.EnemyShot(roomIndex)
		fmt.Printf("enemyShot 进行中... RoomStatus[%d] : %d \n", roomIndex, model.RoomStatus[roomIndex])
	}
}

func enemyMoveDirect(roomIndex int) {
	for {
		if model.RoomStatus[roomIndex] != 1 {
			break
		}
		time.Sleep(time.Second * 4)
		model.EnemyMoveDirect(roomIndex)
	}
}

//子弹相关计算
func bulletCountAll(roomIndex int) {
	for {
		if model.RoomStatus[roomIndex] != 1 {
			break
		}
		time.Sleep(time.Millisecond * 20)
		model.HeroBulletFly(roomIndex)
		model.EnemyBulletFly(roomIndex)
		model.CheckKillEnemy(roomIndex)
		model.CheckShotHero(roomIndex)
	}

}

//用户坦克移动
func userControl(roomIndex int, uid string) {
	r := redis.Pool.Get()
	defer r.Close()
	roomId := strconv.Itoa(roomIndex + 1)
	key := "room" + roomId
	for {
		if model.RoomStatus[roomIndex] != 1 {
			break
		}
		//检测房间中是否有人
		count, err := redigo.Int(r.Do("HLEN", key))
		if err != nil {
			fmt.Println("userControl redis get failed:", err)
		}
		if count == 0 {
			model.RoomStatus[roomIndex] = 4
		}

		time.Sleep(time.Millisecond * 50)
		model.UserControl(roomIndex, uid)
	}
}

//检测是否过关或失败
func checkGameOver(roomIndex int) {
	for {
		if model.RoomStatus[roomIndex] != 1 {
			break
		}
		time.Sleep(time.Millisecond * 100)
		model.CheckPass(roomIndex)
		model.CheckFail(roomIndex)
	}

}

//验证该用户是否在房间中
func checkUser(uid string, roomId string) bool {
	r := redis.Pool.Get()
	key := "room" + roomId
	exist, err := redigo.Bool(r.Do("HEXISTS", key, uid))
	if err != nil {
		fmt.Println("checkUser redis get error :", err)
	}
	r.Close()
	return exist
}


//手机测试页面
func GamePhone(c *gin.Context) {
	data := make(map[string]interface{})
	data["title"] = "坦克大战 手机页面"
	c.HTML(http.StatusOK, "GamePhone.html", data)
}
