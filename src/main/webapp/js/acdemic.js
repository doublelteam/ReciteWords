function getAllList(){
  getStudentList();
  getTeacherList();
  getAllClass();
  getTeacherClassList();
}
function getAllClass(){
  //result返回数据库中学生所在的所有年级class_grade和班级class_name
  var str1='<option value="" disabled selected>年级</option>';
  var str2='<option value="" disabled selected>班级</option>';
  $.ajax({
    url:"/acdemic/getAllClass",
    type:"POST",
    processData : false,
    contentType : false,
    dataType:"json",
    success:function(result){
      if(result){
        $("#grade").empty();
        $("#class").empty();
        $("#teacher_class_grade2").empty();
        $("#teacher_class_class2").empty();
        for(var i=0;i<result.length;i++){
          if (result[i].type=="grade") {
              str1+='<option>'+result[i].value+'</option>';
          }
          if (result[i].type=="class")
          {
              str2+='<option>'+result[i].value+'</option>';
          }
        }
        $("#grade").append(str1);
        $("#class").append(str2);
        $("#teacher_class_grade2").append(str1);
        $("#teacher_class_class2").append(str2);
      }
    }
  });
}

$(document).ready(function(){
// Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();
 	$('.chips').material_chip();

 	 $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 400, // Transition in duration
      out_duration: 300, // Transition out duration
      starting_top: '20%', // Starting top style attribute
      ending_top: '25%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
       
        console.log(modal, trigger);
      },
      // complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );
});
//确定注销按钮
document.getElementById("logout").onclick = function(){
    //退出登录，跳转到登录界面
    $.ajax({
        url : "/logout",
        type : "POST",
        contentType : false,
        processData : false,
        success : function(){
            alert("注销成功！");
            window.location.href="/";
        },
        error : function(){
            alert("注销失败，请重试！");
        }
    });
}

//控制左侧导航栏菜单的点击切换
var slide = new Array();
var out = new Array();

for (var i = 0; i < 3; i++) {
  var id1 = "slide" + (i+1);
  var id2 = "oout" + (i+1);
  slide[i] = document.getElementById(id1);
  slide[i].setAttribute("index",i);
  out[i] = document.getElementById(id2);
}
for (var i = 0; i < slide.length; i++) {
  slide[i].onclick = function() {
    for (var j = 0; j < out.length; j++) {
      console.log(j);
      out[j].style.display = "none";
    }
    out[this.getAttribute("index")].style.display = "block";
  }
}


/*-------------------管理学生页面---------------------*/
//添加单独一个学生
document.getElementById("addNewStudent").onclick=function(){
  var name=$("#new_s_name").val();
  var sex=$("#new_s_sex").val();
  var id=$("#new_s_id").val();
  var college=$("#new_s_college").val();
  var grade=$("#new_s_grade").val();
  var s_class=$("#new_s_class").val();
  if(name==""||sex==""||id==""||college==""||grade==""||s_class==""){
    alert("信息需要补充完整");
  }
  else{
    if(confirm("确认将 "+name+" 同学的信息上传到考试系统吗？")==true){
      var form=new FormData();
      form.append("name",name);
      form.append("sex",sex);
      form.append("id",id);
      form.append("college",college);
      form.append("grade",grade);
      form.append("class",s_class);
      //由信息向数据库学生表插入一个新元组
      $.ajax({
        url:"/acdemic/addNewStudent",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
          if(result.code=="success"){
            alert("上传成功！");
            getStudentList();
            $("#new_s_name").val("");
            $("#new_s_sex").val("");
            $("#new_s_id").val("");
            $("#new_s_college").val("");
            $("#new_s_grade").val("");
             $("#new_s_class").val("");
          }
          //用主键职工号判断是否已存在
          else if(result.code=="exist"){
            alert("该学号已存在！")
          }
          else{
            alert("上传失败！");
          }
        }
      });
    }
  }
}


