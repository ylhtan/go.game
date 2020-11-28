package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"app/config"
	"app/controller"
	"app/database/redis"
)

func init() {
	redis.InitRedis(config.Redis["host"]+":"+config.Redis["port"], config.Redis["auth"])
}

func main() {
	r := gin.Default()
	r.LoadHTMLGlob(config.Web["root"]+"/src/app/view/*")
	r.StaticFS("/static", http.Dir(config.Web["root"]+"/src/app/static"))

	r.GET("/", indexHandler)

	local := r.Group("local")
	{
		local.GET("/start", controller.LocalStart)
		local.GET("/tanke", controller.LocalTanke)
	}
	game := r.Group("game")
	{
		game.GET("/start", controller.GameStart)
		game.GET("/room", controller.GameRoom)
		game.GET("/roomSocket", controller.GameRoomSocket)
		game.GET("/roomStart", controller.GameRoomStart)
		game.GET("/tanke", controller.GameTanke)
		game.GET("/tankeSocket", controller.GameTankeSocket)
		game.GET("/phone", controller.GamePhone)
	}

	r.Run(":3031") // 监听并在 0.0.0.0:3031 上启动服务
}

func indexHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "index page is running ..",
	})
}
