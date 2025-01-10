<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <form action="http://127.0.0.1:8090/login" method="post">
        username: <input type="text" name="username">
        password: <input type="password" name="password">
        <input type="submit" value="登录">
        <input type="hidden" name="token" value={{.token}}>
    </form>
</body>
</html>
