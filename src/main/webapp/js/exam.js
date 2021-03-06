$(document).ready(function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

$("#logout").click(function () {
    location.href = "/student";
});
document.getElementById("word-content").style.display = "block";
var words=[];
var chinese=[];
var ids=[];
var urls=[];

var words2=[];
var chinese2=[];
var ids2=[];
var urls2 =[];
//音频
var au = document.getElementById("au");

//用于构造选择题
var words3 = [];
var chinese3 = [];

var rightId=[];

var begin=0;
var end=0;
var nums=0;
var now=0;
function getWords() {
	$.ajax({
        url : "/getwords",
        type : "POST",
        processData : false,
        contentType : false,
        success: function(result){
            if(result)
                initWords(result);
            else
                setErrorAlert("初始化单词失败！");
        }
	});
}
function getStudentInfo(){
    $.ajax({
        url : "/student/studentInfo",
        type : "POST",
        processData : false,
        contentType : false,
        success : function (data) {
            if(data.code == "success"){
                $("#name").text("账号：" + data.name);
                $("#points").text("积分：" + data.points);
            }else{
                setErrorAlert("请求学生信息失败，请刷新页面重试！");
            }

        },
        error : function () {
            setErrorAlert("请求学生信息失败，请刷新页面重试！");
        }
    })
}

//
// var wordsList = [
// 	{
//         "id":"1",
//         "english":"apple",
//         "chinese":"苹果"
// 	},
//     {
//         "id":"2",
//         "english":"banana",
//         "chinese":"香蕉",
//          "url" : "路径"
//     },{
//         "id":"3",
//         "english":"apple",
//         "chinese":"苹果"
//     },
//     {
//         "id":"4",
//         "english":"banana",
//         "chinese":"香蕉"
//     },{
//         "id":"5",
//         "english":"apple",
//         "chinese":"苹果"
//     },
//     {
//         "id":"6",
//         "english":"banana",
//         "chinese":"香蕉"
//     }
// ]

//urls = ["../music/Aachen.wav","../music/Aare.wav","../music/Aar.wav","../music/aalii.wav"];

// initWords(wordsList);
// 
// 初始化各个数组，将英文中文id等数据放入数组


function initWords(data){
	begin = data[0].id;
	end = data[data.length-1].id;
	for(var i=0 ;i < data.length; i++){
		words.push(data[i].english);
		ids.push(data[i].id);
		chinese.push(data[i].chinese);
        urls.push(data[i].urls);

        words3.push(data[i].english);
        chinese3.push(data[i].chinese);
		nums+=1;
	}
	initContent();
}
function initContent(){
	var tem;
    now += 1;
    $("#answer").attr("style","display:none");
    document.getElementById("progress").innerHTML = now + "/" + nums;
    $("#english-p2").attr("style","display:none");
    $("#chinese-p").attr("style","color:black;text-align: center");

    tem = urls.shift();
    au.src = tem;
    au.play();   
    urls.push(tem);

    //取出单词并放入页面
    tem = words.shift();
    document.getElementById("english-p").innerHTML = tem;

    //将取出的单词放回数组
	words.push(tem);

    //同英文数组操作
    tem = chinese.shift();
    document.getElementById("chinese-p").innerHTML = tem;
    chinese.push(tem);

    //同英文操作
    tem = ids.shift();
    ids.push(tem);

    if (now == nums){
        //背完单词切换按钮
        $("#begin-btn").attr("style","display:block;");
        $("#next-btn").attr("style","display:none;");
    }
}

function nextWord1(){
	initContent();
}


function nextWord2() {
    var tem;
    document.getElementById("progress").innerHTML = ids2.length + "/" + nums;
    document.getElementById("chinese-p").innerHTML = "";
    if (rightId.length == 0){
        $("#answer").attr('placeholder','请在此拼写单词');
    }
    tem = chinese.shift();
    document.getElementById("english-p").innerHTML = tem;
    chinese2.push(tem);

    tem = urls.shift();
    au.src = tem;
    au.play();
    urls2.push(tem);
}



        //nextWord2和submit,jumpword为第二轮的函数。无论对错都放到第二个数组里面



function submit() {
    var an = $("#answer").val();
    var tem;
    var tem2;
    tem = words.shift();
    tem2 = ids.shift();

    var form = new FormData();
    form.append("id", tem2);

    $("#submit-btn").attr("disabled");
    au.play();
    //判断作答与答案是否相等
    //提交答案数据
    //{
    //    "id" : 单词id，
    //    "result" : "0"表示错误，"1"表示正确
    //}
    if (tem == an) {
        form.append("result","1");
        $.ajax({
           url : "/exam/submit",
           type : "POST",
           data : form,
           processData : false,
           contentType : false,
           success : function (result) {
               if(result.code == "success") {
                   $("#chinese-p").attr("style", "color:green;text-align: center");
                   $("#english-p2").attr("style", "color:green;text-align: center");
                   document.getElementById("english-p2").innerHTML = tem;
                   $("#submit-btn").removeAttr("disabled")
                                    .attr("style", "display:none;");
                   ids2.push(tem2);  //第二轮将拼写正确的放入表示正确的数组里面
                   words2.push(tem);
                   //console.log(chinese);
                   //console.log(ids);
                   //console.log(words);
                   if (ids2.length == nums) {
                       document.getElementById("progress").innerHTML = ids2.length + "/" + nums;
                       setTimeout(function () {
                           $("#submit-btn").attr("style", "display:none;");
                           $("#test-btn").attr("style", "display:block;");
                       }, 2000);
                       return;
                   }
                   setTimeout(jumpWord, 2000);
               }else{
                   setErrorAlert("服务器处理失败，请重试！");
                   $("#submit-btn").removeAttr("disabled");
               }
           },
            error : function () {
                setErrorAlert("无法将结果提交到服务器，请重试！");
                $("#submit-btn").removeAttr("disabled");
            }
        });
    }else {
        form.append("result","0");
        $.ajax({
           url : "/exam/submit",
           type : "POST",
           data : form,
           processData : false,
           contentType : false,
            success : function (result) {
               if(result.code == "success"){
                   $("#submit-btn").removeAttr("disabled").attr("style","display:none;");;
                   words2.push(tem);
                   ids2.push(tem2);

                   //console.log(chinese);
                   //console.log(ids);
                   //console.log(words);
                   $("#chinese-p").attr("style","color:red;text-align: center");
                   $("#english-p2").attr("style","color:red;text-align: center");
                   document.getElementById("english-p2").innerHTML=tem;

                   $("#next-btn2").attr("style","display:block");
                   if (ids2.length == nums) {
                       document.getElementById("progress").innerHTML = ids2.length + "/" + nums;
                       $("#submit-btn").attr("style", "display:none;");
                       $("#next-btn2").attr("style","display:none");
                       $("#test-btn").attr("style", "display:block;");
                       return false;
                   }
               }else{
                   setErrorAlert("服务器处理失败，请重试！");
                   $("#submit-btn").removeAttr("disabled");
               }
            },
            error : function () {
                setErrorAlert("无法将结果提交到服务器，请重试！");
                $("#submit-btn").removeAttr("disabled");
            }
        });

    }
}


function jumpWord() {
    $("#chinese-p").attr("style","color:black;text-align: center");
    $("#submit-btn").attr("style","display:block;");
    $("#next-btn2").attr("style","display:none;");
    document.getElementById("english-p2").innerHTML = "";
    $("#answer").val("");
    nextWord2();
}


function beginWord(){
    now=1;
    $("#answer").attr("style","display:block;font-size: 50px;text-align: center;height: 5rem");
    $("#begin-btn").attr("style","display:none;");
    $("#submit-btn").attr("style","display:block;");
    nextWord2();
}

function beginWord2(){
    now=0;
    nums=ids.length;
    $("#begin-btn2").attr("style","display:none;");
    $("#next-btn").attr("style","display:block;");
    $("#answer").val("");
    initContent();
}

window.onload=function () {
	getWords();
    li_onclick();
    getStudentInfo();
};

//为每个li标签注册点击事件
var lis = document.getElementById("uu").getElementsByTagName("li");
function li_onclick(){
    for (var i = 0;i < lis.length; i++){
        lis[i].onclick = function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].children[1].style.color = "rgb(158,158,158)";
                lis[i].children[0].checked = false;
            }
            this.style.backgroundColor = "orange";
            this.children[1].style.color = "#fff";
            this.children[0].checked = true;
        };
    }
}


