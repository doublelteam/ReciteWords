

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
                            location.reload();
                        },
                        error : function() {
                            alert("移除失败，请重试");
                        }
                    });
                }
            }
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



window.onload=function () {
    getInfo();
}
