//启动模态
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $("#modal2").modal({
        ready : function() {
            var t = $("#input").val();
            t = t.replace(/[^\w\.\/]/ig, '');
            if (t) {
                $("#userName").val(t);
            }
        },
        complete : function () {
            $("#modal2 div span").css("display","none");
            t_name = $("#userName").val();
            t_password = $("#password").val();
            selectflag = 0;
            document.getElementById("type").children[0].setAttribute("selected","true");
            $("#password").val("");
            $("#userName").val("");
            $(".managerPass").css("display","none");
            $("#modal2 a").attr("disabled","true");
        }
    });
    $('#modal1').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            starting_top: '33%', // Starting top style attribute
            ending_top: '40%', // Ending top style attribute
            // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            //     // alert("Ready");
            //     // console.log(modal, trigger);
            //     // console.log("bbb");
            // },
            complete: function() {
                $("#password").val("");
                $("#userName").val("");
                $(".managerPass").css("display","none");
                // console.log("dasdasd");
            } // Callback for Modal close
        }
    );
    $("#modal4").modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: '28%', // Starting top style attribute
        ending_top: '35%', // Ending top style attribute
        complete : function () {
            $("#modify-input").css("display","inline-block").val("");
            $("#modify-input2").css("display","none").val("");
            $("#modify-input").attr("type","text");
            $("div.header2>div").attr("class","tip2");
            $("div.header2 h6").removeClass();

        }
    });
    $("#modal3").modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: '33%', // Starting top style attribute
        ending_top: '40%', // Ending top style attribute
        complete : function () {
            // $("#modal4 h6").html("你确定退出当前账号吗？");
            $("#modify-input").css("diaplay","inline-block");
            $("#modify-input2").css("diaplay","none");
        }
    });
});



var ManagerPassword;
var t_name;
var t_password;
var selectflag = 0;
var nameflag = 0;
var passwordflag = 0;
var managerflag = 0;

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
function f1(){
	//退出登录，跳转到登录界面
    $.ajax({
        url : "/logout",
        type : "POST",
        processData : false,
        contentType : false,
        success: function(result){
            if (result.code=="success"){
                setRightNotice("注销成功！")
                window.location.href="/"
            }else {
                setErrorAlert("注销失败！");
            }
        }
    });
}
document.getElementById("logout").onclick = f1;

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
                        setRightNotice("移除成功！");
                        location.reload();
                    },
                    error : function() {
                        setErrorAlert("移除失败，请重试");
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
                    window.location.href = "/examDetail";
                },
                error : function() {
                    setErrorAlert("查看失败，请重试");
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
            setErrorAlert(data.msg);
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
                $("#name").html("账号:" + data.name);
            }else{
                setErrorAlert("获取教师信息失败，请重新登录");
            }
        }
    });
}

//修改密码
var passwordContainer = document.getElementById('changePassword');
document.getElementById('c_password').onclick = function() {
    $("#oout2").hide(700);
    $("#managerStudent").hide(700);
    $("#record").hide(700);
    $(passwordContainer).show(700);
};

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
        setErrorAlert("密码不能为空！");
        return;
    }
    if(!(checkPassword(oldPassword) && checkPassword(newPassword) && checkPassword(newPassword2))){
        setErrorAlert("密码位数需6-20位！");
        return;
    }
    if(newPassword != newPassword2){
        setErrorAlert("两次密码不一致！");
        return;
    }
    if(oldPassword == newPassword){
        setErrorAlert("新密码和原密码一样！");
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
                Alert("修改成功！")
                document.getElementById('changePassword').style.display = "none";
                $("#oout2").show(600);
            }else {
                setErrorAlert("原密码错误，修改失败！");
                $("#oldpassword").val("");
                $("#newpassword").val("");
                $("#newpassword2").val("");
            }
        },
        error : function () {
            setErrorAlert("修改请求发送失败，请重试。");
        }
    });
}

//取消修改
document.getElementById('cancel').onclick = function() {
    $(document.getElementById('changePassword')).hide(600);
    $("#oout2").show(600);
    $("#oldpassword").val("");
    $("#newpassword").val("");
    $("#newpassword2").val("");
}


