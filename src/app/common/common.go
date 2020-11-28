package common

import (
	"encoding/json"
	"fmt"
	"reflect"
)

func JsonToMap(jsonStr string) (map[string]string, error) {
	m := make(map[string]string)
	err := json.Unmarshal([]byte(jsonStr), &m)
	if err != nil {
		fmt.Printf("Unmarshal with error: %+v\n", err)
		return nil, err
	}
	
	return m, nil
}

func MapToJson(m map[string]string) (string, error) {
	jsonByte, err := json.Marshal(m)
	if err != nil {
		fmt.Printf("Marshal with error: %+v\n", err)
		return "", nil
	}
 
	return string(jsonByte), nil

}

func StructToMap(i interface{}) map[string]interface{} {
    var kv = make(map[string]interface{})
    vValue := reflect.ValueOf(i)
    vType :=reflect.TypeOf(i)
    for i:=0;i<vValue.NumField();i++{
        kv[vType.Field(i).Name] = vValue.Field(i).Interface()
    }
    return kv
}



