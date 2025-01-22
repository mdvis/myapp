// ------
// name: static.go
// author: Deve
// date: 2025-01-07
// ------

package main

import (
	"net/http"
)

func static(w http.ResponseWriter, r *http.Request) {
	fs := http.FileServer(http.Dir("web/static/"))
	fs.ServeHTTP(w, r)
}
