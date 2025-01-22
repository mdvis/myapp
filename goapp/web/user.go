// ------
// name: user.go
// author: Deve
// date: 2025-01-10
// ------

package main

import (
	"crypto/md5"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/sessions"

	"github.com/spf13/viper"
)

func setSession(w http.ResponseWriter, r *http.Request, username, password string) {
	viper.SetConfigName("config")
	viper.SetConfigType("toml")
	viper.AddConfigPath(".")
	viper.ReadInConfig()

	sessionKey := viper.Get("sessionID").(string)
	store := sessions.NewCookieStore([]byte(sessionKey))
	session, _ := store.Get(r, "SESSION_ID")
	session.Values["username"] = username
	session.Values["password"] = password
	session.Save(r, w)
}

func getDNS() {
	viper.SetConfigName("config")
	viper.SetConfigType("toml")
	viper.AddConfigPath(".")
	viper.ReadInConfig()

	sqlInfo := viper.Get("mysql")

	fmt.Println(sqlInfo)
}

func whiteConf() {
	viper.SetConfigName("config")
	viper.SetConfigType("toml")
	viper.AddConfigPath(".")

	viper.WriteConfig()
	viper.WriteConfigAs("./config.toml")
}

func login(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		t, _ := template.ParseFiles("login.gtpl")
		h := md5.New()

		io.WriteString(h, strconv.FormatInt(time.Now().Unix(), 10))

		k := fmt.Sprintf("%x", h.Sum(nil))
		tkMap := map[string]string{"token": k}

		t.Execute(w, tkMap)
	} else {
		// r.ParseForm()
		// fmt.Println("username:", r.Form["username"])
		// fmt.Println("password:", r.Form["password"])
		username := r.FormValue("username")
		password := r.FormValue("password")

		setSession(w, r, username, password)

		k := r.FormValue("token")

		if k != "" {
			http.Redirect(w, r, "/sse?name="+username+"&pass="+password, http.StatusTemporaryRedirect)
		} else {
			fmt.Fprintf(w, "no token")
		}
	}
}

func register(w http.ResponseWriter, r *http.Request) {
	expiration := time.Now()
	expiration = expiration.Add(time.Hour * 24)
	cookie := http.Cookie{Name: "aa", Value: "bb", Expires: expiration, SameSite: http.SameSiteNoneMode, Secure: true, HttpOnly: true, MaxAge: 3600}
	http.SetCookie(w, &cookie)
	if r.Method == "GET" {
		tpl := `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title></title>
            </head>
            <body>
                <form action="/register" method="post">
                    <input type="text" name="username">
                    <input type="password" name="password">
                    <input type="submit" value="提交">
                </form>
            </body>
            </html>
            `
		t := template.Must(template.New("register").Parse(tpl))
		t.Execute(w, nil)
		text(w, r)
	} else {
		cookie, _ := r.Cookie("aa")
		fmt.Fprint(w, cookie)
		for _, ck := range r.Cookies() {
			fmt.Fprint(w, ck)
		}
		fmt.Fprintln(w, r.FormValue("username"), r.FormValue("password"))
		fmt.Fprintln(w, "register")
	}
}
