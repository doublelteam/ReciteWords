
var ManagerPassword;

//下拉菜单启动
$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
);
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
                window.location.href="/"
            }else {
                alert("注销失败！");
            }
        }
    });
}





function getInfo(){
    getExamList();
}

//
// //导入Excel文件
// document.getElementById("file_confirm").onclick=function(){
// 	var filename=$("#input_file").val();
// 	var point=filename.lastIndexOf(".");
// 	var filetype=filename.substr(point);
// 	if(filename==""){
// 		alert("未选择文件");
// 	}
// 	else if(filetype!=".xlsx"&&filetype!=".xls"){
// 		alert("请选择excel文件");
// 	}
// 	else{
// 		var form=new FormData($("#form4")[0]);
// 		$.ajax({
// 			url:"/teacher/submitFile",
// 			type:'POST',
// 			data:form,
// 			processData : false,
//         	contentType : false,
//         	beforeSend:function(){
//             	console.log("正在上传，请稍候");
//         	},
//         	success:function(result){
//         		if (result.code=="success"){
//             		alert(result.msg);
//             	}else {
//             	    alert("上传失败！");
//             	}
//         	}
// 		});
// 	}
// }



var ExamList = [
{"Type":"do",
"title":"第一章至第三章",
"start":"2018-12-06 09:30",
"end":"2018-12-06 10:00",
"id":"1"
},
{"Type":"do",
"title":"第四章至第六章",
"start":"2018-12-07 09:30",
"end":"2018-12-07 10:00",
"id":"2"
},
{"Type":"do",
"title":"第七章至第十一章",
"start":"2018-12-08 09:30",
"end":"2018-12-08 10:00",
"id":"3"
},
{"Type":"done",
"title":"第一章至第三章",
"start":"2018-12-06 09:30",
"end":"2018-12-06 10:00",
"id":"1",
"grade":"91"
}];

//获取已发布、已考完试卷信息
function initExamList(ExamList) {
    console.log(ExamList.length);
    console.log(typeof(ExamList));
    var containerDo = document.getElementById("oout2").children[0];
    console.log("length"+ExamList.length);
    for (var i = 0; i < ExamList.length; i++) {
        var dv1 = document.createElement("div");
        dv1.className = "col s12 m6 l4 hoverable";
        dv1.setAttribute("examId",ExamList[i]["id"]);
        dv1.setAttribute("name","unsentExam");
        var dv2 = document.createElement("div");
        dv2.className = "card";
        dv1.appendChild(dv2);
        var dv3 = document.createElement("div");
        var span = document.createElement("span");
        span.innerHTML = ExamList[i]["title"];
        span.className = "card-title";
        dv3.appendChild(span);
        var br = document.createElement("br");
        dv3.appendChild(br);
        var p3 = document.createElement("span");
        p3.innerHTML = "词汇量：";
        dv3.appendChild(p3);
        var p4 = document.createElement("span");
        p4.innerHTML = ExamList[i]["nums"];
        dv3.appendChild(p4);
        var br2 = document.createElement("br");
        dv3.appendChild(br2);
        dv2.appendChild(dv3);
        var dv4 = document.createElement("div");
        dv4.className = "card-action blue-grey darken-1";
        dv2.appendChild(dv4);
        var a2 = document.createElement("a");
        a2.href = "#";
        dv4.appendChild(a2);
        a2.innerHTML = "移除词库";
        dv3.className = "card-content white-text cyan";
        containerDo.appendChild(dv1);
        a2.onclick=function(){
            if(confirm("确认移除这次考试吗？")==true){
                var id = this.parentNode.parentNode.parentNode.getAttribute("examId");
                var form=new FormData();
                form.append("examId",id);
                $.ajax({
                    url : "/teacher/removeExam",
                    type : "POST",
                    data : form,
                    processData : false,
                    contentType : false,
                    dataType : "json",
                    //删除对应id的试卷
                    success : function() {
                        alert("移除成功！");
                        location.reload();},
                    error : function() {
                        alert("移除失败，请重试");
                    }
                });
            }
        };

        var a3 = document.createElement("a");
        a3.innerHTML = "查看词库";
        a3.href = "#";
        dv4.appendChild(a3);
        a3.onclick = function(){
            var id = this.parentNode.parentNode.parentNode.getAttribute("examId");
            var form=new FormData();
            form.append("examId",id);
            $.ajax({
                url : "/teacher/examDetail",
                type : "POST",
                data : form,
                processData : false,
                contentType : false,
                dataType : "json",
                //删除对应id的试卷
                success : function() {
                    location.loacation.href = "/examDetail";
                },
                error : function() {
                    alert("查看失败，请重试");
                }
            });
        };
    }

}




