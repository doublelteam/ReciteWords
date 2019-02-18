document.getElementById("word-content").style.display = "block";
var words=[];
var chinese=[];
var ids=[];
var rightId=[];
var worngId=[];

var begin=0;
var end=0;
var nums=0;
var now=0;
var times=0;
function getWords() {
	$.ajax({
        url : "/getwords",
        type : "POST",
        processData : false,
        contentType : false,
        success: function(result){
            initWords(result);
        }
	});
}
//{
// [
// "id":"1",
// "english":"apple",
// "chinese":"苹果"
// ],
// "id":"2",
// "english":"banana",
// "chinese":"香蕉"
// ],
// 	}
//
//
var wordsList = [
	{
        "id":"1",
        "english":"apple",
        "chinese":"苹果"
	},
    {
        "id":"2",
        "english":"banana",
        "chinese":"香蕉"
    },{
        "id":"3",
        "english":"apple",
        "chinese":"苹果"
    },
    {
        "id":"4",
        "english":"banana",
        "chinese":"香蕉"
    },{
        "id":"5",
        "english":"apple",
        "chinese":"苹果"
    },
    {
        "id":"6",
        "english":"banana",
        "chinese":"香蕉"
    }
]
// initWords(wordsList);
function initWords(data){
	begin=data[0].id;
	end=data[data.length-1].id;
	for (var i=0 ;i<data.length;i++){
		words.push(data[i].english);
		ids.push(data[i].id);
		chinese.push(data[i].chinese);
		nums+=1;
	}
	initContent();
}
function	initContent(){
	var tem;
    now+=1;
    $("#answer").attr("style","display:none");
    document.getElementById("progress").innerHTML=now+"/"+nums;
    document.getElementById("english-p2").innerHTML="";
    $("#chinese-p").attr("style","color:black;text-align: center");
    tem=words.shift();
    document.getElementById("english-p").innerHTML=tem;
	words.push(tem);
    tem=chinese.shift();
    document.getElementById("chinese-p").innerHTML=tem;
    chinese.push(tem);
    tem=ids.shift();
    ids.push(tem);
    if (now==nums){
        $("#begin-btn").attr("style","display:block;");
        $("#next-btn").attr("style","display:none;");
        times+=1;
    }
}

function nextWord1(){
	initContent();
}
function nextWord2() {
    var tem;
    document.getElementById("progress").innerHTML=now+"/"+nums;
    document.getElementById("english-p").innerHTML="";
    if (now==1){
        $("#answer").attr('placeholder','请在此拼写单词');
    }
    tem=chinese.shift();
    document.getElementById("chinese-p").innerHTML=tem;
}
function submit() {
    var an=$("#answer").val();
    var tem;
    var tem2;
    tem=words.shift();
    tem2=ids.shift();
    console.log(tem);
    console.log(an);
    if (tem==an){
        $("#chinese-p").attr("style","color:green;text-align: center");
        rightId.push(tem2);
        $("#english-p2").attr("style","color:green;text-align: center");
        document.getElementById("english-p2").innerHTML=tem;
        $("#submit-btn").attr("style","display:none;");
        if (now==nums){
            times+=1;
            console.log(times);
            if (ids.length==0||times==6){
                $("#submit-btn").attr("style","display:none;");
                $("#quit-btn").attr("style","display:block;");
            } else {
                $("#submit-btn").attr("style","display:none;");
                $("#begin-btn2").attr("style","display:block;");
            }
        }else {
            now+=1;
            setTimeout(jumpWord,2000);
        }

    } else {
        $("#chinese-p").attr("style","color:red;text-align: center");
        if (times==1)
            worngId.push(tem2);
        $("#english-p2").attr("style","color:red;text-align: center");
        document.getElementById("english-p2").innerHTML=tem;
        ids.push(tem2);
		chinese.push(document.getElementById("chinese-p").innerHTML);
		words.push(tem);
		if (now==nums){
		    times+=1;
            if (ids.length==0||times==6){
                $("#submit-btn").attr("style","display:none;");
                $("#quit-btn").attr("style","display:block;");
            }else {
                $("#submit-btn").attr("style","display:none;");
                $("#begin-btn2").attr("style","display:block;");
            }
        }else {
            now+=1;
            $("#submit-btn").attr("style","display:none;");
            $("#next-btn2").attr("style","display:block;");
        }
    }
}
function jumpWord() {
    $("#chinese-p").attr("style","color:black;text-align: center");
    $("#submit-btn").attr("style","display:block;");
    $("#next-btn2").attr("style","display:none;");
    document.getElementById("english-p2").innerHTML="";
    $("#answer").val("");
    nextWord2();
}
function beginWord(){
    now=1;
    $("#answer").attr("style","display:block;font-size: 50px;text-align: center");
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
function quit(){
    var form=new FormData();
    form.append("worngId",worngId);
    form.append("endId",end);
    form.append("beginId",begin);
    $.ajax({
        url : "/submitwords",
        type : "POST",
        processData : false,
        contentType : false,
        data:form,
        success: function(result){
            window.location.href="/student";
        }

    });
}
window.onload=function () {
	getWords();
}