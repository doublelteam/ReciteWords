<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>评卷中</title>
    <link rel="stylesheet" href="../css/materialize.min.css">
    <link rel="stylesheet" href="../css/icomoon.css">
    <link rel="stylesheet" href="../css/exam-marking.css">
    <link rel="icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="bookmark" href="../images/logo.ico" type="image/x-icon" />
</head>
<body onload="get_toMarkExam();get_toMarkStudentInfo();">
	<!-- 导航栏 -->
    <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
            <a href="/teacher" class="brand-logo" id="logo">批改试卷</a>
            <ul id="nav-mobile" class="right">
            <li id="StudentNum">学生学号：201630600000</li>
            <li id="StudentName">姓名：哈哈哈</li>
            <li id="StudentGrade">年级：2016</li>
            <li id="StudentClass">所属班级：网络工程</li>
            <li><a href="#" id="goback">回到首页</a></li>
            </ul>
      </div>
    </nav>
  </div>

    <!-- 题目导航 -->
    <div class="row" id="index" style="width: 20%;">
    <div class="col">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
           <p style="margin: 10px 0;text-align: center; color: orange">选择题</p>
          <div class="dd" id="c1">1</div>
          <div class="dd" id="c2">2</div>
          <div class="dd" id="c3">3</div>
          <div class="dd" id="c4">4</div>
          <div class="dd" id="c5">5</div>
          <br />
          <div class="dd" id="c6">6</div>
          <div class="dd" id="c7">7</div>
          <div class="dd" id="c8">8</div>
          <div class="dd" id="c9">9</div>
          <div class="dd" id="c10">10</div>
          <br />
          <p style="margin: 10px 0;text-align: center;color: orange">判断题</p>
          <div class="dd" id="c11">11</div>
          <div class="dd" id="c12">12</div>
          <div class="dd" id="c13">13</div>
          <div class="dd" id="c14">14</div>
          <div class="dd" id="c15">15</div>
          <br />
          <p style="margin: 10px 0;text-align: center;color: orange">填空题</p>
          <div class="dd" id="c16">16</div>
          <div class="dd" id="c17">17</div>
          <div class="dd" id="c18">18</div>
          <div class="dd" id="c19">19</div>
          <div class="dd" id="c20">20</div>
           <br />
          <p style="margin: 10px 0;text-align: center;color: orange">问答题</p>
          <div class="dd" id="c21">21</div>
          <div class="dd" id="c22">22</div>
          <div class="dd" id="c23">23</div>
          <div class="dd" id="c24">24</div>
          <div class="dd" id="c25">25</div>
          <div class="card-action" style="padding: 10px;border-top: 1px solid rgba(255,255,255,.3);">
            <p style="margin: 10px 0;color: orange">考试时间：<br><span  id="timer"></span></p>
            <p style="margin: 10px 0;color: orange">最终得分：<br><span  id="score"></span><span id="score2">0分</span></p>
            <button class="btn waves-effect" id="submit"><i class="icon-quill"></i>提交批阅</button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <h2 class="title" id="title"></h2>
 <h3 id="one">第一部分：选择和判断（选择题每题2分，判断题每题1分，共25分）</h3>
  <div class="contain" id="contain">
    
  </div>

  <h3>第二部分：填空（每题5分，共25分）</h3>
  <div class="contain" id="contain2">
    <!-- <div class="question">
      <p class="pan">呵呵是表示_____（情感）的词语。</p>
      <div class="divider"></div>
      <input id="16" style="background-color: #fff;margin-left: 20%;width: 40%;" type="text" placeholder="在这里输入答案">
    </div> -->
  </div>
  <h3>第三部分：问答题（每题10分，共50分）</h3>

  <div class="contain" id="contain3">
    <!-- <div class="question">
      <p class="pan">呵呵是表示_____（情感）的词语。</p>
      <div class="divider"></div>
      <textarea id="cc111"></textarea>
    </div> -->
  </div>
<script src="../js/jquery.min.js"></script>
<script src="../js/materialize.min.js"></script>
<script src="../js/exam-marking.js"></script>
</body>
</html>