var testData = [
    {
        "id" : "1234",
        "point" : "100"
    },
    {
        "id" : "3123",
        "point" : "12"
    },
    {
        "id" : "3333",
        "point" : "33"
    },
    {
        "id" : "444",
        "point" : "10440"
    },
    {
        "id" : "12232334",
        "point" : "55"
    },
    {
        "id" : "123123213",
        "point" : "17700"
    },
    {
        "id" : "333434",
        "point" : "1020"
    }
];


//管理学生界面
//切换界面
$("#manager").click(function () {
    $("#oout2").hide(700);
    $("#changePassword").hide(700);
    $("#record").hide(700);
    $("#managerStudent").show(700);
    $("#oldpassword").val("");
    $("#newpassword").val("");
    $("#newpassword2").val("");
});

//初始化学生列表
var operation = 0;
function initStudentTable(data) {
    if(!data){
        setErrorAlert("未能获取学生信息，请刷新重试！");
        return false;
    }
    var table = document.getElementById("studentTable").children[1];
    table.innerHTML = "";
    console.log(table);

    for (var i = 0; i < data.length; i ++){

        //创建tr标签，并加入列表
        var tr = document.createElement("tr");

        table.appendChild(tr);

        //创建账号、积分、操作的td标签,并加入列表中
        var td1 = document.createElement("td");
        td1.innerHTML = data[i]["id"];
        $(td1).attr("ids",data[i]["ids"]);
        $(td1).attr("name","idContainer");
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = data[i]["point"];
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        tr.appendChild(td3);
        //创建修改积分、删除、重置密码等按钮
        var a1 = document.createElement("a");
        a1.className = "modify";
        a1.href = "#modal4";
        a1.innerHTML = "修改积分";
        td3.appendChild(a1);
        a1.onclick = function(){
            $("#modal4 h6").html("修改积分");
            operation = 1;
            var t_id = this.parentNode.parentNode.children[0].innerHTML;
            $("#modify").attr("ids",t_id);
            $("#modify-input").attr("placeholder","请在此输入新的积分");
            $("div.header2 div").attr("class","title");
            $("div.header2 h6").attr("class","newH");
            getClickEvent();
        };

        var a2 = document.createElement("a");
        a2.className = "delete";
        a2.innerHTML = "删除";
        a2.href = "#modal4";
        td3.appendChild(a2);
        a2.onclick = function(){
            $("#modal4 h6").html("确定删除这个账号吗？一旦删除将无法恢复！");
            operation = 2;
            var t_id = this.parentNode.parentNode.children[0].innerHTML;
            $("#modify").attr("ids",t_id);
            $("#modify-input").css("display","none").next().css("display","inline-block");
            getClickEvent();
        };

        var a3 = document.createElement("a");
        a3.className = "reset";
        a3.innerHTML = "修改密码";
        a3.href = "#modal4";
        td3.appendChild(a3);
        a3.onclick = function () {
            operation = 3;
            $("#modal4 h6").html("修改密码");
            var t_id = this.parentNode.parentNode.children[0].innerHTML;
            $("#modify").attr("ids",t_id);
            $("#modify-input").attr("placeholder","请在此输入新密码").attr("type","password");
            $("#modify-input2").css("display","inline-block");
            $("div.header2 div").attr("class","title");
            $("div.header2 h6").attr("class","newH");
            getClickEvent();
        };

        $("#studentTable>tbody tr:odd").addClass("odd");
        $("#studentTable>tbody tr:even").addClass("even");
        $("#studentTable>tbody tr td").css("padding","10px 15px");
    }
}
function getClickEvent() {
    if(operation == 1){
        $("#modify").unbind("click");
        $("#modify").click(modify);
    }
    else if(operation == 2){
        $("#modify").unbind("click");
        $("#modify").click(Delete);
    }
    else if(operation == 3){
        $("#modify").unbind("click");
        $("#modify").click(resetPassword);
    }
    else
        $("#modify").unbind("click");
}

// initStudentTable(testData);
//