// initExamList(ExamList);//前端测试用，后台写完可以删除，包括上面的数据ExamList

//获取试卷列表
function getExamList(){
    $.ajax({
        url : "/teacher/getExamList",
        type : "POST",
        processData : false,
        contentType : false,
        dataType : "json",
        success : function(data){
            initExamList(data);
        }
    });
}
function getFileName(o){
    var pos=o.lastIndexOf("\\");
    return o.substring(pos+1);
}
function uploadWords(){
    $.ajax({
        type : "POST",
        url : "/teacher/uploadwords",
        processData: false,
        contentType: false,
        data : new FormData($("#uploadForm")[0]),
        success : function(data) {
            alert(data.msg);
            location.reload();
        }
    });
}

//获取账号信息
function getTeacherInfo() {
    $.ajax({
        url : "/teacher/getTeacherInfo",
        type : "POST",
        processData : false,
        contentType : false,
        success : function (data) {
            if(data.code == "success"){
                $("#name").html(data.name);
            }else {
                alert("获取教师信息失败，请重新登陆");
            }
        }
    });
}

//修改密码
var passwordContainer = document.getElementById('changePassword');
document.getElementById('c_password').onclick = function(){
    $("#oout2").fadeOut(500);
    $("#managerStudent").fadeOut(500);
    $(passwordContainer).fadeIn(500);
}

//检查两次输入的密码
function checkPassword(password){
    var flag = 1;
    if(password.length < 6){
        flag = 0;
    }else if(password.length > 20){
        flag = 0;
    }
    return flag;
}

//确定修改密码
document.getElementById('yes').onclick = function() {
    //发送新的密码
    var oldPassword = document.getElementById('oldpassword').value;
    var newPassword = document.getElementById('newpassword').value;
    var newPassword2 = document.getElementById('newpassword2').value;
    if(!newPassword || !oldPassword || !newPassword2){
        alert("密码不能为空！");
        return;
    }
    if(!(checkPassword(oldPassword) && checkPassword(newPassword) && checkPassword(newPassword2))){
        alert("密码位数需6-20位！");
        return;
    }
    if(newPassword != newPassword2){
        alert("两次密码不一致！");
        return;
    }
    if(oldPassword == newPassword){
        alert("新密码和原密码一样！");
        return;
    }

    //确认修改密码，发送数据包括旧密码和新密码，需要返回表示修改成功的code（success）
    var form1 = new FormData();
    form1.append("oldpassword",oldPassword);
    form1.append("newpassword",newPassword);
    $.ajax({
        url : "/teacher/changePassword",
        type : "POST",
        data : form1,
        processData : false,
        contentType : false,
        success: function(result){
            if (result.code=="success"){
                $("#oldpassword").val("");
                $("#newpassword").val("");
                $("#newpassword2").val("");
                alert("修改成功！")
                document.getElementById('changePassword').style.display = "none";
                $("#oout2").fadeIn(600);
            }else {
                alert("原密码错误，修改失败！");
                $("#oldpassword").val("");
                $("#newpassword").val("");
                $("#newpassword2").val("");
            }
        },
        error : function () {
            alert("修改请求发送失败，请重试。");
        }
    });
}

//取消修改
document.getElementById('cancel').onclick = function() {
    $(document.getElementById('changePassword')).fadeOut(500);
    $("#oout2").fadeIn(500);
    $("#oldpassword").val("");
    $("#newpassword").val("");
    $("#newpassword2").val("");
}


