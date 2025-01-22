// ------
// name: data.go
// author: Deve
// date: 2025-01-08
// ------

package main

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/redis/go-redis/v9"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	log "github.com/sirupsen/logrus"
)

type User struct {
	uid      string `db:"uid"`
	username string `db:"username"`
	created  string `db:"created"`
}

func query(uid string) {
	db, err := sql.Open("mysql", "root:12345678@tcp(127.0.0.1:3306)/web")

	if err != nil {
		log.Fatal("query 打开错误", err)
	}

	defer db.Close()

	stmt, err := db.Prepare("SELECT uid, username, created FROM userinfo where uid=?")

	if err != nil {
		log.Fatal("查询 Prepare 错误", err)
	}

	defer stmt.Close()

	var user User

	err = stmt.QueryRow(uid).Scan(&user.uid, &user.username, &user.created)

	if err != nil {
		if err != sql.ErrNoRows {
			log.Fatal("查询错误", err)
		}
	}

	fmt.Println("查询到", user)
}

func insert(username, created string) {
	db, err := sql.Open("mysql", "root:12345678@tcp(127.0.0.1:3306)/web")

	if err != nil {
		log.Fatal("insert 打开错误", err)
	}

	defer db.Close()

	stmt, err := db.Prepare("insert userinfo set username=?,created=?")

	if err != nil {
		log.Fatal("插入 Prepar 错误", err)
	}

	res, err := stmt.Exec(username, created)

	if err != nil {
		log.Fatal("插入错误", err)
	}

	id, err := res.LastInsertId()

	if err != nil {
		log.Fatal("插入后错误", err)
	}

	fmt.Println("新建条目 ID", id)
}

func alter(username, id string) {
	db, err := sql.Open("mysql", "root:12345678@tcp(127.0.0.1:3306)/web")

	if err != nil {
		log.Fatal("alter 打开错误", err)
	}

	defer db.Close()

	stmt, err := db.Prepare("update userinfo set username=? where uid=?")

	if err != nil {
		log.Fatal("修改 Prepare 错误", err)
	}

	res, err := stmt.Exec(username, id)

	if err != nil {
		log.Fatal("修改错误", err)
	}
	affect, err := res.RowsAffected()

	if err != nil {
		log.Fatal("改后错误", err)
	}

	fmt.Println("修改操作影响", affect, "条")
}

func del(id string) {
	db, err := sql.Open("mysql", "root:12345678@tcp(127.0.0.1:3306)/web")

	if err != nil {
		log.Fatal("del 打开错误", err)
	}

	defer db.Close()

	stmt, err := db.Prepare("delete from userinfo where uid=?")

	if err != nil {
		log.Fatal("删除 Prepare 错误", err)
	}

	defer stmt.Close()

	res, err := stmt.Exec(id)

	if err != nil {
		log.Fatal("删除操作", err)
	}

	affect, err := res.RowsAffected()

	fmt.Println("删除操作影响", affect, "条")

}

func rds() {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	ctx := context.Background()
	get := rdb.Get(ctx, "key")
	set := rdb.Set(ctx, "key", "777", 0)

	fmt.Println("r2", set.Val(), set.Err())
	fmt.Println("r3", get.Val(), get.Err())

	cmd := rdb.Do(ctx, "get", "key")
	cmdResult, err := rdb.Do(ctx, "get", "key").Result()

	if err != nil {
		log.Fatal(err)
	}

	s, err := rdb.Do(ctx, "get", "key").Text()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("r4", cmd)
	fmt.Println("r5", cmdResult.(string))
	fmt.Println("r6", s)

}

func md() {

	client, err := mongo.Connect(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}

	collection := client.Database("baz").Collection("qux")

	res, err := collection.InsertOne(context.Background(), bson.D{
		{Key: "name", Value: "pi"},
		{Key: "value", Value: 3.14159},
	})

	if err != nil {
		log.Fatal(err)
	}
	id := res.InsertedID

	fmt.Println(id)

	var result struct {
		Value float64
	}

	err = collection.FindOne(context.Background(), bson.D{{"name", "pi"}}).Decode(&result)

	fmt.Println(result)
}
