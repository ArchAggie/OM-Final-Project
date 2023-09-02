package com.homedepot.om.models;

import jakarta.persistence.*;


@Entity(name="Projects")
public class Projects {

    public Long getProject_id() {
        return project_id;
    }

    public void setProject_id(Long project_id) {
        this.project_id = project_id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getProject_date() {
        return project_date;
    }

    public void setProject_date(String project_date) {
        this.project_date = project_date;
    }

   public String getProject_description() {
        return project_description;
    }

    public void setProject_description(String project_description) {
        this.project_description = project_description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long project_id;
    private String project_name;

    private  String project_date;
    private String project_description;


    public Projects(){

    }

//    public Projects(String project_name,String project_date ,String project_description){
//this.project_name =project_name;
//        this.project_date =project_date;
//        this.project_description =project_description;
//    }

}

