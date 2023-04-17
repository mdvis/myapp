package utils

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
)

func UploadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(20 << 32)
	file, handler, err := r.FormFile("backup")
	if err != nil {
		log.Fatal(err)
		return
	}
	f, err := os.OpenFile(DIR_BACKUP_FILES+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		log.Fatal(err)
		return
	}
	io.Copy(f, file)
	defer f.Close()
	defer file.Close()
}

func Backup(filename string, targetUrl string) error {
	bodyBuf := &bytes.Buffer{}
	bodyWriter := multipart.NewWriter(bodyBuf)

	fileWriter, err := bodyWriter.CreateFormFile("backup", filename)
	if err != nil {
		log.Fatal(err)
		fmt.Println("err write to buf")
		return err
	}

	fh, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
		fmt.Println("err open file")
		return err
	}

	_, err = io.Copy(fileWriter, fh)
	if err != nil {
		log.Fatal(err)
	}

	contentType := bodyWriter.FormDataContentType()
	bodyWriter.Close()
	resp, err := http.Post(targetUrl, contentType, bodyBuf)
	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	resp_body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Status)
	fmt.Println(string(resp_body))

	return nil
}
