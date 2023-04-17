<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <form
      action="http://localhost:9009/login"
      method="post"
      enctype="multipart/form-data"
    >
      文件:
      <input type="file" name="file" />
      用户名:
      <input type="text" name="user" />
      密码:
      <input type="password" name="password" />
      权限:
      <select id="perm" name="perm">
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
      <input type="hidden" name="token" value="{{.}}" />
      <input type="submit" />
    </form>
  </body>
</html>
