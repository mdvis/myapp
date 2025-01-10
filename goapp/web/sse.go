// ------
// name: sse.go
// author: Deve
// date: 2025-01-07
// ------

package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"
)

func sse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Content-Type", "text/event-stream;charset=utf-8")

	var i int

	for {
		i++
		fmt.Fprintf(w, "event: notice\ndata: %s\n", "通知"+strconv.Itoa(i))
		fmt.Fprintf(w, "data: +++\n\n")

		fmt.Fprintf(w, "data: %s\n", "消息"+strconv.Itoa(i))
		fmt.Fprintf(w, "data: %s\n\n", "---")
		if f, ok := w.(http.Flusher); ok {
			f.Flush()
		}
		time.Sleep(1 * time.Second)
	}
}
