
        package com.homedepot.om.models;
//import jakarta.persistence.*;
import com.homedepot.om.models.Projects;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;


// creates relation to our java class and our database table letting spring make our id
@Entity(name="Volunteers")

public class Volunteer {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long Volunteer_id;

    @Column(name = "firstname")
    private String firstName;


    @Column(name = "lastname")
    private String lastName;

    @Column(name = "preferredcontact")

    private String preferredContact;

    @Column(name = "phonenumber")

    private String phoneNumber;

    @Column(name = "emailaddress")
    private String emailAddress;


    public Projects getProject() {
        return Project;
    }

    public void setProject(Projects project) {
        Project = project;
    }

 
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="project_id",referencedColumnName = "project_id")
    private Projects Project;


    public Long getVolunteer_id() {
        return Volunteer_id;
    }

    public void setVolunteer_id(Long volunteer_id) {
        Volunteer_id = volunteer_id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPreferredContact() {
        return preferredContact;
    }

    public void setPreferredContact(String preferredContact) {
        this.preferredContact = preferredContact;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }



    public Volunteer(){}
}

