package com.homedepot.om.controllers;


import com.homedepot.om.repositories.VolunteerRepository;
import com.homedepot.om.response.ResponseHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// establishes rest controller and our base endpoint
@RestController
@RequestMapping("/Volunteers")
public class Volunteer {
    @Autowired
    private VolunteerRepository volunteerRepository;
    // creates our get all route
    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<com.homedepot.om.models.Volunteer>> list(){

        return  new ResponseEntity<>(volunteerRepository.findAll(),HttpStatus.OK);

    }

    // makes our post route, takes in a todo and posts to db
    @CrossOrigin
    @PostMapping()
    public ResponseEntity<Object> create(@RequestBody final com.homedepot.om.models.Volunteer volunteer){
        if(volunteer.getFirstName()==null|| volunteer.getFirstName()=="")
        {
            return ResponseHandler.createMandatoryfieldsResponseBuilder("First name is required",HttpStatus.BAD_REQUEST);
        }
        else
        if(volunteer.getLastName()==null|| volunteer.getLastName()=="")
        {
            return ResponseHandler.createMandatoryfieldsResponseBuilder("Last name is required",HttpStatus.BAD_REQUEST);
        }
        else
        if( volunteer.getLastName()==null|| volunteer.getLastName()==""||!(volunteer.getPreferredContact().contains("EMAIL") || volunteer.getPreferredContact().contains("PHONE")))

        {
            return ResponseHandler.createMandatoryfieldsResponseBuilder("PreferredContact is required.EMAIL/PHONE are only values allowed",HttpStatus.BAD_REQUEST);
        }

//        com.homedepot.om.models.Volunteer existingVolunteer = volunteerRepository.save(volunteer);
//        BeanUtils.copyProperties(existingVolunteer,volunteer,"projects");
        return ResponseHandler.responseBuilder(volunteerRepository.saveAndFlush(volunteer), "Volunteers are created successfully",HttpStatus.CREATED);
    }
    //deletes a todo by id
    @CrossOrigin
    @RequestMapping(value = "{Volunteer_id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable Long Volunteer_id){
        Optional<com.homedepot.om.models.Volunteer> DeleteData = this.volunteerRepository.findById(Volunteer_id);
        if(!DeleteData.isPresent())
        {
            return ResponseHandler.deleteErrorResponseBuilder("Volunteer Id does not exist",HttpStatus.BAD_REQUEST);
        }
        com.homedepot.om.models.Volunteer DatatoDelete =DeleteData.get();
        volunteerRepository.deleteById(Volunteer_id);
        return ResponseHandler.deleteSuccessResponseBuilder("Volunteer Details for the Id is deleted successfully",HttpStatus.OK);

    }


    // updates a todo by id, as this is a put you must pass all properties
    @CrossOrigin
    @RequestMapping(value = "{Volunteer_id}", method = RequestMethod.PUT)
    public  ResponseEntity<Object> update(@PathVariable Long Volunteer_id, @RequestBody com.homedepot.om.models.Volunteer volunteer){
        Optional<com.homedepot.om.models.Volunteer> updateData = this.volunteerRepository.findById(Volunteer_id);
        if(!updateData.isPresent()) {
            return ResponseHandler.deleteErrorResponseBuilder("Volunteer Id does not exist",HttpStatus.BAD_REQUEST);
        }

        com.homedepot.om.models.Volunteer existingVolunteer = volunteerRepository.getReferenceById(Volunteer_id);
        BeanUtils.copyProperties(volunteer, existingVolunteer, "Volunteer_id","projects");
        return ResponseHandler.responseBuilder(volunteerRepository.saveAndFlush(existingVolunteer), "Volunteers are updated successfully",HttpStatus.OK);
    }
}