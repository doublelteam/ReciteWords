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
<body >
	<!-- 导航栏 -->
	<nav>
    	<div class="nav-wrapper">
    		<a href="/teacher" class="brand-logo">管理页面</a>
    			<ul class="right">
    				<li><a class="waves-effect" href="#modal1">注销</a></li>
    			</ul>
    	</div>
  	</nav>
  	<!-- 注销确认 -->
  	<div id="modal1" class="modal l6">
    	<div class="modal-content">
      		<h6>你确定退出当前账号吗？</h6>
    	</div>
    	<div class="modal-footer">
      		<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" id="logout">确定</a>
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




  <script src="../js/jquery.min.js"></script>
	<script src="../js/materialize.min.js"></script>
  <script src="../js/teacher.js"></script>
</body>
</html>