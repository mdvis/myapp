package main

import (
	"fmt"
	"net/http"

	"github.com/go-jose/go-jose/v3/json"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	j, err := json.Marshal(map[string]interface{}{"name": "nihao", "age": 34, "sex": 0})
	if err != nil {
	}
	fmt.Fprintln(w, j)
}

func main() {
	http.HandleFunc("/", handler)
	err := http.ListenAndServe(":8989", nil)
	if err != nil {
		fmt.Println("err")
	}
}
