package main

import "os"

func createFile(name, str string) {
	f, err := os.OpenFile(name, os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
	}
	f.WriteString(str)

	defer f.Close()
}
