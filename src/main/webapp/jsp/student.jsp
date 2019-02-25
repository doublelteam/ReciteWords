<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>单词贝多芬</title>
	<link rel="stylesheet" href="../css/materialize.min.css">
	<link rel="stylesheet" href="../css/icomoon.css">
	<link rel="stylesheet" href="../css/student.css">
	<link rel="icon" href="../images/logo.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="../images/logo.ico" type="image/x-icon" />
	<link rel="bookmark" href="../images/logo.ico" type="image/x-icon" />
</head>
<body onload="getExamList();getStudentInfo()">

	<!-- 导航栏 -->
    <div class="navbar-fixed">
	<nav>
    	<div class="nav-wrapper">
    		<a href="/student" class="brand-logo">单词贝多芬</a>
    			<ul class="right">
					<li><a id="name" class="waves-effect" href="#">名字</a></li>
					<li><a id="points" class="waves-effect" href="#">积分</a></li>
    				<li><a class="waves-effect" href="#modal1">注销</a></li>
    			</ul>
    	</div>
  	</nav>
    </div>
    <!-- 退出账号提示 -->
	<div id="modal1" class="modal l6">
    	<div class="modal-content">
      		<h6>你确定退出当前账号吗？</h6>
    	</div>
    	<div class="modal-footer">
      		<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" id="logout">确定</a>
      		<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">取消</a>
    	</div>
  	</div>


    <!-- 等待完成的考试 -->
	<div class="container" id="oout2">
		<div class="row">
			<h4><i class="icon-files-empty"></i>词库</h4>


        	<!-- dv1 -->
            <!-- <div class="col s12 m6 l4 hoverable"> -->
                <!-- dv2 -->
                <!-- <div class="card"> -->
                    <!-- dv3 -->
                    <!-- <div class="card-content white-text amber darken-4"> -->
                        <!-- <span class="card-title">考试标题</span> -->
                        <!-- <p>开始时间：</p><p name="startTime">2018-09-01 22:08</p> -->
                        <!-- <p>结束时间：</p><p name="endTime">2018-09-01 22:08</p> -->
                    <!-- </div> -->

                    <!-- dv4 -->
                    <!-- <div class="card-action blue-grey darken-1"> -->
                        <!-- <a href="#">进入考试</a> -->
                    <!-- </div> -->
                <!-- </div> -->
            <!-- </div> -->


      	</div>
	</div>

	<!-- Modal Trigger -->
	<%--<a class="modal-trigger waves-effect waves-light btn" href="#modal1">模态</a>--%>

	<!-- Modal Structure -->
	<div id="modal2" class="modal">
		<div class="modal-content">
			<h4>选择背诵单词数量</h4>
		</div>
		<div class="input-field col s12">
			<select style="display: block;width: 50%;">
				<option value="" disabled selected>请选择数量</option>
				<option>10</option>
				<option>20</option>
				<option>30</option>
				<option>40</option>
				<option>50</option>
				<option>60</option>
				<option>70</option>
			</select>
		</div>
		<div class="modal-footer">
			<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat btn" onclick="gotoExam()">确定</a>
		</div>
	</div>

	<script src="../js/jquery.min.js"></script>
	<script src="../js/materialize.min.js"></script>
  	<script src="../js/student.js"></script>
</body>
</html>