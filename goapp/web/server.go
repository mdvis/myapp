package main

import (
	"fmt"
	"log"
	"net/http"
	"web/utils"
)

const port = "9009"

func main() {
	utils.StaticServer()

	for k, v := range utils.Routers {
		http.HandleFunc(k, v)
	}

	err := http.ListenAndServe(":"+port, nil)

	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}

	fmt.Println(port)
}
