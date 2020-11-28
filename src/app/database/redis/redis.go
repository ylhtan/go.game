package redis

import (
	redigo "github.com/gomodule/redigo/redis"
    "fmt"
)

var Pool *redigo.Pool

func InitRedis(server string, password string) {

	Pool = &redigo.Pool{
		MaxIdle:16,
		MaxActive:0,
		IdleTimeout:300,
		Dial: func() (redigo.Conn, error) {
            c, err := redigo.Dial("tcp", server)
            if err != nil {
                return nil, fmt.Errorf("redis connection error: %s", err)
            }
            if password != "" {
                if _, err := c.Do("AUTH", password); err != nil {
                    c.Close()
                    return nil, fmt.Errorf("redis auth password error: %s", err)
                }
            }
            return c, err
        },
	}
    _, err := Pool.Dial()
    if err != nil {
        panic(err.Error())
    } else {
        fmt.Println("main init -> init redis pool success")
    }
    
}

