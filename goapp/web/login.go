package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"time"
)

var a string

func sayHelloName(w http.ResponseWriter, r *http.Request) {
	fs := http.FileServer(http.Dir("static/"))
	fs.ServeHTTP(w, r)
}

func login(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		t, _ := template.ParseFiles("login.gtpl")
		t.Execute(w, nil)
	} else {
		// r.ParseForm()
		// fmt.Println("username:", r.Form["username"])
		// fmt.Println("password:", r.Form["password"])
		http.Redirect(w, r, "/sse?"+"name="+r.FormValue("username")+"&"+"pass="+r.FormValue("password"), http.StatusTemporaryRedirect)
	}
}

func SSE(w http.ResponseWriter, r *http.Request) {
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

func main() {
	http.HandleFunc("/", sayHelloName)
	http.HandleFunc("/login", login)
	http.HandleFunc("/event_source", SSE)

	err := http.ListenAndServe(":8090", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
