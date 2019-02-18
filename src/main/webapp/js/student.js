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


document.getElementById("oout2").style.display = "block";


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
                window.location.href = "/"
            }else {
                alert("注销失败！");
            }
        }
    });

}


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
"id":"4",
"grade":"91"
},
{"Type":"done",
"title":"第一章至第三章",
"start":"2018-12-06 09:30",
"end":"2018-12-06 10:00",
"id":"5",
"grade":"-1"
}];

function initExamList(ExamList) {
    console.log(ExamList.length);
    console.log(typeof(ExamList));
    var containerDo = document.getElementById("oout2").children[0];
    console.log("length"+ExamList.length);
    for (var i = 0; i < ExamList.length; i++) {
        var dv1 = document.createElement("div");
        dv1.className = "col s12 m6 l4 hoverable";
        dv1.setAttribute("examId",ExamList[i]["id"]);
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
        p3.innerHTML = "进度：";
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
    
        var a = document.createElement("a");
        a.href = "#";
        dv4.appendChild(a);
        var a2 = document.createElement("a");
        a2.href="#";
        dv4.appendChild(a2);
        var a3 = document.createElement("a");
        a3.href="#";
        dv4.appendChild(a3);

        if(ExamList[i]["Type"] == "do"){
            a.innerHTML = "开始背单词";
            // a2.innerHTML="复习错题";
            // a3.innerHTML="重新开始"
           dv3.className = "card-content white-text cyan";
            containerDo.appendChild(dv1);
            a.onclick = function() {
                var id = this.parentNode.parentNode.parentNode.getAttribute("examId");
                var form=new FormData();
                form.append("id",id);
                console.log("id::"+id);
                $.ajax({
                    url : "/student/beginExam",
                    type : "POST",
                    data : form,
                    processData : false,
                    contentType : false,
                    dataType : "json",
                    success : function(result) {
                        if (result.code=="success")
                        //成功则在新页面加载试卷。需要根据试卷ID返回试卷信息给考试页面。
                            window.location.href="/exam";
                        else
                            alert(result.msg);
                    },
                    error : function() {
                        alert("进入失败，请重试");
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
        url : "/student/getExamList",
        type : "POST",
        processData : false,
        contentType : false,
        dataType : "json",
        success : function(data){
            initExamList(data);
        }
    });
}





