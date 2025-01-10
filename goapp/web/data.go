// ------
// name: data.go
// author: Deve
// date: 2025-01-08
// ------

package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	uid      string `db:"uid"`
	username string `db:"username"`
	created  string `db:"created"`
}

func query(uid string) {
	db, err := sql.Open("mysql", "root:12345678@tcp(127.0.0.1:3306)/web")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	stmt, err := db.Prepare("SELECT uid, username, created FROM userinfo where uid=?")

	if err != nil {
		log.Fatal(err)
	}

	defer stmt.Close()

	var user User

    err = stmt.QueryRow(uid).Scan(&user.uid, &user.username, &user.created)

    if err != nil {
		log.Fatal(err)
	}

	fmt.Print(user)
}

func insert(username, created string) {
	db, err := sql.Open("mysql", "root:12345678@tcp(127.0.0.1:3306)/web")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	stmt, err := db.Prepare("insert userinfo set username=?,created=?")

	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec(username, created)

	if err != nil {
		log.Fatal(err)
	}

	id, err := res.LastInsertId()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(id)
}

func alter(username, id string) {
	db, err := sql.Open("mysql", "root:12345678@tcp(127.0.0.1:3306)/web")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	stmt, err := db.Prepare("update userinfo set username=? where uid=?")

	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec(username, id)

	if err != nil {
		log.Fatal(err)
	}

	affect, err := res.RowsAffected()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(affect)
}
