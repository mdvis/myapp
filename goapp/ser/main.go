package main

import (
	"fmt"
	"net/http"
	"text/template"
)

func main() {
	http.HandleFunc("/about2", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.SetCookie(w, &http.Cookie{Name: "ser1", Value: "ser1"})
		for _, v := range r.Cookies() {
			fmt.Println(v)
		}

		t, _ := template.ParseFiles("./html.html")
		t.Execute(w, "")
	})
	http.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.SetCookie(w, &http.Cookie{Name: "ser1", Value: "ser1"})
		for _, v := range r.Cookies() {
			fmt.Println(v)
		}

		t, _ := template.ParseFiles("./html.html")
		t.Execute(w, "")
	})
	http.ListenAndServe(":9001", nil)
}
