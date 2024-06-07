package utils

import (
	"crypto/md5"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	_ "web/utils/memory"
	"web/utils/session"
)

var globalSessions *session.Manager

func init() {
	globalSessions = session.NewManage("memory", "gossessionid", 3600)

	go globalSessions.GC()
}

type EchoObj struct {
	File     interface{}
	User     string
	Password string
	Perm     string
	Token    string
}

const (
	GETMETHOD  = "GET"
	POSTMETHOD = "POST"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	method := r.Method

	if method == GETMETHOD {
		getHandler(w, r)
	}

	if method == POSTMETHOD {
		postHandler(w, r)
	}
}

func getHandler(w http.ResponseWriter, r *http.Request) {
	Sc(w, &http.Cookie{Name: "ts", Value: "ll"})
	crutime := time.Now().Unix()

	h := md5.New()
	io.WriteString(h, strconv.FormatInt(crutime, 10))
	token := fmt.Sprintf("%x", h.Sum(nil))

	t, _ := template.ParseFiles("./tmpl/login.gtpl")
	t.Execute(w, token)
}

func postHandler(w http.ResponseWriter, r *http.Request) {
	Gc("ts", r)

	fmt.Println(globalSessions, "gggggggggggggg")

	globalSessions.SessionStart(w, r)

	r.ParseMultipartForm(32 << 20)
	//perm := r.Form.Get("perm")
	//isAdmin, _ := regexp.MatchString("admin", perm)
	token := r.Form.Get("token")
	if token != "" {
		filename := saveFile(r)
		initVal := &EchoObj{
			filename,
			r.Form.Get("user"),
			r.Form.Get("password"),
			r.Form.Get("perm"),
			token,
		}

		t, _ := template.ParseFiles("./tmpl/info.gtpl")

		t.Execute(w, initVal)
	} else {
		fmt.Fprint(w, "token")
	}
}

func saveFile(r *http.Request) string {
	file, handler, err := r.FormFile("file")

	if err != nil {
		log.Fatal(err)
		fmt.Println(err)
		return ""
	}

	defer file.Close()
	f, err := os.OpenFile(DIR_UPLOAD_FILES+handler.Filename,
		os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
		log.Fatal(err)
		fmt.Println(err)
		return ""
	}

	defer f.Close()
	io.Copy(f, file)

	defer Backup(DIR_UPLOAD_FILES+handler.Filename, "http://localhost:9009/upload")
	return handler.Filename
}
