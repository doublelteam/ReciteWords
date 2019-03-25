<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<html>
<head>
	<meta charset="utf-8">
	<title>单词贝多芬</title>
	<link rel="stylesheet" href="../css/login.css">
	<link rel="icon" href="../images/logo.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="../images/logo.ico" type="image/x-icon" />
	<link rel="bookmark" href="../images/logo.ico" type="image/x-icon" />
</head>
<body background="../images/background.png">
	<form action="" id="loginWindow">
		<div class="title"><p>单词贝多芬</p></div>
		<div class="text_in"><input type="text" id="userName" class="input" placeholder="账号"><span class="img">&#xe971;</span></div>
		<div class="text_in"><input type="passWord" id="passWord" class="input" placeholder="密码"><span class="img">&#xe955;</span></div>
		<div class="radio" id="radio">
			<input type="radio" name="type" id="student">学生
			<input type="radio" name="type" id="teacher">老师
		</div>
		<input name="" type="button" id="login" value="登陆"></input>
	</form>

	<!—-错误弹框—->
	<div class="mask"></div>
	<div id="error">
		<div id="photo">
			<img src="../images/alert.gif" alt="" width="100%" height="100%">
		</div>
		<div id="information">
			<div><h5>error</h5></div>
			<div ><a href="#" id="ok">确定</a></div>
		</div>
	</div>


	 <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	<script src="../js/login.js"></script>
</body>
</html>