function test() {
    $("#test-content").css("display","block");
    $("#english-content").css("display","none");
    $("#chinese-content").css("display","none");
    $("#test-btn").attr("style","display:none;");
    $("#next-btn3").css("display","none");
    $("#submit-btn2").attr("style","display:block;");
    $("#audioContainer").attr("class","chose");
    document.getElementById("progress").innerHTML = ids.length + "/" + nums;
    nextword3();
}

//第三轮的下一个单词
function nextword3() {
    //从第二个数组取出数据放入第一个数组
    var c_tem = chinese2.shift();
    var w_tem = words2.shift();
    var i_tem = ids2.shift();
    var u_tem = urls2.shift();

    var str = "单词" + "<span class='word'>" + w_tem + "</span>" + "的中文意思是？";
    $("#title").html(str);

    for (var i = 0; i < lis.length; i++) {
        lis[i].children[0].checked = false;
        lis[i].children[1].innerHTML = "";
        lis[i].style.backgroundColor = "#fff";
        lis[i].children[1].style.color = "rgb(158,158,158)";
    }
    //构建正确选项
    var t = Math.round( (Math.random() * 4) )% 4;
    lis[t].children[1].innerHTML = c_tem;

    //构建其他三个选项
    var index = 0,tem;
    var arr = [-1],add = [];
    var flag;
    add.push(t);
    while(index < 4){
        tem = lis[index].children[1];
        if(tem.innerHTML == ""){
            var t2 = Math.floor(Math.random() * words3.length);
            while(arr.indexOf(t2) != -1 || chinese3[t2] == c_tem){
                t2 = Math.floor(Math.random() * words3.length);
            }
            tem.innerHTML = chinese3[t2];
            arr.push(t2);
        }
        index++;
    }

    au.src = u_tem;
    au.play();

    words.push(w_tem);
    ids.push(i_tem);
    chinese.push(c_tem);
    urls.push(u_tem);
}

