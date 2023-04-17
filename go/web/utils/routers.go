package utils

import (
	"net/http"
)

var Routers = map[string]func(http.ResponseWriter, *http.Request){
	"/login":  LoginHandler,
	"/upload": UploadHandler,
}
