package com.db.controller;

import com.db.dao.*;
import com.db.model.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ExamController {

    @Autowired
    StudentMapper studentDao;
    @Autowired
    WordsMapper wordsDao;
    @Autowired
    StudentWordMapper studentWordDao;
    @Autowired
    StudentPaperMapper studentPaperDao;
    @Autowired
    PaperMapper paperDao;




    @RequestMapping("/getwords")
    @ResponseBody
    public Object getExamTime(HttpServletRequest request){
        JSONArray result=new JSONArray();
        HttpSession session=request.getSession();
        long paperid=Integer.valueOf(session.getAttribute("paperId").toString());
        int wordNum=Integer.valueOf(session.getAttribute("wordNum").toString());
        String account=session.getAttribute("username").toString();
        Student student=studentDao.selectByAccount(account);
        List<Words> wordsList=wordsDao.getListByPaer(paperid);
        StudentWord search=new StudentWord();
        search.setPaperId(paperid);
        search.setStudentId(student.getId());
        List<StudentWord> studentWordList=studentWordDao.getListBySPId(search);
        int num=studentWordList.size();
        int count=0;
        Words record=null;
        for (int n=num;n<wordsList.size();n++){
            if (count==wordNum)
                break;
            JSONObject js=new JSONObject();
            js.put("id",wordsList.get(n).getId());
            js.put("chinese",wordsList.get(n).getChinese());
            js.put("english",wordsList.get(n).getEnglish());
            result.add(js);
            count+=1;
        }
        for (StudentWord sw:studentWordList){
            if (sw.getGoal()==1)
                continue;
            if (count==wordNum+10)
                break;
            record=wordsDao.selectByPrimaryKey(sw.getWordId());
            JSONObject js=new JSONObject();
            js.put("id",record.getId());
            js.put("chinese",record.getChinese());
            js.put("english",record.getEnglish());
            result.add(js);
            count+=1;
        }
        return result;
    }

    @RequestMapping("/exam/submit")
    @ResponseBody
    public Object submitwords(@RequestParam("id")String id,
                              @RequestParam("result")String point,
                              HttpServletRequest request){
        JSONObject result=new JSONObject();
        HttpSession session=request.getSession();
        long paperid=Integer.valueOf(session.getAttribute("paperId").toString());
        Student student=studentDao.selectByAccount(session.getAttribute("username").toString());
        StudentPaper searchSP=new StudentPaper();
        searchSP.setPaperId(paperid);
        searchSP.setStudentId(student.getId());
        StudentPaper sp=studentPaperDao.selectByPrimaryKey(searchSP);
        long num=sp.getNums();
        StudentWord sw=new StudentWord();
        sw.setPaperId(paperid);
        sw.setStudentId(student.getId());
        sw.setWordId(Long.valueOf(id));
        if (point.equals("0")){
            sw.setGoal(0);
        }else if (point.equals("1")){
            sw.setGoal(1);
            long p=student.getPoints()+1;
            student.setPoints(p);
            num++;
            studentDao.updateByPrimaryKeySelective(student);
        }
        if (studentWordDao.exitRecord(sw)==1){
            studentWordDao.updateByPrimaryKeySelective(sw);
        }else {
            studentWordDao.insertSelective(sw);
        }
        sp.setNums(num);
        studentPaperDao.updateByPrimaryKeySelective(sp);
        result.put("code","success");
        return  result;


    }

    @RequestMapping("/exam/getExamInfo")
    @ResponseBody
    public Object getExamInfo(HttpServletRequest request){
        HttpSession session=request.getSession();
        String id=session.getAttribute("examId").toString();
        JSONArray result=new JSONArray();
        Paper p=paperDao.selectByPrimaryKey(Long.valueOf(id));
        List<Words> words=wordsDao.getListByPaer(Long.valueOf(id));
        for (Words w:words){
            JSONObject js=new JSONObject();
            js.put("id",w.getId());
            js.put("english",w.getEnglish());
            js.put("chinese",w.getChinese());
            result.add(js);
            System.out.println(js);
        }
        JSONObject r=new JSONObject();
        r.put("title",p.getName());
        r.put("list",result);
        return r;
    }
}
