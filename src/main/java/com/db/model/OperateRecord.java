package com.db.model;

import java.util.Date;

public class OperateRecord {
    private Long id;

    private Date updateTime;

    private String ip;

    private String teacherId;

    private String studentId;

    private Long beforePoint;

    private Long afterPoint;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip == null ? null : ip.trim();
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Long getBeforePoint() {
        return beforePoint;
    }

    public void setBeforePoint(Long beforePoint) {
        this.beforePoint = beforePoint;
    }

    public Long getAfterPoint() {
        return afterPoint;
    }

    public void setAfterPoint(Long afterPoint) {
        this.afterPoint = afterPoint;
    }
}