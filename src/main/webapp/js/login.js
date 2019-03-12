document.getElementById("login").onclick = function(){
	if(!checkPassword()){
		setErrorAlert("密码位数需6-20位！");
		return false;
	}
	// console.log("s");
	var form = new FormData();
	var uname = document.getElementById('userName').value;
	var pword = document.getElementById('passWord').value;
	var role = null;
	var radios = document.getElementById("radio").children;
	for (var i = 0; i < radios.length; i++) {
		if(radios[i].checked == true)
			role = radios[i].id;
	}
	if(!role || ! uname ){
		setErrorAlert("账号或身份类型不能为空！");
		return false;
	}
	form.append("username",uname);
	form.append("password",pword);
	form.append("role",role);
	$.ajax({
		url : "/login",
		type : "POST",
		data : form,
		processData : false,
        contentType : false,
		success: function(result){
			if (result.code=="success"){
				if (role=="student"){
                    window.location.href="/student";
                }else if (role=="teacher"){
                    window.location.href="/teacher";
                }
			}else {
 					setErrorAlert(result.msg);
			}
		}
	});
}
$(function(){ 
  $("#userName").focus(); 
}); 

function checkPassword(){
	var pword = document.getElementById('passWord').value;
	var flag = 1;
	if(pword.length < 6){
		flag = 0;
	}else if(pword.length > 20){
		flag = 0;
	}
	return flag;
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