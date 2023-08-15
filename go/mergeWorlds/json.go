package main

import "strings"

func handleJSON(path string) []string {
	ls := readLine(path)
	return ls
}

func filter(arr []string, test func(string) bool) (rst []string) {
	for _, item := range arr {
		if test(item) {
			rst = append(rst, item)
		}
	}
	return
}

func test(s string) bool {
	return strings.Index(s, "word") == -1
}

func isJSON(s string) bool {
	return strings.HasSuffix(s, "json")
}