//导入学生的excel文档
document.getElementById("addNewStudentFile").onclick=function(){
      $.ajax({
          url:"/acdemic/addNewStudentFile",
          type:'POST',
          data:new FormData($("#student_file")[0]),
          processData : false,
          contentType : false,
          beforeSend:function(){
              console.log("正在上传，请稍候");
          },
          success:function(result){
              if (result.code=="success"){
                  alert(result.msg);
              }else {
                  alert(result.msg);
              }
          }
      });

}
function getStudentInfo(id) {
    var form=new FormData();
    form.append("id",id);
    $.ajax({
        url:"/acdemic/studentinfo",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        dataType:"json",
        success:function(data){
            if(data.code=="success"){
                $("#s_name").val(data.name);
                $("#s_id").val(data.id);
                $("#s_sex").val(data.sex);
                $("#s_college").val(data.college);
                $("#s_grade").val(data.grade);
                $("#s_class").val(data.class);
                $("#s_address").val(data.address);
                $("#s_birthday").val(data.birthday);
                $("#s_phone").val(data.phone);
                $("#s_email").val(data.email);
            }
            else{
                alert("查询详细信息失败！");//一般不会出现
            }
        }
    });
}

//初始化学生的密码
document.getElementById("default_student").onclick=function(){
  var name=$("#s_name").val();
  if(confirm("确认将 "+name+" 密码初始化吗?")==true){
    var id=$("#s_id").val();
    var form=new FormData();
    form.append("id",id);
    //根据id初始化对应学生的密码111111
    $.ajax({
        url:"/acdemic/defaultStudent",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
          if(result.code=="success"){
            alert("初始化成功！");
          }
          else{
            alert("初始化失败！");
          }
        }
      });
  }
}
//保存学生信息的修改
document.getElementById("save_student").onclick=function(){
  if(confirm("确认保存修改")==true){
    var id=$("#s_id").val();
    var name=$("#s_name").val();
    var sex=$("#s_sex").val();
    var college=$("#s_college").val();
    var grade=$("#s_grade").val();
    var classname=$("#s_class").val();
    var address=$("#s_address").val();
    var birthday=$("#s_birthday").val();
    var phone=$("#s_phone").val();
    var email=$("#s_email").val();
    if(name==""||sex==""||college==""||grade==""||classname==""||address==""||birthday==""||phone==""||email==""){
      alert("保存失败！请提交完整的资料");
    }
    else{
      var form=new FormData();
      form.append("id",id);
      form.append("name",name);
      form.append("sex",sex);
      form.append("college",college);
      form.append("grade",grade);
      form.append("class",classname);
      form.append("address",address);
      form.append("birthday",birthday);
      form.append("phone",phone);
      form.append("email",email);
      //根据ID保存信息
      $.ajax({
        url:"/acdemic/saveStudent",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
          if(result.code=="success"){
            alert("信息保存成功！");
            getStudentList();
          }
          else{
            alert("保存失败！");
          }
        }
      });
    }
  } 
}


/*-------------管理教师信息页面-----------------*/
//添加单独一个新教师
document.getElementById("addNewTeacher").onclick=function(){
  var name=$("#new_t_name").val();
  var sex=$("#new_t_sex").val();
  var id=$("#new_t_id").val();
  var college=$("#new_t_college").val();
  if(name==""||sex==""||id==""||college==""){
    alert("信息需要补充完整");
  }
  else{
    if(confirm("确认将 "+name+" 老师的信息上传到考试系统吗？")==true){
      var form=new FormData();
      form.append("name",name);
      form.append("sex",sex);
      form.append("id",id);
      form.append("college",college);
      //由信息向数据库教师表插入一个新元组
      $.ajax({
        url:"/acdemic/addNewTeacher",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
          if(result.code=="success"){
            alert("上传成功！");
            getTeacherList();
            $("#new_t_name").val("");
            $("#new_t_sex").val("");
            $("#new_t_id").val("");
            $("#new_t_college").val("");
          }
          //用主键职工号判断是否已存在
          else if(result.code=="exist"){
            alert("该职工号已存在！")
          }
          else{
            alert("上传失败！");
          }
        }
      });
    }
  }
}
//导入教师信息excel文档
document.getElementById("addNewTeacherFile").onclick=function(){

    $.ajax({
      url:"/acdemic/addNewTeacherFile",
      type:'POST',
      data:new FormData($("#teacher_file")[0]),
      processData : false,
      contentType : false,
      beforeSend:function(){
          console.log("正在上传，请稍候");
      },
      success:function(result){
        if (result.code=="success"){
            alert(result.msg);
          }else {
              alert(result.msg);
          }
      }
    });

}
function exportTeacher() {

    $.ajax({
        url:"/acdemic/exportTeacher",
        type:'POST',
        processData : false,
        contentType : false,
        success:function(result){

        }
    });
}


