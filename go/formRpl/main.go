package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"sync"
)

var wg sync.WaitGroup

func main() {
	listPath := os.Args[1]
	fileLine := readFileLine(listPath)

	for _, file := range fileLine {
		wg.Add(1)
		go func(file string) {
			var cache []string
			fileLine := readFileLine(file)
			for _, file := range fileLine {
				res := replaceKeyWord(file)
				cache = append(cache, res...)
			}
			writeFile(file, cache)
			wg.Done()
		}(file)
	}
	go func() {
		for {
			for i := range `-\|/` {
				fmt.Printf("\r%c", i)
			}
		}
	}()
	wg.Wait()
}

func writeFile(path string, content []string) {
	cv := []byte(strings.Join(content, "\n"))
	ioutil.WriteFile(path, cv, 0655)
}

func readFileLine(path string) (fileList []string) {
	fileContent, err := readFileToString(path)
	if err != nil {
		log.Fatal(err)
	}

	fileList, err = readFileToStringList(fileContent)
	if err != nil {
		log.Fatal(err)
	}
	return
}

func replaceKeyWord(s string) (res []string) {
	importIdx := strings.Index(s, "import")
	hasImport := importIdx != -1

	res = []string{s}

	if hasImport {
		formReg := " Form,"
		formIdx := strings.Index(s, formReg)
		hasForm := formIdx != -1

		if hasForm {
			r := "import Form from '@ant-design/compatible'"
			res = []string{strings.Replace(s, formReg, "", 1), r}
		}
	}

	return
}

func readFileToString(path string) (content string, err error) {
	f, err := ioutil.ReadFile(path)

	if err != nil {
		log.Fatal(err)
	}

	content = string(f)
	return
}

func readFileToStringList(s string) (list []string, err error) {
	stringReader := strings.NewReader(s)
	reader := bufio.NewReader(stringReader)

	for {
		line, _, err := reader.ReadLine()

		if err != nil {
			break
		}
		list = append(list, (string(line)))
	}
	return
}
