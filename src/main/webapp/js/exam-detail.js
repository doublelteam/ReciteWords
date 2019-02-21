
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

//请求获得试卷的数据json数组（jsons）加载试卷
function onloadExam(){
	//请求试卷信息
	$.ajax({
        url : "/getDoneExamInfo",
        type : "POST",
        processData : false,
        contentType : false,
        dataType : "json",
        success: function(data,result){
            	//返回的数据可以查看控制台的data
                initExam(data);
        }
    });
}


