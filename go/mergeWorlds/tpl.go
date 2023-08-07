package main

func tpl(mp map[string]string) (tmp string) {
	tmp += "<root>\n"
	for k := range mp {
		tmp += ("  " + k)
		tmp += "\n"
	}
	tmp += "</root>"
	return
}
