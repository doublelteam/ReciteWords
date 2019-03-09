
//确定注销按钮
document.getElementById("logout").onclick = function(){
    //退出登录，跳转到登录界面
    $.ajax({
        url : "/logout",
        type : "POST",
        processData : false,
        contentType : false,
        success: function(result){
            if (result.code=="success"){
                alert("注销成功！")
                window.location.href="/";
            }else {
                alert("注销失败！");
            }
        }
    });
}

function initExam(data) {
    $("a[class = brand-logo]").html(data["title"]);
    $("#caption").html(data["title"]);
    var table = document.getElementById("listTable");
    for(var i = 0; i < data["list"].length; i += 2){
        var tr = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var td = document.createElement("td");
            if(j % 2 == 0)
                td.innerHTML = data["list"][i + j % 2]["english"];
            else
                td.innerHTML = data["list"][i + j % 2]["chinese"];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}


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
];

//词库数据
//  function word() {
//     this.title = "哈哈哈哈单词1";
//     this.list = []; //内容参照wordsList  第21行
// }
// var word = new word();
//  for (var i = 0; i < wordsList.length; i++) {
//      word["list"][i] = wordsList[i];
//  }
// initExam(word);
//请求获得试卷的数据json数组（jsons）加载试卷
function onloadExam(){
	//请求试卷信息，数据类型如上72行
	$.ajax({
        url : "/exam/getExamInfo",
        type : "POST",
        processData : false,
        contentType : false,
        dataType : "json",
        success: function(data,result){
            initExam(data);
        }
    });
}

function getInfo() {
    $.ajax({
        url : "/teacher/getTeacherInfo",
        type : "POST",
        processData : false,
        contentType : false,
        success : function (data) {
            if(data.code=="success"){
                $("#name").html(data.name);
            }
        }
    });
}

$("#goback").click(function () {
    window.location.href = "/teacher";
});


window.onload = function(){
    getInfo();
    onloadExam();
}