//获取所有学生
function getAllStudents() {
    $.ajax({
        url : "/teacher/getAllStudents",
        type : "POST",
        processData : false,
        contentType : false,
        success : function (data) {
            initStudentTable(data);
        },
        error : function () {
            setErrorAlert("请求学生信息失败，请刷新页面重试。");
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
    var newPoints = $("#modify-input").val();
    console.log("修改积分");

    if(!newPoints){
        setErrorAlert("新积分不能为空！");
        return false;
    }
    var reg = /^[0-9]*$/;
    if(!reg.test(newPoints)){
        setErrorAlert("请输入数字！");
        return false;
    }
    if(newPoints < 0){
        setErrorAlert("积分不能小于0");
        return false;
    }

    var id = this.getAttribute("ids");
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
    $.ajax({
        url : "/teacher/changePoints",
        type : "POST",
        data : form,
        processData : false,
        contentType : false,
        success : function (result) {
            if(result.code == "success"){
                setRightNotice("修改积分成功！");
                getAllStudents();
            }
            else {
                setErrorAlert("修改积分失败！");
            }
        },
        error : function () {
            setErrorAlert("向服务器发送修改请求失败，请重试！");
        }
    });
}

//删除学生
function Delete() {
    var id = $(this).attr("ids");
    var t =  $("#modify-input2").val();
    if(!t){
        setErrorAlert("管理密码不能为空");
        return false;
    }
    // if(!ManagerPassword){
    //     setErrorAlert("无法进行密码验证。请刷新页面重试");
    //     return false;
    // }
    // if(!t == ManagerPassword){
    //     setErrorAlert("管理密码错误！");
    //     return false;
    // }
    var form = new FormData();
    form.append("id",id);
    form.append("managerpassword",t);
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
            if(result.code == "success"){
                setRightNotice("删除账号成功！");
                getAllStudents();
            }else {
                setErrorAlert(result.msg);
            }
        },
        error : function () {
            setErrorAlert("向服务器发送请求失败，请重试！");
        }
    });
}

//修改密码
function resetPassword() {
    var id = $(this).attr("ids");
    console.log("修改密码");
    var password = $("#modify-input").val();
    var Mpassword = $("#modify-input2").val();
    if(!password || !Mpassword){
        setErrorAlert("密码不能为空！");
        return false;
    }
    var form = new FormData();
    form.append("id",id);
    form.append("password",password);
    form.append("managerpassword",Mpassword);
    console.log("重置id"+ id);
    $.ajax({
       url : "/teacher/resetPassword",
       type : "POST",
       data : form,
       processData : false,
       contentType : false,
        success : function (result) {
            if(result.code == 1){
                setRightNotice("修改密码成功！");
            }else
                setErrorAlert("修改失败，请重试。");
        },
        error : function () {
            setErrorAlert("向服务器发送修改请求失败，请重试！");
        }
    });
}

//搜索功能
function search() {
    var id = $("#input").val();
    if(!id){
        $("#studentTable>tbody tr").show();
        $("#studentTable>tbody tr:odd").addClass("odd");
        $("#studentTable>tbody tr:even").addClass("even");
        return false;
    }
    $("#studentTable>tbody tr").hide();
    var $trs = $("#studentTable>tbody tr td[name = idContainer]:contains(" + id + ")").parent();
    $trs.show();
    $("#studentTable>tbody tr:visible:even").removeClass().addClass("even");
    $("#studentTable>tbody tr:visible:odd").removeClass().addClass("odd");
}
$("#input").keyup(search);
$("#search").click(search);

