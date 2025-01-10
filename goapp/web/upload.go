// ------
// name: upload.go
// author: Deve
// date: 2025-01-07
// ------
package main

import (
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
)

func upload(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		tpl := `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title></title>
        </head>
        <body>
        <form method="post" enctype="multipart/form-data" action="/upload">
        <input type="file" name="files" multiple id="file">
        <input type="submit" value="提交">
        </form>
        <script>
        document.querySelector('#file').addEventListener('change', console.log);
        </script>
        </body>
        </html>
        `
		t := template.Must(template.New("file").Parse(tpl))
		t.Execute(w, nil)
	} else {
		r.ParseMultipartForm(32 << 20)

		// r.FormFile("files")
		files := r.MultipartForm.File["files"]

		for _, fileHeader := range files {
			file, err := fileHeader.Open()
			defer file.Close()

			if err != nil {
				http.Error(w, "Unable to open file", http.StatusInternalServerError)
				return
			}

			dst, err := os.OpenFile("./test/"+fileHeader.Filename, os.O_WRONLY|os.O_CREATE, 0666)
			defer dst.Close()

			if err != nil {
				http.Error(w, "Unable to create file", http.StatusInternalServerError)
				return
			}

			io.Copy(dst, file)

			fmt.Fprint(w, "./test/"+fileHeader.Filename)
			fmt.Fprint(w, "\r")
		}

	}
}
