package utils

import (
	"fmt"
	"net/http"
)

func Sc(w http.ResponseWriter, cookie *http.Cookie) {
	http.SetCookie(w, cookie)
}

func Gc(key string, r *http.Request) {
	for _, cookie := range r.Cookies() {
		fmt.Println(cookie, cookie.Name, cookie.Value)
	}
	fmt.Println(r.Cookie(key))
}
