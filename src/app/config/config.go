package config

var Redis map[string]string
var Web map[string]string

func init() {

	Redis = make(map[string]string)
	Redis["host"] = "127.0.0.1"
	Redis["port"] = "6379"
	Redis["auth"] = "123456"

	Web = make(map[string]string)
	Web["root"] = "/Users/work/data/go/go.game"
	Web["domain"] = "192.168.2.105"
	Web["ws"] = "192.168.2.105:3031"

}