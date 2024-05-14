package main

import (
	"fmt"
	"reflect"
	"strconv"
)

type b struct {
}

func (B *b) String() string {
	return "666"
}

func name[T string | int](s T) T {
	return s
}

func main() {
	v := reflect.ValueOf(3)
	fmt.Println(v, v.String(), v.Type())

	var bb stringer = &b{}

	fmt.Println(Sprint(1))
	fmt.Println(Sprint(bb))

	t := reflect.TypeOf(3)
	s := reflect.TypeOf(bb)
	fmt.Println(t.String())
	fmt.Println(t)
	fmt.Println(s.String())
	fmt.Println(s)
	fmt.Println(bb)

	fmt.Println(name("rt"))
	fmt.Println(name[int](8))
}

type stringer interface {
	String() string
}

func Sprint(x any) string {
	switch x := x.(type) {
	case stringer:
		return x.String()
	case string:
		return x
	case int:
		return strconv.Itoa(x)
	case bool:
		if x {
			return "true"
		}
		return "false"
	default:
		return "???"
	}
}
