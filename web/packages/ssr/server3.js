const http = require('http');

const req = http.request(
    'http://dev.web-center:8000/api/auth/doLogin',
     {
         method: "POST",
         headers:{"Content-Type":"application/json"}
    } ,
    function(res){
        const obj = res.headers['set-cookie'].reduce((pre,cur)=>{
            const origin = cur.split(";")[0].split('=')
            pre[origin[0]]=`${origin[0]}=${origin[1]}`
            return pre
        }, {})
        console.log(obj)
        console.log(JSON.stringify(obj))
        console.log(obj.JSESSIONID)
        console.log(obj.rememberMe)
    })
req.write(JSON.stringify({
password: "eiPS+KKtlZo3Rwww05ySBKFpZR0PdlA2sdKYTqZI5tZegLIoUUNMXTUpWS1PwycrT/Yq5d9edIPtVEqhC3BoQnyVdaFzy7P+cHLB6BgHG6bCZwGbKoogQla/2/6vxGREESEi+kaZULJbermmf9AkNYuHIoVaY1A+PEIGAAbdZhI=",
token: "7df16df563ee48219b8f7c7240df4cfe",
userName: "user",
}))
req.end()
