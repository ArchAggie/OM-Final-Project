package com.homedepot.om.repositories;

import com.homedepot.om.models.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Projects, Long> {

}
