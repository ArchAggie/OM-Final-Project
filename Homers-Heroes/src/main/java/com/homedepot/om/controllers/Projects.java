package com.homedepot.om.controllers;
import com.homedepot.om.response.ResponseHandler;
import com.homedepot.om.repositories.ProjectRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;


//Get all projects with response wrapper
@RestController
@RequestMapping("/Projects")
public class Projects {
        @Autowired
        private ProjectRepository projectRepository;

        @CrossOrigin
        @GetMapping
        public ResponseEntity<Object> list(){
            return ResponseHandler.projectsResponseBuilder(projectRepository.findAll(),"Projects retrieved successfully",HttpStatus.OK);

        }
    // Creates a project with response wrapper and error handling
 @CrossOrigin
    @PostMapping()
    public ResponseEntity<Object> create(@RequestBody final com.homedepot.om.models.Projects projects) {
        if(projects.getProject_name()==null|| projects.getProject_name()=="")
        {
            return ResponseHandler.createMandatoryfieldsResponseBuilder("Project name is required",HttpStatus.BAD_REQUEST);
        }
        else
        if(projects.getProject_description()==null|| projects.getProject_description()=="")
        {
            return ResponseHandler.createMandatoryfieldsResponseBuilder("Project description is required",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(projectRepository.saveAndFlush(projects), HttpStatus.CREATED);
    }


    // Deletes a project with response wrapper and error handling
        @CrossOrigin
        @RequestMapping(value = "{Projects_id}", method = RequestMethod.DELETE)
        public ResponseEntity<Object> delete(@PathVariable Long Projects_id){
            Optional<com.homedepot.om.models.Projects> DeleteData = this.projectRepository.findById(Projects_id);
            if(!DeleteData.isPresent())
            {
                return ResponseHandler.deleteErrorResponseBuilder("Project Id does not exist",HttpStatus.BAD_REQUEST);
            }
            projectRepository.deleteById(Projects_id);
            return ResponseHandler.deleteSuccessResponseBuilder("Project Details for the Id is deleted successfully",HttpStatus.OK);

        }




// PUT request with response wrapper and error handling
         @CrossOrigin
        @RequestMapping(value = "{Projects_id}", method = RequestMethod.PUT)
        public ResponseEntity<Object> update(@PathVariable Long Projects_id, @RequestBody com.homedepot.om.models.Projects project){
             Optional<com.homedepot.om.models.Projects> updateData = this.projectRepository.findById(Projects_id);
             if(!updateData.isPresent())
             {
                 return ResponseHandler.deleteErrorResponseBuilder("Project Id does not exist", HttpStatus.BAD_REQUEST);
             }

             com.homedepot.om.models.Projects existingProject = projectRepository.getReferenceById(Projects_id);
             BeanUtils.copyProperties(project, existingProject, "Projects_id");
             return ResponseHandler.projectsResponseBuilder(projectRepository.saveAndFlush(existingProject), "Project is updated successfully",HttpStatus.OK);
         }
}

