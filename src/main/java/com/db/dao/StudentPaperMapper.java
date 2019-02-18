package com.db.dao;

import com.db.model.StudentPaper;
import com.db.model.StudentPaperKey;
import org.springframework.stereotype.Service;

@Service("studentPaperDao")
public interface StudentPaperMapper {
    int deleteByPrimaryKey(StudentPaperKey key);

    int insert(StudentPaper record);

    int insertSelective(StudentPaper record);

    StudentPaper selectByPrimaryKey(StudentPaperKey key);

    int updateByPrimaryKeySelective(StudentPaper record);

    int updateByPrimaryKey(StudentPaper record);
    int delByPaperId(long id);

}