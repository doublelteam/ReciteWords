package com.db.dao;

import com.db.model.StudentWord;
import com.db.model.StudentWordKey;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("studentWordDao")
public interface StudentWordMapper {
    int deleteByPrimaryKey(StudentWordKey key);

    int insert(StudentWord record);

    int insertSelective(StudentWord record);

    StudentWord selectByPrimaryKey(StudentWordKey key);

    int updateByPrimaryKeySelective(StudentWord record);

    int updateByPrimaryKey(StudentWord record);

    List<StudentWord> getListBySPId(StudentWord record);

    int delByPaperId(long id);

    int exitRecord(StudentWord record);

}