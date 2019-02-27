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
<body>

<!-- 导航栏 -->
<div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper">
      <a class="brand-logo">单词贝多芬</a>
      <ul class="right">
        <li><a class="waves-effect" href="#">名字</a></li>
        <li><a class="waves-effect" href="#">积分</a></li>
        <li><a class="waves-effect" href="#modal1">退出</a></li>
      </ul>
    </div>
  </nav>
</div>


<!-- 退出账号提示 -->
<div id="modal1" class="modal l6">
  <div class="modal-content">
    <h6>你确定退出吗？本次进度将不会保存</h6>
  </div>
  <div class="modal-footer">
    <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" id="logout">确定</a>
    <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">取消</a>
  </div>
</div>


<!-- 考试区域 -->
<div class="container" id="word-content" style="position: relative">

  <!-- 英文单词 -->
  <div id="english-content">
    <div class="input-field inline">
      <input class="validate" style="display:none;font-size: 50px;text-align: center">
    </div>
    <p id="english-p" style="text-align: center" >
    </p>
    
  </div>


 <!-- 中文释义 -->
  <div id="chinese-content">
    <div class="input-field inline" style="margin-top: 70px;">
      <input id="answer" class="validate" style="display:none;font-size: 50px;text-align: center;">
    </div>
    <p id="english-p2" style="color:red;text-align: center" ></p>

    <p id="chinese-p" style="text-align: center"></p>
  </div>


  <div class="question" id=test-content style="display: none">
    <p id="title" class="pan">题目哈哈哈哈</p>
    <ul class="collection" id="uu">
      <li class="collection-item"><input type="radio" name="choice" id="li1"><label for="li1">你好啊啊啊啊啊啊啊啊啊啊啊</label></li>
      <li class="collection-item"><input type="radio" name="choice" id="li2"><label for="li2">你好啊啊啊啊啊啊啊啊啊啊啊</label></li>
      <li class="collection-item"><input type="radio" name="choice" id="li3"><label for="li3">你好啊啊啊啊啊啊啊啊啊啊啊</label></li>
      <li class="collection-item"><input type="radio" name="choice" id="li4"><label for="li4">你好啊啊啊啊啊啊啊啊啊啊啊</label></li>
    </ul>
  </div>
  <!-- 进度条 -->
  <span id="progress">
      1/30
    </span>
  <div id="next-div" style="float: right ;margin-top: 30px">
    <button  id="begin-btn" class="btn waves-effect orange darken-1" onclick="beginWord()" style="display:none">BEGIN</button>
    <button  id="begin-btn2" class="btn waves-effect orange darken-1" onclick="beginWord2()" style="display:none">AGAIN</button>
    <button id="next-btn" class="btn waves-effect orange darken-1" onclick="nextWord1()">NEXT</button>
    <button id="next-btn2" class="btn waves-effect orange darken-1" onclick="jumpWord()" style="display:none">NEXT</button>
    <button id="next-btn3" class="btn waves-effect orange darken-1" onclick="test()" style="display:none">NEXT</button>
    <button id="submit-btn" class="btn waves-effect orange darken-1" style="display:none" onclick="submit()">Submit</button>
    <button id="submit-btn2" class="btn waves-effect orange darken-1" style="display:none" onclick="submit2()">Submit</button>
    <button id="test-btn" class="btn waves-effect orange darken-1" style="display:none" onclick="test()">TEST</button>
    <button id="end-btn" class="btn waves-effect orange darken-1" style="display:none">END</button>
  </div>
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

<script src="../js/jquery.min.js"></script>
<script src="../js/materialize.min.js"></script>
<script src="../js/exam.js"></script>
</body>
</html>