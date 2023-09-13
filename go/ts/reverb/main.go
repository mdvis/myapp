package main

import (
	"fmt"
	"io"
	"net"
	"strings"
	"time"
)

func main() {

}

func handleConn(c net.Conn) {
	io.Copy(c, c)
	c.Close()
}

func echo(c net.Conn, shout string, delay time.Duration) {
	fmt.Fprintln(c, "\t", strings.ToUpper(shout))
	time.Sleep(delay)
	fmt.Fprintln(c, "\t", shout)
	time.Sleep(delay)
	fmt.Fprintln(c, "\t", strings.ToLower(shout))
}
