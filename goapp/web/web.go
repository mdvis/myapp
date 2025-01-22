package main

import (
	"fmt"
	"html/template"
	"net/http"

	log "github.com/sirupsen/logrus"
)

func escape(w http.ResponseWriter, r *http.Request) {
	str := "<script>console.log(666);</script>"

	fmt.Fprint(w, str, template.HTMLEscapeString(str))
	template.HTMLEscape(w, []byte(str))
}

func main() {

	log.WithFields(log.Fields{
		"animal": "walrus",
	}).Info("A walrus appears")

	http.HandleFunc("/", static)
	http.HandleFunc("/login", login)
	http.HandleFunc("/event_source", sse)
	http.HandleFunc("/escape", escape)
	http.HandleFunc("/upload", upload)
	http.HandleFunc("/register", register)

	query("11")
	insert("aa", "2024-12-21")
	alter("cc", "1")
	del("8")

	rds()
	md()

	err := http.ListenAndServe(":8090", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
