package main

import (
	"crypto/md5"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"
)

var a string

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

func escape(w http.ResponseWriter, r *http.Request) {
	str := "<script>console.log(666);</script>"

	fmt.Fprint(w, str, template.HTMLEscapeString(str))
	template.HTMLEscape(w, []byte(str))

}

func main() {
	http.HandleFunc("/", static)
	http.HandleFunc("/login", login)
	http.HandleFunc("/event_source", sse)
	http.HandleFunc("/escape", escape)
	http.HandleFunc("/upload", upload)

	query("2")
	insert("aa", "2024-12-21")
	alter("cc", "1")

	err := http.ListenAndServe(":8090", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
