package controller

import (
	"net/http"
	"github.com/gorilla/websocket"
)

var (
	err error
)

//support websocket
var upGrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func init() {
	initRoom()
}