var testData = [
    {
        "id" : "1234",
        "point" : "100",
    },
    {
        "id" : "3123",
        "point" : "12",
    },
    {
        "id" : "3333",
        "point" : "33",
    },
    {
        "id" : "444",
        "point" : "10440",
    },
    {
        "id" : "12232334",
        "point" : "55",
    },
    {
        "id" : "123123213",
        "point" : "17700",
    },
    {
        "id" : "333434",
        "point" : "1020",
    }
]


//管理学生界面
//切换界面
$("#manager").click(function () {
    $("#oout2").fadeOut(500);
    $("#changePassword").fadeOut(500);
    $("#managerStudent").fadeIn(500);
    $("#oldpassword").val("");
    $("#newpassword").val("");
    $("#newpassword2").val("");
});

//初始化学生列表
function initStudentTable(data) {
    if(!data){
        alert("未能获取学生信息，请刷新重试！");
        return false;
    }
    $("#studentTable").html("");
    var  ttr = document.createElement("tr");
    var table = document.getElementById("studentTable");
    table.appendChild(ttr);
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    ttr.appendChild(th1);
    ttr.appendChild(th2);
    ttr.appendChild(th3);
    th1.innerHTML = "账号";
    th2.innerHTML = "积分";
    th3.innerHTML = "操作";

    for (var i = 0; i < data.length; i ++){

        //创建tr标签，并加入列表
        var tr = document.createElement("tr");

        table.appendChild(tr);

        //创建账号、积分、操作的td标签,并加入列表中
        var td1 = document.createElement("td");
        td1.innerHTML = data[i]["id"];
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = data[i]["point"];
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        tr.appendChild(td3);
        //创建修改积分、删除、重置密码等按钮
        var a1 = document.createElement("a");
        a1.className = "modify";
        a1.href = "#";
        a1.innerHTML = "修改积分";
        td3.appendChild(a1);

        var a2 = document.createElement("a");
        a2.className = "delete";
        a2.innerHTML = "删除";
        a2.href = "#";
        td3.appendChild(a2);

        var a3 = document.createElement("a");
        a3.className = "reset";
        a3.innerHTML = "修改密码";
        a3.href = "#";
        td3.appendChild(a3);
    }
    $("#studentTable a[class = delete]").click(Delete);
    $("#studentTable a[class = modify]").click(modify);
    $("#studentTable a[class=reset]").click(resetPassword);
}

// initStudentTable(testData);

var cacheDate = [];
// for (var i = 0; i < testData.length; i++){
//     cacheDate[i] = testData[i];
// }

//获取所有学生
function getAllStudents() {
    $.ajax({
        url : "/teacher/getAllStudents",
        type : "POST",
        processData : false,
        contentType : false,
        success : function (data) {
            initStudentTable(data);
            for (var i = 0; i < data.length; i++){
                cacheDate[i] = data[i];
            }
        },
        error : function () {
            alert("请求学生信息失败，请刷新页面重试。");
        }
    });
}


function getManagerPassword() {
    $.ajax({
        url : "/teacher/getManagerPassword",
        type : "POST",
        processData : false,
        contentType : false,
        success : function (data) {
            ManagerPassword = data.password;
        }
    });
}

//修改积分
function modify() {
    var newPoints = prompt("请输入新的积分数");
    var reg = /^[0-9]*$/;
    if(!reg.test(newPoints)){
        alert("请输入数字！");
        return false;
    }
    if(newPoints < 0){
        alert("积分不能小于0");
        return false;
    }
    var id = this.parentNode.parentNode.children[0].innerHTML;
    var form = new FormData();


    //发送数据为
    //  {
    //     "id", 账号id,
    //      "newPoint" , 修改后的积分
    //  }
    //需要返回修改成功的result.code的值为1
    form.append("id",id);
    form.append("newPoint",newPoints);
    console.log("id" + id);
    console.log("points" + newPoints);
    for(var i = 0;i < testData.length; i ++){
        if(testData[i]["id"] == id){
            testData[i]["point"] = newPoints;
        }
    }
    // initStudentTable(testData);
    $.ajax({
        url : "/teacher/changePoints",
        type : "POST",
        data : form,
        processData : false,
        contentType : false,
        success : function (result) {
            if(result.code == "success"){
                alert("修改积分成功！");
                getAllStudents();
            }
            else {
                alert("修改积分失败！");
            }
        },
        error : function () {
            alert("向服务器发送修改请求失败，请重试！");
        }
    });
}
$("#studentTable a[class = modify]").click(modify);

