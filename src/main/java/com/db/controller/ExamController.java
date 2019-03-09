package com.db.controller;

import com.db.dao.*;
import com.db.model.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
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

    @RequestMapping("/getwords")
    @ResponseBody
    public Object getExamTime(HttpServletRequest request){
        JSONArray result=new JSONArray();
        HttpSession session=request.getSession();
        long paperid=Integer.valueOf(session.getAttribute("paperId").toString());
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
            record=wordsList.get(n);
            JSONObject js=new JSONObject();
            js.put("id",wordsList.get(n).getId());
            js.put("chinese",wordsList.get(n).getChinese());
            js.put("english",wordsList.get(n).getEnglish());
            result.add(js);
            count+=1;
            if (count==30)
                break;
        }
        for (StudentWord sw:studentWordList){
            if (sw.getGoal()==true)
                continue;
            record=wordsDao.selectByPrimaryKey(sw.getWordId());
            JSONObject js=new JSONObject();
            js.put("id",record.getId());
            js.put("chinese",record.getChinese());
            js.put("english",record.getEnglish());
            result.add(js);
            count+=1;
            if (count==40)
                break;
        }
        return result;
    }

    @RequestMapping("/submitwords")
    @ResponseBody
    public Object submitwords(@RequestParam("worngId")String worngId,
                              @RequestParam("endId")String endId,
                              @RequestParam("beginId")String beginId,HttpServletRequest request){
        JSONObject result=new JSONObject();
        System.out.println(worngId);
        HttpSession session=request.getSession();
        long paperid=Integer.valueOf(session.getAttribute("paperId").toString());
        String []wId=worngId.split(",");
        Set<String> set=new HashSet<String>(Arrays.asList(wId));
        Student student=studentDao.selectByAccount(session.getAttribute("username").toString());
        StudentPaper searchSP=new StudentPaper();
        searchSP.setPaperId(paperid);
        searchSP.setStudentId(student.getId());
        StudentPaper sp=studentPaperDao.selectByPrimaryKey(searchSP);
        long num=sp.getNums();
        StudentWord sw=new StudentWord();
        for (int n=Integer.valueOf(beginId) ;n<=Integer.valueOf(endId);n++){
            sw.setPaperId(paperid);
            sw.setStudentId(student.getId());
            sw.setWordId(Long.valueOf(n));
            if (set.contains(String.valueOf(n))){
                sw.setGoal(false);
            }else {
                sw.setGoal(true);
                num+=1;
            }
            if (studentWordDao.exitRecord(sw)==1){
                studentWordDao.updateByPrimaryKeySelective(sw);
            }else {
                studentWordDao.insertSelective(sw);
            }

        }
        sp.setNums(num);
        studentPaperDao.updateByPrimaryKeySelective(sp);
        return  result;


    }
}
