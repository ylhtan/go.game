package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
)


func LocalStart(c *gin.Context) {
	data := make(map[string]interface{})
	data["title"] = "坦克大战开始界面"
	c.HTML(http.StatusOK, "LocalStart.html", data)
}


func LocalTanke(c *gin.Context) {
	data := make(map[string]interface{})
	data["title"] = "坦克大战作战区"
	c.HTML(http.StatusOK, "LocalTanke.html", data)
}
