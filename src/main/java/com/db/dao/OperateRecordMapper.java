package com.db.dao;

import com.db.model.OperateRecord;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("operateRecordDao")
public interface OperateRecordMapper {
    int deleteByPrimaryKey(Long id);

    int insert(OperateRecord record);

    int insertSelective(OperateRecord record);

    OperateRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OperateRecord record);

    int updateByPrimaryKey(OperateRecord record);

    List<OperateRecord> selectAllRecord();
}