function getTeacherInfo(id){
    var form=new FormData();
    form.append("id",id);
    $.ajax({
        url:"/acdemic/teacherinfo",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        dataType:"json",
        success:function(data){
            if(data.code=="success"){
                $("#t_name").val(data.name);
                $("#t_id").val(data.id);
                $("#t_sex").val(data.sex);
                $("#t_college").val(data.college);
                $("#t_address").val(data.address);
                $("#t_birthday").val(data.birthday);
                $("#t_phone").val(data.phone);
                $("#t_email").val(data.email);
            }
            else{
                alert("查询详细信息失败！");//一般不会出现
            }
        }
    });
}
//初始化教师的密码
document.getElementById("default_teacher").onclick=function(){
  var name=$("#t_name").val();
  if(confirm("确认将 "+name+" 密码初始化吗?")==true){
    var id=$("#t_id").val();
    var form=new FormData();
    form.append("id",id);
    //根据id初始化对应教师的密码222222
    $.ajax({
        url:"/acdemic/defaultTeacher",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
          if(result.code=="success"){
            alert("初始化成功！");
          }
          else{
            alert("初始化失败！");
          }
        }
      });
  }
}
//保存教师信息的修改
document.getElementById("save_teacher").onclick=function(){
  if(confirm("确认保存修改")==true){
    var id=$("#t_id").val();
    var name=$("#t_name").val();
    var sex=$("#t_sex").val();
    var college=$("#t_college").val();
    var address=$("#t_address").val();
    var birthday=$("#t_birthday").val();
    var phone=$("#t_phone").val();
    var email=$("#t_email").val();
    if(name==""||sex==""||college==""||grade==""||address==""||birthday==""||phone==""||email==""){
      alert("保存失败！请提交完整的资料");
    }
    else{
      var form=new FormData();
      form.append("id",id);
      form.append("name",name);
      form.append("sex",sex);
      form.append("college",college);
      form.append("address",address);
      form.append("birthday",birthday);
      form.append("phone",phone);
      form.append("email",email);
      //根据ID保存信息
      $.ajax({
        url:"/acdemic/saveTeacher",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
          if(result.code=="success"){
            alert("信息保存成功！");
            getTeacherList();
          }
          else{
            alert("保存失败！");
          }
        }
      });
    }
  } 
}

/*-------------管理教师班级页面-----------------*/
document.getElementById("add_teacher_class").onclick=function(){
  if(confirm("确认添加吗?")==true){
    var classgrade=$("#teacher_class_grade2 option:selected").text();
    var classname=$("#teacher_class_class2 option:selected").text();
    if(classgrade=="年级"){classgrade="";}
    if(classname=="班级"){classname="";}
    var teacher_id=$("#teacher_class_id2").val();
    if(classgrade==""||classname==""||teacher_id==""){
      alert("请填写完整!");
    }else{
      var form=new FormData();
      form.append("teacher_id",teacher_id);
      form.append("classgrade",classgrade);
      form.append("classname",classname);
      //保存教师id与班级的对应关系
      $.ajax({
        url:"/acdemic/saveTeacherClass",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
          if(result.code=="success"){
            alert("添加成功！");
            getTeacherClassList();
          }
          else{
            alert("添加失败！");
          }
        }
      });
    }
  }
}

//删除教师——班级的元组
var teacher_class_delete=document.getElementsByName("teacher_class_delete");
for (var i = 0; i < teacher_class_delete.length; i++) {
  teacher_class_delete[i].setAttribute("index",i);
}
for(var i=0;i<teacher_class_delete.length;i++){
  teacher_class_delete[i].onclick=function(){
  if(confirm("确认删除吗?")==true){
    var j=this.getAttribute("index");
    var teacher_class_id=document.getElementsByName("teacher_class_id");
    var teacher_class=document.getElementsByName("teacher_class");
    var t_c_id=$(teacher_class_id[j]).text();
    var t_c=$(teacher_class[j]).text();
    var class_grade=t_c.split(" ")[0];
    var class_name=t_c.split(" ")[1];
    var form=new FormData();
    form.append("teacher_id",t_c_id);
    form.append("class_grade",class_grade);
    form.append("class_name",class_name);
    //根据上面三个属性删除教师-班级表中对应的元组
    $.ajax({
      url:"/acdemic/deleteTeacherClass",
      type:"POST",
      data:form,
      processData : false,
      contentType : false,
      success:function(result){
        if(result.code=="success"){
          alert("删除成功！");
        }else{
          alert("删除失败！");
        }
      }
    });
    }
  }
}

