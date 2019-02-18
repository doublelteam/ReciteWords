package com.db.dao;

import com.db.model.Paper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("paperDao")
public interface PaperMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Paper record);

    int insertSelective(Paper record);

    Paper selectByPrimaryKey(Long id);

    Paper selectByName(String name);

    int updateByPrimaryKeySelective(Paper record);

    int updateByPrimaryKey(Paper record);

    List<Paper> getList();
}