package main

import (
	"bufio"
	"os"
)

func readLine(path string) (ct []string) {
	file, err := os.Open(path)

	if err != nil {
	}

	content := bufio.NewReader(file)

	for {
		line, _, err := content.ReadLine()
		if err != nil {
		}
		if line == nil {
			break
		}
		v := string(line)
		ct = append(ct, v)
	}
	return
}
