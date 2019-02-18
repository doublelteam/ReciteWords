package com.db.dao;

import com.db.model.Teacher;
import org.springframework.stereotype.Service;

@Service("teacherDao")
public interface TeacherMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Teacher record);

    int insertSelective(Teacher record);

    Teacher selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Teacher record);

    int updateByPrimaryKey(Teacher record);

    Teacher selectByAccount(String account);
}