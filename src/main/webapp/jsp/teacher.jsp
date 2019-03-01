<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>单词贝多芬</title>
	<link rel="stylesheet" href="../css/materialize.css">
	<link rel="stylesheet" href="../css/icomoon.css">
	<link rel="stylesheet" href="../css/teacher.css">
    <link rel="icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="bookmark" href="../images/logo.ico" type="image/x-icon" />
</head>
<body>
	<!-- 导航栏 -->
	<div class="navbar-fixed">
		<nav>
    		<div class="nav-wrapper">
    			<a href="/teacher" class="brand-logo">管理页面</a>
    				<ul class="right">
						<li><a id="name" class="waves-effect" href="#">账号</a> </li>
						<li><a class='dropdown-button' href='#' data-activates='dropdown1'>管理系统</a></li>
    					<li><a class="waves-effect" href="#modal3">注销</a></li>
    				</ul>
    		</div>
  		</nav>
	</div>

	<!--下拉菜单-->

	<ul id='dropdown1' class='dropdown-content' style="position: absolute">
		<li><a id="c_password" class="waves-effect" href="#">修改密码</a></li>
		<li class="divider"></li>
		<li><a id="manager" class="waves-effect" href="#">管理学生</a></li>
		<li class="divider"></li>
		<li><a id="query" class="waves-effect" href="#">积分修改记录</a></li>
	</ul>

	<%--修改密码--%>
	<div class="container" id="changePassword">
		<div class="row">
			<form class="col s12">
				<div class="row">
					<div class="input-field col s6 push-s3">
						<i class="icon-user prefix"></i>
						<input id="oldpassword" type="password" class="validate">
						<label for="oldpassword">原密码</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6 push-s3">
						<i class="icon-key prefix"></i>
						<input id="newpassword" type="password" class="validate"  >
						<label for="newpassword">新密码</label>
					</div>
				</div>

				<div class="row">
					<div class="input-field col s6 push-s3">
						<i class="icon-key prefix"></i>
						<input id="newpassword2" type="password" class="validate"  >
						<label for="newpassword2">确认新密码</label>
					</div>
				</div>

				<div class="row">
					<!-- <div></div> -->
					<a href="#" class="col btn push-s3 s2" id="yes">确定</a>
					<a href="#" class="col btn s2 push-s4" id="cancel">取消</a>
				</div>
			</form>
		</div>
	</div>



  	<!-- 注销确认 -->
  	<div id="modal3" class="modal">
    	<div class="header">
      		<div class="tip"><h6>你确定退出当前账号吗？</h6></div>
    	</div>
    	<div class="footer">
      		<a href="#!" class="modal-close waves-effect" id="logout">确定</a>
      		<a href="#!" class="modal-close waves-effect">取消</a>
    	</div>
  	</div>



	<%--添加学生--%>
	<div id="modal2" class="modal l6">
		<h5 style="text-align: center;margin: 20px 0;">请输入要添加的账号及密码</h5>
		<div class="modal-content" style="width: 70%;margin: 0 auto;">

			<div class="row">
				<div class="input-field col s12">
					<i class="icon-user prefix"></i>
					<input id="userName" type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
					<label for="userName">用户名</label>
					<span></span>
				</div>
			</div>

			<div class="row">
				<div class="input-field col s12">
					<i class="icon-key prefix"></i>
					<input id="password" type="password" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
					<label for="password">密码</label>
					<div id="eye" class="eye"><i class="icon-eye"></i></div>
					<span></span>
				</div>
			</div>

			<div class="row">
				<div class="input-field col s12">
					<i class="span icon-accessibility prefix"></i>
					<select name="" id="type" style="display: inline-block;">
						<option value="" selected disabled>请选择添加账号的类型</option>
						<option value="">教师</option>
						<option value="">学生</option>
					</select>
				</div>
			</div>

			<div class="row managerPass" style="display: none;">
				<div class="input-field col s12">
					<i class="icon-key prefix"></i>
					<input id="managerPassword" type="password" onkeyup="value=value.replace(/[^\w\\/]/ig,'')">
					<label for="managerPassword">管理密码</label>
					<div id="eye2" class="eye"><i class="icon-eye"></i></div>
					<span></span>
				</div>
			</div>

		</div>
		<div class="modal-footer">
			<a href="#modal1" class="col s8 btn modal-action modal-close waves-effect waves-green">确定</a>
			<%--<a href="#!" class="btn modal-action modal-close waves-effect waves-green push-s3">取消</a>--%>
		</div>
	</div>


	<%--确认添加--%>
	<div id="modal1" class="modal l6">
		<div class="modal-content">
			<h6>请确认已经完整输入信息，信息已经填完了吗？</h6>
		</div>
		<div class="modal-footer">
			<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" onclick="add()">确定</a>
			<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">取消</a>
		</div>
	</div>

  	<!-- 创建/发布考试 -->
  	<div class="container" id="oout2" style="display: block">
		<div class="row">
			<h4><i class="icon-files-empty"></i> 词库</h4>
        </div>
    	<a class="waves-effect waves-light btn" href="javascript:$('#file').click()"  id="CreateExam"><i class="icon-plus left"></i>添加新的词库</a>
        <a class="waves-effect waves-light btn" href="/template/words.xlsx" >导出词库文件模板</a>
        <form id="uploadForm" class="row" style="display: none" enctype="multipart/form-data" method="post" action="/teacher/uploadwords">
        <input type="file" name="file" id="file" accept=".xlsx" style="display: none" onchange="uploadWords()">
        </form>
    </div>


	<%--管理学生--%>
	<div class="container" id="managerStudent">

		<div class="close">
			<i class="icon-switch"></i>
		</div>
		<div class="row">
			<h4><i class="icon-files-empty"></i> 学生信息</h4>
		</div>

		<div id="search-container">
			<input id="input" type="text" placeholder="输入要搜索或添加的账号"/>
			<a id="search" class="btn waves-effect">搜索</a>
			<a id="add" class="btn waves-effect" href="#modal2">添加账号</a>
		</div>

		<table id="studentTable" border="1" style="border: 1px solid #000;text-align: center">
			<thead>
				<tr>
					<th>账号</th>
					<th>积分</th>
					<th>操作</th>
				</tr>
			</thead>

			<tbody>

			</tbody>
			<%--<tr>--%>
				<%--<td>yy123</td>--%>
				<%--<td>100分</td>--%>
				<%--<td>--%>
					<%--<a class="modify" href="#">修改积分</a>--%>
					<%--<a class="delete" href="#">删除</a>--%>
					<%--<a class="reset" href="#">重置密码</a>--%>
				<%--</td>--%>
			<%--</tr>--%>
		</table>
	</div>


	<%--查询积分修改记录--%>
	<div class="container" id="record">
		<div class="close2">
			<i class="icon-switch"></i>
		</div>

		<div class="row">
			<h4><i class="icon-files-empty"></i> 积分修改记录</h4>
		</div>

		<div id="recordSearch-container"></div>

		<table id="recordTable" border="1" style="border: 1px solid #000;text-align: center">
			<thead>
				<tr>
					<th>时间</th>
					<th>IP</th>
					<th>修改人</th>
					<th>被修改账号</th>
					<th>修改前积分</th>
					<th>修改后积分</th>
				</tr>
			</thead>
			<tbody>

			</tbody>
		</table>
	</div>


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

	<%--修改密码修改积分删除账号弹框--%>
	<div id="modal4" class="modal" style="border-radius: 6%">
		<div class="header2">
			<div class="tip2"><h6></h6></div>
			<input type="text" id="modify-input" placeholder="在这里输入">
			<input type="password" id="modify-input2" placeholder="在这里输入管理密码" style="display: none;">
			<%--<input type="password" id="modify-input3" placeholder="请在这里输入管理密码" >--%>
		</div>
		<div class="footer2">
			<a href="#!" class="modal-close waves-effect" id="modify">确定</a>
			<a href="#!" class="modal-close waves-effect">取消</a>
		</div>
	</div>


  <script src="../js/jquery.min.js"></script>
	<script src="../js/materialize.min.js"></script>
  <script src="../js/teacher.js"></script>
</body>
</html>