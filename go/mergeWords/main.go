package main

import (
	"os"
	"strings"
	"sync"
	"time"
)

var ch = make(chan []string)
var mp = make(map[string]string)
var wg sync.WaitGroup

func main() {
	fileList := os.Args[1:]
	count := len(fileList)

	for _, v := range fileList {
		go func(path string) {
			var ls []string
			if isJSON(path) {
				ls = handleJSON(path)
			} else {
				ls = readLine(path)
			}
			ch <- ls
		}(v)
	}

	wg.Add(count)
	go func() {
		for v := range ch {
			count -= 1
			for _, i := range v[1 : len(v)-1] {
				mp[strings.TrimSpace(i)] = ""
			}
			if count == 0 {
				filename := "Words" + time.Now().Format("20060102") + ".xml"
				createFile(filename, tpl(mp))
			}
			wg.Done()
		}
	}()
	wg.Wait()
}
