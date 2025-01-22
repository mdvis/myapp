// ------
// name: text.go
// author: Deve
// date: 2025-01-17
// ------

package main

import (
	"encoding/xml"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type Recurlyservers struct {
	XMLName     xml.Name `xml:"servers"`
	Version     string   `xml:"version,attr"`
	Svs         []server `xml:"server"`
	Description string   `xml:",innerxml"`
}

type server struct {
	XMLName    xml.Name `xml:"server"`
	ServerName string   `xml:"serverName"`
	ServerIP   string   `xml:"serverIP"`
}

func text(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open("doc.xml")
	defer file.Close()

	if err != nil {
		log.Fatal(err)
	}

	data, err := io.ReadAll(file)

	if err != err {
		log.Fatal(err)
	}

	v := Recurlyservers{}

	xml.Unmarshal(data, &v)

	// for a, b := range v.Svs {
	// 	fmt.Println(a, b)
	// }

	c, _ := xml.Marshal(v)

	fmt.Println(v)

	fmt.Fprintf(w, string(c))

	n := &Recurlyservers{}
	n.Version = "2"
	n.Svs = append(n.Svs, server{xml.Name{Space: "aaa"}, "bbb", "ccc"})

	e, _ := xml.MarshalIndent(n, " ", "  ")

	fmt.Fprintf(w, string(e))

	type Name struct {
		XMLName   xml.Name `xml:"name"`
		FirstName string   `xml:"name>first"`
		LastName  string   `xml:"name>last"`
	}

	vv := &Name{xml.Name{Space: "name"}, "mmm", "nnn"}
	vvv, _ := xml.Marshal(vv)

	fmt.Fprintf(w, string(vvv))

}
