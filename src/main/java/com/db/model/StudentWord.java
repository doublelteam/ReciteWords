package com.db.model;

public class StudentWord extends StudentWordKey {
    private Boolean goal;

    private Long paperId;

    public Boolean getGoal() {
        return goal;
    }

    public void setGoal(Boolean goal) {
        this.goal = goal;
    }

    public Long getPaperId() {
        return paperId;
    }

    public void setPaperId(Long paperId) {
        this.paperId = paperId;
    }
}