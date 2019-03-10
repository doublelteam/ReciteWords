<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>单词贝多芬</title>
    <link rel="stylesheet" href="../css/materialize.css">
    <link rel="stylesheet" href="../css/icomoon.css">
    <link rel="stylesheet" href="../css/exam-detail.css">
    <link rel="icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="../images/logo.ico" type="image/x-icon" />
    <link rel="bookmark" href="../images/logo.ico" type="image/x-icon" />
</head>
<body>
<!-- 导航栏 -->
<div class="navbar-fixed">
    <nav>
        <div class="nav-wrapper">
            <a href="/teacher" class="brand-logo"></a>
            <ul class="right">
                <li><a id="name" class="waves-effect" href="#">账号</a> </li>
                <li><a id="goback" class='waves-effect' href='#'>返回</a></li>
                <li><a class="waves-effect" href="#modal1">注销</a></li>
            </ul>
        </div>
    </nav>
</div>


<div class="container" id="wordlist" style="display: block;">
    <table id="listTable" border="1" style="border: 1px solid #000;text-align: center">
        <caption id="caption"></caption>
        <thead>
            <tr>
                <th>单词</th>
                <th>释义</th>
                <th>单词</th>
                <th>释义</th>
            </tr>
        </thead>
        <tbody>
            <!-- <tr>
                   <td>banana</td>
                   <td>香蕉</td>
                   <td>apple</td>
                   <td>苹果</td>
               </tr> -->
        </tbody>
    </table>



</div>
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

<!--底部菜单-->
<div class="fixed-action-btn">
    <a class="btn-floating btn-large red">
        :::
    </a>
    <ul>
        <li><a id="more" class="btn-floating red">更多</a></li>
        <li><a id="less" class="btn-floating yellow darken-1">收起</a></li>
        <li><a id="search" class="btn-floating green" onclick="setDisabled()">搜索</a></li>
        <li><a id="top" class="btn-floating blue" href="#listTable">顶部</a></li>
    </ul>
</div>

<div id="searchContainer">
    <input id=keyword placeholder="请输入想要搜索的单词或中文释义"/>
    <div class="close" onclick="setEnabled()">
        X
    </div>
</div>

<script src="../js/jquery.min.js"></script>
<script src="../js/materialize.min.js"></script>
<script src="../js/exam-detail.js"></script>
</body>
</html>