//输入框根据输入验证内容
$("#modal2 div input").bind("blur",function () {
    var t = this.value;
    var span = this.parentNode.children[4];
   if(this.id == "userName") {
        if(!t){
            span = this.parentNode.children[3];
            span.innerHTML = "账号不能为空！";
            span.style.color = "red";
            $(span).show(200);
            nameflag = 0;
        }else
            nameflag = 1;
   }
   if(this.id == "password"){
        if(!checkPassword(t)){
            span.innerHTML = "密码位数需6-20位！";
            span.style.color = "red";
            $(span).show(200);
            passwordflag = 0;
        }
        else
            passwordflag = 1;
   }
   if(this.id == "managerPassword"){
       if(!t){
           span.innerHTML = "管理密码不能为空！";
           span.style.color = "red";
           $(span).show(200);
           managerflag = 0;
       }
       else
           managerflag = 1;
   }
   var btn = $("#modal2 div a");
    console.log("name"+nameflag);
    console.log("manager"+managerflag);
    console.log("pass"+passwordflag);
    console.log("select"+selectflag);
    console.log("---------------");
   if(nameflag == 1 && managerflag == 1 && passwordflag == 1 && selectflag == 1 && $("#managerPassword").is(":visible")){
       console.log("name"+nameflag);
       console.log("manager"+managerflag);
       console.log("pass"+passwordflag);
       console.log("select"+selectflag);
       console.log("显示");
       btn.removeAttr("disabled");
   }else if(nameflag == 1 && passwordflag == 1 && selectflag == 1 && $("#managerPassword").is(":hidden")){
       console.log("name"+nameflag);
       console.log("manager"+managerflag);
       console.log("pass"+passwordflag);
       console.log("select"+selectflag);
       console.log("隐藏");
       btn.removeAttr("disabled");
   }else{
       btn.attr("disabled","true");
   }
});

$("#modal2 div input").bind("focus",function () {
    var span = this.parentNode.children[4];
    if(!span)
        span = this.parentNode.children[3];
    $(span).hide(200);
});

//添加账号
function add() {
    var id = t_name;
    if(!id){
        setErrorAlert("请输入账号！");
        return false;
    }

    var password = t_password;
    console.log(id);
    console.log(password);
    if( !checkPassword(password) ){
        setErrorAlert("密码位数需6-20位！");
        return false;
    }
    var type;
    var op2 = document.getElementById("type").getElementsByTagName("option");
    if(op2[1].selected == true)
        type = "teacher";
    else if(op2[2].selected == true)
        type = "student";
    else
        setErrorAlert("请选择账号类型！");


    var form = new FormData();
    form.append("id",id);
    form.append("password",password);
    form.append("type",type);
    if(type == "teacher"){
        var managerPa = $("#managerPassword").val();
        form.append("managerpassword",managerPa);
    }
    $.ajax({
        url : "/teacher/addUser",
        type : "POST",
        data : form,
        processData : false,
        contentType : false,
        success : function (result) {
            if(result.code == "success"){
                setRightNotice("添加账号" + id + "成功，密码为" + password + "！");
                getAllStudents();
            }else{
                setErrorAlert(result.msg);
            }
        },
        error : function () {
            setErrorAlert("向服务器发送请求失败，请重试！");
        }
    });
}

//设置select标签变化事件，id为type
document.getElementById("type").onchange = function () {
   for (var i = 0; i < this.children.length; i++){
       if(this.children[i].selected == true && this.children[i].innerHTML == "教师"){
           $(".managerPass").css("display","block");
           $("#modal2 div a").attr("disabled","true");
           selectflag = 1;
           managerflag = 0;
           break;
       }
       else{
           selectflag = 1;
           $(".managerPass").css("display","none");
           $(".managerPass input").val("");
           if(nameflag == 1 && passwordflag == 1 && selectflag == 1){
               $("#modal2 div a").removeAttr("disabled");
           }
       }
   }
};

// 密码可见眼睛
$("#eye").click(function(){
    var password = document.getElementById("password");
    if(password.type == "password"){
        password.type = "text";
    }
    else
        password.type = "password";
    // console.log("aaa");
});

//管理密码可见的眼睛
$("#eye2").click(function(){
    var password = document.getElementById("managerPassword");
    if(password.type == "password"){
        password.type = "text";
    }
    else
        password.type = "password";
    // console.log("aaa");
});

window.onload=function () {
    getInfo();
    getManagerPassword();
    getAllStudents();
    getTeacherInfo();
};

//关闭学生管理页面
$("div[class = close]").click(function () {
    $("#changePassword").hide(700);
    $("#managerStudent").hide(700);
    $("#record").hide(700);
    $("#oout2").show(700);
});

              //查询积分修改记录相关代码


//关闭积分修改查询页面
$("div[class=close2]").click(function () {
    $("#changePassword").hide(700);
    $("#managerStudent").hide(700);
    $("#record").hide(700);
    $("#oout2").show(700);
});


//查询积分页面切换
$("#query").click(function () {
   $("#changePassword").hide(700);
   $("#managerStudent").hide(700);
   $("#oout2").hide(700);
   $("#changePassword input").val("");
   $("#record").show(700);
   getRecord();
});