//删除学生
function Delete() {
    var id = this.parentNode.parentNode.children[0].innerHTML;
    var str = "确定删除账号 " + id + " 吗？删除后将无法恢复！";
    if(!confirm(str)){
        return false;
    }
    var t = prompt("请输入管理密码");
    if(!ManagerPassword){
        alert("无法进行密码验证。请刷新页面重试");
        return false;
    }
    if(!t == ManagerPassword){
        alert("管理密码错误！");
        return false;
    }
    var form = new FormData();
    form.append("id",id);
    console.log("删除"+id);
    // for(var i = 0;i < testData.length; i ++){
    //     if(testData[i]["id"] == id){
    //         testData.splice(i,1);
    //     }
    // }
    // initStudentTable(testData);


    //发送的数据是账号的id，需要返回修改成功的result.code的值为1
    $.ajax({
        url : "/teacher/deleteStudent",
        type : "POST",
        data : form,
        processData : false,
        contentType : false,
        success : function (result) {
            if(result.code == 1){
                alert("删除账号成功！");
                getAllStudents();
            }
            else {
                alert("修改账号失败！");
            }
        },
        error : function () {
            alert("向服务器发送请求失败，请重试！");
        }
    });
}
$("#studentTable a[class = delete]").click(Delete);

//修改密码
function resetPassword() {
    var id = this.parentNode.parentNode.children[0].innerHTML;
    var password = prompt("请输入新的密码");
    if(!confirm("确定修改账号 " + id + "的密码吗？修改后密码为 " + password)){
        return false;
    }


    //发送的数据是账号的id和新的密码，需要返回修改成功的result.code的值为1
    var form = new FormData();
    form.append("id",id);
    form.append("password",password);
    console.log("重置id"+ id);
    $.ajax({
       url : "/teacher/resetPassword",
       type : "POST",
       data : form,
       processData : false,
       contentType : false,
        success : function (result) {
            if(result.code == 1){
                alert("修改密码成功！");
            }else
                alert("修改失败，请重试。");
        },
        error : function () {
            alert("向服务器发送修改请求失败，请重试！");
        }
    });
}
$("#studentTable a[class=reset]").click(resetPassword);

//搜索功能
function search() {
    var id = $("#input").val();
    var t = [];
    for (var i = 0; i < cacheDate.length; i++){
        if(cacheDate[i]["id"].indexOf(id) != -1){
            t.push(testData[i]);
        }
    }
    initStudentTable(t);
}
$("#search").click(search);

//添加账号
function add() {

    var id = $("#input").val();
    if(!id){
        alert("账号不能为空！");
        return false;
    }
    var password = prompt("请输入账号密码");
    var type;
    if( !checkPassword(password) ){
        alert("密码位数需6-20位！");
        return false;
    }
    if(confirm("是否添加新的账号" + id + "密码为" + password) != true)
        return false;
    if(confirm("是否添加为教师账号？否则为学生账号")){
        var t = prompt("请输入管理密码");
        if(!ManagerPassword){
            alert("无法进行密码验证。请刷新页面重试");
            return false;
        }
        if(t == ManagerPassword)
            tpye = "teacher";
        else{
            alert("管理密码错误！");
            return false;
        }
    }
    else
        type = "student";
    var form = new FormData();
    form.append("id",id);
    form.append("password",password);
    form.append("type",type);
    $.ajax({
        url : "/teacher/addStudent",
        type : "POST",
        data : form,
        processData : false,
        contentType : false,
        success : function (result) {
            if(result.code == 1){
                alert("添加账号成功，初始化密码为123456！")
            }
        }
    });
}
$("#add").click(add);

window.onload=function () {
    getInfo();
    getManagerPassword();
    getAllStudents();
    getTeacherInfo();
}

//关闭学生管理页面
$("div[class = close]").click(function () {
    $("#changePassword").fadeOut(500);
    $("#managerStudent").fadeOut(500);
    $("#oout2").fadeIn(500);
});