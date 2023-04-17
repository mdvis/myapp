package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	urls := os.Args[1:]
	for _, url := range urls {
		resp, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
		}
		b, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%s", b)
	}
	Run(urls)
}
