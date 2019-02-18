<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>试卷详情</title>
  <link rel="stylesheet" href="../css/materialize.min.css">
  <link rel="stylesheet" href="../css/icomoon.css">
  <link rel="stylesheet" href="../css/exam-detail.css">
    <link rel="icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="bookmark" href="../images/logo.ico" type="image/x-icon" />
</head>
<body onload="onloadExam()">
  <div class="navbar-fixed">
  	<nav>
      <div class="nav-wrapper">
        	<a href="#" class="brand-logo" id="logo">试卷详情</a>
        	<ul id="nav-mobile" class="right">
          	<li></li>
        	</ul>
      </div>
    </nav>
  </div>

  <div class="row" id="index" style="width: 20%">
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
            <p style="margin: 10px 0;color: orange">考试时间：<span  id="timer"></span></p>
            
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 id="title"></h2>
 <h3>第一部分：选择和判断（共25分）</h3>
  <div class="contain" id="contain">
    
  </div>

  <h3>第二部分：填空（共25分）</h3>
  <div class="contain" id="contain2">
    <!-- <div class="question">
      <p class="pan">呵呵是表示_____（情感）的词语。</p>
      <div class="divider"></div>
      <input id="16" style="background-color: #fff;margin-left: 20%;width: 40%;" type="text" placeholder="在这里输入答案">
    </div> -->
  </div>
  <h3>第三部分：问答题（共50分）</h3>

  <div class="contain" id="contain3">
    <!-- <div class="question">
      <p class="pan">呵呵是表示_____（情感）的词语。</p>
      <div class="divider"></div>
      <textarea id="cc111"></textarea>
    </div> -->
  </div>
  <script src="../js/jquery.min.js"></script>
	<script src="../js/materialize.js"></script>
  <script src="../js/exam-detail.js"></script>
</body>
</html>