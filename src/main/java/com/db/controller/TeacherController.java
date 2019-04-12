package com.db.controller;

import com.db.dao.*;
import com.db.model.*;
import com.db.util.ExcelUtil;
import com.db.util.IpUtils;
import com.db.util.md5Utils;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherMapper teacherDao;
    @Autowired
    private PaperMapper paperDao;
    @Autowired
    private WordsMapper wordsDao;
    @Autowired
    private StudentWordMapper studentWordDao;
    @Autowired
    private StudentPaperMapper studentPaperDao;
    @Autowired
    private StudentMapper studentDao;
    @Autowired
    private OperateRecordMapper operateRecordDao;

    private SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    @RequestMapping("/getTeacherInfo")
    @ResponseBody
    public Object getInfo(HttpServletRequest request){
        HttpSession session=request.getSession();
        JSONObject result=new JSONObject();
        if (session.getAttribute("username")!=null&& session.getAttribute("role").toString().equals("teacher")){
            result.put("name",session.getAttribute("username").toString());
            result.put("code","success");
        }
        return result;
    }

    @RequestMapping("/getAllStudents")
    @ResponseBody
    public Object getAllStudents(HttpServletRequest request){
        JSONArray result=new JSONArray();
        HttpSession session=request.getSession();
        if (session.getAttribute("username")!=null&& session.getAttribute("role").toString().equals("teacher")){
            List<Student> studentList=studentDao.getAllStudents();
            for (Student st:studentList){
                JSONObject js=new JSONObject();
                js.put("id",st.getAccount());
                js.put("point",st.getPoints());
                result.add(js);
            }
        }
        return result;
    }

    @RequestMapping("/getManagerPassword")
    @ResponseBody
    public Object getManagerPassword(HttpServletRequest request){
        JSONObject result=new JSONObject();
        HttpSession session=request.getSession();
        if (session.getAttribute("username")!=null&& session.getAttribute("role").toString().equals("teacher")) {
            Teacher teacher=teacherDao.selectByAccount("managerpassword");
            result.put("password",teacher.getPassword());
        }
        return result;
    }


    @RequestMapping("/changePassword")
    @ResponseBody
    public Object changePassword(@RequestParam("oldpassword") String old,@RequestParam("newpassword") String ne,HttpServletRequest request){
        JSONObject result=new JSONObject();
        HttpSession session=request.getSession();
        String account=session.getAttribute("username").toString();
        Teacher teacher=teacherDao.selectByAccount(account);
        if (!teacher.getPassword().equals(md5Utils.encode(old))){
            result.put("code","false");
            result.put("msg","原来密码错误！");
        }
        else {
            teacher.setPassword(md5Utils.encode(ne));
            if (teacherDao.updateByPrimaryKeySelective(teacher)!=1)
                result.put("code","false");
            else
                result.put("code","success");
        }
        return result;
    }

    @RequestMapping("/changePoints")
    @ResponseBody
    public Object changePoint(@RequestParam("id")String id,@RequestParam("newPoint")String newPoint,HttpServletRequest request) throws ParseException {
        JSONObject result=new JSONObject();
        HttpSession session=request.getSession();
        String ip= IpUtils.getIpAddress(request);
        Student student=studentDao.selectByAccount(id);
        OperateRecord or=new OperateRecord();
        or.setIp(ip);
        or.setBeforePoint(student.getPoints());
        student.setPoints(Long.valueOf(newPoint));
        or.setAfterPoint(student.getPoints());
        or.setStudentId(student.getAccount());
        or.setUpdateTime(SDF.parse(SDF.format(new Date())));
        or.setTeacherId(session.getAttribute("username").toString());
        operateRecordDao.insertSelective(or);
        if (studentDao.updateByPrimaryKeySelective(student)==1)
            result.put("code","success");
        else
            result.put("code","false");
        return result;
    }

    @RequestMapping("/getRecord")
    @ResponseBody
    public Object getRecord(){
        JSONArray result=new JSONArray();
        List<OperateRecord> operateRecordList=operateRecordDao.selectAllRecord();
        for (OperateRecord or:operateRecordList){
            JSONObject js=new JSONObject();
            js.put("time",SDF.format(or.getUpdateTime()));
            js.put("ip",or.getIp());
            js.put("personDo",or.getTeacherId());
            js.put("personDone",or.getStudentId());
            js.put("oldRecord",or.getBeforePoint());
            js.put("newRecord",or.getAfterPoint());
            result.add(js);
        }
        return result;
    }



    @RequestMapping("/getExamList")
    @ResponseBody
    public Object getExamList(HttpServletRequest request){
        JSONArray result=new JSONArray();
        HttpSession session=request.getSession();
        if (session.getAttribute("username")!=null&& session.getAttribute("role").toString().equals("teacher")){
            List<Paper> paperList=paperDao.getList();
            for (Paper p:paperList){
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("Type","do");
                jsonObject.put("title",p.getName());
                jsonObject.put("nums",p.getNums());
                jsonObject.put("start","0");
                jsonObject.put("end","0");
                jsonObject.put("id",String.valueOf(p.getId()));
                jsonObject.put("grade",0);
                result.add(jsonObject);
            }
        }

        return result;
    }

    @RequestMapping("/removeExam")
    @ResponseBody
    public Object removeExam(@RequestParam("examId")String id){
        JSONObject result=new JSONObject();

        if (paperDao.deleteByPrimaryKey(Long.valueOf(id ))==1&&wordsDao.delByPaperId(Long.valueOf(id ))==1&&studentWordDao.delByPaperId(Long.valueOf(id))==1&&studentPaperDao.delByPaperId(Long.valueOf(id ))==1)      {
            result.put("code","success");
        }
        else {
            result.put("code","fail");
        }
        return result;
    }

    @RequestMapping(value = "/uploadwords", method = RequestMethod.POST)
    @ResponseBody
    public Object addNewStudentFile(@RequestParam("file") MultipartFile file,
                                    HttpServletRequest request) {
        JSONObject result = new JSONObject();
        result.put("code", "fail");
        if (!file.isEmpty()) {
            String name = file.getOriginalFilename().toLowerCase();
            if (!name.endsWith("xls")
                    && !name.endsWith("xlsx")) {
                result.put("msg", "上传文件格式不正确");
                return result;
            }
            InputStream stream;
            try {
                stream = file.getInputStream();
                Map<String, List<Map<String, String>>> map = ExcelUtil.readXls(stream);
                if (map.isEmpty()) {
                    result.put("msg", "上传文件数据为空");
                    return result;
                }
                Set<String> excelSheets = map.keySet();
                int totalCount = 0;
                JSONArray patients = new JSONArray();
                Paper paper=new Paper();
                paper.setName(name.split("\\.")[0]);
                paperDao.insertSelective(paper);
                paper=paperDao.selectByName(name.split("\\.")[0]);
                int existTotalCount = 0;
                for (String excelSheet : excelSheets) {
                    List<Map<String, String>> list = map.get(excelSheet);
                    long paperId=paper.getId();
                    for (Map<String, String> row : list) {
                        // TODO 批量添加
                        Words w=excelRowToStudent(row);
                        if (w.getEnglish()==null||w.getChinese()==null)
                            continue;
                        w.setPaperId(paperId);
                        if (wordsDao.insertSelective(w)==1){
                            totalCount+=1;
                        }
                    }
                }
                paper.setNums(Long.valueOf(totalCount));
                paperDao.updateByPrimaryKeySelective(paper);
                String msg = "导入词库： " + name.split("\\.")[0] + "，成功导入"
                        + (totalCount - existTotalCount) + "个单词" ;
                result.put("code", "success");
                result.put("msg", msg);
                result.put("patients", patients);
            } catch (IOException e) {
                result.put("msg", "导入异常，请检查数据格式");
            }
        }

        return result;

    }


    private Words excelRowToStudent(Map<String, String> row) {
        Words words=new Words();
        String value;
        value = row.get("英文");
        if(value != null&&!value.equals(""))
            words.setEnglish(value);
        value = row.get("中文");
        if(value != null&&!value.equals(""))
            words.setChinese(value);

        return words;
    }

    @RequestMapping("/examDetail")
    @ResponseBody
    public Object examDetail(@RequestParam("examId")String examId,HttpServletRequest request){
        HttpSession session=request.getSession();
        session.setAttribute("examId",examId);
        JSONObject result=new JSONObject();
        result.put("code","success");
        return result;
    }


    @RequestMapping("/addUser")
    @ResponseBody
    public  Object addUser(@RequestParam("id")String id,@RequestParam("password")String password,@RequestParam("type")String type,@RequestParam(value = "managerpassword" ,required = false)String managerpassword){
        JSONObject result=new JSONObject();
        if (type.equals("teacher")){
            Teacher manager=teacherDao.selectByAccount("managerpassword");
            if (!md5Utils.encode(managerpassword).equals(manager.getPassword())){
                result.put("code",0);
                result.put("msg","管理密码错误！");
                return result;
            }
            Teacher teacher=new Teacher();
            teacher.setAccount(id);
            teacher.setPassword(md5Utils.encode(password));
            if (teacherDao.insertSelective(teacher)==1){
                result.put("code","success");
            }else {
                result.put("code","success");
            }

        }else if (type.equals("student")){
            Student student=new Student();
            student.setAccount(id);
            student.setPassword(md5Utils.encode(password));
            student.setPoints(0l);
            if (studentDao.insertSelective(student)==1){
                result.put("code","success");
            }else {
                result.put("code","success");
            }
        }

        return result;
    }

    @RequestMapping("/deleteStudent")
    @ResponseBody
    public Object deleteStudent(@RequestParam("id")String id,@RequestParam("managerpassword")String managerpassword){
        JSONObject result=new JSONObject();
        Teacher manager=teacherDao.selectByAccount("managerpassword");
        if (!md5Utils.encode(managerpassword).equals(manager.getPassword())){
            result.put("code",0);
            result.put("msg","管理密码错误！");
            return result;
        }
        Student student=studentDao.selectByAccount(id);
        if (studentDao.deleteByPrimaryKey(student.getId())==1){
            result.put("code",1);
        }else {
            result.put("code",0);
        }

        return result;
    }


    @RequestMapping(value = "/resetPassword",method = RequestMethod.POST)
    @ResponseBody
    public Object resetPassword(@RequestParam("id")String id,@RequestParam("password")String password,@RequestParam("managerpassword")String managerpassword){
        JSONObject result=new JSONObject();
        Teacher manager=teacherDao.selectByAccount("managerpassword");
        if (!md5Utils.encode(managerpassword).equals(manager.getPassword())){
            result.put("code",0);
            result.put("msg","管理密码错误！");
            return result;
        }
        Student s=studentDao.selectByAccount(id);
        s.setPassword(md5Utils.encode(password));
        studentDao.updateByPrimaryKeySelective(s);
        result.put("code",1);
        return result;
    }
}
