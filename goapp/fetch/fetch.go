package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"time"
)

func fetch(url string, ch chan<- string) {
	start := time.Now()
	resp, err := http.Get(url)

	if err != nil {
		ch <- fmt.Sprint(err)
		return
	}

	nbytes, err := io.Copy(ioutil.Discard, resp.Body)
	resp.Body.Close()

	if err != nil {
		ch <- fmt.Sprintf("%s %v", url, err)
		return
	}

	secs := time.Since(start).Seconds()
	fmt.Println("hh")
	ch <- fmt.Sprintf("%.2fs %7d %s", secs, nbytes, url)
}

func Run(urls []string) {
	start := time.Now()
	ch := make(chan string)
	for _, url := range urls {
		go fetch(url, ch)
	}
	for range urls {
		fmt.Println(<-ch)
	}
	fmt.Printf("%.2fs", time.Since(start).Seconds())
}
