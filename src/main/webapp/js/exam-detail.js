
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
};

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

function initWordList(data) {
    var table = document.getElementById("listTable");
    table.removeChild(table.children[2]);
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for(var i = 0; i < data.length; i += 2){
        var tr = document.createElement("tr");
        if(data.length - i == 1){
            var t = document.createElement("td");
            var t2 = document.createElement("td");
            var t3 = document.createElement("td");
            var t4 = document.createElement("td");
            t.innerHTML = data[i]["english"];
            t2.innerHTML = data[i]["chinese"];
            tr.appendChild(t);
            tr.appendChild(t2);
            tr.appendChild(t3);
            tr.appendChild(t4);
        }else{
            for (var j = 0; j < 4; j++) {
                var td = document.createElement("td");
                if(j % 2 == 0)
                    td.innerHTML = data[i + Math.floor(j / 2)]["english"];
                else
                    td.innerHTML = data[i + Math.floor(j / 2)]["chinese"];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    }
    $("#listTable tbody tr td:even").addClass("even");
    $("#listTable tbody tr td:odd").addClass("odd");
}

function addToWordList(data) {
    if(!data){
        console.log("数据空");
        return false;
    }
    var tbody = document.getElementById("listTable").children[2];
    var $tbody = $(tbody);
    for(var i = 0; i < data.length; i += 2){
        var tr = document.createElement("tr");
        if(data.length - i == 1){
            var t = document.createElement("td");
            var t2 = document.createElement("td");
            var t3 = document.createElement("td");
            var t4 = document.createElement("td");
            t.innerHTML = data[i]["english"];
            t2.innerHTML = data[i]["chinese"];
            tr.appendChild(t);
            tr.appendChild(t2);
            tr.appendChild(t3);
            tr.appendChild(t4);
        }else{
            for (var j = 0; j < 4; j++) {
                var td = document.createElement("td");
                if(j % 2 == 0)
                    td.innerHTML = data[i + Math.floor(j / 2)]["english"];
                else
                    td.innerHTML = data[i + Math.floor(j / 2)]["chinese"];
                tr.appendChild(td);
            }
        }
        $("tbody>tr:last").after(tr);
    }
    setTimeout(function () {
        $("#listTable tbody tr td:even").addClass("even");
        $("#listTable tbody tr td:odd").addClass("odd");
    },1000);

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
var t_List = [];
var start_index = 0;
var length = 0;
var less16 = 0;

function onloadExam(){
	$.ajax({
        url : "/exam/getExamInfo",
        type : "POST",
        processData : false,
        contentType : false,
        dataType : "json",
        success: function(data){
            $("a[class = brand-logo]").html(data["title"]);
            $("#caption").html(data["title"]);
            for(var i = 0; i < data["list"].length; i++){
                wordsList[i] = data["list"][i];
            }
            length = wordsList.length;
            if(length >= 16) {
                for (var i = 0; i < 16; i++) {
                    t_List[i] = wordsList[i]
                }
                initWordList(t_List);
                start_index = 16;
            }else{
                less16 = 1;
                initWordList(wordsList);
                start_index = length + 1;
            }
        }
    });
}

//设置加载更多单词
function moreList() {
    if(start_index > length){
        alert("没有更多单词啦");
        return false;
    }
    var j = 0;
    t_List = [];
    if(start_index + 16 > length){
        for(var k = start_index; k < length; k ++)
            t_List[j++] = wordsList[k];
        addToWordList(t_List);
        start_index = length + 1;
    }
    else{
        for(var i = start_index; i < start_index + 16; i ++)
            t_List[j++] = wordsList[i];
        addToWordList(t_List);
        start_index = start_index + 16;
    }
}
//设置恢复原始表格
function backInit(){
    if(less16){
        initWordList(wordsList);
    }
    else{
        for (var i = 0; i < 16; i++) {
            t_List[i] = wordsList[i]
        }
        initWordList(t_List);
        start_index = 16;
    }
}

//设置禁用按钮
function setDisabled(){
    $("#searchContainer").show(500);
    $("#more").attr("disabled","true");
    $("#less").attr("disabled","true");
}
function setEnabled(){
    $("#searchContainer").hide(500);
    $("#more").removeAttr("disabled");
    $("#less").removeAttr("disabled");
}
//设置恢复按钮
$("#more").bind("click",moreList);
$("#less").click(backInit);

var sList = [];
function search(){
    var keyWord = $("#keyword").val();
    if(!keyWord){
        backInit();
        return false;
    }
    sList = [];
    for (var i= 0; i < wordsList.length; i++) {
        if (wordsList[i]["english"].indexOf(keyWord) != -1) {
            sList.push(wordsList[i]);
            continue;
        } else if (wordsList[i]["chinese"].indexOf(keyWord) != -1) {
            sList.push(wordsList[i]);
        }
    }
    initWordList(sList);
}
$("#keyword").keyup(search);


window.onload = function(){
    getInfo();
    onloadExam();
}

