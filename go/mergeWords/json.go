package main

import (
	"strings"
)

func handleJSON(path string) []string {
	ls := readLine(path)
	return filter(ls, test)
}

func filter(arr []string, test func(string) bool) (rst []string) {
	for _, item := range arr {
		if test(item) {
			rst = append(rst, wrapWord(item))
		}
	}
	return
}

func test(s string) bool {
	return strings.Index(s, "word") != -1
}

func isJSON(s string) bool {
	return strings.HasSuffix(s, "json")
}

func wrapWord(s string) string {
	wd := strings.Split(s, ":")[1]
	wd = "<headword>" + wd + "</headword>"
	return wd
}
