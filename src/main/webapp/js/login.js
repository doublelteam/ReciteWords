document.getElementById("login").onclick = function(){
	if(!checkPassword()){
		alert("密码位数需6-20位！");
		return false;
	}
	console.log("s");
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
		alert("账号或身份类型不能为空！");
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
 					alert(result.msg);
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
