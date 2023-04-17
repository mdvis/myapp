package main

import (
	"bufio"
	"flag"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

var wg sync.WaitGroup

func readLine(p string) (list []string) {
	f, err := os.Open(p)
	if err != nil {
		log.Fatal(err)
	}
	r := bufio.NewReader(f)
	for {
		line, _, err := r.ReadLine()
		if err != nil {
			break
		}
		list = append(list, string(line))
	}
	return
}

func spanIt(path, s, h1, h2 string) {
	defer wg.Done()
	nm := strings.ReplaceAll(s, "/", "")
	before := getBefore(nm, h1, h2)
	dir := filepath.Dir(path)
	newDir := dir + "/scripts/"
	_, err := os.Stat(newDir)
	if os.IsNotExist(err) {
		err := os.MkdirAll(newDir, 0755)
		if err != nil {
			log.Fatal(err)
		}
	}
	line := before +
		"    it(\"" + nm + "\", () => {\n" +
		"        cy.visit(\"" + h1 + s + "\");\n" +
		"        cy.compareSnapshot(\"" + nm + "\");\n" +
		"        cy.visit(\"" + h2 + s + "\");\n" +
		"        cy.compareSnapshot(\"" + nm + "\");\n" +
		"    });\n" +
		after
	ioutil.WriteFile("scripts/"+nm+".cy.js", []byte(line), 0666)
}

func main() {
	h1 := flag.String("h1", "", "host1")
	h2 := flag.String("h2", "", "host2")
	p := flag.String("p", "", "path")
	flag.Parse()
	if *p == "" {
		log.Fatal("no file")
	}
	if *h1 == "" {
		*h1 = "localhost:8000"
	}
	if *h2 == "" {
		*h2 = "localhost:8001"
	}
	path, err := filepath.Abs(*p)
	if err != nil {
		log.Fatal(err)
	}
	list := readLine(path)
	for _, l := range list {
		wg.Add(1)
		go spanIt(path, l, *h1, *h2)
	}
	wg.Wait()
}