function delTC(a,b,c) {
    var form=new FormData();
    form.append("id",a);
    form.append("grade",b);
    form.append("name",c);
    //根据上面三个属性删除教师-班级表中对应的元组
    $.ajax({
        url:"/acdemic/deleteTeacherClass",
        type:"POST",
        data:form,
        processData : false,
        contentType : false,
        success:function(result){
            if(result.code=="success"){
                alert("删除成功！");
                getTeacherClassList();
            }else{
                alert("删除失败！");
            }
        }
    });
}

/*------------------列表更新函数-------------------------*/

//学生,根据年级和班级返回result为指定的学生(name、id、sex、class_grade、class_name、college)的数组
//如果收到的classgrade、classname都=="",那么返回全部的学生，也要考虑其中之一为""的情况
function getStudentList(){
  var classgrade=$("#grade option:selected").text();
  var classname=$("#class option:selected").text();
  if(classgrade=="年级"){classgrade="";}
  if(classname=="班级"){classname="";}
  var form=new FormData();
  form.append("classgrade",classgrade);
  form.append("classname",classname);
    var str='<div class="row"><p class="col s2">姓名</p><p class="col s2">学号</p><p class="col s1">性别</p><p class="col s1">年级</p><p class="col s2">班级</p><p class="col s3">学院</p><p class="col s1">操作</p></div>';
    console.log(form);
    $.ajax({
    url:"/acdemic/getStudentList",
    type:"POST",
    data:form,
    processData : false,
    contentType : false,
    dataType : "json",
    success:function(result){
        $("#student_list").empty();
        for(var i=0;i<result.length;i++){
          str+='<li class="row"><p class="col s2">'+result[i].name+'</p><p class="col s2">'+result[i].id+'</p><p class="col s1">'+result[i].sex+'</p><p class="col s1">'+result[i].class_grade+'</p><p class="col s2">'+result[i].class_name+'</p><p class="col s3">'+result[i].college+'</p><p class="col s1"><a href="#student_detail" name="student_edit" onclick="getStudentInfo('+result[i].id+')">修改</a></p></li>';
        }
        $("#student_list").append(str);
    }
  });
}

//教师,result返回一个教师姓名、职工号、性别、学院元组作为一个元组组成的数组
//name、id、sex、college
function getTeacherList(){
  var str='<div class="row"><p class="col s2">姓名</p><p class="col s3">职工号</p><p class="col s2">性别</p><p class="col s3">学院</p><p class="col s2">操作</p></div>';
  $.ajax({
    url:"/acdemic/getTeacherList",
    type:"POST",
    processData : false,
    contentType : false,
    dataType:"json",
    success:function(result){
        $("#allteacher").empty();
        for(var i=0;i<result.length;i++){
          str+='<li class="row"><p class="col s2">'+result[i].name+'</p><p class="col s3" name="teacher_id">'+result[i].id+'</p><p class="col s2">'+result[i].sex+'</p><p class="col s3">'+result[i].college+'</p><p class="col s2"><a href="#teacher_detail" name="teacher_edit" onclick="getTeacherInfo('+result[i].id+')">修改</a></p></li>';
        }
        $("#allteacher").append(str);
    }
  });
}

//
function getTeacherClassList(){
  var str='<div class="row"><div class="col s1"></div><p class="col s2">教师姓名</p><p class="col s3">教师职工号</p><p class="col s3">所教班级</p><p class="col s3">操作</p></div>';
  $.ajax({
    url:"/acdemic/getTeacherClassList",
    type:"POST",
    processData : false,
    contentType : false,
    dataType:"json",
    success:function(result){
      $("#teacher_class_list").empty();
      for(var i=0;i<result.length;i++){
        str+='<li class="row"><div class="col s1"></div><p class="col s2" id="tiid">'+result[i].teacher_name+'</p><p class="col s3" name="teacher_class_id">'+result[i].teacher_id+'</p><p class="col s1" id="ggrade">'+result[i].class_grade+'</p><p class="col s2" id="cclass">'+result[i].class_name+'</p><p class="col s1"><a href="#!" name="teacher_class_delete" onclick="delTC('+"'"+result[i].teacher_id+"'"+','+"'"+result[i].class_grade+"'"+','+"'"+result[i].class_name+"'"+')">删除</a></p></li>';
      }
      $("#teacher_class_list").append(str);
    }
  });
}

document.getElementById("search_student").onclick=function(){
  getStudentList();
}



