package com.db.controller;

import com.db.dao.*;
import com.db.model.Paper;
import com.db.model.StudentPaper;
import com.db.model.Words;
import com.db.util.ExcelUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.io.InputStream;
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



    @RequestMapping("/getExamList")
    @ResponseBody
    public Object getExamList(HttpServletRequest request){
        JSONArray result=new JSONArray();
        HttpSession session=request.getSession();
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
}
