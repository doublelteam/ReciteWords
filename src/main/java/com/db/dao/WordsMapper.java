package com.db.dao;

import com.db.model.Words;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("wordsDao")
public interface WordsMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Words record);

    int insertSelective(Words record);

    Words selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Words record);

    int updateByPrimaryKey(Words record);

    List<Words> getListByPaer(long id);

    int delByPaperId(long id);
}