//第三轮提交（选择题,校对正确答案，提交代码已经去除）
function submit2() {
    //取得作答结果，与正确答案比较。正确切换下一个，不正确显示next按钮。
    var an;
    for(var i = 0; i < lis.length; i++) {
        if (lis[i].children[0].checked == true) {
            an = lis[i].children[1].innerHTML;
            lis[i].style.backgroundColor = "red";
        }
    }
    //弹出题目对应的单词和中文意义。
    var tem;
    var tem2;
    var tem3;
    tem = words[words.length-1];
    tem2 = ids[ids.length-1];
    tem3 = chinese[chinese.length-1];

    au.play();
    //判断作答与答案是否相等
    au.play();
    if (tem3 == an){
        for(var i = 0; i < lis.length; i++){
            if(lis[i].children[1].innerHTML == tem3){
                lis[i].style.backgroundColor = "green";
            }
        }
        //console.log("ids长度" + ids.length);
        if (ids.length == nums){
            // console.log(rightId.length);
            document.getElementById("progress").innerHTML = ids.length + "/" + nums;
            $("#submit-btn2").attr("style","display:none;");
            $("#end-btn").attr("style","display:block;");
            return;
        }
        $("#submit-btn2").attr("style","display:none;");
        $("#next-btn3").attr("style","display:block;");
    } else {
        words2.push(words.pop());
        ids2.push(ids.pop());
        chinese2.push(chinese.pop());
        urls2.push(urls.pop());
        for(var i = 0; i < lis.length; i++){
            if(lis[i].children[1].innerHTML == tem3){
                lis[i].style.backgroundColor = "green";
            }
        }
        $("#submit-btn2").attr("style","display:none;");
        $("#next-btn3").attr("style","display:block;");
    }
}

$("#end-btn").click(function () {
   window.location = "/student";
});

//设置弹窗确定按钮关闭弹窗
$("#ok").click(function () {
    $(".mask").css("display","none");
    $("#error").css("display","none");
});
function setErrorAlert(str) {
    $("#photo img").attr("src","../images/alert.gif");
    $(".mask").css("display","block");
    $("#error").css("display","block");
    $("#error h5").text(str);
}
function setRightNotice(str) {
    $("#photo img").attr("src","../images/happy.gif");
    $(".mask").css("display","block");
    $("#error").css("display","block");
    $("#error h5").text(str);
}

//禁止复制粘贴
document.getElementById("english-p").oncopy = function(){
    setErrorAlert("不能复制单词哦");
    return false;
};
document.getElementById("answer").onpaste = function(){
    setErrorAlert("不能粘贴答案哦");
    return false;
};

//设置语音暂停和播放
function play() {
    if(au.src == undefined){
        setErrorAlert("无法获取音频，刷新试试");
        return false;
    }
    au.pause();
    au.play();
    au.voice = 1;
}
document.getElementById("play").onclick = play;