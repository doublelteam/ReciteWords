package com.db.dao;

import com.db.model.Student;
import org.springframework.stereotype.Service;

@Service("studentDao")
public interface StudentMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Student record);

    int insertSelective(Student record);

    Student selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Student record);

    int updateByPrimaryKey(Student record);

    Student selectByAccount(String account);
}