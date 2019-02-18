//package com.db.controller;
//
//
//import cn.afterturn.easypoi.excel.ExcelExportUtil;
//import cn.afterturn.easypoi.excel.entity.ExportParams;
//import com.db.dao.StudentMapper;
//import com.db.dao.StudentTeacherMapper;
//import com.db.dao.TeacherMapper;
//import com.db.model.Student;
//import com.db.model.StudentTeacher;
//import com.db.model.Teacher;
//import com.db.util.ExcelUtil;
//import jdk.nashorn.internal.ir.IfNode;
//import net.sf.json.JSONArray;
//import net.sf.json.JSONObject;
//import org.apache.poi.ss.usermodel.Workbook;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.*;
//import java.net.URLEncoder;
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//@Controller
//@RequestMapping("/acdemic")
//public class AcdemicController {
//
//    @Autowired
//    private TeacherMapper teacherDao;
//    @Autowired
//    private StudentMapper studentDao;
//    @Autowired
//    private StudentTeacherMapper studentTeacherDao;
//
//
//    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//
//
//    @RequestMapping("/addNewTeacher")
//    @ResponseBody
//    public Object addTeacher(@RequestParam("name") String name,@RequestParam("sex") String sex,
//                             @RequestParam("id") String id,@RequestParam("college") String college){
//
//        JSONObject result=new JSONObject();
//        if (teacherDao.getCount(id)>0){
//            result.put("code","fail");
//            result.put("msg","该教师ID已存在");
//            return result;
//        }
//        Teacher teacher=new Teacher();
//        teacher.setInstitute(college);
//        teacher.setSex(sex);
//        teacher.setTeacherName(name);
//        teacher.setTeacherId(id);
//        try {
//            teacherDao.insertSelective(teacher);
//            result.put("code","success");
//            result.put("msg","已成功保存");
//
//        }catch (Exception e){
//            result.put("code","fail");
//            result.put("msg","请重新上传");
//        }
//        return result;
//    }
//
//    @RequestMapping("/getAllClass")
//    @ResponseBody
//    public Object getAllClass(){
//    JSONArray result=new JSONArray();
//    List<String> classs=studentDao.getAllClass();
//    List<String> grades=studentDao.getAllGrade();
//    for (String v:classs){
//        JSONObject j=new JSONObject();
//        j.put("type","class");
//        j.put("value",v);
//        result.add(j);
//    }
//    for (String v:grades){
//        JSONObject j=new JSONObject();
//        j.put("type","grade");
//        j.put("value",v);
//        result.add(j);
//    }
//    return result;
//
//    }
//
//    @RequestMapping("/saveTeacherClass")
//    @ResponseBody
//    public Object saveTeacherClass(@RequestParam("teacher_id") String id,@RequestParam("classgrade") String grade,
//                                   @RequestParam("classname") String cla){
//        JSONObject result=new JSONObject();
//        StudentTeacher st=new StudentTeacher();
//        st.setTeacherId(id);
//        st.setClassName(cla);
//        st.setClassGrade(grade);
//        studentTeacherDao.insert(st);
//        result.put("code","success");
//        return result;
//    }
//
//    @RequestMapping("/deleteTeacherClass")
//    @ResponseBody
//    public Object deleteTeacherClass(@RequestParam("id") String id,@RequestParam("grade") String grade,
//                                     @RequestParam("name") String cla){
//        JSONObject result=new JSONObject();
//        StudentTeacher st=new StudentTeacher();
//        st.setTeacherId(id);
//        st.setClassGrade(grade);
//        st.setClassName(cla);
//        if (studentTeacherDao.deleteByPrimaryKey(st)==1){
//            result.put("code","success");
//        }
//        else {
//            result.put("code","success");
//        }
//
//        return result;
//    }
//
//    @RequestMapping("/getTeacherList")
//    @ResponseBody
//    public Object getTeacherList(){
//        JSONArray result=new JSONArray();
//        List<Teacher> teachersList=teacherDao.selectByPrimaryKeyList();
//        for (Teacher t:teachersList){
//            JSONObject j=new JSONObject();
//            j.put("name",t.getTeacherName());
//            j.put("id",t.getTeacherId());
//            j.put("sex",t.getSex());
//            j.put("college",t.getInstitute());
//            result.add(j);
//        }
//        return result;
//    }
//
//    @RequestMapping(value = "/getStudentList", method = {RequestMethod.GET, RequestMethod.POST})
//    @ResponseBody
//    public Object getSelectedStudents(@RequestParam("classgrade") String classgrade,
//                                      @RequestParam("classname") String classname, HttpServletRequest request) {
//        JSONArray result = new JSONArray();
//        if (!classgrade.equals("")&&!classname.equals("")){
//            List<Student> studentList = studentDao.selectByPrimaryKeyList(classname, classgrade);
//            for (Student s : studentList) {
//                JSONObject jsonObject = new JSONObject();
//                jsonObject.put("name", s.getStudentName());
//                jsonObject.put("id", s.getStudentId());
//                jsonObject.put("sex", s.getSex());
//                jsonObject.put("college", s.getInstitute());
//                jsonObject.put("class_grade", s.getClassGrade());
//                jsonObject.put("class_name", s.getClassName());
//                result.add(jsonObject);
//            }
//        }
//        return result;
//    }
//
//    @RequestMapping(value = "/teacherinfo", method = {RequestMethod.GET, RequestMethod.POST})
//    @ResponseBody
//    public Object getInfo(@RequestParam("id")String tid,HttpServletRequest request) {
//        JSONObject result = new JSONObject();
//        String id = tid;
//        Teacher teacher = teacherDao.selectByPrimaryKey(id);
//        result.put("name", teacher.getTeacherName());
//        result.put("id", teacher.getTeacherId());
//        result.put("sex", teacher.getSex());
//        result.put("college", teacher.getInstitute());
//        result.put("address", teacher.getAddress());
//        result.put("birthday", formatter.format(teacher.getBirthdate()));
//        result.put("phone", teacher.getPhone());
//        result.put("email", teacher.geteMail());
//        result.put("code", "success");
//        return result;
//
//    }
//
//    @RequestMapping(value = "/studentinfo", method = {RequestMethod.GET, RequestMethod.POST})
//    @ResponseBody
//    public Object getStudentInfo(@RequestParam("id")String id,HttpServletRequest request) {
//        JSONObject result = new JSONObject();
//        System.out.println(id);
//        Student student = studentDao.selectByPrimaryKey(id);
//        result.put("name", student.getStudentName());
//        result.put("id", student.getStudentId());
//        result.put("sex", student.getSex());
//        result.put("college", student.getInstitute());
//        result.put("grade",student.getClassGrade());
//        result.put("class",student.getClassName());
//        result.put("address", student.getAddress());
//        result.put("birthday", formatter.format(student.getBirthdate()));
//        result.put("phone", student.getPhone());
//        result.put("email", student.geteMail());
//        result.put("code", "success");
//        return result;
//
//    }
//    @RequestMapping("/saveStudent")
//    @ResponseBody
//    public Object changeStudentInfo(@RequestParam("id")String id,@RequestParam("name")String name,
//                                    @RequestParam("sex")String sex,@RequestParam("college")String college,
//                                    @RequestParam("grade")String grade,@RequestParam("class")String cla,
//                                    @RequestParam("address")String address,@RequestParam("birthday")String birthday,
//                                    @RequestParam("phone")String phone,@RequestParam("id")String email) throws ParseException {
//        JSONObject result=new JSONObject();
//        Student student=studentDao.selectByPrimaryKey(id);
//        student.setStudentName(name);
//        student.setSex(sex);
//        student.setInstitute(college);
//        student.setClassGrade(grade);
//        student.setClassName(cla);
//        student.setAddress(address);
//        student.setBirthdate(formatter.parse(birthday));
//        student.setPhone(phone);
//        student.seteMail(email);
//        if (studentDao.updateByPrimaryKeySelective(student)==1){
//            result.put("code","success");
//        }
//        return result;
//    }
//
//
//    @RequestMapping("/saveTeacher")
//    @ResponseBody
//    public Object changeTeacherInfo(@RequestParam("id")String id,@RequestParam("name")String name,
//                                    @RequestParam("sex")String sex,@RequestParam("college")String college,
//                                    @RequestParam("address")String address,@RequestParam("birthday")String birthday,
//                                    @RequestParam("phone")String phone,@RequestParam("id")String email) throws ParseException {
//        JSONObject result=new JSONObject();
//        System.out.println(id);
//        Teacher teacher=teacherDao.selectByPrimaryKey(id);
//        teacher.setTeacherName(name);
//        teacher.setSex(sex);
//        teacher.setInstitute(college);
//        teacher.setAddress(address);
//        teacher.setBirthdate(formatter.parse(birthday));
//        teacher.setPhone(phone);
//        teacher.seteMail(email);
//        teacherDao.updateByPrimaryKeySelective(teacher);
//        result.put("code","success");
//
//        return result;
//
//    }
//
//    @RequestMapping(value = "/getTeacherClassList", method = {RequestMethod.GET, RequestMethod.POST})
//    @ResponseBody
//    public Object getSelectedStudents() {
//        JSONArray result=new JSONArray();
//        List<StudentTeacher> list=studentTeacherDao.selectByPrimaryKeyList();
//        for (StudentTeacher st:list){
//            JSONObject j=new JSONObject();
//            Teacher t=teacherDao.selectByPrimaryKey(st.getTeacherId());
//            j.put("teacher_name",t.getTeacherName());
//            j.put("teacher_id",st.getTeacherId());
//            j.put("class_grade",st.getClassGrade());
//            j.put("class_name",st.getClassName());
//            result.add(j);
//        }
//
//        return result;
//
//    }
//
//    @RequestMapping(value = "/defaultStudent",method = RequestMethod.POST)
//    @ResponseBody
//    public Object defaultStudent(@RequestParam("id") String id){
//        JSONObject result=new JSONObject();
//
//        Student s=studentDao.selectByPrimaryKey(id);
//        s.setStudentPassword("111111");
//        studentDao.updateByPrimaryKeySelective(s);
//        result.put("code","success");
//
//        return result;
//    }
//
//    @RequestMapping(value = "/defaultTeacher",method = RequestMethod.POST)
//    @ResponseBody
//    public Object defaultTeacher(@RequestParam("id") String id){
//        JSONObject result=new JSONObject();
//
//        Teacher t=teacherDao.selectByPrimaryKey(id);
//        t.setTeacherPassword("222222");
//        teacherDao.updateByPrimaryKeySelective(t);
//        result.put("code","success");
//
//        return result;
//    }
//
//
//
//
//
//
//    @RequestMapping(value = "/addNewTeacherFile", method = RequestMethod.POST)
//    @ResponseBody
//    public Object importTags(@RequestParam("file") MultipartFile file,
//                             HttpServletRequest request) {
//        JSONObject result = new JSONObject();
//        result.put("code", "fail");
//        if (!file.isEmpty()) {
//            String name = file.getOriginalFilename().toLowerCase();
//            if (!name.endsWith("xls")
//                    && !name.endsWith("xlsx")) {
//                result.put("msg", "上传文件格式不正确");
//                return result;
//            }
//            InputStream stream;
//            try {
//                stream = file.getInputStream();
//                Map<String, List<Map<String, String>>> map = ExcelUtil.readXls(stream);
//                if (map.isEmpty()) {
//                    result.put("msg", "上传文件数据为空");
//                    return result;
//                }
//                Set<String> excelSheets = map.keySet();
//                int totalCount = 0;
//                JSONArray patients = new JSONArray();
//                String existTagTip = "";
//                int existTotalCount = 0;
//                for (String excelSheet : excelSheets) {
//                    List<Map<String, String>> list = map.get(excelSheet);
//                    totalCount = totalCount + list.size();
//                    for (Map<String, String> row : list) {
//                        // TODO 批量添加
//                        Teacher t=excelRowToTeacher(row);
//                        int bool=teacherDao.getCount(t.getTeacherId());
//                        if (bool>0){
//                            existTagTip+=t.getTeacherId()+",";
//                            existTotalCount+=1;
//                            continue;
//                        }
//                        teacherDao.insertSelective(t);
//                    }
//                }
//                String msg = "";
//                if(existTotalCount > 0) {
//                    msg = "导入教师 " + totalCount + "个，成功导入"
//                            + (totalCount - existTotalCount) + "个" + "，重复"
//                            + existTotalCount + "个(" + existTagTip + ")";
//                } else {
//                    msg = "全部教师信息导入成功，一共" + totalCount + "个";
//                }
//                result.put("code", "success");
//                result.put("msg", msg);
//                result.put("patients", patients);
//            } catch (IOException e) {
//                result.put("msg", "导入异常，请检查数据格式");
//            }
//        }
//
//        return result;
//
//    }
//
//    private Teacher excelRowToTeacher(Map<String, String> row) {
//        Teacher teacher = new Teacher();
//        String value;
//        value = row.get("姓名");
//        if(value != null&&!value.equals(""))
//            teacher.setTeacherName(value);
//        value = row.get("职工号");
//        if(value != null&&!value.equals(""))
//            teacher.setTeacherId(value);
//        value = row.get("性别");
//        if(value != null&&!value.equals(""))
//            teacher.setSex(value);
//        value = row.get("学院");
//        if(value != null&&!value.equals(""))
//            teacher.setInstitute(value);
//
//        return teacher;
//    }
//
//    @RequestMapping(value = "/addNewStudentFile", method = RequestMethod.POST)
//    @ResponseBody
//    public Object addNewStudentFile(@RequestParam("file") MultipartFile file,
//                             HttpServletRequest request) {
//        JSONObject result = new JSONObject();
//        result.put("code", "fail");
//        if (!file.isEmpty()) {
//            String name = file.getOriginalFilename().toLowerCase();
//            if (!name.endsWith("xls")
//                    && !name.endsWith("xlsx")) {
//                result.put("msg", "上传文件格式不正确");
//                return result;
//            }
//            InputStream stream;
//            try {
//                stream = file.getInputStream();
//                Map<String, List<Map<String, String>>> map = ExcelUtil.readXls(stream);
//                if (map.isEmpty()) {
//                    result.put("msg", "上传文件数据为空");
//                    return result;
//                }
//                Set<String> excelSheets = map.keySet();
//                int totalCount = 0;
//                JSONArray patients = new JSONArray();
//                String existTagTip = "";
//                int existTotalCount = 0;
//                for (String excelSheet : excelSheets) {
//                    List<Map<String, String>> list = map.get(excelSheet);
//                    totalCount = totalCount + list.size();
//                    for (Map<String, String> row : list) {
//                        // TODO 批量添加
//                        Student s=excelRowToStudent(row);
//                        int bool=studentDao.getCount(s.getStudentId());
//                        if (bool>0){
//                            existTagTip+=s.getStudentId()+",";
//                            existTotalCount+=1;
//                            continue;
//                        }
//                        studentDao.insertSelective(s);
//                    }
//                }
//                String msg = "";
//                if(existTotalCount > 0) {
//                    msg = "导入学生 " + totalCount + "个，成功导入"
//                            + (totalCount - existTotalCount) + "个" + "，重复"
//                            + existTotalCount + "个(" + existTagTip + ")";
//                } else {
//                    msg = "全部学生信息导入成功，一共" + totalCount + "个";
//                }
//                result.put("code", "success");
//                result.put("msg", msg);
//                result.put("patients", patients);
//            } catch (IOException e) {
//                result.put("msg", "导入异常，请检查数据格式");
//            }
//        }
//
//        return result;
//
//    }
//
//    private Student excelRowToStudent(Map<String, String> row) {
//        Student student = new Student();
//        String value;
//        value = row.get("姓名");
//        if(value != null&&!value.equals(""))
//            student.setStudentName(value);
//        value = row.get("学号");
//        if(value != null&&!value.equals(""))
//            student.setStudentId(value);
//        value = row.get("性别");
//        if(value != null&&!value.equals(""))
//            student.setSex(value);
//        value = row.get("年级");
//        if(value != null&&!value.equals(""))
//            student.setClassGrade(value);
//        value = row.get("班级");
//        if(value != null&&!value.equals(""))
//            student.setClassName(value);
//        value = row.get("学院");
//        if(value != null&&!value.equals(""))
//            student.setInstitute(value);
//        return student;
//    }
//
//
//
//    @RequestMapping("addNewStudent")
//    @ResponseBody
//    public Object addNewStudent(@RequestParam("name")String name,@RequestParam("sex")String sex,@RequestParam("id")String id,
//                                @RequestParam("college")String college,@RequestParam("grade")String grade,@RequestParam("class")String cla
//                                ){
//        JSONObject result=new JSONObject();
//        Student student=new Student();
//        if (studentDao.getCount(id)>0){
//            result.put("code","exist");
//            return result;
//        }
//        student.setStudentName(name);
//        student.setSex(sex);
//        if (!grade.contains("级"))
//            student.setClassGrade(grade+'级');
//        else
//            student.setClassGrade(grade);
//        if (cla.contains("班"))
//            student.setClassName(cla);
//        else
//            student.setClassName(cla+"班");
//        student.setStudentId(id);
//        student.setInstitute(college);
//        if (studentDao.insertSelective(student)==1){
//            result.put("code","success");
//        }
//        else {
//            result.put("code","fail");
//        }
//
//        return result;
//    }
//}