//查询记录数据
var recordData = [
    {
        "time" : "2017-01-01",
        "ip" : "127.201.203.200",
        "personDo" : "呜呜呜呜",
        "personDone" : "哈哈哈哈",
        "oldRecord" : "100",
        "newRecord" : "200:"
    },
    {
        "time" : "2017-01-01",
        "ip" : "127.201.203.200",
        "personDo" : "呜呜呜呜",
        "personDone" : "哈哈哈哈",
        "oldRecord" : "100",
        "newRecord" : "200:"
    },{
        "time" : "2017-01-01",
        "ip" : "127.201.203.200",
        "personDo" : "呜呜呜呜",
        "personDone" : "哈哈哈哈",
        "oldRecord" : "100",
        "newRecord" : "200:"
    },{
        "time" : "2017-01-01",
        "ip" : "127.201.203.200",
        "personDo" : "呜呜呜呜",
        "personDone" : "哈哈哈哈",
        "oldRecord" : "100",
        "newRecord" : "200:"
    },{
        "time" : "2017-01-01",
        "ip" : "127.201.203.200",
        "personDo" : "呜呜呜呜",
        "personDone" : "哈哈哈哈",
        "oldRecord" : "100",
        "newRecord" : "200"
    }
];

//初始化查询记录表格
function initRecordTable(data) {
    var table = document.getElementById("recordTable");
    var th = table.children[0].children[0];
    // console.log(th);
    table.removeChild(table.children[1]);
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    //清除完其余数据只剩下标题，以下加载其他数据
    for(var j = 0; j < data.length; j ++){
        var tr = document.createElement("tr");
        var time = "<td>" + data[j]["time"] + "</td>";
        var ip = "<td>" + data[j]["ip"] + "</td>";
        var personDO = "<td>" + data[j]["personDo"] + "</td>";
        var personDone = "<td>" + data[j]["personDone"] + "</td>";
        var oldRecord = "<td>" + data[j]["oldRecord"] + "</td>";
        var newRecord = "<td>" + data[j]["newRecord"] + "</td>";
        tr.innerHTML = time + ip + personDO + personDone + oldRecord + newRecord;
        tbody.appendChild(tr);
    }
    console.log("记录记录");
    $("#recordTable>tbody tr:even").addClass("even");
    $("#recordTable>tbody tr:odd").addClass("odd");
    $("#recordTable tr td").css("padding","10px 15px");
}

function addToRecordTable(data) {
    var table = document.getElementById("recordTable");
    var th = table.children[0].children[0];
    console.log(th);
    for (var i = 1; i < table.children[0].children.length; i++) {
        table.children[0].removeChild(table.children[0].children[i]);
    }
    //清除完其余数据只剩下标题，以下加载其他数据
    for(var j = 0; j < data.length; j ++){
        var tr = document.createElement("tr");
        var time = "<td>" + data[i]["time"] + "</td>";
        var ip = "<td>" + data[i]["ip"] + "</td>";
        var personDO = "<td>" + data[i]["personDo"] + "</td>";
        var personDone = "<td>" + data[i]["personDone"] + "</td>";
        var oldRecord = "<td>" + data[i]["oldRecord"] + "</td>";
        var newRecord = "<td>" + data[i]["newRecord"] + "</td>";
        tr.innerHTML = time + ip + personDO + personDone + oldRecord + newRecord;
        table.children[1].appendChild(tr);
    }

    $("#recordTable>tbody tr:even").addClass("even");
    $("#recordTable>tbody tr:odd").addClass("odd");
    $("#recordTable tr td").css("padding","10px 15px");
}
// initRecordTable(recordData);

var record = [];
var loadRecord = [];

//请求查询记录
function getRecord() {
    //请求数据样式如上，recordData数组，此外还需要一个code
    $.ajax({
        url : "/teacher/getRecord",
        type : "POST",
        processData : false,
        contentType : false,
        success : function (result) {
                for (var i = 0; i < result.length; i ++){
                    record[i] = result[i];
                }
                initRecordTable(result);
        },
        error : function () {
            setErrorAlert("请求查询记录失败，请重试！");
        }
    });
}




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
