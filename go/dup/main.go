package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

type Counts = map[string]int

func main() {
	counts := make(Counts)
	files := os.Args[1:]

	if len(files) == 0 {
		countLines(os.Stdin, counts)
	} else {
		for _, arg := range files {
			f, err := os.Open(arg)
			if err != nil {
				log.Fatal(err)
				continue
			}
			countLines(f, counts)
			f.Close()
		}
	}

	for l, n := range counts {
		if n > 1 {
			fmt.Printf("%s\t%d\n", l, n)
		}
	}
}

func countLines(f *os.File, counts Counts) {
	input := bufio.NewScanner(f)
	for input.Scan() {
		counts[input.Text()]++
	}
}
