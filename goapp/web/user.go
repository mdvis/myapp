// ------
// name: user.go
// author: Deve
// date: 2025-01-10
// ------

package main

import (
	"crypto/md5"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"strconv"
	"time"
)

func login(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		t, _ := template.ParseFiles("login.gtpl")
		h := md5.New()
		io.WriteString(h, strconv.FormatInt(time.Now().Unix(), 10))
		k := fmt.Sprintf("%x", h.Sum(nil))
		tkMap := map[string]string{"token": k}
		t.Execute(w, tkMap)
	} else {
		// r.ParseForm()
		// fmt.Println("username:", r.Form["username"])
		// fmt.Println("password:", r.Form["password"])
		k := r.FormValue("token")
		if k != "" {
			http.Redirect(w, r, "/sse?name="+r.FormValue("username")+"&pass="+r.FormValue("password"), http.StatusTemporaryRedirect)
		} else {
			fmt.Fprintf(w, "no token")
		}
	}
}

func register(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		tpl := `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title></title>
            </head>
            <body>
                <form action="/register" method="post">
                    <input type="text" name="username">
                    <input type="password" name="password">
                    <input type="submit" value="提交">
                </form>
            </body>
            </html>
            `
		t := template.Must(template.New("register").Parse(tpl))
		t.Execute(w, nil)
	} else {

		fmt.Fprintln(w, r.FormValue("username"), r.FormValue("password"))
		fmt.Fprintln(w, "register")
	}
}
