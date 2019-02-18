package com.db.controller;

import com.db.dao.*;
import com.db.model.*;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.shiro.crypto.hash.Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;


@Controller
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentMapper studentDao;
    @Autowired
    private TeacherMapper teacherDao;
    @Autowired
    private PaperMapper paperDao;
    @Autowired
    private StudentPaperMapper studentPaperDao;

//    var ExamList = [
//    {
//        "Type" : "done",
//            "title" : "数据库测试1",
//            "start" : "2018-09-01 22:08",
//            "end" : "2018-09-01 23:08",
//            "id" : "123",
//            "grade" : "85",
//    },
//{
//    "Type" : "do",
//        "title" : "数据库测试2",
//        "start" : "2018-09-01 22:08",
//        "end" : "2018-09-01 23:08",
//        "id" : "456",
//}];
//{"Type":"do",
//        "title":"第一章至第三章",
//        "start":"2018-12-06 09:30",
//        "end":"2018-12-06 10:00",
//        "id":"1"}

    @RequestMapping(value ="/getExamList",method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public Object getExamList(HttpServletRequest request){
        HttpSession session=request.getSession();
        String id=session.getAttribute("username").toString();
        JSONArray result=new JSONArray();
        Student student=studentDao.selectByAccount(id);
        List<Paper> paperList=paperDao.getList();

        for (Paper p:paperList){
            JSONObject jsonObject=new JSONObject();
            StudentPaper s=new StudentPaper();
            s.setStudentId(student.getId());
            s.setPaperId(p.getId());
            s.setNums(Long.valueOf(0));
            StudentPaper sp=studentPaperDao.selectByPrimaryKey(s);
            if (sp==null){
                sp=s;
                studentPaperDao.insertSelective(s);
            }
            jsonObject.put("Type","do");
            jsonObject.put("title",p.getName());
            jsonObject.put("nums",sp.getNums()+"/"+p.getNums());
            jsonObject.put("start","0");
            jsonObject.put("end","0");
            jsonObject.put("id",String.valueOf(p.getId()));
            jsonObject.put("grade",0);
            result.add(jsonObject);
        }
        return result;
    }
    @RequestMapping("/beginExam")
    @ResponseBody
    public Object beginExam(@RequestParam(value = "id") String paperId,HttpServletRequest request){
        JSONObject result=new JSONObject();
        HttpSession session=request.getSession();
        String id=session.getAttribute("username").toString();
        if (session.getAttribute("paperId")!=null)
            session.removeAttribute("paperId");
        session.setAttribute("paperId",paperId);
        result.put("code","success");
        return result;
    }

}
